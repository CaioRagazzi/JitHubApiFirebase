const functions = require('firebase-functions');
const express = require('express')
const cors = require('cors');
const user = require('./routes/user/users.js')
const connectionMysql = require("./data/connectionMysql")
const poolMiddleware = require("./data/poolMiddleware")

const app = express()

app.use(poolMiddleware(connectionMysql))

app.use('/api/user', user)
app.use(cors());

exports.app = functions.https.onRequest(app);
