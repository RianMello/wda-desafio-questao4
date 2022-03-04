import { useTranslation } from "react-i18next"
import { BrFlag } from './flags/br'
const optionsLng = [
    {
        name: "portuguese",
        value: "pt",
        flag: <BrFlag/>
    },
    {
        name: "english",
        value: "en",
        flag: <BrFlag/>
    },
    {
        name: "french",
        value: "fr",
        flag: <BrFlag/>
    }
]

export const SelectLanguage = () => {
    const {t, i18n} = useTranslation()
    return(
        <div>
            <select
                onChange={(e)=>{
                    i18n.changeLanguage(e.target.value)
                }}
            >
                {optionsLng.map(options => (
                    <option
                        key={options.name}
                        value={options.value} 
                    >
                        {t(options.name)}
                    </option>
                ))}
            </select>
        </div>
    )
}