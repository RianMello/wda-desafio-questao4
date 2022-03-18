import { User } from "../../../../interfaces/ResponseAPI";

import { ContainerForm } from "../../../../styles/formsStyles";
import { Formik, FormikHelpers, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useUser } from "../../../../hooks/useUser";

interface PropsFormBook {
  onFinish: () => void;
  user?: User;
}
interface initialProps {
  cidade?: string;
  email?: string;
  endereco?: string;
  id?: number;
  nome?: string;
}

export function FormUser({ onFinish, user }: PropsFormBook) {
  const schema = Yup.object().shape({
    cidade: Yup.string().required("Você deve informar a cidade do usuário"),
    email: Yup.string().required("Você deve informar a email do usuário"),
    endereco: Yup.string().required("Você deve informar a endereço do usuário"),
    id: Yup.number(),
    nome: Yup.string().required("Você deve informar a nome do usuário"),
  });

  const { addUser, editUser } = useUser();

  const initialValue = user?.id
    ? {
        cidade: user?.cidade,
        email: user?.email,
        endereco: user?.endereco,
        id: user?.id,
        nome: user?.nome,
      }
    : {
        cidade: "",
        email: "",
        endereco: "",
        id: 0,
        nome: "",
      };

  const handleSubmit = (values: initialProps) => {
    const userFinish = {
      cidade: values.cidade,
      email: values.email,
      endereco: values.endereco,
      id: values.id,
      nome: values.nome,
    };

    console.log(userFinish);
    if (user?.id !== undefined) {
      editUser(userFinish as User, onFinish);
    } else {
      addUser(userFinish as User, onFinish);
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
          <div className="input-group">
            <label htmlFor="nome">User name:</label>
            <Field id="nome" name="nome" type="text" />
            <ErrorMessage
              component="span"
              className="errorMessage"
              name="nome"
            />
          </div>

          <label htmlFor="cidade">City:</label>
          <Field id="cidade" name="cidade" type="text" />
          <ErrorMessage
            component="span"
            className="errorMessage"
            name="cidade"
          />
          <label htmlFor="email">Email:</label>
          <Field
            id="email"
            name="email"
            placeholder="email@mail.com"
            type="text"
          />
          <ErrorMessage
            component="span"
            className="errorMessage"
            name="email"
          />
          <label htmlFor="endereco">Address:</label>
          <Field id="endereco" name="endereco" type="text" />
          <ErrorMessage
            component="span"
            className="errorMessage"
            name="endereco"
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
