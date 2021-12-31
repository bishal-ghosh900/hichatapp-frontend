import React, { useEffect } from "react";

function User({
  users,
  user,
  setSelectedUser,
  setSelectedUserUpdated,
  setUsers,
}) {
  let handleSelection = (e) => {
    if (!user.self) {
      for (let elem of e.target.parentElement.children) {
        elem.style.backgroundColor = "white";
        elem.style.color = "#282c34";
      }
      e.target.style.backgroundColor = "#282c34";
      e.target.style.color = "white";
      setSelectedUser({ ...user });
      setSelectedUserUpdated(true);
    }
    const tempUser = users.find((u) => u.userId === user.userId);
    const allUser = [...users];

    if (!!tempUser) {
      tempUser.incomingMessages = 0;
      const index = users.indexOf(tempUser);
      allUser[index] = tempUser;
      setUsers([...allUser]);
    }
  };

  return (
    <div className="user" onClick={(e) => handleSelection(e)}>
      {user.username.length <= 10
        ? user.username
        : user.username.slice(0, 11) + "..."}{" "}
      {user.self && <span className="span">yourself</span>}{" "}
      {!!user.incomingMessages && (
        <span className="span">{user.incomingMessages}</span>
      )}
    </div>
  );
}

export default User;
