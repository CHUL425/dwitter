import { io } from 'socket.io-client';

export default class Socket {
  constructor(baseURL, getAccessToken) {
    this.io = io(baseURL, {
      //auth: (cb) => cb({ token: getAccessToken() }),
      auth: (cb) => cb({ token: getAccessToken() }),
    });

    this.io.on('connect error', (error) => {
      console.log('Socket error', error.error);
    });
  }

  onSync(event, callback) {
    if (!this.io.connected) {
      this.io.connect();
    }

    this.io.on(event, (msg) => callback(msg));

    return () => this.io.off(event);
  }
}