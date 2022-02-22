import { useBook } from '../../hooks/useBook'

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

import { Container } from './style'
export function Home(){
  const { moreRenteds } = useBook()

  const topFiveRenteds = moreRenteds.slice(0, 5)

  var cont = 0

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
  ];

  const data = {
    labels: labels,
    datasets: [{
      label: 'My First dataset',
      backgroundColor: '#4394e0',
      borderColor: '#4394e0',
      data: [0, 10, 5, 2, 20, 30, 45],
    }]
  };
  return(
    <Container>
      <div>
        <h2>Top Five Rented</h2>
        {
          topFiveRenteds.map(top => {
            cont++
            var position = cont
            return <p>{`${position}º: ${top.nome}`}</p>
          })
        }
    </div>
   <div className="container-chart"> 
       <Bar data={data} />
   </div>
    </Container>
  )
}