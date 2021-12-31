import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import socket from "./Socket";

function Username({ usernameSelected, setUsernameSelected }) {
  let navigate = useNavigate();
  let handleUsername = (e) => {
    e.preventDefault();
    socket.auth = { username: e.target[0].value };
    socket.connect();
    setUsernameSelected(true);
    navigate("chathome", {
      state: {
        usernameSelected,
        // setUsernameSelected,
        username: e.target[0].value,
      },
    });
  };
  return (
    <form className="userform" onSubmit={(e) => handleUsername(e)}>
      <input
        type="text"
        placeholder="Username"
        className="userinput"
        autoFocus={true}
      />
      <input type="submit" className="userbtn" value={"Send"} />
    </form>
  );
}

export default Username;
