const express = require('express')
const router = express.Router()
const mysql = require('mysql')

const pool = mysql.createPool({
    connectionLimit: 400,
    host: '35.247.198.179',
    port: '3306',
    user: 'leandrotk',
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
    // const query = "INSERT INTO entries (guestName, content) VALUES (?, ?)"
    // pool.query(query, [req.body.guestName, req.body.content], (err, rows, fields) => {
    //     if (err) {
    //         console.error('error connecting: ' + err.stack);
    //         res.sendStatus(500)
    //         return;
    //     }
       
    //     console.log('Inserted a new user with id: ', rows.insertId)
    // })
    
    console.log(req.body);
    res.sendStatus(200)

    // res.send(req.body)
})

module.exports = router