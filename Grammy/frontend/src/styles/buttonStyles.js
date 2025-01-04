"use client";
import styled from "styled-components";

export const StyledButton = styled.button`
  background: linear-gradient(to right, #00f5a0, #00d9f5); /* Gradiente no fundo */
  border: none; /* Remove as bordas padrão */
  border-radius: 30px; /* Bordas arredondadas */
  color: #000; /* Cor do texto */
  font-family: 'Sansita Swashed', cursive; /* Fonte personalizada */
  font-size: 1.2em; /* Tamanho do texto */
  padding: 10px 20px; /* Espaçamento interno */
  cursor: pointer; /* Mostra o cursor de ponteiro */
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25); /* Sombra */
  transition: all 0.3s ease-in-out; /* Transição suave ao passar o mouse */

  &:hover {
    transform: scale(1.05); /* Aumenta levemente o botão */
    box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.35); /* Intensifica a sombra */
  }

  &:active {
    transform: scale(0.95); /* Reduz levemente ao clicar */
  }
`;