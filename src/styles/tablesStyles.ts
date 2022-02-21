import styled from 'styled-components'

export const TableContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100rem;
    justify-content: flex-start;
    background: white;
    align-items: center;
    margin-top: 1rem;
    width: 100%;
    border-radius: 0.5rem;
    .header-table-actions{
        width: 90%;
        height: 5rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        
    }
    .btn-new{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        border: none;
        border-radius: 0.15rem;
        
        min-width: 6rem;
        max-width:12rem;
        height: 2rem;

        color: white;
        font-weight: bold;
        font-size: 1rem;

        background-color: #4394e0;

        strong{
            margin-left: 0.2rem;
        }
    }
    .search-input{
        width: 20rem;
        height: 2rem;
        border-width: 0;
        border-bottom: 1px solid #CDD2D7;
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
      width: 90%;
      
      border: 1px solid #CDD2D7;
    }
  
    td,
    th {
      text-align: center;
      padding: 0.25rem;
    }
    
    tr{ 
      background: #ebeced;
        transition: background 0.15s;
      &:hover{
        background: #c6c6c6;
      }
      border-bottom: 1px solid #CDD2D7;
      max-height: 2rem;
    }

    th {
      background-color: #4394e0;
      color: white;
      font-size: 0.90rem;
    }
    .pagination{
      border: 1px solid #CDD2D7;
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