import { useEffect, useState } from "react";
import { Button, Container } from "./style";
import { useNavigate } from "react-router-dom";

interface IButton {
  id: number;
  label: string;
  navigate: string;
  isSelected: boolean;
}
export function Header() {
  const buttons = [
    {
      id: 1,
      label: "Publishing Companies",
      navigate: "/publishers",
      isSelected: false,
    },
    {
      id: 2,
      label: "Books",
      navigate: "/books",
      isSelected: false,
    },
    {
      id: 3,
      label: "Dashboard",
      navigate: "/",
      isSelected: false,
    },
    {
      id: 4,
      label: "Users",
      navigate: "/users",
      isSelected: false,
    },
    {
      id: 5,
      label: "Rents",
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
  },[button]);

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
                handleChangeSelectedPage();
              }}
            >
              {bt.label}
            </Button>
          );
        })}
      </div>
    </Container>
  );
}
