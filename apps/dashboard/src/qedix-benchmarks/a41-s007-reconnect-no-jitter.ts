export function qedixConnectWithoutReconnectJitter() {
  const socket = new WebSocket("wss://example.test/qedix");

  socket.onclose = () => {
    qedixConnectWithoutReconnectJitter();
  };

  return socket;
}