import styled from "styled-components";
import { Color } from "./GlobalStyles";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100vh;
  width: 100vw;
  @media (min-width: 300px) and (max-width: 768px){
    height: 100%;
  }
`;

export const ContaineBtn = styled.div`
display: flex;
flex-direction:column;
align-items: center;    width: 90vw;
height: auto;
div{
  display: flex;
  flex-direction: row;
  align-items: center;
}

@media (min-width: 300px) and (max-width: 768px){
  div{
    display: flex;
    flex-direction: column;
    align-items: center;
  }


}
`;

export const Button = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  
  background: linear-gradient(
    to bottom,
    rgba(156, 197, 161, .4),
    rgba(234, 243, 236, .3)
  );
  border: 2px solid ${Color.bordBtn1};
  cursor: pointer;
  font-weight: 700;
  color: ${Color.paragrafo};
  width: ${(props) =>
    props.size === "large"
      ? "550px"
      : "200px"}; /* Ajuste conforme necessário */
  height: 50px;
  border-radius: 5px;
  margin-left: 150px;
  margin-right: 150px;
  font-size: 1.3rem;

  &:hover {
    background: linear-gradient(
      to bottom,
      rgba(181, 147, 0, 0.5),
      /* Cor mais clara ou diferente no hover */ rgba(234, 243, 236, 1)
    );
  }
  margin: 5px;
  @media (min-width: 300px) and (max-width: 768px){
    width: 100%;
    margin-left: 10px;
    margin-right: 0px;

  }
`;

export const Img = styled.img`
  width: 40px !important;
`;

export const Description = styled.div`
padding-top: 10px;

`;

export const H1 = styled.h1`
  color: ${Color.title};
  font-size: 2.5rem;
`;  

export const P = styled.p`
  color: ${Color.paragrafo};
  font-size: 1.2rem;
  font-weight: 700;
  text-align: center;
  @media (min-width: 300px) and (max-width: 768px){
    font-size: 1rem;
  }
`;

export const Span = styled.span`
color: green;
text-decoration: underline;
@media (min-width: 300px) and (max-width: 768px){
    font-size: 12px;
  }
`;

export const BtnDiv = styled.div`
padding-bottom: 250px;
`;

export const DivCard = styled.div`
  display: flex;
  flex-wrap: wrap; /* Permite que os cards quebrem para a próxima linha */
  justify-content: center;
  gap: 20px;
  padding-top: 30px;
  
  /* Cada card ocupará 48% da largura do container para garantir 2 por linha */
  > div {
    width: 48%;
    max-width: 500px; /* Limita o tamanho máximo dos cards */
    margin-bottom: 20px;
  }

  @media (min-width: 300px) and (max-width: 768px) {
    > div {
      width: 100%; /* Cards ocupam 100% da largura em telas menores */
    }
  }
`;

export const H2 = styled.h2`
  color: ${Color.title};
  font-size: 2rem;
  text-align: center;
  margin-bottom: 10px;
  @media (min-width: 300px) and (max-width: 768px){
    font-size: 1.5rem;
  }
`;
