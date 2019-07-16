const functions = require('firebase-functions');
const express = require('express')
const cors = require('cors');
const router = require('./routes/inventario.js')

const app = express()

app.use(router)
app.use(cors({ origin: true }));

exports.app = functions.https.onRequest(app);
