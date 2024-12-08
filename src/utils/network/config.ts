export const SERVER_CONFIG = {
  url: window.location.hostname === 'localhost' 
    ? 'http://localhost:3000'
    : window.location.origin,
  options: {
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    transports: ['websocket', 'polling'],
    forceNew: true,
    timeout: 10000,
    autoConnect: true,
    path: '/socket.io'
  }
};