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

router.put('/:id', verifyToken, (req, res) => {

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

    req.connection.query(queries.updateOrganizacao, [organizacao.nome, organizacao.endereco, organizacao.responsavel, organizacao.contato, req.params.id], (err, rows, fields) => {
        if (err) {
            if (err.message.includes("ER_DUP_ENTRY")) {
                return res.status(200).json({ message: 'Organizacao already exists' })
            }
            return res.status(500).json({ message: err.message })
        }
        res.status(201).json({ message: 'Updated a organizacao with id: ' + req.params.id });
    })
})

router.post('/updateUserOrg', verifyToken, (req, res) => {

    jwt.verify(req.token, "qazwsxedcrfvtgbyhnujmik", (err, authData) => {
        if (err){
            return res.status(403).json({ message: "Acesso não autorizado" })
        }
    })

    var organizacaoUser = {
        user: req.body.user_id,
        oldOrg: req.body.oldOrg_id,
        newOrg: req.body.newOrg_id
    }

    req.connection.query(queries.updateOrganizacaoUser, [organizacaoUser.newOrg, organizacaoUser.user, organizacaoUser.oldOrg], (err, rows, fields) => {
        if (err) {
            if (err.message.includes("ER_DUP_ENTRY")) {
                return res.status(200).json({ message: 'Organizacao already exists' })
            }
            return res.status(500).json({ message: err.message })
        }
        res.status(201).json({ message: 'Updated a organizacao/usuario with id: ' + organizacaoUser.user });
    })
})

router.post('/deleteUserOrg', verifyToken, (req, res) => {

    jwt.verify(req.token, "qazwsxedcrfvtgbyhnujmik", (err, authData) => {
        if (err){
            return res.status(403).json({ message: "Acesso não autorizado" })
        }
    })

    var organizacaoUser = {
        user: req.body.user_id,
        org: req.body.oldOrg_id
    }

    req.connection.query(queries.deleteOrganizacaoUser, [organizacaoUser.user, organizacaoUser.org], (err, rows, fields) => {
        if (err) {
            if (err.message.includes("ER_DUP_ENTRY")) {
                return res.status(200).json({ message: 'Organizacao already exists' })
            }
            return res.status(500).json({ message: err.message })
        }
        res.status(201).json({ message: 'Deleted a organizacao/usuario with id: ' + organizacaoUser.user });
    })
})

router.delete('/:id', verifyToken, (req, res) => {

    jwt.verify(req.token, "qazwsxedcrfvtgbyhnujmik", (err, authData) => {
        if (err){
            return res.status(403).json({ message: "Acesso não autorizado" })
        }
    })

    var organizacao = {
        org: req.params.id
    }

    req.connection.query(queries.deleteOrganizacao, [organizacao.org], (err, rows, fields) => {
        if (err) {
            if (err.message.includes("ER_ROW_IS_REFERENCED_2")) {
                return res.status(200).json({ message: 'Organizacao it is in use' })
            }
            return res.status(500).json({ message: err.message })
        }
        res.status(201).json({ message: 'Deleted a organizacao with id: ' + organizacao.org });
    })
})

module.exports = router