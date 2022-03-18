import styled from "styled-components";

type TableStyleProps = {
  asc: boolean;
  desc: boolean;
}

export const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  background: white;
  align-items: center;
  margin-top: 1rem;
  width: 100%;
  border-radius: 0.5rem;
  box-shadow: 1px 3px 5px #ababab;

  
  .table-head {
    height: 4rem;
    width: 100%;

    svg{
      width: 1rem;
      height: 1rem;
    }
  }
  .header-table-actions {
    width: 100%;
    height: 5rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .btn-new {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;

    border: none;
    border-radius: 0.5rem;

    background: transparent;

    width: 100%;
    min-width: 6rem;
    max-width: 8rem;
    height: 3rem;
    margin: 0.5rem;

    color: white;
    font-weight: bold;
    font-size: 1.2rem;

    background-color: #4fe39c;
    .add_icon{
      width: 1.5rem;
      height: 1.5rem;
    }
  }
  .search-input {
    width: 100%;
    min-width: 15rem;
    max-width: 30rem;
    color: white;
    ::placeholder{
      color: white;
    }
    height: 3rem;
    border-width: 0;
    border: 1px solid #cdd2d7;
    :hover {
      border-bottom: 1px solid #00d5ff;
      ::placeholder {
        color: #00d5ff;
      }
    }
    border-radius: 0.15rem;
    padding: 0.5rem;
    margin: 0.5rem;
    background: #589ee0;
  }
`;

export const TableStyle = styled.div<TableStyleProps>`
    width: 90%;
    max-width: 1080px;
    table {
      font-family: Poppins, sans-serif;;
      font-size: 1rem;
      border-collapse: separate;
      border-spacing: 0;
      margin-bottom: 2rem;
      width: 100%;
      margin-top: 2rem;
    }
    tr{ 
      background: #fafafa;
      transition: filter 0.15s;
      border-bottom: 1px solid #CDD2D7;
      width: 100%;
      height: 2rem;
      .search-tr{
        background: transparent;
        height: 4rem;
      }
      
      td{
        min-width: calc(100% / 7);
        max-width: calc(100% / 4);
        width: 100%;
        height: 2rem;
        padding: 0.5rem;
      }
    }
    tbody{
      tr{
        transition: filter 0.15s;
        width: 100%;
        height: 2rem;
        &:hover{
          filter: brightness(0.9) ;
        }
        td{
          min-width: calc(100% / 7);
          max-width: calc(100% / 4);
          width: 100%;
          text-align: center;
          height: 2rem;
          font-size: 1.25rem;
        }
      }
    }
    .table-title{
      display: flex;
      justify-content: center;
      font-size: 1.4rem;
      margin-top: 2rem;
      max-width: 1080px;
    }

    th {
      background-color: #4394e0;
      color: white;
      font-size: 1.25rem;
      border: 0.5px solid #CDD2D7; 
      transition: filter 0.15s;
      width: 100%;
      min-width: calc(100% / 8);
      max-width: calc(100% / 4);
      .sorted{
        visibility: visible;
        }
      .notSorted{
        visibility: hidden;
      }
      .sortIndicator{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 3rem;
        width: 100%;
        margin: 0;
      }
      label{
        max-width:2rem;
        min-width:1rem;
        text-align: center;
      }
      span{
        max-width: 2rem;
        min-width: 1rem;
        visibility: ${props => props.asc === true || props.desc === true ? 'visible' : 'hidden'};
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
    .actions{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      height:3rem;
      max-width: 100%;
    }
    .btn-edit{
        border: none;
        background: transparent;
        width: 50%;
        height: 100%;
        align-items: center;
        color: #8ac5ff;

        svg{
          width: 80%;
          height: 80%;
          transition: transform 0.2s;
        }

        &:hover{
          svg{
            transform: scale(1.5);
          };
        }
    }
    .btn-delete{
        border: none;
        background: transparent;
        width: 50%;
        height: 100%;
        align-items: center;
        color: #fc6056;

        svg{
          width: 80%;
          height: 80%;
          transition: transform 0.2s;
        }

        &:hover{
          svg{
            transform: scale(1.5);
          };
        }
    }
`;
