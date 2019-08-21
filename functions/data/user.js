const queriesUser = {
    getUserByCpfAndPassword: "SELECT * FROM tbUser WHERE cpf = ? AND password = ?"
}

module.exports = queriesUser