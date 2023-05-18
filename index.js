const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000
app.use(cors())
app.use(express.json())
require('dotenv').config()





app.get("/", (req, res) => {
    res.send("Powersoft Robotics server side is running")
})

app.listen(port, () => {
    console.log(`powersoft-robotics-server-side port: ${port}`);
})