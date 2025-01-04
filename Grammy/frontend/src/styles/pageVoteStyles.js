"use client";
import styled, { css } from "styled-components";
import { Diplomata } from "next/font/google";

const diplomata = Diplomata({
  subsets: ["latin"],
  weight: "400",
});

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30px;
  min-height: 100vh; /* Faz o container ocupar 100% da altura da tela */
  width: 100%; /* Faz o container ocupar 100% da largura */
  background: linear-gradient(
    to right,
    rgb(215, 122, 80),
    rgb(97, 186, 190)
  ); /* Gradiente da esquerda para a direita */

  /* Responsividade */
  @media (max-width: 768px) {
    padding-top: 20px;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  //align-items: center;
  width: 100%;
  max-width: 80%; /* Limita a largura do container */
  padding-top: 20px;
`;

export const TopHearder = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 20px;
  height: 60px;
  color: white;
  background-color: rgb(29, 29, 42);

  /* Responsividade */
  @media (max-width: 768px) {
    flex-direction: column; /* Empilha os itens verticalmente */
    height: auto; /* Permite altura variável */
    padding: 10px 10px;
  }
`;

export const H1 = styled.h1`
  font-family: ${diplomata.style.fontFamily}; /* Fonte do Next.js */
  font-size: 2rem;
  font-weight: 400;

  /* Responsividade */
  @media (max-width: 768px) {
    font-size: 1.5rem; /* Reduz o tamanho do texto */
    text-align: center; /* Centraliza o texto */
  }
`;

export const Nav = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0 20px;
  justify-content: space-between;
  width: 30%;
  align-items: center;

  img {
    width: 100px;
    height: auto;
    margin: 0 10px;

    /* Responsividade */
    @media (max-width: 768px) {
      width: 80px; /* Reduz a largura da imagem */
      margin: 5px;
    }
  }

  p {
    font-family: "Sansita Swashed", cursive;
    font-weight: bolder;
    font-size: 1.2rem;

    /* Responsividade */
    @media (max-width: 768px) {
      display: none; /* Oculta o texto */
    }
  }

  /* Responsividade do Nav */
  @media (max-width: 768px) {
    flex-direction: column; /* Empilha os itens verticalmente */
    width: 100%; /* Expande para 100% da largura */
    align-items: center;
  }
`;

export const DivTitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 80%;
  h2 {
    font-family: ${diplomata.style.fontFamily}; /* Fonte do Next.js */
    font-size: 2.8rem;
    font-weight: 400;
    color: white;

    @media (max-width: 768px) {
      font-size: 1.5rem; /* Reduz o tamanho do texto */
    }

    @media (min-width: 764px) and (max-width: 1024px) {
      font-size: 2rem; /* Ajusta o tamanho do texto para tablets */
    }
  }
`;

export const P_end = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  width: 100%;
  max-width: 80%;
  margin: 0px;
  p {
    font-family: "Sansita Swashed", cursive;
    font-weight: bolder;
    color: white;
    font-size: 3rem;

    @media (max-width: 768px) {
      display: none; /* Oculta o texto */
    }

    @media (min-width: 764px) and (max-width: 1024px) {
      display: none; /* Oculta o texto */
    }
  }
`;

export const P = styled.p`
  font-family: "Sansita Swashed", cursive;
  font-weight: bolder;
  color: white;
  font-size: 2rem;
  padding: 50px 120px;

  @media (max-width: 768px) {
    width: 100%;
    font-size: 1.3rem; /* Reduz o tamanho do texto */
    padding: 80px 10px;
  }
`;

export const DivCard = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-wrap: wrap; /* Permite quebrar linhas se os itens não couberem */
  gap: 20px; /* Espaçamento entre os cards */
`;


export const DivGraphical = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center; /* Espaça os itens igualmente */
  align-items: center;
  width: 100%;
  border-radius: 30px;

  div {
    text-align: center;
    padding: 10px;
    font-family: "Sansita Swashed", cursive;
    font-size: 1.2rem;
    font-weight: bold;
    color: white;
    width: 260px;
    margin: 8px;
    border-radius: 30px;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 2px solid transparent;

    /* Define cores específicas para cada div */
    &:nth-child(1) {
      background-color: #ff6f61; /* Vermelho para Taylor Swift */
    }
    &:nth-child(2) {
      background-color: #6fcb9f; /* Verde para Ed Sheeran */
    }
    &:nth-child(3) {
      background-color: #6a85c1; /* Azul para Benson Boone */
    }

    /* Adiciona efeito de borda brilhante quando a classe 'active' é aplicada */
    &.active {
      border: 2px solid white; /* Borda branca */
      box-shadow: 0 0 10px 5px rgba(255, 255, 255, 0.6); /* Efeito brilhante */
    }
  }

  /* Responsividade */
  @media (max-width: 768px) {
    flex-direction: column; /* Empilha as divs verticalmente em telas menores */
    height: auto;
    div {
      font-size: 1rem; /* Reduz o tamanho do texto */
      padding: 5px;
    }
  }
`;

export const DivMsg = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
width: 100%;
height: 80px;
p{
  color: white;
  font-size: 2rem;
}
`;
