import React, { useState } from "react";
import Messages from "./messages";

const MainWindow = ({ messageQueries, endRef, isLoading }) => {
  const [copyElements, setCopyElements] = useState([]);

  const copyToClipboard = (textToCopy) => {
    // Add a "Copied!" message to the state
    setCopyElements((prev) => [
      ...prev,
      <span key={Date.now()} className="copy-message">
        Copied!
      </span>,
    ]);
    setTimeout(() => {
      setCopyElements((prev) => prev.slice(1)); // Remove the first element
    }, 1000);

    // Copy the text to the clipboard
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          console.log("Text copied to clipboard:", textToCopy);
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
    } else {
      console.error("Clipboard API not supported");
    }
  };

  // Scroll to the bottom of the page
  window.scrollTo(0, document.body.scrollHeight);

  let latestMessage = "";
  if (messageQueries && messageQueries.length > 0) {
    latestMessage = messageQueries[messageQueries.length - 1].data;
  }

  return (
    <div className="main-window">
      {/* Render the copy elements */}
      <div className="copy-message-list">
        {copyElements.map((copyElement, index) => (
          <React.Fragment key={index}>{copyElement}</React.Fragment>
        ))}
      </div>

      {/* Render the Messages component */}
      <Messages
        messageQueries={messageQueries}
        endRef={endRef}
        isLoading={isLoading}
        onClick={copyToClipboard}
      />
    </div>
  );
};

export default MainWindow;
