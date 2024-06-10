import React from "react";
import { useNavigate } from "react-router-dom";
import "./popUp.css"

interface PopUpProps {
  message: string;
  onClose: () => void;
}

export const PopUp: React.FC<PopUpProps> = ({ message, onClose }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    onClose();
    navigate("/");
  };

  return (
    <div className="popup">
      <div>{message}</div>
      <button onClick={handleClose}>Close</button>
    </div>
  );
};
