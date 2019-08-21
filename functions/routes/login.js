const express = require('express')
const router = express.Router()
const cors = require('cors')
const queries = require('../data/user')
const jwt = require('jsonwebtoken')

router.all('*', cors())

router.post('/login', (req, res) => {

    var user = {
        cpf: req.body.cpf,
        senha: req.body.senha,
    }

    const token = jwt.sign({user: user}, 'secret')

    req.connection.query(queries.getUserByCpfAndPassword, [user.cpf, user.senha], (err, user) => {
        if (err) return res.status(500).json({message: err.message})
        res.status(200).json({
            user: user[0],
            token: token
        })
    })
})

module.exports = router
