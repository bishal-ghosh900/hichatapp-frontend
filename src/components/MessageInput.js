import React, { useState } from "react";
import socket from "./Socket";

function MessageInput({
  selectedUser,
  users,
  setUsers,
  setSelectedUser,
  setSelectedUserUpdated,
}) {
  const [messageInput, setMessageInput] = useState("");

  let handleSend = (e) => {
    e.preventDefault();
    if (!!messageInput) {
      socket.emit("private message", {
        content: messageInput,
        to: selectedUser.userId,
      });
      const tempUser = users.find(
        (user) => user.userId === selectedUser.userId
      );
      if (!!tempUser) {
        tempUser.messages = tempUser.messages || [];
        tempUser.messages.push({
          content: messageInput,
          fromSelf: true,
        });
        setSelectedUser(tempUser);
        setSelectedUserUpdated(true);
        setMessageInput("");
        setUsers([
          ...users.sort((a, b) => {
            if (a.self) return -1;
            if (b.self) return 1;
            if (a.userId === tempUser.userId) return -1;
            if (b.userId === tempUser.userId) return 1;
          }),
        ]);
      }
    }
  };
  return (
    <form className="message-input" onSubmit={(e) => handleSend(e)}>
      <input
        type="text"
        className="message-input-field"
        value={messageInput}
        autoFocus={true}
        onChange={(e) => setMessageInput(e.target.value)}
        placeholder="Write your message here ..."
      />
      <input type="submit" className="message-input-btn" value={"Send"} />
    </form>
  );
}

export default MessageInput;
