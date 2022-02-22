import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    fieldset{
        display: flex;
        flex-direction: column;
        border: 0.5px solid #57b4d9;
        border-radius: 0.5rem;
        padding: 0.5rem;
    }

    legend{
        margin-left: 1rem;
        font-weight: bold;
        font-size: 1.5rem;
    }

    form{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
        height: 100%;

        input{
            height: 2.3rem;
            padding: 0.5rem;
            border: none;
            border-radius: 0.5rem;
            opacity: 0.5;
        }
        label{
            font-weight: bold;
            padding-left: 0.25rem;
            margin: 0.2rem;
        }
    }

    .btn-cancel{
        width: 7rem;
        height: 2.5rem;
        background-color:#e34f4f;
        color: white;
        font-weight: bold;
        border: none;
        border-radius:0.25rem;
        transition: filter 0.2s;
        &:hover{
            filter: brightness(0.9) ;
        }
    }

    .btn-save{
        width: 7rem;
        height: 2.5rem;
        background-color:#4fe39c;
        color: white;
        font-weight: bold;
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
        padding: 1rem;
        
    }
`