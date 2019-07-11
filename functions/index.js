const functions = require('firebase-functions');

const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use(morgan('short'))

const pool = mysql.createPool({
    host: '35.247.198.179',
    port: '3306',
    user: 'caio',
    password: 'github',
    database: 'livro'
})

app.get('/users/:id', (req, res) => {

    pool.query(`SELECT * FROM entries where entryID = ${req.params.id}`, (err, rows, fields) => {
        if (err) {
            console.error('error connecting: ' + err.stack);
            res.sendStatus(500)
            return;
        }

        res.json(rows)
    })

})

app.get('/users', (req, res) => {

    pool.query('SELECT * FROM entries', (err, rows, fields) => {
        if (err) {
            console.error('error connecting: ' + err.stack);
            res.sendStatus(500)
            return;
        }

        res.json(rows)
    })
})

app.post('/users', (req, res) => {
    pool.query(`INSERT INTO entries SET guestName = '${req.body.guestName}', content = '${req.body.content}', entryID = 7`, (err, rows, fields) => {
        if (err) {
            console.error('error connecting: ' + err.stack);
            res.sendStatus(500)
            return;
        }

        console.log('Inserted a new user with id: ', rows.insertId)
    })

    res.send(req.body)
})



exports.app = functions.https.onRequest(app);
