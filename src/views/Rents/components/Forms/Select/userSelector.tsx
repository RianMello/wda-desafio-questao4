import { ErrorMessage, Field } from "formik";
import { useState } from "react";
import { Rent, User } from "../../../../../interfaces/ResponseAPI";
import { SelectContainer } from "./style";

interface SelectProps{
    rent?: Rent;
    users: User[];
    userChange: (user: User) => void;
}

export function SelectUser({ rent, users, userChange }: SelectProps){

    const [user, setUser] = useState(users[0])

    return (
      <SelectContainer>
        <label htmlFor="usuario_id">Responsible:</label>
        <Field
          as="select"
          id="usuario_id"
          name={user.id}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            users.map((user) => {
              if (user.id === Number(e.target.value)) {
                setUser(user)
                userChange(user)
              }
              return user
            });
          }}
        >
          <option></option>
          {users.map((user) => {
            if (rent?.id && rent?.usuario_id.id === user.id) {
              return (
                <option selected key={user.id} value={user.id}>
                  {user.nome}
                </option>
              );
            }
            return (
              <option key={user.id} value={user.id}>
                {user.nome}
              </option>
            );
          })}
        </Field>
        <ErrorMessage name="usuario_id" />
      </SelectContainer>
    );
}