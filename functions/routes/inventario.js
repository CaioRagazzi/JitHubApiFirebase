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

router.post('/inventario', (req, res) => {

    var path = req.body.path;
    var docreference = req.body.docreference;
    var protocolo = req.body.id;

    console.log(req.body);

    delete req.body.path;
    delete req.body.docreference;
    delete req.body.id;

    Object.entries(req.body).forEach(([key, value]) => {

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

    res.sendStatus(201)
})

router.get('/inventario', (req, res) => {

    pool.query('SELECT * FROM tbInventario', (err, rows, fields) => {
        if (err) {
            console.error('error connecting: ' + err.stack);
            res.sendStatus(500)
            return;
        }
        res.json(rows)
    })
})

router.post('/relatorio', (req, res) => {

    const query = 'SELECT cdQuestionario, dsEstrutura, nmDocumento FROM tbInventario WHERE dsEstrutura in (?) group by cdQuestionario, dsEstrutura, nmDocumento'
    pool.query(query, [req.body.strings], (err, rows, fields) => {
        if (err) {
            console.error('error connecting: ' + err.stack);
            res.sendStatus(500)
            return;
        }
        res.json(rows)
    })
})

router.get('/relatorio/:id', (req, res) => {

    const query = 'SELECT * FROM tbInventario WHERE cdQuestionario = ?'
    pool.query(query, [req.params.id], (err, rows, fields) => {
        if (err) {
            console.error('error connecting: ' + err.stack);
            res.sendStatus(500)
            return;
        }
        res.json(rows)
    })
})

router.post('/imgUpload', (req, res) => {

    var protocolo = req.body.protocolo;
    var path = req.body.path;

    const query = "INSERT INTO tbInventarioImg (cdQuestionario, cdUrl) VALUES (?, ?)"
    pool.query(query, [protocolo, path], (err, rows, fields) => {
        if (err) {
            console.error('error connecting: ' + err.stack);
            res.sendStatus(500)
            return;
        }

        console.log('Inserted a new user with id: ', rows.insertId)
    })

    res.sendStatus(201)

})

router.get('/imagens/:id', (req, res) => {

    const query = 'SELECT * FROM tbInventarioImg WHERE cdQuestionario = ?'
    pool.query(query, [req.params.id], (err, rows, fields) => {
        if (err) {
            console.error('error connecting: ' + err.stack);
            res.sendStatus(500)
            return;
        }
        res.json(rows)
    })
    
})

module.exports = router
