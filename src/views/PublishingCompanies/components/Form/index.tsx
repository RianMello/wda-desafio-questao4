import { PublisherCompany } from "../../../../interfaces/ResponseAPI";
import { usePublisher } from "../../../../hooks/usePublisher";

import { ContainerForm } from "../../../../styles/formsStyles";

import { Formik, FormikHelpers, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface PropsFormPublisher {
  onFinish: () => void;
  publisher?: PublisherCompany;
}
interface initialProps {
  id?: number;
  cidade?: string;
  nome?: string;
}

export function FormPublisher({ onFinish, publisher }: PropsFormPublisher) {
  const schema = Yup.object().shape({
    id: Yup.number(),
    nome: Yup.string().required("You must provide the name of the publisher"),
    cidade: Yup.string().required("You must inform the publisher's home city"),
  });

  const { addPublisher, editPublisher } = usePublisher();

  const initialValue = publisher?.id
    ? {
        id: publisher.id,
        nome: publisher.nome,
        cidade: publisher.cidade,
      }
    : {
        id: 0,
        nome: "",
        cidade: "",
      };

  const handleSubmit = (values: initialProps) => {
    const publisherFinish = {
      id: values.id,
      nome: values.nome,
      cidade: values.cidade,
    };

    console.log(publisherFinish);
    if (publisher?.id !== undefined) {
      editPublisher(publisherFinish as PublisherCompany, onFinish);
    } else {
      addPublisher(publisherFinish as PublisherCompany, onFinish);
    }
  };

  return (
    < ContainerForm>
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
            <legend>{publisher?.id ? "Edit Publisher" : "Add new Publisher"}</legend>
            <label htmlFor="nome">Publishing Company name:</label>
            <Field id="nome" name="nome" type="text" />
            <ErrorMessage
              component="span"
              className="errorMessage"
              name="nome"
            />
            <label htmlFor="cidade">Main city:</label>
            <Field id="cidade" name="cidade" type="text" />
            <ErrorMessage
              component="span"
              className="errorMessage"
              name="cidade"
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
    </ ContainerForm>
  );
}
