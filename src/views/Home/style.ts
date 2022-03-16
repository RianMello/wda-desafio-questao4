import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
    width: 100%;
    margin-top: 2rem;
    height: 100%;

    .container-chart{
        width: 50rem;
        padding: 1rem;
    }


    .container{
        display: flex;
        flex-direction: column;

        width: 100%;
        max-width: 65rem;
        height: 100rem;
        padding: 1rem;
        .header{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            background: transparent;
            height: 10rem;
            padding: 2.2rem;
        }
        .content-chart{
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            background: #f2f5f7;
            border: 1px solid #CDD2D7;
            height: 30rem;
            border-radius: 0.5rem;
            margin: 2rem;
        }

        .content{
            background: #f2f5f7;
            border: 1px solid #CDD2D7;
            width: 100%;
            max-width: 25rem;
            border-radius: 0.5rem;
            height: 9rem;
            .title-content{
                display: flex;
                flex-direction: column;
                justify-content:center;
                align-items: center;

                border-radius: 0.5rem 0.5rem 0  0;
                border-bottom: 1px solid #CDD2D7;
                width: 100%;
            }
            ul{
                list-style-type: none;
                
            }
        }

    }

`

export const CardView = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: silver;
    min-width: 12rem;
    max-width: 25rem;
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
    .gif{
        width: 2rem;
        height: 2rem;
        background-color: transparent;
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