import i18n from "i18next"
import { Translation, initReactI18next } from "react-i18next"

i18n.use(initReactI18next).init({
    debug:true,
    fallbackLng:"en",
    resources:{
        en:{
            translation:{
                WelcometoDashboard:"Welcome to Dashboard"
            }
        },

        pl:{
            translation:{
                WelcometoDashboard:"Witaj na pulpicie"
            }

        },
        ta:{
            translation:{
                WelcometoDashboard:"டாஷ்போர்டுக்கு வரவேற்கின்றேன்"
            }
        },

    }
})