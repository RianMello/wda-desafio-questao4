import { useRent } from "../../../../hooks/useRent";
import { Rent, Book, User } from "../../../../interfaces/ResponseAPI";

import { Formik, FormikHelpers, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useUser } from "../../../../hooks/useUser";
import { useBook } from "../../../../hooks/useBook";
import { ContainerForm } from "../../../../styles/formsStyles";
import { SelectUser } from "./Select/userSelector";
import { useState } from "react";
import { SelectBook } from "./Select/bookSelector";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

interface FormRentProps {
  rent?: Rent;
  onFinish: () => void;
}
interface initialProps {
  id: number;
  data_aluguel: string;
  data_previsao: string;
  data_devolucao: string;
  user_id: number;
  book_id: number;
  usuario_id: User;
  livro_id: Book;
}

export function FormRent({ rent, onFinish }: FormRentProps) {
  const { addRent } = useRent();
  const { users } = useUser();
  const { editBook, available } = useBook();

  const { t } = useTranslation();

  const [user, setUser] = useState(users[0]);
  const [book, setBook] = useState(available[0]);

  const schema = Yup.object().shape({
    id: Yup.number(),
    data_aluguel: Yup.string().required(
      "Você precisa informa a data do aluguel"
    ),
    data_previsao: Yup.string().required(
      "Você precisa informa a data prevista para a devolução"
    ),
    data_devolucao: Yup.string(),
    usuario_id: Yup.object({
      cidade: Yup.string(),
      email: Yup.string(),
      endereco: Yup.string(),
      id: Yup.number(),
      nome: Yup.string(),
    }).required("Você precisa informar o usuario responsável"),
    livro_id: Yup.object({
      autor: Yup.string(),
      editora: Yup.object({
        nome: Yup.string(),
        id: Yup.number(),
        cidade: Yup.string(),
      }),
      id: Yup.number(),
      lancamento: Yup.number(),
      nome: Yup.string(),
      quantidade: Yup.string(),
      totalalugado: Yup.string(),
    }).required("Você precisa informar o livro alugado"),
  });

  const initialValue = rent?.id
    ? {
        id: rent.id,
        data_aluguel: rent.data_aluguel,
        data_previsao: rent.data_previsao,
        data_devolucao: rent.data_devolucao,
        usuario_id: rent.usuario_id,
        user_id: rent.usuario_id.id,
        livro_id: rent.livro_id,
        book_id: rent.livro_id.id,
      }
    : {
        id: 0,
        data_aluguel: "",
        data_previsao: "",
        data_devolucao: "",
        user_id: 0,
        book_id: 0,
        usuario_id: users[0],
        livro_id: available[0],
      };

  const handleUserChange = (user: User) => {
    setUser(user);
  };
  const handleBookChange = (book: Book) => {
    setBook(book);
  };

  const today = dayjs().format("YYYY-MM-DD");

  const handleSubmit = (values: initialProps) => {
    const rentFinish: Rent = {
      id: values.id,
      data_aluguel: values.data_aluguel,
      data_previsao: values.data_previsao,
      data_devolucao: values.data_devolucao,
      usuario_id: user,
      livro_id: book,
    };
    addRent(rentFinish as Rent, onFinish);
    console.log(rentFinish);
    return;
  };

  return (
    <ContainerForm>
      <Formik
        initialValues={initialValue}
        validationSchema={schema}
        onSubmit={(values, { setSubmitting }: FormikHelpers<initialProps>) => {
          handleSubmit(values);
          setSubmitting(false);
        }}
      >
        <Form>
          <SelectUser rent={rent} users={users} userChange={handleUserChange} />
          <SelectBook
            rent={rent}
            books={available}
            bookChange={handleBookChange}
          />
          <label htmlFor="data_aluguel">{t("rental.rentalDate")}:</label>
          <Field
            id="data_aluguel"
            name="data_aluguel"
            type="date"
            min={today}
            max={today}
          />
          <ErrorMessage
            component="span"
            className="errorMessage"
            name="data_aluguel"
          />
          <ErrorMessage
            component="span"
            className="errorMessage"
            name="data_devolucao"
          />
          <label htmlFor="data_previsao">{t("rental.deadline")}:</label>
          <Field
            id="data_previsao"
            name="data_previsao"
            type="date"
            min={today}
          />
          <ErrorMessage
            component="span"
            className="errorMessage"
            name="data_previsao"
          />
          <div className="control-modalForm">
            <button className="btn-cancel" onClick={onFinish}>
              Cancel
            </button>
            <button className="btn-save" type="submit">
              Save
            </button>
          </div>
        </Form>
      </Formik>
    </ContainerForm>
  );
}
