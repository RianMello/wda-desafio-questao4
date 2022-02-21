import styled from 'styled-components'

type PropType = {
    selected: boolean;
}

export const Button = styled.button<PropType>`
    border: none;
    border-radius: 0.2rem;
    margin-left: 0.25rem;
    margin-right: 0.25rem;

    height: 5rem;
    max-width: 15rem;
    min-width: 10rem;

    background: ${props => props.selected ? '#e6e6e6' : '#fcfcfc'};

    font-size: 1.2rem;
    color: ${props => props.selected ? '#03d4ff' :'#000000'};

    transition: filter 0.2s, transform 0.2s;
    transform: ${props => props.selected ? 'scale(1.05)': 0};

    &:hover{
        filter: brightness(0.9);
        transform: scale(1.05, 1.05);
        box-shadow: 0 1px 4px #cccc;
    }
    
`
export const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 70rem;
    height: 5rem;
    background: white;
    box-shadow: 1px 3px 5px #ababab;
    border-radius: 0.5rem;
`