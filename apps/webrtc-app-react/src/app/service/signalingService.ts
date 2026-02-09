import keycloak from '../authentication/keycloak';

type Handler = (data: any) => void;

class SignalingService {
  private socket?: WebSocket;
  private handlers: Handler[] = [];
  private myUserId?: string;
  private ready = false;
  private connecting = false;
  private readyPromise?: Promise<void>;
  private readyResolve?: () => void;

  connect() {
    if (this.socket?.readyState === WebSocket.OPEN || this.connecting) return;

    this.connecting = true;

    this.readyPromise = new Promise((resolve) => {
      this.readyResolve = resolve;
    });

    this.socket = new WebSocket(
      `ws://localhost:9000/signal/${keycloak.token}`
    );

    this.socket.onopen = () => {
      this.connecting = false;
    };

    this.socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.type === 'connected') {
          this.myUserId = data.userId;
          this.ready = true;

          if (this.readyResolve) {
            this.readyResolve();
          }
        }

        this.handlers.forEach(h => {
          try {
            h(data);
          } catch (e) {
            console.error('Handler error:', e);
          }
        });

      } catch (e) {
        console.error('Error parsing message:', e);
      }
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
      this.connecting = false;
    };

    this.socket.onclose = () => {
      this.ready = false;
      this.myUserId = undefined;
      this.connecting = false;

      setTimeout(() => this.connect(), 3000);
    };
  }

  async waitUntilReady(): Promise<void> {
    if (this.ready) return;
    if (!this.readyPromise) {
      throw new Error('Not connecting');
    }
    return this.readyPromise;
  }

  async send(to: string, type: string, payload: any) {
    if (!this.socket) return;

    const message = {
      to,
      type,
      payload,
      from: this.myUserId
    };

    this.socket.send(JSON.stringify(message));
  }

  onMessage(handler: Handler) {
    this.handlers.push(handler);
  }

  offMessage(handler: Handler) {
    const before = this.handlers.length;
    this.handlers = this.handlers.filter(h => h !== handler);
  }

  disconnect() {
    this.socket?.close();
    this.socket = undefined;
    this.ready = false;
    this.myUserId = undefined;
    this.connecting = false;
  }
}

export const signalingService = new SignalingService();
