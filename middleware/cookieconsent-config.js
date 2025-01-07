import 'https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@3.0.1/dist/cookieconsent.umd.js';


CookieConsent.run({
    categories: {
        necessary: {
            enabled: true,
            readOnly: true
        },
        analytics: {}
    },
    language: {
        default: "fr",
        translations: {
            "fr": "./locales/fr/translation.json",
            "en": "./locales/en/translation.json"
        }
    }
});