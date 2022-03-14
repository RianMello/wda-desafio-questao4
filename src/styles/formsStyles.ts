import styled from 'styled-components'

export const ContainerForm = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;

    fieldset{
        display: flex;
        flex-direction: column;
        border: 0.5px solid #ebf4f7;
        border-radius: 0.5rem;
        padding: 0.5rem;
        background-color: #fafdff;
    }

    legend{
        margin-left: 1rem;
        font-weight: bold;
        font-size: 1.5rem;
        color: black;
    }

    form{
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        height: 100%;
        max-width: 70%;

        .input-group{
            display: flex;
            width: 100%;
            justify-content: flex-start;
            margin: 0.25rem;
        }
        
        input{
            height: 2.3rem;
            padding: 0.5rem;
            border-width: 0;
            color: #9c9c9c;
            width: 100%;

            border-bottom: 1px solid silver;
            border-radius: 0.2rem;
            margin-bottom: 1rem;

        }
        label{
            font-weight: bold;
            font-size: 1.25rem;
            opacity: 0.7;
            color: #8a8a8a;
            max-width: 8rem;
            width: 100%;
            text-align: left;
        }
    }

    .btn-cancel{
        width: 7.5rem;
        height: 3rem;
        background-color:#e34f4f;
        color: white;
        font-weight: 600;
        font-size: 1.2rem;
        border: none;
        border-radius:0.25rem;
        transition: filter 0.2s;
        &:hover{
            filter: brightness(0.9) ;
        }
        margin-left: 1rem;
    }

    .btn-save{
        width: 7.5rem;
        height: 3rem;
        margin-right: 1rem;

        background-color:#4fe39c;

        color: white;
        font-weight: 600;
        font-size: 1.2rem;

        border: none;
        border-radius:0.25rem;
        transition: filter 0.2s;
        &:hover{
            filter: brightness(0.9) ;
        }
    }
    
    .errorMessage{
        font-size: 0.7rem;
        padding: 0.2rem;
        color: red;
    }
    .control-modalForm{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
        margin-top: 2rem;
        margin-bottom: 2rem;
    }
`