import { createI18n } from "vue-i18n";
import en from "@/locale/en.json";
import ar from "@/locale/ar.json";






const datetimeFormats = {
    'en': {
      short: {
        year: 'numeric', month: 'short', day: 'numeric'
      },
      long: {
        year: 'numeric', month: 'short', day: 'numeric',
        weekday: 'short', hour: 'numeric', minute: 'numeric'
      }
    },
    'ar': {
      short: {
        year: 'numeric', month: 'short', day: 'numeric'
      },
      long: {
        year: 'numeric', month: 'short', day: 'numeric',
        weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: true
      }
    }
  }
  
  const storedLocale = localStorage.getItem('userLocale');


export default createI18n({

    locale:storedLocale || 'en',
    fallbackLocale:'en',
    datetimeFormats,
    
    messages:{
        en,
        ar

    } 
})