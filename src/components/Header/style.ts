import styled from 'styled-components'

type PropType = {
    selected: boolean;
}

export const Button = styled.button<PropType>`
    border-width: 0;
    border-radius: 0.2rem;
    margin-left: 0.25rem;
    margin-right: 0.25rem;

    height: 5rem;
    max-width: 20rem;
    min-width: 10rem;

    background: ${props => props.selected ? '##fafcff' : '#fcfcfc'};

    font-family:'Poppins', sans-serif;
    font-size: ${props => props.selected ? '1.5rem' :'1.2rem'};
    font-weight: ${props=> props.selected ? '600' : '500'};
    color: ${props=> props.selected ? '#4394e0' : '#000000'};
    text-shadow: ${props => props.selected ? '0 0 5px white': 'none'};

    transition: filter 0.2s, transform 0.2s;

    border-bottom: ${props => props.selected ? '0.2rem outset #4394e0': '0'};
    &:hover{
        filter: brightness(0.96);
        transform: scale(1.03);
        box-shadow: 0 1px 4px #cccc;
    }
    
`
export const Container = styled.div`
    margin-top: 0.5rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 70rem;
    height: 5rem;
    background: white;
    box-shadow: 1px 3px 5px #ababab;
    border-radius: 0.5rem;
    min-width: 40rem;

    .navBar{
        align-items: center;
        justify-content: center;
        height: 100%;
    }
`