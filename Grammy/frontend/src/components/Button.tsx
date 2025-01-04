"use client";
import React from "react";
import { StyledButton } from "../styles/buttonStyles"; // Importa o estilo do botão

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

export default function Button({ children, onClick }: ButtonProps) {
  return (
    <StyledButton onClick={onClick}>
      {children}
    </StyledButton>
  );
}
