import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import './style.css'

const optionsLng = [
    {
        name: "portuguese",
        value: "pt",
        flag: "https://img.icons8.com/color/48/000000/brazil.png"
    },
    {
        name: "english",
        value: "en",
        flag: "https://img.icons8.com/fluency/48/000000/usa_1.png"
    },
    {
        name: "french",
        value: "fr",
        flag: "https://img.icons8.com/color/48/000000/france.png"
    },
    {
        name: "spanish",
        value: "es",
        flag: "https://img.icons8.com/color/48/000000/spain-2.png"
    }
]



export const SelectLanguage = () => {
    const {t, i18n} = useTranslation()
    const [lang, setLang] = useState('en')

    const handleLanguageChange = (vl: string) =>{
        setLang(vl)
        i18n.changeLanguage(vl)
    }
    
    return(
        <div>
            <ul className="listLanguage">
                {optionsLng.map(option => (
                    <li
                        className="language"
                        key={option.name}
                        onClick={() =>handleLanguageChange(option.value)}
                    >
                        <img src={option.flag} alt={option.name} />
                        {t(option.name)}
                    </li>
                ))}    
            </ul>
        </div>
    )
}