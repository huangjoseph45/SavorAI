import { useEffect, useRef, useState } from "react";
import MainWindow from "./components/main-window";
import InputBar from "./components/input-bar";
import DeleteButton from "./components/delete-button";
import PromotionalBanner from "./components/self-plug-banner";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [checkSubmit, setCheckSubmit] = useState(false);
  const [messageQueries, setMessageQueries] = useState([
    {
      role: "assistant",
      content:
        "Hi! I’m your AI recipe assistant, helping you create delicious meals effortlessly. Just tell me your ingredients or preferences, and I’ll suggest recipes with step by step instructions. Let’s cook something amazing!",
    },
  ]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const clear = () => {
    setCheckSubmit(false);
    setInputValue("");
    setMessageQueries([
      {
        role: "assistant",
        content:
          "Hi! I’m your AI recipe assistant, helping you create delicious meals effortlessly. Just tell me your ingredients or preferences, and I’ll suggest recipes with step by step instructions. Let’s cook something amazing!",
      },
    ]);
  };

  useEffect(() => {
    async function getAPIResponse() {
      if (checkSubmit && inputValue.trim().length > 0) {
        const message = inputValue;

        setInputValue("");

        setMessageQueries((prevMessages) => [
          ...prevMessages,
          { role: "user", content: message },
        ]);
        setIsLoading(true);

        try {
          const res = await fetch("http://localhost:5003/api/openai", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              message: message,
              messageList: messageQueries,
            }),
          });

          const data = await res.json();
          console.log(data);

          setMessageQueries((prevMessages) => [
            ...prevMessages,
            { role: "assistant", content: data.message }, // Assuming `data.message` is the response text
          ]);
        } catch (error) {
          console.error("Error fetching API response:", error);
          setMessageQueries((prevMessages) => [
            ...prevMessages,
            {
              role: "assistant",
              content: "Something went wrong. Please try again.",
            },
          ]);
        }

        setIsLoading(false);
      }

      setCheckSubmit(false);
    }

    getAPIResponse();
  }, [checkSubmit, inputValue, messageQueries]);

  useEffect(() => {
    scrollToBottom();
  }, [messageQueries]);

  return (
    <div className="wrapper">
      <div className="top-screen">
        <a
          href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="public/Melon_Slice_JE2_BE2.webp"
            alt="Cooked Chicken"
            className="icon"
          />
        </a>
        <h1>SavorAI</h1>
      </div>
      <MainWindow
        messageQueries={messageQueries}
        endRef={messagesEndRef}
        isLoading={isLoading}
      />
      <div className="input-wrapper">
        <DeleteButton onClick={clear} />
        <InputBar
          inputValue={inputValue}
          setInputValue={setInputValue}
          setCheckSubmit={setCheckSubmit}
        />
      </div>
      <PromotionalBanner />
    </div>
  );
}

export default App;
