import io from "socket.io-client";
const socket = io("https://hichat-api.herokuapp.com/", {
  transports: ["websocket", "polling"],
  autoConnect: false,
});
export default socket;
