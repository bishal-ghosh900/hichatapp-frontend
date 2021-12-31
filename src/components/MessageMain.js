import React, { useEffect, useState } from "react";
import MessageDiv from "./MessageDiv";

let id = 1;

function MessageMain({
  users,
  selectedUser,
  setUsers,
  selectedUserUpdated,
  setSelectedUser,
}) {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    if (!!selectedUser && selectedUserUpdated) {
      const tempUser = users.find(
        (user) => selectedUser.userId === user.userId
      );

      if (!!tempUser && !!tempUser.messages) {
        // console.log(tempUser.messages);
        setMessages([...tempUser.messages]);
      }
    }

    const elem = document.querySelector(".message-main");
    elem.scrollTop = elem.scrollHeight;
    // }
  }, [selectedUserUpdated]);
  return (
    <div className="message-main">
      {!!messages &&
        messages.map((message) => <MessageDiv key={id++} message={message} />)}
    </div>
  );
}

export default MessageMain;
