import React, { useEffect, useState } from "react";
import MessageHeader from "./MessageHeader";
import MessageInput from "./MessageInput";
import MessageMain from "./MessageMain";

function MessageBox({
  users,
  selectedUser,
  selectedUserUpdated,
  setUsers,
  setSelectedUser,
  setSelectedUserUpdated,
}) {
  useEffect(() => {
    // console.log(users);
    if (selectedUserUpdated) {
      setSelectedUserUpdated(false);
    }
  }, [selectedUserUpdated]);
  return (
    <div className="message-box">
      {!!selectedUser && !!selectedUser.messages && (
        <>
          <MessageHeader selectedUser={selectedUser} />
          <MessageMain
            users={users}
            selectedUser={selectedUser}
            selectedUserUpdated={selectedUserUpdated}
            setUsers={setUsers}
            setSelectedUser={setSelectedUser}
            setSelectedUserUpdated={setSelectedUserUpdated}
          />
          <MessageInput
            selectedUser={selectedUser}
            users={users}
            setUsers={setUsers}
            setSelectedUser={setSelectedUser}
            setSelectedUserUpdated={setSelectedUserUpdated}
          />
        </>
      )}
    </div>
  );
}

export default MessageBox;
