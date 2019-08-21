const functions = require('firebase-functions');
const express = require('express')
const cors = require('cors');
const router = require('./routes/inventario.js')
const user = require('./routes/users.js')

const app = express()

app.use(router)
app.use(user)
app.use(cors());

exports.app = functions.https.onRequest(app);
