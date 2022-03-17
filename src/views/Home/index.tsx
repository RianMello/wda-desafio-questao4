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

import { MdOutlineInventory2, MdPointOfSale } from "react-icons/md";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Rent } from "../../interfaces/ResponseAPI";

export function Home() {
  const { moreRenteds, books } = useBook();
  const { rents, handleSituationRent } = useRent();
  const { publishers } = usePublisher();
  const { users } = useUser();

  const { t } = useTranslation();
  const topFiveRenteds = moreRenteds.slice(0, 5);
  const [lastRents, setLastRents] = useState<Rent[]>([]);

  useEffect(() => {
    let today = dayjs();
    var lastArray: Rent[] = [];
    rents.map((rent) => {
      if (today.get("month") === dayjs(rent.data_aluguel).get("month")) {
        lastArray.push(rent);
      }
    });
    setLastRents(lastArray);
  }, [rents]);

  const AmountBooks = () => {
    let amount = 0;
    books.map((book) => {
      amount = book.quantidade + amount;
    });
    return amount;
  };

  const rentsNotReturned = () => {
    let contNotReturned = 0;
    rents.map((rent) => {
      let sit = handleSituationRent(rent);
      if (sit.label === "Não devolvido") {
        contNotReturned++;
      }
    });
    return contNotReturned;
  };

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
            <div className="title-content">
              <h3>Inventory</h3>
              <MdOutlineInventory2 />
            </div>
            <ul>
              <li>
                <label>
                  <strong>{t("book.books")}:</strong>
                  {AmountBooks()} un.
                </label>
                <div className="content-hidden">titles: {books.length}</div>
              </li>
              <li>
                <label>
                  <strong>{t("publisher.publishers")}:</strong>
                  {publishers.length} rec.
                </label>
              </li>
              <li>
                <label>
                  <strong>{t("users")}:</strong>
                  {users.length} rec.
                </label>
              </li>
              <li>
                <label>
                  <strong>{t("rents")}:</strong>
                  {users.length} rec.
                </label>
                <div className="content-hidden">
                  No return: {rentsNotReturned()}
                </div>
              </li>
            </ul>
          </div>
          <div className="content">
            <div className="title-content">
              <h3>Last Rentals</h3>
              <MdPointOfSale />
            </div>
            <ul className="lastRents">
              {lastRents === [] ? (
                <li>Loading</li>
              ) : (
                lastRents.map((rent) => {
                  return (
                    <li>
                      User: {rent.usuario_id.nome}
                      Book: {rent.livro_id.nome}
                      Date: {rent.data_aluguel}
                    </li>
                  );
                })
              )}
            </ul>
          </div>
        </div>
        <div className="content-chart">
          <div className="container-chart">
            <h1>{t("topFiveRented")}</h1>
            <Bar data={data} />
          </div>
        </div>
      </div>
    </Container>
  );
}
