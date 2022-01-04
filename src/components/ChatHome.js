import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import socket from "./Socket";
import MessageBox from "./MessageBox";
import Sidebar from "./Sidebar";

function ChatHome({ usernameSelected, setUsernameSelected }) {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [selectedUser, setSelectedUser] = useState({});
  const [selectedUserUpdated, setSelectedUserUpdated] = useState(false);

  useEffect(() => {
    let cu;
    let alluser = [];

    // user
    socket.removeAllListeners("user");
    socket.on("user", (users) => {
      users.forEach((user) => {
        if (user.userId === socket.userId) {
          user.self = true;
          cu = user;
          setCurrentUser(user);
        } else {
          user.self = false;
        }
        user.messages = [];
      });
      alluser = [...users.filter((user) => user.userId !== socket.userId)];
      alluser.unshift(cu);
      setUsers(alluser);
    });

    // user connected
    socket.removeAllListeners("user connected");
    socket.on("user connected", (user) => {
      const tempUser = users.find((u) => u.userId === user.userId);
      if (!!!tempUser) {
        user.messages = [];
        setUsers([...users, user]);
      }
    });

    // user disconnected
    socket.removeAllListeners("user disconnected");
    socket.on("user disconnected", ({ userId }) => {
      const allUsers = [...users.filter((user) => user.userId !== userId)];
      setUsers([...allUsers]);
      if (selectedUser && selectedUser.userId === userId) {
        setSelectedUser({});
      }
    });

    // session
    socket.removeAllListeners("session");
    socket.on("session", ({ sessionId, userId }) => {
      socket.auth.sessionId = sessionId;
      socket.userId = userId;
      localStorage.setItem("sessionId", sessionId);
    });

    // private message
    socket.removeAllListeners("private message");
    socket.on("private message", ({ content, from }) => {
      const tempUser = users.find((user) => user.userId === from);
      const allUser = users.filter((user) => user.userId !== from);
      if (tempUser) {
        const messages = [...tempUser.messages];
        messages.push({
          content,
          fromSelf: false,
        });
        tempUser.incomingMessages = !!tempUser.incomingMessages
          ? tempUser.incomingMessages
          : 0;
        if (from !== selectedUser.userId) {
          tempUser.incomingMessages += 1;
        } else {
          tempUser.incomingMessages = 0;
        }
        tempUser.messages = [...messages];
        allUser.push(tempUser);

        setUsers([
          ...allUser.sort((a, b) => {
            if (a.self) return -1;
            if (b.self) return 1;
            if ((a.incomingMessages || 0) > (b.incomingMessages || 0))
              return -1;
            if ((a.incomingMessages || 0) < (b.incomingMessages || 0)) return 1;
            if (a.userId === tempUser.userId) return -1;
            if (b.userId === tempUser.userId) return 1;
            return a.username > b.username ? 1 : 0;
          }),
        ]);
        setSelectedUserUpdated(true);
      }
    });

    // connect_error
    socket.removeAllListeners("connect_error");
    socket.on("connect_error", (err) => {
      if (err.message === "Username is invalid") {
        setUsernameSelected(false);
      }
    });
  }, [users.length, selectedUser?.userId]);
  return (
    <div className="chathome">
      {usernameSelected ? (
        <>
          <Sidebar
            users={users}
            currentUser={currentUser}
            setUsers={setUsers}
            setCurrentUser={setCurrentUser}
            setSelectedUser={setSelectedUser}
            setSelectedUserUpdated={setSelectedUserUpdated}
          />
          <MessageBox
            selectedUser={selectedUser}
            users={users}
            setUsers={setUsers}
            setSelectedUser={setSelectedUser}
            selectedUserUpdated={selectedUserUpdated}
            setSelectedUserUpdated={setSelectedUserUpdated}
          />
        </>
      ) : (
        <Navigate to={"/"} />
      )}
    </div>
  );
}

export default ChatHome;
