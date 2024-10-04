import i18n from "i18next"
import i18next from 'i18next';
import { Translation, initReactI18next } from "react-i18next"
import global_en from "./translations/en/global.json"
import global_pl from "./translations/pl/global.json"
import global_ta from "./translations/ta/global.json"


i18n.use(initReactI18next).init({
    debug:true,
    interpolation:{escapeValue:false},
    lng:"en",
    
    fallbackLng:"en",
    resources:{
        en:{global:global_en},
        pl:{global:global_pl},
        ta:{global:global_ta}
      }
})

export default i18n;





