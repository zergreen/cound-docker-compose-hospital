import React from "react";
import "./iconButton.css";

const IconButton = ({ icon, onClick, status }) => {
  return (
    <button className={`icon-button ${status}`} onClick={onClick}>
      {icon}
    </button>
  );
};

export default IconButton;
