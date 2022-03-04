import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    :root {
        --background: #f0f2f5;
        --letter: #000000;
        --details: #4394e0;
    }
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    #root{
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
        max-width: 100rem;
        min-width: 70rem;
    }

    html{ 
        @media (min-width: 1080px) {
            font-size: 93.75%;
        }
        @media (max-width: 720px) {
            font-size: 87.5%;
        }
    }

    body {
        display: flex;
        -webkit-font-smoothing: antialiased;
        justify-content: center;
        background: #f5f9ff;
    }

    body, input, button, textarea {
        font-family: 'Poppins', sans-serif;
        font-weight: 400;
    }

    h1 , h2, h3, h4, h5, h6, strong {
        font-weight: 600;
    }

    button{ 
        cursor: pointer;
    }
    [disabled]{
        opacity: 0.7;
        cursor: not-allowed;
    }

    .modal-overlay{
        display: flex;
        justify-content: center;
        align-items: center;

        background-color: rgba(0, 0, 0, 0.8);
        
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }
    .modal-content{;
        width: 100%;
        min-height: 15rem;
        max-height: 35rem;
        max-width: 30rem;
        background: white;
        padding: 2rem;
        position: relative;
        border-radius: 0.2rem;
    }
    .modalDelete-content{
        width: 100%;
        max-height: 20rem;
        min-height: 15rem;
        max-width: 30rem;
        background:  white;
        padding: 2rem;
        position: relative;
        border-radius: 0.4rem;
    }
    .modalDelete-overlay{
        display: flex;
        justify-content: center;
        align-items: center;

        background-color: rgba(0, 0, 0, 0.8);

        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }
`