import { useEffect, useState } from "react";
import { Button, Container } from "./style";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"
import { SelectLanguage } from '../SelectLanguage/index'

interface IButton {
  id: number;
  label: string;
  navigate: string;
  isSelected: boolean;
}

export function Header() {

  const { t, i18n } = useTranslation()
  const buttons = [
    {
      id: 1,
      label: "publishers",
      navigate: "/publishers",
      isSelected: false,
    },
    {
      id: 2,
      label: "books.books",
      navigate: "/books",
      isSelected: false,
    },
    {
      id: 3,
      label: "dashboard",
      navigate: "/",
      isSelected: false,
    },
    {
      id: 4,
      label: "users",
      navigate: "/users",
      isSelected: false,
    },
    {
      id: 5,
      label: "rents",
      navigate: "/rents",
      isSelected: false,
    },
  ];
  const [button, setButton] = useState(buttons);
  var currentPage = document.URL

  const handleChangeSelectedPage = () => {
    setButton((old) =>
      old.map((el: IButton) => {
        if(currentPage.includes('/publishers')){
          if (el.navigate === '/publishers'){
            return { ...el, isSelected: true };
          }
        }
        if(currentPage.includes('/books')){
          if (el.navigate === '/books'){
            return { ...el, isSelected: true };
          }
        }
        if(currentPage.includes('/users')){
          if (el.navigate === '/users'){
            return { ...el, isSelected: true };
          }
        }
        if(currentPage.includes('/rents')){
          if (el.navigate === '/rents'){
            return { ...el, isSelected: true };
          }
        }if(currentPage.substr(-1, 1) === '/'){
          if (el.navigate === '/'){
            return { ...el, isSelected: true };
          }
        }
        return { ...el, isSelected: false };
      })
    );
  };

  useEffect(()=> {
    handleChangeSelectedPage()
  },[currentPage]);

  const toNavigate = useNavigate();

  return (
    <Container>
      <div className="navBar">
        {button.map((bt: IButton) => {
          return (
            <Button
            key={bt.id}
              selected={bt.isSelected}
              onClick={() => {
                toNavigate(bt.navigate);
                
              }}
            >
              {t(bt.label)}
            </Button>
          );
        })}
      </div>
      <SelectLanguage />
    </Container>
  );
}
