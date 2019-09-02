const router = require('express').Router()
const cors = require('cors')
const queries = require('../../data/queries/organizacao')
const jwt = require('jsonwebtoken')
const verifyToken = require('../../jwt/jsontoken')

router.all('*', cors())

router.get('/all', verifyToken, (req, res) => {
    
    jwt.verify(req.token, "qazwsxedcrfvtgbyhnujmik", (err, authData) => {
        if (err){
            return res.status(403).json({ message: "Acesso não autorizado" })
        }
    })

    req.connection.query(queries.getAllOrganizacoes, (err, rows, fields) => {
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

    var organizacao = {
        nome: req.body.nome,
        endereco: req.body.endereco,
        responsavel: req.body.responsavel,
        contato: req.body.contato
    }

    req.connection.query(queries.insertNewOrganizacao, [organizacao.nome, organizacao.endereco, organizacao.responsavel, organizacao.contato], (err, rows, fields) => {
        if (err) {
            if (err.message.includes("ER_DUP_ENTRY")) {
                return res.status(200).json({ message: 'Organizacao already exists' })
            }
            return res.status(500).json({ message: err.message })
        }
        res.status(201).json({ message: 'Inserted a new organizacao with nome: ' + organizacao.nome });
    })
})

module.exports = router