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

    
    .title-chart{
        display: flex;
        flex-direction: row;
        justify-content:center;
        align-items: center;
        background: #79bbe8;

        border-radius: 0.5rem 0.5rem 0  0;
        border-bottom: 1px solid #CDD2D7;
        width: 100%;
        font-size: 1.3rem;
        height: 5rem;
    }
    .container-chart{
        width: 50rem;
        padding: 1rem;

        canvas{
            max-height: 384px;
            max-width:728px;

            @media (max-width: 720px) and (min-width: 768px){
                max-height: 288px;
                max-width:528px; 
            };
        }
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
            height: 12rem;
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
            box-shadow: 0 0.5rem 1rem silver;
        }

        .content{
            display: flex;
            flex-direction: column;
            background: #f2f5f7;
            border: 1px solid #CDD2D7;
            width: 100%;
            max-width: 25rem;
            border-radius: 0.5rem;
            height: 12rem;

            box-shadow: 0 0.5rem 1rem silver; 


            .title-content{
                display: flex;
                flex-direction: row;
                justify-content:center;
                align-items: center;
                background: #79bbe8;

                border-radius: 0.5rem 0.5rem 0  0;
                border-bottom: 1px solid #CDD2D7;
                width: 100%;
                font-size: 1.3rem;
                height: 3.5rem;

                h3{
                    padding-right: 0.5rem;
                }
            }
            .inventory-list{
                display: flex;
                flex-direction: column;
                list-style-type: none;
                height: 100%;
                li{
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                    height: 100%;
                    padding-left: 2rem;
                    padding-right: 2rem;
                    transition: font-size 0.3s;
                    border-bottom: 1px solid #CDD2D7;
                    label{
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        strong{
                            margin-right: 1rem;
                            font-weight: bold;
                            color: black;
                        }
                    }
                    .content-hidden{
                        visibility: hidden;
                        opacity: 0.4;
                    }
                    &:hover{
                        background: #dce3e8;
                        font-size: 1.1rem;
                        .content-hidden{
                            visibility: visible;
                        }
                    }
                }
            }

            .lastRents{
                display: flex;
                flex-direction: column;
                list-style-type: none;
                max-height: 100%;
                overflow: scroll;
                padding: 0.5rem;
                li{
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                    height: 100%;
                    transition: font-size 0.3s;
                    border-bottom: 1px solid #CDD2D7;
                    .first{
                        display: flex;
                        flex-direction: column;
                        .list-content{
                            display: flex;
                            flex-direction: row;
                            strong{
                                margin-right: 1rem;
                                font-weight: bold;
                                color: black;
                            }
                        }
                    }

                    label{
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        strong{
                            margin-right: 1rem;
                            font-weight: bold;
                            color: black;
                        }
                    }
                    .content-hidden{
                        visibility: hidden;
                        opacity: 0.4;
                    }
                    &:hover{
                        background: #dce3e8;
                        .content-hidden{
                            visibility: visible;
                        }
                    }
                }
            }

            @media (min-width: 328px) and (max-width: 1080px){
                margin-right: 1rem;
                margin-left: 1rem;
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