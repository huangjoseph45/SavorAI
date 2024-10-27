import React, { useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

const InputBar = ({ inputValue, setInputValue, setCheckSubmit }) => {
  const textAreaRef = useRef(null);

  useEffect(() => {
    const textArea = textAreaRef.current;

    const resizeTextArea = () => {
      textArea.style.height = "2rem"; // Reset the height
      if (textArea.scrollHeight < 200) {
        textArea.style.height = `${textArea.scrollHeight - 29}px`; // Set new height dynamically
      } else {
        textArea.style.height = "150px"; // Limit the height
      }
    };

    textArea.addEventListener("input", resizeTextArea);

    return () => {
      textArea.removeEventListener("input", resizeTextArea);
    };
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value); // Update the input value
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      // Check for "Enter" without shift
      e.preventDefault();
      setCheckSubmit(true);
    }
  };

  return (
    <div className="inputs">
      <textarea
        ref={textAreaRef}
        className="input-bar"
        rows="1"
        placeholder="Type here..."
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <button className="send-button" onClick={() => setCheckSubmit(true)}>
        <FontAwesomeIcon icon={faArrowUp} />
      </button>
    </div>
  );
};

export default InputBar;
