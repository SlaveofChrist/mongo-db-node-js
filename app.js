const mongoose = require('mongoose');
const dotenv = require("dotenv");
const Post = require('./model/post')
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

/**
 * @description Get All users
 * @route GET /utilisateurs
 * /post:
 *   get:
 *     summary: Returns all posts
 *     responses:
 *       200:
 *         description: A successful response
 */
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
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World')
})

module.exports = app;


