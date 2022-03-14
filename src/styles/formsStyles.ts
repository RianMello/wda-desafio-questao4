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
        max-width: 90%;

        .input-group{
            display: flex;
            flex-direction:column;
            width: 100%;
            justify-content: space-between;
            margin: 0.25rem;

        }
        .input-group-two{
            display: flex;
            flex-direction:row;
            width: 100%;
            justify-content: space-between;
            margin: 0.25rem;
            div{
                flex-direction: column;
            }
        }
        .outlined-basic{
            color: #6b6b6b;
        }
        input{
            height: 3rem;
            padding: 0.5rem;
            border-width: 0;
            color: #6b6b6b;
            width: 100%;
            background:#edeff7;

            border-radius: 0.2rem;
            margin-bottom: 1rem;

            &:hover{
                border: 1px solid #4394e0;
            }

        }
        label{
            font-size: 1.25rem;
            opacity: 0.7;
            color: #6b6b6b;
            width: 100%;
            text-align: bottom;
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

        display: flex;
        justify-content: space-around;
        align-items: center;
        
        margin: 0.5rem;

        &:hover{
            filter: brightness(0.9) ;
        }
        margin-right: 1.5rem;
    }

    .btn-save{
        width: 7.5rem;
        height: 3rem;
        margin: 0.5rem;
        background-color:#4fe39c;

        display: flex;
        justify-content: space-around;
        align-items: center;

        color: white;
        font-weight: 600;
        font-size: 1.2rem;
        
        margin: 0.5rem;
        margin-left: 1.5rem;

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
        justify-content: flex-end;
        width: 100%;
        margin: 1rem;
    }
`