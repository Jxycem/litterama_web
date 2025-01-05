import express from "express";
import 'dotenv/config';
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from 'connect-mongo';
import multer from "multer";
import morgan from "morgan";
import cors from "cors";
import i18nMiddleware from './middleware/localization.js';
import nodemailer from "nodemailer";
import connectDB from './db.js';
connectDB();



/***Models*****/
import User from './models/user.js';


const app = express();
const port = 3000;
const storage = multer.memoryStorage();
const upload = multer({storage: storage});
const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
        user: "82c3ff001@smtp-brevo.com",
        pass: process.env.SMTP_KEY
    }
});




/**Vew engine setup */
app.set("view engine", "ejs"); //Not necessary to write ".ejs"//
app.set("trust proxy", 1);


/*****Middleware */
app.use(cookieParser());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));
app.use(morgan("tiny"));
app.use(cors());
app.use(session({
    secret: process.env.SECRET,
    secure: true,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ 
        mongoUrl: process.env.MONGODB_URL,
        dbName: "webapp",
        collectionName: "sessions"
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 //(1 jour)
    }

}));
app.use(i18nMiddleware);



import { ObjectId } from 'mongodb';



//Home page//
app.get("/", async (req, res) => {
    try {
        if (!req.session.lng) {
            req.session.lng = req.language; // req.language est défini par i18next
          }
        
          // Changer la langue si un paramètre est passé
          const lng = req.query.lang;
          if (lng) {
            req.session.lng = lng;
            req.i18n.changeLanguage(lng);
          }
        console.log(req.t('home.title'));
        res.render("index", {
            t: req.t
        });
    } catch (error) {
        console.log(error);
        res.status(404).send('Sorry, cannot find that');
    }
});

//About page//
app.get("/a-propos-de-litterama", async (req, res) => {
    try {
        if (!req.session.lng) {
            req.session.lng = req.language; // req.language est défini par i18next
          }
        
          // Changer la langue si un paramètre est passé
          const lng = req.query.lang;
          if (lng) {
            req.session.lng = lng;
            req.i18n.changeLanguage(lng);
          }
        res.render("about");
    } catch (error) {
        console.log(error);
        res.status(404).send('Sorry, cannot find that');
    }
});

//Contact//
app.get("/contactez-nous", async (req, res) => {
    try {
        if (!req.session.lng) {
            req.session.lng = req.language; // req.language est défini par i18next
          }
        
          // Changer la langue si un paramètre est passé
          const lng = req.query.lang;
          if (lng) {
            req.session.lng = lng;
            req.i18n.changeLanguage(lng);
          }
        res.render("contact");
    } catch (error) {
        console.log(error);
        res.status(404).send('Sorry, cannot find that');
    }
});
app.post("/contactez-nous/envoyer", async (req, res) => {
    try {
        const {fName, lName, email, subject, message} = req.body;
        const emailExists = User.findOne({email});
        const sendMail = await transporter.sendMail({
            from: "info@litterama.ca",
            replyTo: email,
            to: "litteramamedia@gmail.com",
            subject: subject,
            text: message
        });
        if (!emailExists) {
            const newUser = await User.insertMany({
                fName: fName,
                lName: lName,
                fullName: fName +  " " + lName,
                email: email
            });
            console.log(newUser);
        }
        console.log("Message sent: %s", sendMail.messageId);
        res.redirect("back");
    } catch (error) {
        console.log(error);
        res.status(404).send("Sorry connot find that");
    }
});




app.listen(port, () => {
    console.log(`Listening on port ${port}`);
    console.log(`Hello ${process.env.HELLO}`);
});

export default app
