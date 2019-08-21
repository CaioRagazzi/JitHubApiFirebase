const functions = require('firebase-functions');
const express = require('express')
const cors = require('cors');
const inventario = require('./routes/inventario.js')
const user = require('./routes/users.js')
const login = require('./routes/login.js')
const connectionMysql = require("./data/connectionMysql")
const poolMiddleware = require("./data/poolMiddleware")

const app = express()

app.use(poolMiddleware(connectionMysql))

app.use([inventario, login, user])
app.use(cors());

exports.app = functions.https.onRequest(app);
