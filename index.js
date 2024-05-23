import express from "express"
import mongoose from "mongoose";
import route from "./Routes/route.js"
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import 'dotenv/config';
import cors from 'cors'


const app = express()
const port = 10000;
// const port = process.env.PORT || 10000;
const mongoDBurl = process.env.userMongoDb;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors())
app.use(express.json())

mongoose.connect(mongoDBurl)
    .then(() => console.log('connection with data base stablish successfully'))
    .catch((err) => console.log('Error connecting with data base', err))

app.use(route)

// app.use(express.static("Front-end"))
// express.static('Front-end')
// app.get('/index.js', (req, res) => {
//     console.log('anything');
//     res.sendFile(__dirname + "/Front-end/index.js")
// })

// app.get('/index.css', (req, res) => {
//     res.sendFile(__dirname + "/Front-end/index.css")

// })

app.get('/', (req, res) => {
    // console.log(__dirname);
    res.sendFile(__dirname + '/Front-end/index.html')
    // res.send('Front-end')
})

app.use('/*', (req, res) => {
    res.status(400).json({
        success: false,
        message: 'path not found'
    })
})

app.listen(port, () => console.log(`Server in running on port ${port}`))