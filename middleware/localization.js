import i18n from "i18n";


const local = i18n.configure({
    locales: ['en', 'de'],
    directory: path.join(__dirname, '/locales')
  });

  export default local