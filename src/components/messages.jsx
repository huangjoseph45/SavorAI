import { useState } from "react";

const insertLineBreakBeforeInstructions = (input) => {
  return input
    .replace(/\*\*Instructions/g, "<br><br>**Instructions") // Add line break before "**Instructions"
    .replace(/(?=\d+\.)|-/g, "<br>$&"); // Handle dashes and numbered lists
};

const Messages = ({ messageQueries, endRef }) => {
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

  return <ul className="message-list">{messages}</ul>;
};

export default Messages;
