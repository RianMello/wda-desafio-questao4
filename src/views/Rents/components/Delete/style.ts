import styled from 'styled-components'


export const DeleteContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    width: 100%;
    font-family:'Poppins', sans-serif;
    h1{
        text-align: left;
        margin: 0.5rem;
    }
    h2{
        text-align: left;
        margin: 0.5rem;
    }
    .btn-noDelete{
        width: 100%;
        height: 4rem;
        max-width: 10rem;

        border: none;
        border-radius: 0.4rem;
        margin: 0.5rem;

        font-size: 1.3rem;
        font-weight: bold;
        color: white;

        background: #f0bbbb;
        text-shadow: 0 0 2px #4d0101;
    }
    .btn-Delete{
        width: 100%;
        height: 4rem;
        max-width: 10rem;

        border: none;
        border-radius: 0.4rem;
        margin: 0.5rem;

        font-size: 1.3rem;
        font-weight: bold;
        color: white;

        background: #afe3ca;
        text-shadow: 0 0 2px #024d28;
        
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