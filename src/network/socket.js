import { io } from 'socket.io-client';

export default class Socket {
  constructor(baseURL) {
    this.io = io(baseURL, {
      auth: (cb) => cb({ token: localStorage.getItem('token') }),
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