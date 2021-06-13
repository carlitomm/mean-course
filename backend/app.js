const express = require('express');
const bodyParser = require("body-parser")

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    next();
});

app.post("/api/post", (req, res, next) => {
    const post = req.body;
    console.log(post);
    res.status(201).json({
        message: 'Post added ok'
    });
});

app.get('/api/post', (req, res, next) => {
    const posts = [
        {
            id: 'asdfasdf',
            title: 'first server-side post',
            content: 'this is the first content of the first post'
        },
        {
            id: 'asdfadf',
            title: 'second server-side post',
            content: 'this is the second content'
        }
    ];
    res.status(200).json({
        message: 'post fetched succesfully',
        posts: posts
    });
    next();
})
module.exports = app;