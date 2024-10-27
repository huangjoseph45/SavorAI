import { faTrashAlt, faTrash } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const DeleteButton = ({ onClick }) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <button
      className="clear-button"
      onClick={onClick}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <img
        src={
          isHover ? "public/trashcan-open.png" : "public/trashcan-closed.png"
        }
        alt="clear button"
        style={{ height: "100%", margin: "0" }}
      />
    </button>
  );
};

export default DeleteButton;
