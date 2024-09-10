import express from "express";
import 'dotenv/config';
import bodyParser from "body-parser";
import axios from "axios";
import multer from "multer";
import morgan from "morgan";
import cors from "cors";


const app = express();
const port = 3000;
const storage = multer.memoryStorage();
const upload = multer({storage: storage});



app.set("trust proxy", 1);
app.use(express.static("public"));
app.use(morgan("tiny"));
app.use(cors());
app.set("view engine", "ejs"); //Not necessary to write ".ejs"//


//Home page//
app.get("/", async (req, res) => {
    res.render("index");
});










app.listen(port, () => {
    console.log(`Listening on port ${port}`);
    console.log(`Hello ${process.env.HELLO}`);
});