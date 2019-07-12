const express = require('express')
const router = express.Router()
const mysql = require('mysql')

const pool = mysql.createPool({
    host: '35.247.198.179',
    port: '3306',
    user: 'caio',
    password: 'github',
    database: 'livro'
})

router.get('/users/:id', (req, res) => {

    pool.query(`SELECT * FROM entries where entryID = ${req.params.id}`, (err, rows, fields) => {
        if (err) {
            console.error('error connecting: ' + err.stack);
            res.sendStatus(500)
            return;
        }

        res.json(rows)
    })

})

router.get('/users', (req, res) => {

    pool.query('SELECT * FROM entries', (err, rows, fields) => {
        if (err) {
            console.error('error connecting: ' + err.stack);
            res.sendStatus(500)
            return;
        }

        res.json(rows)
    })
})

router.post('/users', (req, res) => {
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

module.exports = router