import { createI18n } from "vue-i18n";
import en from "@/locale/en.json";
import ar from "@/locale/ar.json";


export default createI18n({

    locale:'en',
    fallbackLocale:'en',
    messages:{
        en,
        ar

    } 
})