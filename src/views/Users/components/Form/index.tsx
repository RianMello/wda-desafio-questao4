import { User } from "../../../../interfaces/ResponseAPI";

import { ContainerForm } from "../../../../styles/formsStyles";
import { Formik, FormikHelpers, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useUser } from "../../../../hooks/useUser";
import { useTranslation } from "react-i18next";
import { TiCancel } from "react-icons/ti";
import { IoMdSave } from "react-icons/io";

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
  const { t } = useTranslation();

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
            <label htmlFor="nome">{t("user.form.userName")}:</label>
            <Field id="nome" name="nome" type="text" />
            <ErrorMessage
              component="span"
              className="errorMessage"
              name="nome"
            />
          </div>
          <label htmlFor="email">{t("user.email")}:</label>
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
          <label htmlFor="cidade">{t("user.city")}:</label>
          <Field id="cidade" name="cidade" type="text" />
          <ErrorMessage
            component="span"
            className="errorMessage"
            name="cidade"
          />
          <label htmlFor="endereco">{t("user.address")}:</label>
          <Field id="endereco" name="endereco" type="text" />
          <ErrorMessage
            component="span"
            className="errorMessage"
            name="endereco"
          />
          <div className="control-modalForm">
            <button className="btn-cancel" onClick={onFinish}>
              <TiCancel />
              {t("form.cancel")}
            </button>
            <button className="btn-save" type="submit">
              <IoMdSave />
              {t("form.save")}
            </button>
          </div>
        </Form>
      </Formik>
    </ContainerForm>
  );
}
