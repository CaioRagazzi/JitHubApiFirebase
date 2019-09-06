const router = require('express').Router()
const cors = require('cors')
const queries = require('../../data/queries/estabelecimento')
const jwt = require('jsonwebtoken')
const verifyToken = require('../../jwt/jsontoken')

router.all('*', cors())

router.get('/all/:id', verifyToken, (req, res) => {

    jwt.verify(req.token, "qazwsxedcrfvtgbyhnujmik", (err, authData) => {
        if (err) {
            return res.status(403).json({ message: "Acesso não autorizado" })
        }
    })

    req.connection.query(queries.getAllEstabelecimento, [req.params.id], (err, rows, fields) => {
        if (err) {
            return res.status(500).json({ message: err.message })
        }
        res.status(200).json(rows);
    })
})

router.get('/User/:id', verifyToken, (req, res) => {

    jwt.verify(req.token, "qazwsxedcrfvtgbyhnujmik", (err, authData) => {
        if (err) {
            return res.status(403).json({ message: "Acesso não autorizado" })
        }
    })

    req.connection.query(queries.getEstabelecimentosByUser, [req.params.id], (err, rows, fields) => {
        if (err) {
            return res.status(500).json({ message: err.message })
        }
        res.status(200).json(rows);
    })
})

router.post('/:id', verifyToken, (req, res) => {

    jwt.verify(req.token, "qazwsxedcrfvtgbyhnujmik", (err, authData) => {
        if (err) {
            return res.status(403).json({ message: "Acesso não autorizado" })
        }
    })

    estabelecimento = {
        orgPai: req.params.id,
        nome: req.body.nome,
        endereco: req.body.endereco,
        responsavel: req.body.responsavel,
        contato: req.body.contato
    }

    req.connection.query(queries.insertEstabelecimento, [estabelecimento.orgPai, estabelecimento.nome, estabelecimento.endereco, estabelecimento.responsavel, estabelecimento.contato], (err, rows, fields) => {
        if (err) {
            if (err.message.includes("ER_DUP_ENTRY")) {
                return res.status(200).json({ message: 'Estabelecimento already exists' })
            }
            return res.status(500).json({ message: err.message })
        }
        res.status(200).json(rows);
    })
})

router.delete('/:id', verifyToken, (req, res) => {

    jwt.verify(req.token, "qazwsxedcrfvtgbyhnujmik", (err, authData) => {
        if (err) {
            return res.status(403).json({ message: "Acesso não autorizado" })
        }
    })

    req.connection.query(queries.deleteEstabelecimento, [req.params.id], (err, rows, fields) => {
        if (err) {
            if (err.message.includes("ER_ROW_IS_REFERENCED_2")) {
                return res.status(200).json({ message: 'Estabelecimento it is in use' })
            }
            return res.status(500).json({ message: err.message })
        }
        res.status(200).json(rows);
    })
})

router.put('/:id', verifyToken, (req, res) => {

    jwt.verify(req.token, "qazwsxedcrfvtgbyhnujmik", (err, authData) => {
        if (err) {
            return res.status(403).json({ message: "Acesso não autorizado" })
        }
    })

    estabelecimento = {
        orgId: req.params.id,
        nome: req.body.nome,
        endereco: req.body.endereco,
        responsavel: req.body.responsavel,
        contato: req.body.contato
    }

    req.connection.query(queries.updateEstabelecimento, [estabelecimento.nome, estabelecimento.endereco, estabelecimento.responsavel, estabelecimento.contato, estabelecimento.orgId], (err, rows, fields) => {
        if (err) {
            if (err.message.includes("ER_DUP_ENTRY")) {
                return res.status(200).json({ message: 'Estabelecimento already exists' })
            }
            return res.status(500).json({ message: err.message })
        }
        res.status(200).json(rows);
    })
})

module.exports = router