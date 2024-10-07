import styled from "styled-components";
import { Color } from "../../GlobalStyles";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100vh;
  width: 100%;
`;

export const ContaineBtn = styled.div`
display: flex;
flex-direction:column;
align-items: center;
justify-content: space-between;
height: 100vh;
div{
  display: flex;
  flex-direction: row;
  align-items: center;
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
`;

export const Img = styled.img`
  width: 40px;
`;

export const Description = styled.div`
padding-top: 80px;
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
`;

export const Span = styled.span`
color: green;
text-decoration: underline;
`;

export const BtnDiv = styled.div`
padding-bottom: 250px;
`;