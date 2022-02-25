import { useBook } from '../../hooks/useBook'
import { useUser } from '../../hooks/useUser';
import { usePublisher } from '../../hooks/usePublisher';
import { useRent } from '../../hooks/useRent';

import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Container, CardView, VierContent } from './style'
export function Home(){
  const { moreRenteds, books } = useBook()
  const { rents } = useRent()
  const { publishers } = usePublisher();
  const { users } = useUser()


  const topFiveRenteds = moreRenteds.slice(0, 5)
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const labels = topFiveRenteds.map((label)=>{
    return [label.nome]
  });
  console.log(labels)
  
  const data = {
    labels: labels,
    datasets: [{
      label: 'More Rented',
      backgroundColor: '#4394e0',
      borderColor: '#4394e0',
      data: topFiveRenteds.map((data)=>{
        return [data.totalalugado]
      }),
    }],
    options: {
      indexAxis: 'y',
    },
  };
  return(
    <Container>
      <VierContent>
      <CardView>
          <h1>Publisher' Records</h1>
          <h3>{publishers.length}</h3>
        </CardView>
        <CardView>
          <h1>Book Records</h1>
          <h3>{books.length}</h3>
        </CardView>
        <CardView>
          <h1>User Records</h1>
          <h3>{users.length}</h3>
        </CardView>
        <CardView>
          <h1>Rental Records</h1>
          <h3>{rents.length}</h3>
        </CardView>

      </VierContent>
   <div className="container-chart">
     <h1> Top 5 Books Rented </h1>
       <Bar data={data} />
   </div>
    </Container>
  )
}