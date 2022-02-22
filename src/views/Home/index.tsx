import { useBook } from '../../hooks/useBook'
import { Container } from './style'
export function Home(){
  const { moreRenteds } = useBook()

  console.log(moreRenteds)

  const renderMoreRenteds = () => {
    
  }

  return(
    <Container>
      <div>
        {()=>{
          for(var i = 0; i < 5; i++){
            <p>{`${i + 1}º: ${moreRenteds[i].nome}`}</p>
        }}}
        <h2>Books More Renteds:</h2>
        <p>1º: {moreRenteds[0].nome}</p>
        <p>2º: {moreRenteds[1].nome}</p>
        <p>3º: {moreRenteds[2].nome}</p>
        <p>4º: {moreRenteds[3].nome}</p>
        <p>5º: {moreRenteds[4].nome}</p>
      </div>
    </Container>
  )
}