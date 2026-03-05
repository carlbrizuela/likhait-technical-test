import React, { useEffect, useState } from "react";

interface CustomAlertProps {
  message: string;
  variant?: "success" | "error" | "info";
  duration?: number; // in milliseconds
  onClose?: () => void;
}

const CustomAlert: React.FC<CustomAlertProps> = ({
  message,
  variant,
  duration,
  onClose,
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  const backgroundColor =
    variant === "success"
      ? "#d4edda"
      : variant === "error"
      ? "#f8d7da"
      : "#cce5ff";
  const textColor =
    variant === "success"
      ? "#155724"
      : variant === "error"
      ? "#721c24"
      : "#004085";

  return (
    <div
      style={{
        position: "fixed",
        top: "10px",
        left: "50%",
        minWidth: "250px",
        padding: "1rem 1.5rem",
        borderRadius: "8px",
        backgroundColor,
        color: textColor,
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        zIndex: 9999,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.5s ease",
      }}
    >
      {message}
    </div>
  );
};

export default CustomAlert;