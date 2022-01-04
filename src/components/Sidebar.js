import React from "react";
import User from "./User";

function Sidebar({
  users,
  currentUser,
  setUsers,
  setCurrentUser,
  setSelectedUser,
  setSelectedUserUpdated,
}) {
  return (
    <div className="sidebar">
      {users.map((user) => (
        <User
          key={user.userId}
          users={users}
          user={user}
          setSelectedUser={setSelectedUser}
          setSelectedUserUpdated={setSelectedUserUpdated}
          setUsers={setUsers}
        />
      ))}
    </div>
  );
}

export default Sidebar;
