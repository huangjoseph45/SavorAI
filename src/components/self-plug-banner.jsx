import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

const PromotionalBanner = () => {
  const [clicked, setClicked] = useState(false);
  return (
    <div className={`banner ${clicked && "expand"}`}>
      <div className="banner-body">
        <a
          href="https://www.linkedin.com/in/joseph-huang-7b40002a8/"
          target="_blank"
        >
          <img
            src="public/linkedin.webp"
            alt=""
            className="linkedin corpIcon"
          />
        </a>
        <a href="https://github.com/huangjoseph45" target="_blank">
          <img src="public/github.png" alt="" className="github corpIcon" />
        </a>
      </div>
      <div className="banner-head" onClick={() => setClicked(!clicked)}>
        <div
          className={`pointer ${clicked && "switch"}`}
          style={{
            width: 0,
            height: 0,
            borderLeft: "10px solid transparent",
            borderRight: "10px solid transparent",
            borderBottom: "8px solid #000",
          }}
        />
      </div>
    </div>
  );
};

export default PromotionalBanner;
