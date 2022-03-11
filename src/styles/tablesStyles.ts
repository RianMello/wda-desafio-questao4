import styled from "styled-components";

type TableStyleProps = {
  asc: boolean;
  desc: boolean;
}

export const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 10rem;
  height: 100%;
  justify-content: space-between;
  background: white;
  align-items: center;
  margin-top: 1rem;
  max-width: 100%;
  width: 100%;
  border-radius: 0.5rem;
  box-shadow: 1px 3px 5px #ababab;
  .table-head {
    height: 4rem;
    @media (max-width: 420px) {
      height: 2.5rem;
    }
  }
  .header-table-actions {
    width: 90%;
    height: 5rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 1rem;
    @media (max-width: 420px) {
      width: 90%;
    }
  }
  .btn-new {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    border: none;
    border-radius: 0.5rem;

    min-width: 6rem;
    max-width: 12rem;
    height: 3rem;
    padding: 0.5rem;

    color: white;
    font-weight: bold;
    font-size: 1rem;

    background-color: #bce8c3;

    strong {
      margin-left: 0.2rem;
    }

    @media (max-width: 420px) {
      max-width: 6rem;
      min-width: 3rem;
      font-size: 0.8rem;
      .add_icon{
        width: 1.5rem;
        height: 1.5rem;
      }
    }
  }
  .search-input {
    width: 25rem;
    height: 2rem;
    border-width: 0;
    border-bottom: 1px solid #cdd2d7;
    :hover {
      border-bottom: 1px solid #00d5ff;
      ::placeholder {
        color: #00d5ff;
      }
    }
    border-radius: 0.15rem;
    padding: 0.5rem;
    margin-right: 2rem;
    background: transparent;

    @media (max-width: 420px) {
      max-width: 20rem;
    }
  }
`;

export const TableStyle = styled.div<TableStyleProps>`
    width: 100%;
    display: flex;
    justify-content: center;
    max-width: 90%;
    table {
      font-family: Poppins, sans-serif;;
      font-size: 1rem;
      border-collapse: collapse;
      @media (max-width: 460px){
        font-size: 0.8rem;
        td{
          max-width: 4rem;
          min-width: 2rem;
        }
        thead{
          th{
            font-size: 0.8rem;
            max-width: 4rem;
            min-width: 2rem;
          }
          tr{
            max-height: 1rem;
          }
        }
        .pagination{
          max-height: 2rem;
        }
      }
      margin-bottom: 2rem;
    }
  
    td,
    th {
      text-align: center;
      padding: 0.25rem;
      width: 100%;
      max-width: 20rem;
      min-width: 2rem;
    }
    tr{ 
      background: #fafafa;
      transition: filter 0.15s;
      border-bottom: 1px solid #CDD2D7;
     
    }
    tbody{
      tr{
        transition: filter 0.15s;
      }
        &:hover{
          filter: brightness(0.9) ;
        }
      }
    }
    th {
      background-color: #4394e0;
      color: white;
      font-size: 1.25rem;
      border: 0.5px solid #CDD2D7;
      max-width: 20rem;    
      transition: filter 0.15s;
      .flip{
        transform: scaleX(-1);
      }
      .sorted{
        visibility: visible;
        }
      .notSorted{
        visibility: hidden;
      }
      .sortIndicator{
        display: grid;
        grid-template-columns: 3fr 1fr  ;
      }
      img{
        width:1rem;
        height:1rem;
        margin: 0.5rem;

      }
      span{
        width:2rem;
        height:1rem;
        visibility: ${props => props.asc === true || props.desc === true ? 'visible' : 'hidden'};
        color: #CDD2D7;
        font-size: 0.7rem;
        
      }

      &:hover{
        filter: brightness(0.9);
        img{
         visibility: visible;
        }
        span{
          visibility: visible;
        }
      }

    }
    .loading{
      height: 5rem;
      font-size: 1.5rem;
      text-align: start;
      .gif{
        width: 2rem;
        height: 2rem;
      }
    }
    .pagination{
      border: 1px solid #CDD2D7;
      background-color: #4394e0;
      color: #ffefeb;
    }
    .btn-edit{
        border-radius: 1.5rem;
        border: none;
        background-color: #fefcff;
        width: 2.5rem;
        height: 2.5rem;
        margin: 0.25rem;
        align-items: center;
        color: #8ac5ff;
        @media (max-width: 420px) {
          width: 1rem;
          height: 1rem;
        }
    }
    .btn-delete{
        border-radius: 1.5rem;
        border: none;
        background-color: #fefcff;
        width: 2.5rem;
        height: 2.5rem;
        margin: 0.25rem;
        align-items: center;
        color: #fa938c;
        @media (max-width: 420px) {
          width: 1rem;
          height: 1rem;
        }
    }
  );
`;
