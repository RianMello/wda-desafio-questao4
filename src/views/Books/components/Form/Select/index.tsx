import { ErrorMessage, Field } from "formik";
import { useState } from "react";
import { Book, PublisherCompany } from "../../../../../interfaces/ResponseAPI";
import { SelectContainer } from "./style";

interface SelectProps{
    book?: Book;
    publishers: PublisherCompany[];
}

export function Select({book, publishers}: SelectProps){

    const [publisher, setPublisher] = useState(publishers[0])

    return (
      <SelectContainer>
        <label htmlFor="editora_id">Publisher Company:</label>
        <Field
          as="select"
          id="editora_id"
          name={publisher.nome}
          placeholder="editora..."
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            publishers.map((pub) => {
              if (pub.id === Number(e.target.value)) {
                setPublisher(pub)
              }
            });
          }}
        >
          {publishers.map((pub) => {
            if (book?.id && book?.editora.id === pub.id) {
              return (
                <option selected key={pub.id} value={pub.id}>
                  {pub.nome}
                </option>
              );
            }
            return (
              <option key={pub.id} value={pub.id}>
                {pub.nome}
              </option>
            );
          })}
        </Field>
        <ErrorMessage name="editora" />
      </SelectContainer>
    );
}