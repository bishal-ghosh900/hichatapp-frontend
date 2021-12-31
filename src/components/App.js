// import logo from "./logo.svg";
import "../styles/App.css";
import socket from "./Socket";
import { useEffect, useState } from "react";
import Username from "./Username";
import { Route, Routes } from "react-router-dom";
import ChatHome from "./ChatHome";
// transports is required here.
function App() {
  const [info, setInfo] = useState("");
  socket.emit("chat", "Hi");

  const [usernameSelected, setUsernameSelected] = useState(false);

  useEffect(() => {
    socket.on("message", (data) => {
      setInfo(data);
    });
  });
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route
            path="/"
            element={
              <Username
                usernameSelected={usernameSelected}
                setUsernameSelected={setUsernameSelected}
              />
            }
          />
          <Route
            path="/chathome"
            element={
              <ChatHome
                usernameSelected={usernameSelected}
                setUsernameSelected={setUsernameSelected}
              />
            }
          />
        </Routes>
      </header>
    </div>
  );
}

export default App;
