import "../styles/App.css";
import { useState } from "react";
import Username from "./Username";
import { Route, Routes } from "react-router-dom";
import ChatHome from "./ChatHome";
import NotSupported from "./NotSupported";
// transports is required here.
function App() {
  const [usernameSelected, setUsernameSelected] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  window.addEventListener("resize", () => {
    setWidth(window.innerWidth);
  });

  return (
    <div className="App">
      <header className="App-header">
        {width >= 500 ? (
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
        ) : (
          <NotSupported />
        )}
      </header>
    </div>
  );
}

export default App;
