import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from "./locales/en-US.json"
import pt from "./locales/pt-BR.json"
import fr from "./locales/fr.json"
import es from "./locales/es.json"

i18n.use(initReactI18next).init({
    fallbackLng: "en",
    interpolation: {
        escapeValue: false,
    },
    resources: {
        en: en,
        pt: pt,
        es: es,
    }
})

export default i18n