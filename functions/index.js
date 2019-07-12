const functions = require('firebase-functions');
const express = require('express')
const morgan = require('morgan')
const cors = require('cors');
const bodyParser = require('body-parser')
const router = require('./routes/users.js')

const app = express()

app.use(router)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(morgan('short'))
app.use(cors({ origin: true }));

exports.app = functions.https.onRequest(app);
