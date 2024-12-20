import express from "express";
import 'dotenv/config';
import bodyParser from "body-parser";
import axios from "axios";
import session from "express-session";
import multer from "multer";
import morgan from "morgan";
import cors from "cors";
import i18n from "i18n";

connectDB();
/***Models*****/
import User from './models/user.js';


const app = express();
const port = 3000;
const storage = multer.memoryStorage();
const upload = multer({storage: storage});
const i18n = new i18n({
    locales: ['fr', 'en'],
    directory: path.join(__dirname, 'locales')
  });



app.set("trust proxy", 1);
app.use(express.static("public"));
app.use(morgan("tiny"));
app.use(cors());
app.set("view engine", "ejs"); //Not necessary to write ".ejs"//
app.use


//Home page//
app.get("/", async (req, res) => {
    try {
        res.render("index");
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
