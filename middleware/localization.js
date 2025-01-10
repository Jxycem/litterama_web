import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import middleware from 'i18next-http-middleware';

// Configuration d'i18next
i18next.use(Backend).use(middleware.LanguageDetector).init({
  fallbackLng: 'fr-CA',
  preload: ['en', 'fr'], // Langues disponibles
  backend: {
    loadPath: './locales/{{lng}}/translation.json', // Chemin vers les fichiers de traduction
  },
  detection: {
    order: ['querystring', "session", 'cookie', 'header'], // Ordre de détection de la langue
    caches: ['cookie', "session"], // Stockage de la langue dans un cookie
    lookupQuerystring: "lang",
    lookupSession: "lng"
  },
});

// Export du middleware
export default middleware.handle(i18next);

