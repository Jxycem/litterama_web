import express from "express";
import i18nMiddleware from './middleware/localization.js';
import 'dotenv/config';
import axios from "axios";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from 'connect-mongo';
import multer from "multer";
import morgan from "morgan";
import cors from "cors";
import nodemailer from "nodemailer";
import connectDB from './db.js';
connectDB();



/***Models*****/
import User from './models/user.js';
import defineLang from "./middleware/lang.js";


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

/***API ***/
const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;
const instance =  axios.create({
    baseURL: API_URL,
    headers: {
        "Authorization": API_KEY,
        "User-Agent": "insomnia/5.12.4",
        "Content-Type": 'application/json'
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
app.use(defineLang);



//Home page//
app.get("/", async (req, res) => {
    try {
        res.render("index", {
            t: req.t
        });
        console.log(req.t('home.title'));
        console.log(req.language);
    } catch (error) {
        console.log(error);
        res.status(404).send('Sorry, cannot find that');
    }
});

//About page//
app.get("/a-propos-de-litterama", async (req, res) => {
    try {
        res.render("about");
    } catch (error) {
        console.log(error);
        res.status(404).send('Sorry, cannot find that');
    }
});

//Contact//
app.get("/contactez-nous", async (req, res) => {
    try {
        res.render("contact");
    } catch (error) {
        console.log(error);
        res.status(404).send('Sorry, cannot find that');
    }
});
app.post("/contactez-nous/envoyer", async (req, res) => {
    const {fName, lName, email, message, 'g-recaptcha-response': recaptchaResponse} = req.body;
    if (!recaptchaResponse) {
        return res.render("contact", {message})
    };

    try {
        const validate = await instance.post(API_URL, null, {
            params: {
                secret: API_KEY,
                response: recaptchaResponse
            }
        });
        const response = validate.data;
        if (response.success = true) {
         const emailExists = User.findOne({email});
        const sendMail = await transporter.sendMail({
            from: "info@litterama.ca",
            replyTo: email,
            to: "litteramamedia@gmail.com",
            subject: "Message site Littérama",
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
        }
        
        res.render("contact", {fName});
    } catch (error) {
        console.log(error);
        res.status(404).send("Sorry connot find that");
    }
});
app.get("/contactez-nous/envoyer", async (req, res) => {
    try {
        res.redirect("/contactez-nous");
    } catch (error) {
        console.log(error);
        res.status(404).send("Sorry connot find that");
    }
});

//CGU
app.get("/conditions-generales", async (req, res) => {
    try {
        res.render("terms");
    } catch (error) {
        console.log(error);
        res.status(404).send("Sorry connot find that");
    }
});

//PC
app.get("/politiques-confidentialite", async (req, res) => {
    try {
        res.render("privacy");
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
