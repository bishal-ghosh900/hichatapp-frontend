import React from "react";

function MessageDiv({ message }) {
  return (
    <div
      className="message-div"
      style={
        message.fromSelf
          ? {
              textAlign: "right",
              marginRight: 0,
              marginLeft: "auto",
              borderRadius: "30px 0px 30px 30px",
            }
          : {
              textAlign: "left",
              marginLeft: 0,
              marginRight: "auto",
              borderRadius: "0px 30px 30px 30px",
            }
      }
    >
      {message.content}
    </div>
  );
}

export default MessageDiv;
