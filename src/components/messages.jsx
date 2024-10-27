import { useState } from "react";

const insertLineBreakBeforeInstructions = (input) => {
  return input
    .replace(/\*\*(Ingredients|Instructions)/g, "<br><br>**$1") // Add line break before "**Instructions" or "**Ingredients"
    .replace(/(?=\d+\.)/g, "<br>$&") // Add line break before numbered lists
    .replace(/(?<!\w)-/g, "<br>-"); // Add line break before standalone dashes, avoid breaking hyphenated words
};
const Messages = ({ messageQueries, endRef, isLoading }) => {
  console.log("Message Queries");
  console.log(messageQueries);

  const messages = messageQueries.map((message, index) => {
    if (message.role !== "system") {
      const formattedContent = insertLineBreakBeforeInstructions(
        message.content
      );

      return (
        <>
          <li
            key={index}
            className={`message ${
              message.role === "user" ? "user" : "gpt-response"
            }`}
            dangerouslySetInnerHTML={{ __html: formattedContent }}
          ></li>
          <div ref={endRef}></div>
        </>
      );
    }
    return null;
  });

  return (
    <ul className="message-list">
      {messages}
      {isLoading && (
        <li key="loading" className="message gpt-response">
          <div className="dots-container">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        </li>
      )}
    </ul>
  );
};

export default Messages;
