// import { API } from 'configs/constants';
// import i18n from 'i18next';
// import LanguageDetector from 'i18next-browser-languagedetector';
// import Backend from 'i18next-http-backend';

// (async () => {
//   i18n
//     .use(Backend)
//     .use(LanguageDetector)
//     .init({
//       load: 'languageOnly',
//       lowerCaseLng: true,
//       fallbackLng: 'vi',
//       ns: ['common'],
//       defaultNS: 'common',
//       react: {
//         useSuspense: true,
//         bindI18n: 'languageChanged loaded',
//         nsMode: 'default',
//       },
//       detection: {
//         lookupQuerystring: 'lang',
//         lookupCookie: 'lang',
//         lookupLocalStorage: 'lang',
//         lookupSessionStorage: 'lang',
//       },
//       backend: {
//         // loadPath: process.env.REACT_APP_BASE_API_URL + API.TRANSLATION.DEFAULT,
//         loadPath: "http://localhost:8080" + API.TRANSLATION.DEFAULT,
//       }
//     });
// })

// export default i18n;