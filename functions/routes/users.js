const express = require('express')
const router = express.Router()
const mysql = require('mysql')

const pool = mysql.createPool({
    connectionLimit: 400,
    host: '35.247.198.179',
    port: '3306',
    user: 'leandrotk',
    password: 'github',
    database: 'dbFirestore'
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
    var teste = {
        path: 'Nivel1/Formulario 2',
        docreference: 'Formulario 2',
        Caioooo: 'mmmm',
        id: '20190716110108',
        'Data de Nascimento': '16/07/2019'
    }

    var path = teste.path;
    var docreference = teste.docreference;
    var protocolo = teste.id;

    delete teste.path;
    delete teste.docreference;
    delete teste.id;

    Object.entries(teste).forEach(([key, value]) => {

        const query = "INSERT INTO tbInventario (dsEstrutura, nmDocumento, cdQuestionario, dsQuestao, dsResposta) VALUES (?, ?, ?, ?, ?)"
        pool.query(query, [path, docreference, protocolo, key, value], (err, rows, fields) => {
            if (err) {
                console.error('error connecting: ' + err.stack);
                res.sendStatus(500)
                return;
            }

            console.log('Inserted a new user with id: ', rows.insertId)
        })

    })

    res.sendStatus(200)
})

module.exports = router