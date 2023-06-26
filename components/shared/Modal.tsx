import { Button } from "@mui/material";
import React from "react";

interface ModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const Modal: React.FC<ModalProps> = ({ message, onConfirm, onCancel }) => {
  return (
    <div
      className="overlay fixed top-0 left-0 w-full h-full bg-black opacity-50 z-50 flex justify-center items-center"
      onClick={(e) => {
        onCancel();
      }}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="modal bg-white rounded-lg w-1/6 p-4 pt-8 text-center shadow-lg flex flex-col items-center justify-center gap-4"
      >
        <p>{message}</p>
        <div className="flex gap-2">
          <Button onClick={onConfirm}>확인</Button>
          <Button onClick={onCancel} color="error">
            취소
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
