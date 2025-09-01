"use client";

import React from "react";

interface MyButtonProps {
  label: string;
  onClick?: () => void;
}

const MyButton: React.FC<MyButtonProps> = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary"
    >
      {label}
    </button>
  );
};

export default MyButton;
