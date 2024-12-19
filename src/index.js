const express = require('express');
const router = require('./router/router');
const mongoose = require('mongoose');
const cors = require('cors')
require('dotenv').config()

const app = express();
app.use(express.json());
app.use(cors())

const portid = 8080 || process.env.PORT;

mongoose.connect(process.env.MongooseDB)
    .then(() => { console.log('mongodb connected'); })
    .catch((err) => { console.log(err); })


app.use('/', router)
app.listen(portid, () => { console.log(`Server is Running at port ${portid}`); })
