import React from "react";
import { useNavigate } from "react-router-dom";
import socket from "./Socket";

function Username({ setUsernameSelected }) {
  let navigate = useNavigate();
  let handleUsername = (e) => {
    e.preventDefault();
    const sessionId = localStorage.getItem("sessionId");
    let username = e.target[0].value;
    if (e.target.length === 2) {
      username = e.target[0].value;
    } else {
      username = "foo";
    }
    if (!!username) {
      socket.auth = { username };
      if (sessionId) {
        socket.auth.sessionId = sessionId;
      }
      socket.connect();
      setUsernameSelected(true);
      navigate("chathome", {
        replace: true,
      });
    }
  };
  return (
    <form className="userform" onSubmit={(e) => handleUsername(e)}>
      {!localStorage.getItem("sessionId") && (
        <input
          type="text"
          placeholder="Write your lifetime username"
          className="userinput"
          autoFocus={true}
        />
      )}
      <input type="submit" className="userbtn" value={"Connect"} />
    </form>
  );
}

export default Username;
