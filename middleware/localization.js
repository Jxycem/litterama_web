import { dirname, join } from 'path'
import { readdirSync, lstatSync } from 'fs'
import { fileURLToPath } from 'url'
import i18next from 'i18next'
import Backend from 'i18next-fs-backend'
import i18nextMiddleware from 'i18next-http-middleware'

const __dirname = dirname(fileURLToPath(import.meta.url))
const localesFolder = join(__dirname, '../locales')

 
i18next
  .use(i18nextMiddleware.LanguageDetector) // the language detector, will automatically detect the users language, by some criteria... like the query parameter ?lng=en or http header, etc...
  .use(Backend) // you can also use any other i18next backend, like i18next-http-backend or i18next-locize-backend
  .init({
    initImmediate: false, // setting initImediate to false, will load the resources synchronously
    fallbackLng: 'fr',
    preload: readdirSync(localesFolder).filter((fileName) => {
      const joinedPath = join(localesFolder, fileName)
      return lstatSync(joinedPath).isDirectory()
    }),
    backend: {
      loadPath: join(localesFolder, '{{lng}}/{{ns}}.json')
    }
  })
