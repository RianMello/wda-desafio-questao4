import { useBook } from "../../../../hooks/useBook";
import dayjs from "dayjs";
import { Book, PublisherCompany } from "../../../../interfaces/ResponseAPI";


import { ContainerForm } from "../../../../styles/formsStyles";
import { usePublisher }from "../../../../hooks/usePublisher";
import { Formik, FormikHelpers, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Select } from "./Select";
import { useState } from "react";

interface PropsFormBook {
  onFinish: () => void;
  book?: Book;
}
interface initialProps {
  id?: number;
  nome?: string;
  lancamento?: number | string;
  autor?: string;
  quantidade?: number;
  editora_id?: number;
  editora?: PublisherCompany;
  totalalugado?: number;
}

export function FormBook({ onFinish, book }: PropsFormBook) {
  const schema = Yup.object().shape({
    id: Yup.number(),
    nome: Yup.string().required("Voçê deve informar o nome do livro"),
    lancamento: Yup.string().required(
      "Voê deve informar a data de lançamento"
    ),
    autor: Yup.string().required("Voê deve informar o nome do autor do livro"),
    quantidade: Yup.number()
      .min(1)
      .required("Voê deve ter e informar pelo menos 1(uma) cópia do livro"),
    editora: Yup.object({
      id: Yup.number(),
      nome: Yup.string(),
      cidade: Yup.string(),
    }),
    editora_id: Yup.number().required("Voê deve informar a editora do livro"),
    totalalugado: Yup.number(),
  });

  const { addBook, editBook } = useBook();
  const { publishers } = usePublisher();

  const today = dayjs().format('YYYY-MM-DD')
  const [ publisher, setPublisher] = useState<PublisherCompany>(book?.id ? book.editora : publishers[0]);

  const handlePublisherChange = (pub: PublisherCompany) => {
      setPublisher(pub)
  };

  const initialValue = book?.id
    ? {
        id: book.id,
        nome: book.nome,
        lancamento: book.lancamento,
        autor: book.autor,
        quantidade: book.quantidade,
        editora_id: book.editora.id,
        editora: book.editora,
        totalalugado: book.totalalugado,
      }
    : {
        id: 0,
        nome: "",
        lancamento: '',
        autor: "",
        quantidade: 1,
        editora_id: 0,
        editora: publishers[0],
        totalalugado: 0,
      };

  const handleSubmit = (values: initialProps) => {
    const release = dayjs(values.lancamento).get('year');
    const bookFinish = {
      id: values.id,
      nome: values.nome,
      lancamento: release,
      autor: values.autor,
      quantidade: values.quantidade,
      editora: publisher,
      totalalugado: values.totalalugado,
    };

    console.log(bookFinish)
    if (book?.id !== undefined) {
      editBook(bookFinish as Book)
      onFinish()
    } else {
      addBook(bookFinish as Book, onFinish);
      console.log(values.lancamento)
    }
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
          <fieldset>
            <legend>{book?.id ? 'Edit book' :'Add new book'}</legend>
            <label htmlFor="nome">Book name:</label>
            <Field id="nome" name="nome" type="text" />
            <ErrorMessage
              component="span"
              className="errorMessage"
              name="nome"
            />
            <label htmlFor="autor">Author:</label>
            <Field id="autor" name="autor" type="text" />
            <ErrorMessage
              component="span"
              className="errorMessage"
              name="autor"
            />
            <label htmlFor="lancamento">Release:</label>
            <Field
              id="lancamento"
              name="lancamento"
              type="date"
              max={today}
            />
            <ErrorMessage
              component="span"
              className="errorMessage"
              name="lancamento"
            />
            <label htmlFor="quantidade">Amount:</label>
            <Field
              id="quantidade"
              name="quantidade"
              type="number"
            />
            <ErrorMessage
              component="span"
              className="errorMessage"
              name="quantidade"
            />
            <Select key={book?.id} book={book} publishers={publishers} pubChange={handlePublisherChange}/>
            <ErrorMessage
              component="span"
              className="errorMessage"
              name="editora_id"
            />
          </fieldset>
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
