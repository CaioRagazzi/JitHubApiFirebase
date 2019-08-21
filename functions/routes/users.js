const express = require('express')
const router = express.Router()
const mysql = require('mysql')
const cors = require('cors')

router.all('*', cors())

const pool = mysql.createPool({
    connectionLimit: 400,
    host: '35.247.198.179',
    port: '3306',
    user: 'leandrotk',
    password: 'github',
    database: 'dbFirestore'
})

router.get('/users/:id', (req, res) => {

    pool.query(`SELECT * FROM tbUser where cpf = ${req.params.id}`, (err, rows, fields) => {
        if (err) {
            res.status(500).json({message: err.message})
            return
        }
        res.json(rows)
    })

})

router.get('/users', (req, res) => {

    pool.query('SELECT * FROM tbUser', (err, rows, fields) => {
        if (err) {
            res.status(500).json({message: err.message})
            return
        }
        res.json(rows)
    })
})

router.post('/users', (req, res) => {


    var cpf = req.body.cpf;
    var senha = req.body.senha;
    var email = req.body.email;

    const query = "INSERT INTO tbUser (cpf, password, email) VALUES (?, ?, ?)"
    pool.query(query, [cpf, senha, email], (err, rows, fields) => {
        if (err) {
            res.status(500).json({message: err.message})
            return
        }
        res.status(201).json({ message: 'Inserted a new user with cpf: ' + cpf});
    })    
})

module.exports = router