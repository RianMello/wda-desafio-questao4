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
        width: 100%;
        max-width: 100%;
    }

    html{
        @media (max-width: 1080px) {
            font-size: 95.75%;
        }
        @media (max-width: 810px) {
            font-size: 87.5%;
        }
        @media (max-width: 610px) {
            font-size: 75%;
        }
        @media (max-width: 410px){
            font-size: 62,5%
        }
    }

    body {
        -webkit-font-smoothing: antialiased;
        justify-content: center;
        background: #435166;
        width: 100%;
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
        max-height: 40rem;
        max-width: 40%;
        background: white;
        position: relative;
        border-radius: 0.5rem;

        .titleModal{
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-direction: row;
            height: 5rem;
            font-weight: bold;
            font-size: 2rem;
            text-align: center;
            padding-left: 2.5rem;
            padding-right: 1rem;
            span{
                cursor: pointer;
                svg{
                    width: 2rem;
                    height: 2rem;
                }
            }
        }
        @media (min-width: 328px) and (max-width: 1680px){
            max-width: 60%;
        }
        
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

        .titleModal{
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-direction: row;
            height: 5rem;
            font-weight: bold;
            font-size: 2rem;
            text-align: center;
            div{
                color: #e34f4f;
                font-size: 2.5rem
            }
            span{
                cursor: pointer;
                position: absolute;
                top: 0;
                right: 0;
                margin: 0.5rem;
                svg{
                    width: 2rem;
                    height: 2rem;
                }
            }
        }
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