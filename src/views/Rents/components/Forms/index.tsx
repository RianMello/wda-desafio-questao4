
import { useRent } from "../../../../hooks/useRent"
import { Rent, Book, User } from '../../../../interfaces/ResponseAPI'

import { Formik, FormikHelpers, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface FormRentProps{
    rent?: Rent;
    onFinish: () => void;
}
interface initialProps {
    id: number;
    data_aluguel: string;
    data_previsao: string;
    data_devolucao: string;
    usuario_id: User;
    livro_id: Book;
  }

export function FormRent({rent, onFinish}: FormRentProps){

    const { addRent, editRent } = useRent()

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
    
    const initialValue = rent?.id ? {
      id: rent.id,
      data_aluguel:rent.data_aluguel,
      data_previsao: rent.data_previsao,
      data_devolucao: rent.data_previsao,
      usuario_id: rent.usuario_id,
      livro_id: rent.livro_id,
    } : {
      id: 0,
      data_aluguel:'',
      data_previsao: '',
      data_devolucao: '',
      usuario_id: {} as User,
      livro_id: {} as Book,
    }


  const handleSubmit = (values: initialProps) => {
    const rentFinish = {
      id: values.id,
      data_aluguel:values.data_aluguel,
      data_previsao: values.data_previsao,
      data_devolucao: values.data_previsao,
      usuario_id: values.usuario_id,
      livro_id: values.livro_id,
    };
    if (rent?.id !== undefined) {
      editRent(rentFinish as Rent);
      return onFinish();
    } else {
      addRent(rentFinish as Rent);
      return onFinish();
    }
  };
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