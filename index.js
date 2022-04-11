const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");

const cors = require("cors");
var multipart = require("connect-multiparty");
const { pageNotFound, errorHandle } = require("./midlewares/errorHandle");
const pagination = require("./midlewares/pagination");

const route = require("./routes");

const app = express();

// var multipartMiddleware = multipart({ uploadDir: "./public/images" });

app.use(express.static("public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(pagination);

//config cors
var corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 200, // default status = 200, on some browser successful status = 204
    exposedHeaders: "Content-Range",
};

app.use(cors(corsOptions));

const isLive = (req, res) => {
    res.send("Server alive!!!");
};

app.get("/", isLive);

// Upload images from ckeditor
// app.post("/upload", multipartMiddleware, (req, res) => {
//     console.log(req.files);
// });

route(app);

// handle errors
app.use(errorHandle);
app.use("*", pageNotFound);

const PORT = process.env.PORT;
app.listen(PORT, (err) => {
    if (err) console.log(err);
    else console.log(`app listen at ${PORT}`);
});
