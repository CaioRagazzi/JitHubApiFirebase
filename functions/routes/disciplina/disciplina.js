const router = require('express').Router()
const cors = require('cors')
const queries = require('../../data/queries/disciplina')
const jwt = require('jsonwebtoken')
const verifyToken = require('../../jwt/jsontoken')

router.all('*', cors())

router.get('/all', verifyToken, (req, res) => {
    
    jwt.verify(req.token, "qazwsxedcrfvtgbyhnujmik", (err, authData) => {
        if (err){
            return res.status(403).json({ message: "Acesso não autorizado" })
        }
    })

    req.connection.query(queries.getAllDisciplinas, (err, rows, fields) => {
        if (err) {
            return res.status(500).json({ message: err.message })
        }
        res.status(200).json(rows);
    })
})

router.post('/create', verifyToken, (req, res) => {

    jwt.verify(req.token, "qazwsxedcrfvtgbyhnujmik", (err, authData) => {
        if (err){
            return res.status(403).json({ message: "Acesso não autorizado" })
        }
    })

    var disciplina = {
        area_id: req.body.area_id,
        nome: req.body.nome
    }

    req.connection.query(queries.insertNewDisciplina, [disciplina.area_id, disciplina.nome], (err, rows, fields) => {
        if (err) {
            if (err.message.includes("ER_DUP_ENTRY")) {
                return res.status(200).json({ message: 'Disciplina already exists' })
            }
            return res.status(500).json({ message: err.message })
        }
        res.status(201).json({ message: 'Inserted a new disciplina with nome: ' + disciplina.nome });
    })
})

router.put('/:id', verifyToken, (req, res) => {

    jwt.verify(req.token, "qazwsxedcrfvtgbyhnujmik", (err, authData) => {
        if (err){
            return res.status(403).json({ message: "Acesso não autorizado" })
        }
    })

    var disciplina = {
        nome: req.body.nome,
        area_id: req.body.area_id
    }

    req.connection.query(queries.updateDisciplina, [disciplina.nome, disciplina.area_id, req.params.id], (err, rows, fields) => {
        if (err) {
            if (err.message.includes("ER_DUP_ENTRY")) {
                return res.status(200).json({ message: 'Disciplina already exists' })
            }
            return res.status(500).json({ message: err.message })
        }
        res.status(201).json({ message: 'Updated a disciplina with id: ' + req.params.id });
    })
})

module.exports = router