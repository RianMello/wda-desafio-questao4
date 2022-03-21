import styled from 'styled-components'


export const DeleteContainer = styled.div`
     display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    width: 100%;
    font-family:'Poppins', sans-serif;
    h2{
        text-align: left;
        margin: 1rem;
        color: #6b6b6b;
    }
    .btn-noDelete{
        width: 100%;
        height: 4rem;
        max-width: 10rem;

        border: none;
        border-radius: 0.4rem;

        font-size: 1.5rem;
        font-weight: bold;
        color: #4fe39c;

        transition: background 0.2s;

        background: transparent;
        border: 2px solid #4fe39c;

        &:hover{
            background: #4fe39c;
            color: white;
        }
    }
    .btn-Delete{
        width: 100%;
        height: 4rem;
        max-width: 10rem;

        border: none;
        border-radius: 0.4rem;

        font-size: 1.5rem;
        font-weight: bold;
        color: #e34f4f;

        transition: background 0.2s;
        background: transparent;
        border: 2px solid #e34f4f;

        &:hover{
            background: #e34f4f;
            color: white;
        }
        
    }
    .buttons-container{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 100%;
    }
`

export const InpedimentDelete = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .impediment{
        text-align: justify;
        font-size: 1.4rem;
        color: #a3a3a3;
        margin-top: 1rem;
    }

`