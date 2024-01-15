require("dotenv").config()
const routes = require("./routes")
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")

app.set("port", process.env.PORT || 3001)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  )
app.use("/", routes)
module.exports = app