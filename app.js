const mongoose = require('mongoose');
const dotenv = require("dotenv");
const Post = require('./model/post')
const cors = require("cors");
const express = require("express");
dotenv.config();

mongoose.set("strictQuery", false);

// Define the database URL to connect to.
const mongoDB = process.env.MONGODB_URL;

// Wait for database to connect, logging an error if there is a problem
main().catch((err) => console.log(err));
async function main() {
    await mongoose.connect(mongoDB);

    console.log('Connected to mongo server.');
}


const getAllPosts = (
    async function (req, res, next) {
        try {
            const posts = await Post.find({})
            return res.status(200).json({ posts: posts });
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
)

const postRouter = express.Router();

postRouter.route("/").get(getAllPosts)

const app = express();

const corsOptions = {
  origin: process.env.FRONT_URL,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.use("/posts", postRouter);
module.exports = app;


