import styled from "styled-components";

export const SelectContainer = styled.div`
  select {
    height: 3rem;
    padding: 0.5rem;
    border-width: 0;
    border-radius: 0.2rem;
    background: #edeff7;
    color: #6b6b6b;
    opacity: 0.5;
    font-family:'Poppins', sans-serif;
    font-size: 1.15rem;
    margin: 0.5rem;
    width: 65%;
    option{
      font-size: 1.15rem;
    }
    &:hover{
        border: 1px solid #4394e0;
    }
  }
  label {
    padding-left: 0.25rem;
    margin: 0.5rem;
  }
  .placeholder-select {
    font-size: 0.5rem;
    color: #fafafa;
  }
`;
