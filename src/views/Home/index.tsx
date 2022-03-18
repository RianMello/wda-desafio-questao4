import { useBook } from "../../hooks/useBook";
import { useUser } from "../../hooks/useUser";
import { usePublisher } from "../../hooks/usePublisher";
import { useRent } from "../../hooks/useRent";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Container } from "./style";
import { useTranslation } from "react-i18next";

import { MdOutlineInventory2, MdPointOfSale } from "react-icons/md";
import { FcSalesPerformance } from "react-icons/fc";
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
    var lastArray: Rent[] = [];
    rents.map((rent) => {
      if (dayjs().format("YYYY-MM-DD") === rent.data_aluguel) {
        lastArray.push(rent);
        console.log(dayjs(rent.data_aluguel).get("day"));
      }
      return lastArray;
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

  const data = {
    labels: labels,
    datasets: [
      {
        label: "",
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
      <div className="container">
        <div className="header">
          <div className="content">
            <div className="title-content">
              <h3>Inventory</h3>
              <MdOutlineInventory2 />
            </div>
            <ul className="inventory-list">
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
            {lastRents.length === 0 ? (
              <h2>No rentals today</h2>
            ) : (
              <ul className="lastRents">
                {lastRents.map((rent) => {
                  return (
                    <li>
                      <div className="first">
                        <div className="list-content">
                          {" "}
                          <strong>User: </strong>
                          <p>{rent.usuario_id.nome}</p>
                        </div>
                        <div className="list-content">
                          <strong>Book: </strong>
                          <p>{rent.livro_id.nome}</p>
                        </div>
                      </div>
                      <p>today</p>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
        <div className="content-chart">
          <div className="title-chart">
            <h1>{t("topFiveRented")}</h1>
            <FcSalesPerformance />
          </div>
          <div className="container-chart">
            <Bar data={data} />
          </div>
        </div>
      </div>
    </Container>
  );
}
