import { useState } from "react";
import RecipeTemplate from "./recipe-template";

const Messages = ({ messageQueries, endRef, isLoading, onClick }) => {
  console.log("Message Queries");
  console.log(messageQueries);

  const messages = messageQueries.map((message, index) => {
    if (message.role !== "system") {
      const formattedContent = message.content;
      if (message.role === "user")
        return (
          <>
            <li
              key={index}
              className="message scale user"
              dangerouslySetInnerHTML={{ __html: formattedContent }}
              onClick={() => onClick(message.content)}
            ></li>
            <div ref={endRef}></div>
          </>
        );
      else if (
        !message.content.includes("**") ||
        message.content ===
          "Hi! I’m your AI recipe assistant, helping you create delicious meals effortlessly. Just tell me your ingredients or preferences, and I’ll suggest recipes with step by step instructions. Let’s cook something amazing!"
      )
        return (
          <li
            key={0}
            className="message gpt-response scale"
            onClick={() => onClick(message.content)}
            dangerouslySetInnerHTML={{ __html: message.content }}
          ></li>
        );
      else {
        return (
          <RecipeTemplate
            key={index}
            recipe={message}
            onClick={() => onClick(message.content)}
          />
        );
      }
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
