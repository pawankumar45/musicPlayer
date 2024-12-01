const express = require("express");
const dotenv = require("dotenv");
dotenv.config("./.env");
const cors = require('cors');
const DbConnect = require("./DbConnect");
const app = express()

const songRouter = require('./router');
app.use(express.json({limit:"20mb"}))

app.use(
  cors({
    origin: process.env.client_url,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
)

const PORT = process.env.PORT || 4006


app.use('/song', songRouter)

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT,()=>{
  console.log(`Server is running on port ${PORT}`);
  DbConnect()
})