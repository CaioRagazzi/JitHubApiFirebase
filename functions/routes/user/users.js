const router = require('express').Router()
const cors = require('cors')
const queries = require('../../data/queries/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const verifyToken = require('../../jwt/jsontoken')

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
                res.status(403).json({ message: "Usuário e/ou senha Inválidos" })
            }

            const validPass = bcrypt.compareSync(user.password, data[0].senha)

            if (!validPass) {
                res.status(403).json({ message: "Usuário e/ou senha Inválidos" })
            } else {
                const token = jwt.sign({ user: data[0] }, "qazwsxedcrfvtgbyhnujmik")

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
        if (err) {
            return res.status(403).json({ message: "Acesso não autorizado" })
        }
    })

    // Hash passwords
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(req.body.password, salt)

    var user = {
        cpf: req.body.cpf,
        password: hashedPassword,
        email: req.body.email,
        nome: req.body.nome,
        sobrenome: req.body.sobrenome,
        perfil: req.body.perfil,
        ativo: req.body.ativo,
        organizacao: req.body.organizacao
    }

    req.connection.query(queries.insertNewUser, [user.cpf, user.password, user.email, user.nome, user.sobrenome, user.perfil, user.ativo], (err, rows, fields) => {
        if (err) {
            if (err.message.includes("ER_DUP_ENTRY")) {
                return res.status(200).json({ message: 'User already exists' })
            }
            return res.status(500).json({ message: err.message })
        } else {
            var userOrg = []
            user.organizacao.map(item => {
                userOrg.push([rows.insertId, item])
            })

            req.connection.query(queries.insertUserOrganizacao, [userOrg], (err, rows, fields) => {
                if (err) {
                    return res.status(500).json({ message: err.message })
                }
                res.status(201).json({ message: 'Inserted a new user with cpf: ' + user.cpf });
            })
        }
    })
})

router.get('/all', verifyToken, (req, res) => {

    jwt.verify(req.token, "qazwsxedcrfvtgbyhnujmik", (err, authData) => {
        if (err) {
            return res.status(403).json({ message: "Acesso não autorizado" })
        }
    })

    req.connection.query(queries.getAllUser, (err, rows, fields) => {
        if (err) {
            return res.status(500).json({ message: err.message })
        }
        res.status(200).json(rows);
    })
})

router.get('/:id', verifyToken, (req, res) => {

    jwt.verify(req.token, "qazwsxedcrfvtgbyhnujmik", (err, authData) => {
        if (err) {
            return res.status(403).json({ message: "Acesso não autorizado" })
        }
    })

    req.connection.query(queries.getUserByCpf, [req.params.id], (err, rows, fields) => {
        if (err) {
            console.error('error connecting: ' + err.stack);
            res.sendStatus(500)
            return;
        }
        res.json(rows)
    })
})

router.get('/estabelecimento/:id', verifyToken, (req, res) => {

    jwt.verify(req.token, "qazwsxedcrfvtgbyhnujmik", (err, authData) => {
        if (err) {
            return res.status(403).json({ message: "Acesso não autorizado" })
        }
    })

    req.connection.query(queries.getUserByEstabelecimento, [req.params.id], (err, rows, fields) => {
        if (err) {
            console.error('error connecting: ' + err.stack);
            res.sendStatus(500)
            return;
        }
        res.json(rows)
    })
})

router.delete('/deleteUserOrg/:id', verifyToken, (req, res) => {    

    jwt.verify(req.token, "qazwsxedcrfvtgbyhnujmik", (err, authData) => {
        if (err) {
            return res.status(403).json({ message: "Acesso não autorizado" })
        }
    })

    req.connection.query(queries.deleteUserOrganizacao, [req.params.id], (err, rows, fields) => {
        if (err) {
            console.error(err);
            res.sendStatus(500)
            return
        } else {
            req.connection.query(queries.deleteUserByCpf, [req.params.id], (err, rows, fields) => {
                if (err) {
                    console.error(err);
                    res.sendStatus(500)
                    return
                }
                res.json(rows)
            })
        }
    })
})

router.put('/:id', verifyToken, (req, res) => {

    jwt.verify(req.token, "qazwsxedcrfvtgbyhnujmik", (err, authData) => {
        if (err) {
            return res.status(403).json({ message: "Acesso não autorizado" })
        }
    })

    // Hash passwords
    const salt = bcrypt.genSaltSync(10)

    var user = {
        cpf: req.params.id,
        email: req.body.email,
        nome: req.body.nome,
        sobrenome: req.body.sobrenome,
        perfil: req.body.perfil_id
    }

    req.connection.query(queries.updateUser, [user.email, user.nome, user.sobrenome, user.cpf], (err, rows, fields) => {
        if (err) {
            if (err.message.includes("ER_DUP_ENTRY")) {
                return res.status(200).json({ message: 'Usuario already exists' })
            }
            return res.status(500).json({ message: err.message })
        }
        res.status(201).json({ message: 'Updated a usuario with cpf: ' + req.params.id });
    })
})

router.post('/inserUserOrganizacao', verifyToken, (req, res) => {

    jwt.verify(req.token, "qazwsxedcrfvtgbyhnujmik", (err, authData) => {
        if (err) {
            return res.status(403).json({ message: "Acesso não autorizado" })
        }
    })

    model = {
        userId: req.body.user_id,
        orgId: req.body.org_id
    }

    req.connection.query(queries.insertUserOrganizacao, [model.userId, model.orgId], (err, rows, fields) => {
        if (err) {
            console.error('error connecting: ' + err.stack);
            res.sendStatus(500)
            return;
        }
        res.json(rows)
    })
})

router.post('/deleteUserOrganizacao', verifyToken, (req, res) => {

    jwt.verify(req.token, "qazwsxedcrfvtgbyhnujmik", (err, authData) => {
        if (err) {
            return res.status(403).json({ message: "Acesso não autorizado" })
        }
    })

    model = {
        userId: req.body.user_id,
        orgId: req.body.org_id
    }

    req.connection.query(queries.deletetUserOrganizacao, [model.userId, model.orgId], (err, rows, fields) => {
        if (err) {
            console.error('error connecting: ' + err.stack);
            res.sendStatus(500)
            return;
        }
        res.json(rows)
    })
})

router.get('/estabelecimento/:id', verifyToken, (req, res) => {

    jwt.verify(req.token, "qazwsxedcrfvtgbyhnujmik", (err, authData) => {
        if (err) {
            return res.status(403).json({ message: "Acesso não autorizado" })
        }
    })

    req.connection.query(queries.getUserByEstabelecimento, [req.params.id], (err, rows, fields) => {
        if (err) {
            console.error('error connecting: ' + err.stack);
            res.sendStatus(500)
            return;
        }
        res.json(rows)
    })
})

module.exports = router
