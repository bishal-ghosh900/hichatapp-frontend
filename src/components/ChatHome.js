import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import socket from "./Socket";
import MessageBox from "./MessageBox";
import Sidebar from "./Sidebar";

function ChatHome({ usernameSelected, setUsernameSelected }) {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [selectedUser, setSelectedUser] = useState({});
  const [selectedUserUpdated, setSelectedUserUpdated] = useState(false);

  const location = useLocation();

  useEffect(() => {
    let cu;
    let alluser = [];

    socket.removeAllListeners("user");
    socket.on("user", (users) => {
      users.forEach((user) => {
        if (user.userId === socket.id) {
          user.self = true;
          cu = user;
          setCurrentUser(user);
        } else {
          user.self = false;
        }
        user.messages = [];
      });
      alluser = [...users.filter((user) => user.userId !== socket.id)];
      alluser.unshift(cu);
      setUsers(alluser);
    });

    socket.removeAllListeners("user connected");
    socket.on("user connected", (user) => {
      user.messages = [];
      setUsers([...users, user]);
    });

    socket.removeAllListeners("user disconnected");
    socket.on("user disconnected", ({ userId }) => {
      const allUsers = [...users.filter((user) => user.userId !== userId)];
      setUsers([...allUsers]);
      if (selectedUser && selectedUser.userId === userId) {
        setSelectedUser({});
      }
    });

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
        if (from != selectedUser.userId) {
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

    socket.removeAllListeners("connect_error");
    socket.on("connect_error", (err) => {
      if (err.message === "Username is invalid") {
        setUsernameSelected(false);
      }
    });
  }, [users.length, selectedUser?.userId]);
  return (
    <div className="chathome">
      {location.state && location.state.username && usernameSelected ? (
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
