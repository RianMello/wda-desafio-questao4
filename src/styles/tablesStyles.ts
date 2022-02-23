import styled from 'styled-components'

export const TableContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 10rem;
    height: 100%;
    justify-content: space-between;
    background: white;
    align-items: center;
    margin-top: 1rem;
    width: 100%;
    border-radius: 0.5rem;
    box-shadow: 1px 3px 5px #ababab;
    .table-head{
      height: 4rem;
    }
    .header-table-actions{
        width: 90%;
        height: 5rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin-top: 1rem;
    }
    .btn-new{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        border: none;
        border-radius: 0.5rem;
        
        min-width: 6rem;
        max-width:12rem;
        height: 3rem;
        padding: 0.5rem;

        color: white;
        font-weight: bold;
        font-size: 1rem;

        background-color: #4394e0;

        strong{
            margin-left: 0.2rem;
        }
    }
    .search-input{
        width: 25rem;
        height: 2rem;
        border-width: 0;
        border-bottom: 1px solid #CDD2D7;
        :hover{
          border-bottom: 1px solid  #00d5ff;
          ::placeholder{
            color: #00d5ff;
          }
        }
        border-radius: 0.15rem;
        padding: 0.5rem;
        margin-right: 2rem;
        background: transparent;
    }
`

export const TableStyle = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    table {
      font-family: Poppins, sans-serif;;
      font-size: 0.875rem;
      border-collapse: collapse;
      max-width: 90%;
      min-width: 50%;
      margin-bottom: 2rem;
      
      border: 1px solid #CDD2D7;
    }
  
    td,
    th {
      text-align: center;
      padding: 0.25rem;
    }
    tr{ 
      background: #fafafa;
      transition: filter 0.15s;
      border-bottom: 1px solid #CDD2D7;
      max-height: 2rem;
    }
    tbody{
      tr{
        transition: filter 0.15s;
        &:hover{
          filter: brightness(0.9) ;
        }
      }
    }

    th {
      background-color: #4394e0;
      color: white;
      font-size: 1rem;
      border: 0.5px solid #CDD2D7;
      min-width: 5rem;
      transition: filter 0.15s;
      &:hover{
        filter: brightness(0.9) ;
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
    }
    .btn-delete{
        border-radius: 1.5rem;
        border: none;
        background-color: #fefcff;
        width: 2.5rem;
        height: 2.5rem;
        margin: 0.25rem;
        align-items: center;
    }
  );
`