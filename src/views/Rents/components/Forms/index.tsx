
import { useRent } from "../../../../hooks/useRent"
import { Rent, Book, User } from '../../../../interfaces/ResponseAPI'

import { Formik, FormikHelpers, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface FormRentProps{
    rent?: Rent;
}
interface initialProps {
    id: number;
    data_aluguel: string;
    data_previsao: string;
    data_devolucao: string;
    usuario_id: User;
    livro_id: Book;
  }

export function FormRent({rent}: FormRentProps){

    const { rents } = useRent()

    const schema = Yup.object().shape({
        id: Yup.number(),
        data_aluguel: Yup.string().required("Você precisa informa a data do aluguel"),
        data_previsao: Yup.string().required("Você precisa informa a data prevista para a devolução"),
        data_devolucao: Yup.string(),
        usuario_id: Yup.object({
            cidade: Yup.string(),
            email:Yup.string(),
            endereco:Yup.string(),
            id: Yup.number(),
            nome: Yup.string()
        }).required("Você precisa informar o usuario responsável"),
        livro_id:Yup.object({
            autor:Yup.string(),
            editora: Yup.object({
                nome:Yup.string(),
                id:Yup.number(),
                cidade:Yup.string()
            }),
            id: Yup.number(),
            lancamento:Yup.number(),
            nome: Yup.string(),
            quantidade: Yup.string(),
            totalalugado: Yup.string()
        }).required("Você precisa informar o livro alugado"),
    })
    
    const initialValue = rent?.id ? {} : {}


    return(
        <>
            {/* <Formik
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
            <Field id="nome" name="nome" placeholder="name..." type="text" />
            <ErrorMessage
              component="span"
              className="errorMessage"
              name="nome"
            />
            <label htmlFor="autor">Author:</label>
            <Field id="autor" name="autor" placeholder="autor..." type="text" />
            <ErrorMessage
              component="span"
              className="errorMessage"
              name="autor"
            />
            <label htmlFor="lancamento">Release:</label>
            <Field
              id="lancamento"
              name="lancamento"
              placeholder="lançamento..."
              type="text"
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
              placeholder="quantidade..."
              type="number"
            />
            <ErrorMessage
              component="span"
              className="errorMessage"
              name="quantidade"
            />
            <Select book={book} publishers={publishers} />
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
      </Formik> */}
        </>
    )
}