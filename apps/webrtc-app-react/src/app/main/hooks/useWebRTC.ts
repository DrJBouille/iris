import { useEffect, useRef, useState } from "react";
import { signalingService } from "../services/signaling-service";

export function useWebRtc() {
  const peerRef = useRef<RTCPeerConnection | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);

  const [incomingCall, setIncomingCall] = useState(false);
  const [caller, setCaller] = useState("");

  const [inCall, setInCall] = useState(false);
  const [currentCallWith, setCurrentCallWith] = useState<string | null>(null);

  const pendingOfferRef = useRef<RTCSessionDescriptionInit | null>(null);
  const pendingCallerRef = useRef<string | null>(null);
  const isCallerRef = useRef(false);
  const answerAppliedRef = useRef(false);

  const createPeer = () => {
    const peer = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    peer.ontrack = (e) => {
      if (audioRef.current) audioRef.current.srcObject = e.streams[0];

    };

    peer.onicecandidate = (e) => {
      if (e.candidate && pendingCallerRef.current) {
        signalingService.send(
          pendingCallerRef.current,
          "candidate",
          e.candidate
        );
      }
    };

    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((t) =>
        peer.addTrack(t, localStreamRef.current!)
      );
    }

    peerRef.current = peer;
  };

  useEffect(() => {
    const handleMessage = async (msg: any) => {
      const peer = peerRef.current;
      if (!peer || peer.signalingState === "closed") return;


      if (msg.type === "offer" && !isCallerRef.current) {
        if (!isCallerRef.current) {
          pendingOfferRef.current = msg.payload;
          pendingCallerRef.current = msg.from;
          setIncomingCall(true);
          setCaller(msg.from);
        } else if (isCallerRef.current  && pendingCallerRef.current == msg.from) {
          isCallerRef.current = false;
          pendingOfferRef.current = msg.payload;
          setIncomingCall(true);
          setCaller(msg.from);
        }
      }

      if (msg.type === "answer" && isCallerRef.current) {
        if (answerAppliedRef.current) return;


        if (peer.signalingState === "have-local-offer") {
          await peer.setRemoteDescription(msg.payload);
          answerAppliedRef.current = true;
        }
      }

      if (msg.type === "candidate") {
        try {
          await peer.addIceCandidate(msg.payload);
        } catch (e) {
          console.warn("ICE error:", e);
        }
      }

      if (msg.type === "hangup") {
        peerRef.current?.close();
        peerRef.current = null;

        pendingOfferRef.current = null;
        pendingCallerRef.current = null;
        isCallerRef.current = false;
        answerAppliedRef.current = false;
        setIncomingCall(false);
        setCurrentCallWith(null);
        setInCall(false);

        createPeer();
      }
    };

    signalingService.onMessage(handleMessage);

    createPeer();

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        localStreamRef.current = stream;
        stream.getTracks().forEach((t) =>
          peerRef.current?.addTrack(t, stream)
        );
      })
      .catch((err) => {
        console.error('Microphone error:', err);
      });

    const audio = new Audio();
    audio.autoplay = true;
    audioRef.current = audio;

    return () => {
      signalingService.offMessage(handleMessage);
      peerRef.current?.close();
      localStreamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  const init = (isCaller: boolean, receiver: string) => {
    const peer = peerRef.current;
    if (!peer) return;

    isCallerRef.current = isCaller;
    pendingCallerRef.current = receiver;
    answerAppliedRef.current = false;

    peer.onicecandidate = (e) => {
      if (e.candidate) {
        signalingService.send(receiver, "candidate", e.candidate);
      }
    };
  };

  const call = async (receiver: string) => {
    const peer = peerRef.current;
    if (!peer) return;

    if (inCall) hangup();

    init(true, receiver);

    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);

    await signalingService.send(receiver, "offer", offer);

    setInCall(true);
    setCurrentCallWith(receiver);
  };

  const pickup = async () => {
    const peer = peerRef.current;
    if (!peer || !pendingOfferRef.current || !pendingCallerRef.current) return;

    init(false, pendingCallerRef.current);

    await peer.setRemoteDescription(pendingOfferRef.current);

    const answer = await peer.createAnswer();
    await peer.setLocalDescription(answer);

    await signalingService.send(pendingCallerRef.current, "answer", answer);

    setInCall(true);
    setCurrentCallWith(pendingCallerRef.current);

    pendingOfferRef.current = null;
    setIncomingCall(false);
  };

  const hangup = () => {
    const receiver = currentCallWith;
    if (receiver) signalingService.send(receiver, "hangup", null);

    peerRef.current?.close();
    peerRef.current = null;

    pendingOfferRef.current = null;
    pendingCallerRef.current = null;
    isCallerRef.current = false;
    answerAppliedRef.current = false;
    setIncomingCall(false);
    setCurrentCallWith("");
    setInCall(false)

    createPeer();
  };

  return {
    call,
    pickup,
    hangup,
    incomingCall,
    caller,
    inCall,
    currentCallWith,
    pendingCaller: pendingCallerRef.current,
  };
}
