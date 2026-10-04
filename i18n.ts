
import i18n from 'i18next';

import { initReactI18next } from 'react-i18next';

import en from './en.json';

import hi from './hi.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LANGUAGES = {

    en: {

        translation: en
    },
    hi: {
        translation: hi

    }

}
// this language detector is for persisting the changed language on app reload bhy saving the language type in async storage
const LANGUAGE_DETECTOR = {
    type: "languageDetector",
    async: true,
    detect: async (callback:(lang:string)=>void) => {
        try {
            const savedlanguage = await AsyncStorage.getItem("Language_Detect")

            if (savedlanguage) {
                callback(savedlanguage);
                return
            }

        }
        catch (error) {
            console.log("error reading language", error)

        }
        callback("en")// default option for lang
    },
    cacheUserLanguage: async (lang: string) => {
        try {
            await AsyncStorage.setItem("Language_Detect", lang)
        }
        catch (error) {
            console.log("error", error);
        }

    }
}

i18n.use(LANGUAGE_DETECTOR as any).use(initReactI18next).init({
    resources: LANGUAGES,
    fallbackLng: "hi",
    defaultNS: "translation",
    ns: ["translation"],
    react: {
        useSuspense: false,
    },
    interpolation: {
        escapeValue: false
    }
})

export default i18n;