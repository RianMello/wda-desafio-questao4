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
    min-width: 5rem;
    width: 100%;

    background: ${props => props.selected ? '#fafcff' : 'white'} ;

    font-family:'Poppins', sans-serif;
    font-size: ${props => props.selected ? '1.8rem' : '1.5rem'};
    font-weight: ${props => props.selected ? '600' : '500'};
    color: ${props => props.selected ? '#4394e0' : '#000000'};
    text-shadow: ${props => props.selected ? '0 0 5px white' : 'none'};

    transition: filter 0.2s, transform 0.2s;

    border-bottom: ${props => props.selected ? '0.2rem outset #4394e0' : '0'};
    &:hover{
        filter: brightness(0.96);
        transform: scale(1.03);
        box-shadow: 0 1px 4px #cccc;
    }
    
`
export const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    background: white;
    box-shadow: 1px 3px 5px #000000;
    border-radius: 0.5rem;
    min-width: 90%;

    .navBar{
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        justify-content: center;
        height: 100%;
        width: 100%;
        max-width: 68rem;
    }

    .select-lang{
        position: absolute;
        top: 1rem;
        right: 0;
    }

    @media (min-width:320px) and (max-width: 1280px){
        padding-top: 1rem;
        .select-lang{
            position: absolute;
            top: 6.5rem;
            right: 1rem;
        }
        
    }
`