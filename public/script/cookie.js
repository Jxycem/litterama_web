import 'https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@3.0.1/dist/cookieconsent.umd.js';

CookieConsent.run({

    // root: 'body',
    // autoShow: true,
    // disablePageInteraction: true,
    // hideFromBots: true,
    // mode: 'opt-in',
    // revision: 0,

    cookie: {
        name: 'cc_cookie',
        useLocalStorage: true
        // domain: location.hostname,
        // path: '/',
        // sameSite: "Lax",
        // expiresAfterDays: 365,
    },

    // https://cookieconsent.orestbida.com/reference/configuration-reference.html#guioptions
    guiOptions: {
        consentModal: {
            layout: 'cloud inline',
            position: 'bottom center',
            equalWeightButtons: true,
            flipButtons: false
        },
        preferencesModal: {
            layout: 'box',
            equalWeightButtons: true,
            flipButtons: false
        }
    },

    onFirstConsent: ({cookie}) => {
        console.log('onFirstConsent fired',cookie);
    },

    onConsent: ({cookie}) => {
        console.log('onConsent fired!', cookie)
    },

    onChange: ({changedCategories, changedServices}) => {
        console.log('onChange fired!', changedCategories, changedServices);
    },

    onModalReady: ({modalName}) => {
        console.log('ready:', modalName);
    },

    onModalShow: ({modalName}) => {
        console.log('visible:', modalName);
    },

    onModalHide: ({modalName}) => {
        console.log('hidden:', modalName);
    },

    categories: {
        necessary: {
            enabled: true,  // this category is enabled by default
            readOnly: true  // this category cannot be disabled
        },
        analytics: {
            autoClear: {
                cookies: [
                    {
                        name: /^_ga/,   // regex: match all cookies starting with '_ga'
                    },
                    {
                        name: '_gid',   // string: exact cookie name
                    }
                ]
            },

            // https://cookieconsent.orestbida.com/reference/configuration-reference.html#category-services
            services: {
                ga: {
                    label: 'Google Analytics',
                    onAccept: () => {},
                    onReject: () => {}
                },
                youtube: {
                    label: 'Youtube Embed',
                    onAccept: () => {},
                    onReject: () => {}
                },
            }
        },
        ads: {}
    },

    language: {
        default: 'fr',
        autoDetect: "document",
        translations: {
            fr: {
                consentModal: {
                    title: "Nous utilisons des cookies",
                    description: "Nous utilisons des cookies pour personnaliser le contenu et analyser notre trafic",
                    acceptAllBtn: "Tout accepter",
                    acceptNecessaryBtn: "Tout rejeter",
                    showPreferencesBtn: "Gérer les préférences",
                    footer: `
                        <a href="/politiques-confidentialite">Politiques de confidentialité</a>
                    `,
                },
                preferencesModal: {
                    title: "Gérer les préférences en matière de cookies",
                    acceptAllBtn: "Tout rejeter",
                    acceptNecessaryBtn: "Tout rejeter",
                    savePreferencesBtn: "Accepter la sélection actuelle",
                    closeIconLabel: "Fermer",
                    serviceCounterLabel: 'Service|Services',
                    sections: [
                        {
                            title: "Vos choix en matière de confidentialité",
                            description: `Dans ce panneau, vous pouvez exprimer certaines préférences relatives au traitement de vos informations personnelles. Vous pouvez revoir et modifier vos choix à tout moment en réapparaissant dans ce panneau via le lien fourni. Pour refuser votre consentement aux activités de traitement spécifiques décrites ci-dessous, désactivez les boutons de sélection ou utilisez le bouton « Tout rejeter » et confirmez vos choix.`,
                        },
                        {
                            title: "Strictement nécéssaire",
                            description: "Ces cookies sont essentiels au bon fonctionnement du site web et ne peuvent pas être désactivés.",
                            linkedCategory: "necessary"
                        },
                        {
                            title: "Performance et Analyses",
                            description: "Ces cookies recueillent des informations sur la manière dont vous utilisez notre site web. Toutes les données sont anonymes et ne peuvent être utilisées pour vous identifier.",
                            linkedCategory: "analytics"
                            /****** 
                            cookieTable: {
                                caption: 'Cookie table',
                                headers: {
                                    name: 'Cookie',
                                    domain: 'Domain',
                                    desc: 'Description'
                                },
                                body: [
                                    {
                                        name: '_ga',
                                        domain: location.hostname,
                                        desc: 'Description 1',
                                    },
                                    {
                                        name: '_gid',
                                        domain: location.hostname,
                                        desc: 'Description 2',
                                    }
                                ]
                            }
*/
                        }
                        
                    ]
                }

            },
            en: {
                consentModal: {
                    title: 'We use cookies',
                    description: 'We use cookies to personalize content and analyze our traffic',
                    acceptAllBtn: 'Accept all',
                    acceptNecessaryBtn: 'Reject all',
                    showPreferencesBtn: 'Manage Individual preferences',
                    // closeIconLabel: 'Reject all and close modal',
                    footer: `
                        <a href="/politiques-confidentialite">Privacy Policy</a>
                    `,
                },
                preferencesModal: {
                    title: 'Manage cookie preferences',
                    acceptAllBtn: 'Accept all',
                    acceptNecessaryBtn: 'Reject all',
                    savePreferencesBtn: 'Accept current selection',
                    closeIconLabel: 'Close modal',
                    serviceCounterLabel: 'Service|Services',
                    sections: [
                        {
                            title: 'Your Privacy Choices',
                            description: `In this panel you can express some preferences related to the processing of your personal information. You may review and change expressed choices at any time by resurfacing this panel via the provided link. To deny your consent to the specific processing activities described below, switch the toggles to off or use the “Reject all” button and confirm you want to save your choices.`,
                        },
                        {
                            title: 'Strictly Necessary',
                            description: 'These cookies are essential for the proper functioning of the website and cannot be disabled.',

                            //this field will generate a toggle linked to the 'necessary' category
                            linkedCategory: 'necessary'
                        },
                        {
                            title: 'Performance and Analytics',
                            description: 'These cookies collect information about how you use our website. All of the data is anonymized and cannot be used to identify you.',
                            linkedCategory: 'analytics',
                            /***** 
                            cookieTable: {
                                caption: 'Cookie table',
                                headers: {
                                    name: 'Cookie',
                                    domain: 'Domain',
                                    desc: 'Description'
                                },
                                body: [
                                    {
                                        name: '_ga',
                                        domain: location.hostname,
                                        desc: 'Description 1',
                                    },
                                    {
                                        name: '_gid',
                                        domain: location.hostname,
                                        desc: 'Description 2',
                                    }
                                ]
                            }
                          ****/      
                        }
                    ]
                }
            }
        }
    }
});