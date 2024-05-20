import express from "express"
import mongoose from "mongoose";
import route from "./Routes/route.js"
import 'dotenv/config'


const app = express()
const port = 10000;
// const port = process.env.PORT || 10000;
// const mongoDBurl = process.env.userMongoDb;

app.use(express.json())

mongoose.connect('mongodb+srv://ismail:PpgMCDcWlo3LCyl1@cluster0.rs6nm8w.mongodb.net/')
    .then(() => console.log('connection with data base stablish successfully'))
    .catch((err) => console.log('Error connecting with data base', err))

app.use(route)

app.use('/*', (req, res) => {
    res.status(400).json({
        success: false,
        message: 'path not found'
    })
})

app.listen(port, () => console.log(`Server in running on port ${port}`))