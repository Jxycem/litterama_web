import express from "express";
import 'dotenv/config';
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from 'connect-mongo';
import multer from "multer";
import morgan from "morgan";
import cors from "cors";
import langMiddleware from "./middleware/localization.js";





/***Models*****/
import User from './models/user.js';


const app = express();
const port = 3000;
const storage = multer.memoryStorage();
const upload = multer({storage: storage});


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
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 //(1 jour)
    }

}));



import { ObjectId } from 'mongodb';



//Home page//
app.get("/", async (req, res) => {
    try {
        res.render("index", {
            title : t('home.home_title')
        });
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

/********In ENGLISH 

//Home page - EN//
app.get("/en", async (req, res) => {
    try {
        res.render("index");
    } catch (error) {
        console.log(error);
        res.status(404).send('Sorry, cannot find that');
    }
    
});

//About page - EN//
app.get("/a-propos-de-litterama/en", async (req, res) => {
    try {
        res.render("about");
    } catch (error) {
        console.log(error);
        res.status(404).send('Sorry, cannot find that');
    }
});

//Contact - EN//
app.get("/contactez-nous/en", async (req, res) => {
    try {
        res.render("contact");
    } catch (error) {
        console.log(error);
        res.status(404).send('Sorry, cannot find that');
    }
});

*****************************/



app.listen(port, () => {
    console.log(`Listening on port ${port}`);
    console.log(`Hello ${process.env.HELLO}`);
});

export default app
