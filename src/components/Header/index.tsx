import React, { useEffect, useState } from "react";
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
  // useEffect(() => {}, [button]);

  const handleChangeSelectedPage = (id: number) => {
    setButton((old) =>
      old.map((el: IButton) => {
        if (el.id === id) {
          return { ...el, isSelected: true };
        }

        return { ...el, isSelected: false };
      })
    );
  };

  useEffect(() => {
    handleChangeSelectedPage(3);
  }, []);

  const toNavigate = useNavigate();

  return (
    <Container>
      <div className="navBar">
        {button.map((bt: IButton) => {
          return (
            <Button
              selected={bt.isSelected}
              onClick={() => {
                toNavigate(bt.navigate);
                handleChangeSelectedPage(bt.id);
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
