const router = require('express').Router()
const cors = require('cors')
const queries = require('../../data/queries/area')
const jwt = require('jsonwebtoken')
const verifyToken = require('../../jwt/jsontoken')

router.all('*', cors())

router.get('/all', verifyToken, (req, res) => {
    
    jwt.verify(req.token, "qazwsxedcrfvtgbyhnujmik", (err, authData) => {
        if (err){
            return res.status(403).json({ message: "Acesso não autorizado" })
        }
    })

    req.connection.query(queries.getAllArea, (err, rows, fields) => {
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

    var area = {
        nome: req.body.nome
    }

    req.connection.query(queries.insertNewArea, [area.nome], (err, rows, fields) => {
        if (err) {
            if (err.message.includes("ER_DUP_ENTRY")) {
                return res.status(200).json({ message: 'Area already exists' })
            }
            return res.status(500).json({ message: err.message })
        }
        res.status(201).json({ message: 'Inserted a new area with nome: ' + area.nome });
    })
})

router.put('/:id', verifyToken, (req, res) => {

    jwt.verify(req.token, "qazwsxedcrfvtgbyhnujmik", (err, authData) => {
        if (err){
            return res.status(403).json({ message: "Acesso não autorizado" })
        }
    })

    var area = {
        nome: req.body.nome
    }

    req.connection.query(queries.updateArea, [area.nome, req.params.id], (err, rows, fields) => {
        if (err) {
            if (err.message.includes("ER_DUP_ENTRY")) {
                return res.status(200).json({ message: 'Area already exists' })
            }
            return res.status(500).json({ message: err.message })
        }
        res.status(201).json({ message: 'Updated a area with id: ' + req.params.id });
    })
})

router.delete('/:id', verifyToken, (req, res) => {

    jwt.verify(req.token, "qazwsxedcrfvtgbyhnujmik", (err, authData) => {
        if (err){
            return res.status(403).json({ message: "Acesso não autorizado" })
        }
    })

    var area = {
        area_id: req.params.id
    }

    req.connection.query(queries.deleteArea, [area.area_id], (err, rows, fields) => {
        if (err) {
            if (err.message.includes("ER_ROW_IS_REFERENCED_2")) {
                return res.status(200).json({ message: 'Area it is in use' })
            }
            return res.status(500).json({ message: err.message })
        }
        res.status(201).json({ message: 'Deleted area with id: ' + req.params.id });
    })
})

module.exports = router