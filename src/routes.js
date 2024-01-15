const express = require("express")
const router = express.Router()

const { subscribe } = require("./api/beehiiv")

router.post('/subscribe', subscribe)

router.get("/", (req, res) => {
    res.status(200).json({ success: "Api Café Newslatter" })
})

module.exports = router