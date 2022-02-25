import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
    width: 100%;
    margin-top: 2rem;
    .container-chart{
        width: 50rem;
        padding: 1rem;
    }
`

export const CardView = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: silver;
    min-width: 12rem;
    max-width: 17rem;
    height: 5rem;
    border-radius: 0.5rem;
    margin: 0.5rem;
    padding: 0.5rem;
    background: #f5f9ff;
    box-shadow: 2px 3px 5px  #ababab;
    h1{
        font-size: 1.5rem;
    }
    h3{
        opacity: 0.5;
    }
`

export const VierContent = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
    margin-bottom: 3rem;
`