import { cn } from "@/lib/utils";
import React from "react";

const Modal = ({ isOpen, onClose, children, className }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black opacity-75"
        onClick={onClose}
      ></div>
      <div
        className={cn(
          "relative z-10 flex items-center justify-between rounded-lg bg-white",
          className,
        )}
      >
        <button
          className="absolute right-2 top-2 text-black focus:outline-none "
          onClick={onClose}
        >
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 10l4.647-4.646a.5.5 0 00-.708-.708L12 9.293 7.354 4.646a.5.5 0 00-.708.708L11.293 10l-4.647 4.646a.5.5 0 00.708.708L12 10.707l4.646 4.647a.5.5 0 00.708-.708L12.707 10z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div className="scrollbar-hide flex w-full flex-col justify-center overflow-scroll">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
