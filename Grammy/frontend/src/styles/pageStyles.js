"use client";
import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh; /* Faz com que o container ocupe 100% da altura da tela */
  width: 100%; /* Faz com que o container ocupe 100% da largura da tela */
  background-image: url("/images/BG_Home.webp"); /* Caminho da imagem */
  background-size: cover; /* Faz com que a imagem cubra todo o container */
  background-position: center; /* Centraliza a imagem no container */
  background-repeat: no-repeat; /* Evita que a imagem se repita */
  position: relative; /* Define o container como relativo */
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  //justify-content: center;
  background: linear-gradient(
    to right,
    /* Direção do gradiente: da esquerda para a direita */ rgba(29, 46, 52, 0.7),
    /* Cor inicial com transparência */ rgba(127, 80, 112, 0.7)
      /* Cor final com transparência */
  );
  border-radius: 20px; /* Bordas arredondadas */
  padding: 20px; /* Espaço interno */
  width: 90%; /* Largura relativa à tela (ajustável) */
  max-width: 500px; /* Largura máxima para manter proporções */
  height: auto;
  aspect-ratio: 9 / 16; /* Proporção semelhante a um cartão vertical */
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3); /* Adiciona sombra */
  z-index: 2; /* Garante que o conteúdo fique acima do fundo */
`;
export const Title = styled.h1`
  font-size: 2.5em; /* Tamanho do texto */
  color: white; /* Define a cor do texto */
  text-align: center;
  margin-bottom: 10px;
  font-family: "Sansita Swashed", cursive;
`;

export const Img = styled.img`
  width: 100%;
  height: auto;
  max-width: 400px;
  padding-bottom: 10px;
  margin-top: -50px;
`;

export const ImgMeta = styled.img`
  width: 100%;
  height: auto;
  max-width: 200px;
  padding-bottom: 10px;
`;

export const H2 = styled.p`
    font-size: 1.5em;
    color: white;
    text-align: center;
    margin-bottom: 10px;
    font-family: "Roboto", sans-serif;

`;

export const P = styled.p`
    font-size: 1.2em;
    color: white;
    text-align: center;
    margin-bottom: 10px;
    font-family: "Roboto", sans-serif;

`;

export const Message = styled.p`
    color: yellow;
    font-size: 1.2em;
    padding-top: 5px;
`;