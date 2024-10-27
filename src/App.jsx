import { useEffect, useRef, useState } from "react";
import MainWindow from "./components/main-window";
import InputBar from "./components/input-bar";
import fetchAPIResponse from "./modules/language-model";

function App() {
  const [inputValue, setInputValue] = useState("");
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

  useEffect(() => {
    async function getAPIResponse() {
      if (checkSubmit && inputValue.trim().length > 0) {
        const message = inputValue;

        setInputValue("");

        setMessageQueries((prevMessages) => [
          ...prevMessages,
          { role: "user", content: message },
        ]);

        const apiResponse = await fetchAPIResponse(message, messageQueries);

        setMessageQueries((prevMessages) => [...prevMessages, apiResponse]);
      }

      setCheckSubmit(false);
    }

    getAPIResponse();
  }, [checkSubmit, inputValue]);

  useEffect(() => {
    scrollToBottom();
  }, [messageQueries]);

  return (
    <div className="wrapper">
      <div className="top-screen">
        <img
          src="public/Cooked_Chicken_JE2_BE2.webp"
          alt="Cooked Chicken"
          className="icon"
        />
        <h1>SavorAI</h1>
      </div>

      <MainWindow messageQueries={messageQueries} endRef={messagesEndRef} />
      <InputBar
        inputValue={inputValue}
        setInputValue={setInputValue}
        setCheckSubmit={setCheckSubmit}
      />
    </div>
  );
}

export default App;
