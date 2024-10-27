import React from "react";
import Messages from "./messages";

const MainWindow = ({ messageQueries, endRef, isLoading }) => {
  console.log(messageQueries);
  window.scrollTo(0, document.body.scrollHeight);
  let latestMessage;
  if (
    messageQueries != "undefined" &&
    messageQueries != null &&
    messageQueries.length > 0
  ) {
    latestMessage = messageQueries[messageQueries.length - 1].data;
  } else {
    latestMessage = "";
  }
  return (
    <div className="main-window">
      <Messages
        messageQueries={messageQueries}
        endRef={endRef}
        isLoading={isLoading}
      />
    </div>
  );
};

export default MainWindow;
