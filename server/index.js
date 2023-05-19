import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import mailer from "./config/nodemailer.js";

// configurations
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet()); //invokes express
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); //allows cross0origin sharing request
app.use(morgan("common")); //allows request from other server
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const PORT = process.env.PORT || 5000;

app.post("/", (req, res) => {
  try {
    const { name, email, message } = req.body;
    console.log(name, email, message);
    if (!name || !email || !message) {
      res.status(401).send({
        message: "kindly provide me your Name, email and message, thank you",
      });
    } else {
      res.status(200).send({
        message:
          "i have received your mail, i will get back shortly, thank you",
      });
      const mail = email;
      const subject = `${name}`;
      const text = `${message}`;
      mailer(mail, subject, text);
    }
  } catch (err) {
    () => console.log(err.message);
  }
});

app.listen(PORT, () => {
  console.log(`Express server listening on ${PORT}`);
});
