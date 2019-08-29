const router = require('express').Router()
const cors = require('cors')
const queries = require('../data/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

router.all('*', cors())

router.post('/login', (req, res) => {

    //Hash passwords
    const salt = await bcrypt.getSalt(10)

    var user = {
        cpf: req.body.cpf,
        password: req.body.password,
    }

    const token = jwt.sign({ user: user }, 'secret')

    req.connection.query(queries.getUserByCpfAndPassword, [user.cpf, user.password], (err, user) => {
        if (err) {
            return res.status(500).json({ message: err.message })
        } else {
            if (user.length > 0) {
                res.status(200).json({
                    user: user[0],
                    token: token
                })
            } else {
                res.status(200).json({ message: "Usuário e/ou senha Inválidos" })
            }
        }

<<<<<<< HEAD
    req.connection.query(queries.getUserByCpfAndPassword, [user.cpf, user.password], (err, user) => {
        if (err) return res.status(500).json({message: err.message})
        res.status(200).json({
            user: user[0],
            token: token
        })
=======
>>>>>>> 352f042ce43eeeede637b9e73e3c02ad03fe977a
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
