import React from "react";

function MessageHeader({ selectedUser }) {
  return (
    <div className="message-header">
      {selectedUser
        ? selectedUser.username.length <= 30
          ? selectedUser.username
          : selectedUser.username.slice(0, 31) + "..."
        : ""}
    </div>
  );
}

export default MessageHeader;
