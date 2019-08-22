const router = require('express').Router()
const cors = require('cors')
const queries = require('../data/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const verifyToken = require('../jwt/jsontoken')

router.all('*', cors())

router.post('/login', (req, res) => {

    var user = {
        cpf: req.body.cpf,
        password: req.body.password,
    }

    req.connection.query(queries.getUserByCpf, [user.cpf], (err, data) => {
        if (err) {
            return res.status(500).json({ message: err.message })
        } else {
            if (data.length <= 0) {
                res.status(200).json({ message: "Usuário e/ou senha Inválidos" })
            }

            const validPass = bcrypt.compareSync(user.password, data[0].password)

            if (!validPass) {
                res.status(200).json({ message: "Usuário e/ou senha Inválidos" })
            } else {
                const token = jwt.sign({ user: user }, "qazwsxedcrfvtgbyhnujmik")

                res.status(200).json({
                    user: data[0],
                    token: token
                })
            }
        }
    })
})

router.post('/create', verifyToken, (req, res) => {

    jwt.verify(req.token, "qazwsxedcrfvtgbyhnujmik", (err, authData) => {
        if (err){
            return res.status(403).json({ message: "Acesso não autorizado" })
        }
    })

    // Hash passwords
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(req.body.password, salt)

    var user = {
        cpf: req.body.cpf,
        password: hashedPassword,
        email: req.body.email
    }

    const query = "INSERT INTO tbUser (cpf, password, email) VALUES (?, ?, ?)"
    req.connection.query(query, [user.cpf, user.password, user.email], (err, rows, fields) => {
        if (err) {
            return res.status(500).json({ message: err.message })
        }
        res.status(201).json({ message: 'Inserted a new user with cpf: ' + user.cpf });
    })
})

module.exports = router
