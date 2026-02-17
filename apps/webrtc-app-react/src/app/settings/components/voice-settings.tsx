import { useEffect, useState } from 'react';
import { SelectElement } from '../../shared/form/select/type/SelectElement';
import SimpleSelect from '../../shared/form/select/simple-select';
import NormalText from '../../shared/text/normal-text';

function VoiceSettings() {
  const [mics, setMics] = useState<SelectElement[]>([]);
  const [selectedMic, setSelectedMic] = useState("");

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(devices => {
      const audioInputs = devices.filter(device => device.kind === "audioinput").map(device => {return {name: device.label, value: device.deviceId} as SelectElement});
      setMics(audioInputs);
      if (audioInputs[0]) setSelectedMic(audioInputs[0].value);
    })
  }, []);

  return (
    <div className="p-4">
      <NormalText text="Select a microphone"/>
      <SimpleSelect elements={mics} onChange={setSelectedMic} selected={selectedMic}/>
    </div>
  );
}

export default VoiceSettings;
