import { useTranslation } from "react-i18next";
import "./style.css";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";
import { HiOutlineTranslate } from "react-icons/hi";
import { IconContext } from "react-icons";
const optionsLng = [
  {
    id: 0,
    name: "portuguese",
    value: "pt",
    flag: "https://img.icons8.com/color/48/000000/brazil.png",
  },
  {
    id: 1,
    name: "english",
    value: "en",
    flag: "https://img.icons8.com/fluency/48/000000/usa_1.png",
  },
  {
    id: 2,
    name: "french",
    value: "fr",
    flag: "https://img.icons8.com/color/48/000000/france.png",
  },
  {
    id: 3,
    name: "spanish",
    value: "es",
    flag: "https://img.icons8.com/color/48/000000/spain-2.png",
  },
];

export const SelectLanguage = () => {
  const { t, i18n } = useTranslation();

  const [lang, setLang] = useState(i18n.language);

  const handleLanguageChange = (vl: string) => {
    setLang(vl);
    i18n.changeLanguage(vl);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 80 }}>
        <IconContext.Provider value={{ size: "1.5rem" }}>
          <InputLabel id="demo-simple-select-autowidth-label">
            <HiOutlineTranslate />
          </InputLabel>
        </IconContext.Provider>

        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={lang}
          onChange={(e) => handleLanguageChange(e.target.value)}
          autoWidth
          label="Language"
        >
          {optionsLng.map((option) => {
            if (i18n.language === option.value) {
              console.log(i18n.language);
              return (
                <MenuItem selected value={option.value}>
                  <em>{t(option.name)}</em>
                  <img src={option.flag} alt={t(option.name)} />
                </MenuItem>
              );
            } else {
              return (
                <MenuItem value={option.value}>
                  <em>{t(option.name)}</em>
                  <img src={option.flag} alt={t(option.name)} />
                </MenuItem>
              );
            }
          })}
        </Select>
      </FormControl>
    </div>
  );
};
