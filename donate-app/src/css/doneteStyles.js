import styled from "styled-components";
import { Color } from "./GlobalStyles";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

export const SearchDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100vh;
  width: 100%;
  padding-top: 50px;
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  h1 {
    color: ${Color.paragrafo};
    font-size: 2.5rem;
  }
  @media (min-width: 300px) and (max-width: 768px) {
    h2 {
      font-size: 1.2rem;
      padding: 10px;
    }
  }
`;

export const DivInput = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  @media (min-width: 300px) and (max-width: 768px){
    Input{
      width: 50vw;
      height: 40px;
      font-size: 1rem;
    }
  }
`;

export const P = styled.p`
  color: white;
  font-size: 1.2rem;
  font-weight: 700;
  text-align: center;
  @media (min-width: 300px) and (max-width: 768px) {
    width: 80vw;
    font-size: 0.8rem;
    color: ${Color.paragrafo};
    strong{
      display:none;
    }
  }
`;

export const H1 = styled.h1`
  color: ${Color.paragrafo};
  font-size: 1.6rem;
  margin-bottom: 10px;
  @media (min-width: 300px) and (max-width: 768px) {
    font-size: 0.9;
    padding: 5px;
  }
`;

export const Input = styled.input`
  height: 40px;
  width: 300px;
  margin: 5px;
  background-color: rgba(156, 197, 161, 0.4);
  color: ${Color.paragrafo};
  font-size: 1.3rem;
  font-weight: 700;
  border: none;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: rgba(181, 147, 0, 0.5);
  }
`;
export const Span = styled.span`
  padding-top: 50px;
  @media (min-width: 300px) and (max-width: 768px) {
    padding-top: 5px;
  }
`;

export const Container2 = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  @media (min-width: 300px) and (max-width: 768px) {
    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 90vw;
      height: auto;
      align-items: center;
      iframe {
        width: 100vw;
        height: auto;
      }
    }

    h1 {
      font-size: 1rem;
      text-align: center;
      flex-wrap: wrap;
    }
  }
`;

export const BtnReturn = styled.div`
  height: 40px;
  width: 300px;
  margin: 5px;
  background-color: rgba(156, 197, 161, 0.4);
  color: ${Color.paragrafo};
  font-size: 1.3rem;
  font-weight: 700;
  border: none;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: rgba(181, 147, 0, 0.5);
  }
  @mwedia (min-width: 300px) and (max-width: 768px) {
    width: 90vw;
    height: 40px;
    font-size: 1rem;
  }
`;
