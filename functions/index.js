const functions = require('firebase-functions');
const express = require('express')
const cors = require('cors');
const user = require('./routes/user/users.js')
const organizacao = require('./routes/organizacao/organizacao.js')
const area = require('./routes/area/area')
const disciplina = require('./routes/disciplina/disciplina')
const connectionMysql = require("./data/connectionMysql")
const poolMiddleware = require("./data/poolMiddleware")

const app = express()

app.use(poolMiddleware(connectionMysql))

app.use('/api/user', user)
app.use('/api/organizacao', organizacao)
app.use('/api/area', area)
app.use('/api/disciplina', disciplina)
app.use(cors());

exports.app = functions.https.onRequest(app);
