import { useBook } from "../../hooks/useBook";
import { useUser } from "../../hooks/useUser";
import { usePublisher } from "../../hooks/usePublisher";
import { useRent } from "../../hooks/useRent";

import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Container, CardView, VierContent } from "./style";
import { useTranslation } from "react-i18next";

export function Home() {
  const { moreRenteds, books, load } = useBook();
  const { rents } = useRent();
  const { publishers } = usePublisher();
  const { users } = useUser();

  const { t } = useTranslation();
  const topFiveRenteds = moreRenteds.slice(0, 5);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const labels = topFiveRenteds.map((label) => {
    return [label.nome];
  });
  console.log(labels);

  const dataP = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "My First Dataset",
        data: [300, 50, 100],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const config = {
    type: "doughnut",
    data: dataP,
  };

  const data = {
    labels: labels,
    datasets: [
      {
        label: t("moreRented"),
        backgroundColor: "#4394e0",
        borderColor: "#4394e0",
        data: topFiveRenteds.map((data) => {
          return [data.totalalugado];
        }),
      },
    ],
    options: {
      indexAxis: "y",
    },
  };
  return (
    <Container>
      {/* <VierContent>
        <CardView>
          <h1>{t("pubRecords")}</h1>
          {load ? (
            <img
              className="gif"
              src="https://img.icons8.com/material-two-tone/24/000000/dots-loading--v3.gif"
              alt="loadingGIF"
            />
          ) : (
            <h3>{publishers.length}</h3>
          )}
        </CardView>
        <CardView>
          <h1>{t("bokRecords")}</h1>
          {load ? (
            <img
              className="gif"
              src="https://img.icons8.com/material-two-tone/24/000000/dots-loading--v3.gif"
              alt="loadingGIF"
            />
          ) : (
            <h3>{books.length}</h3>
          )}
        </CardView>
        <CardView>
          <h1>{t("userRecords")}</h1>
          {load ? (
            <img
              className="gif"
              src="https://img.icons8.com/material-two-tone/24/000000/dots-loading--v3.gif"
              alt="loadingGIF"
            />
          ) : (
            <h3>{users.length}</h3>
          )}
        </CardView>
        <CardView>
          <h1>{t("rentRecords")}</h1>
          {load ? (
            <img
              className="gif"
              src="https://img.icons8.com/material-two-tone/24/000000/dots-loading--v3.gif"
              alt="loadingGIF"
            />
          ) : (
            <h3>{rents.length}</h3>
          )}
        </CardView>
      </VierContent> */}

      <div className="container">
        <div className="header">
          <div className="content">
            <div className="title-container">
              <h3>Records</h3>
            </div>
            <ul>
              <li>
                <label>
                  {t("pubRecords")}:{publishers.length}
                </label>
              </li>
              <li>
                <label>
                  {t("pubRecords")}:{publishers.length}
                </label>
              </li>
              <li>
                <label>
                  {t("pubRecords")}:{publishers.length}
                </label>
              </li>
            </ul>
          </div>
          <div className="grid-content">
            <ul>
              <li>
                <label>
                  {t("pubRecords")}:{publishers.length}
                </label>
              </li>
              <li>
                <label>
                  {t("pubRecords")}:{publishers.length}
                </label>
              </li>
              <li>
                <label>
                  {t("pubRecords")}:{publishers.length}
                </label>
              </li>
            </ul>
          </div>
        </div>
        <div className="grid-content-chart">
          <div className="container-chart">
            <h1>{t("topFiveRented")}</h1>
            <Bar data={data} />
          </div>
        </div>
      </div>
    </Container>
  );
}
