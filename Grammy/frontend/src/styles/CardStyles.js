import styled from "styled-components";

export const CardContainer = styled.div`
  width: 250px;
  height: 350px;
  border-radius: 20px;
  overflow: hidden; /* Garante que a imagem e os textos fiquem dentro do card */
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  position: relative; /* Torna o container uma referência para posicionamento absoluto */
  font-family: "Arial", sans-serif;
  color: white;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; /* Faz a imagem cobrir todo o card */
  position: absolute; /* Posiciona a imagem dentro do card */
  top: 0;
  left: 0;
`;

export const Title = styled.h2`
  position: absolute;
  bottom: 60px; /* Ajuste de acordo com a posição desejada */
  left: 10px;
  font-size: 1.5rem;
  font-weight: bold;
  text-shadow: 0px 2px 5px rgba(0, 0, 0, 0.7); /* Adiciona um contraste para o texto */
  color: yellow;
`;

export const Subtitle = styled.h3`
  position: absolute;
  bottom: 40px; /* Ajuste para manter alinhado */
  left: 10px;
  font-size: 1.2rem;
  opacity: 0.9;
  text-shadow: 0px 2px 5px rgba(0, 0, 0, 0.7); /* Adiciona um contraste para o texto */
  color: yellowgreen;
`;

export const Year = styled.span`
  position: absolute;
  bottom: 10px; /* Ajuste para posicionamento */
  left: 10px;
  font-size: 2rem;
  font-weight: bold;
  text-shadow: 0px 2px 5px rgba(0, 0, 0, 0.7); /* Contraste para visibilidade */
  color: yellowgreen;
`;

export const Icon = styled.img`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 50px;
  height: 50px;
`;
