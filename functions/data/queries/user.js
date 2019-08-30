const queriesUser = {
    getUserByCpf: "SELECT * FROM tbUsuario WHERE cpf = ?",
    insertNewUser: "INSERT INTO tbUsuario (cpf, senha, email, nome, sobrenome, perfil_id, ativo_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
    getAllUser: "SELECT * FROM tbUsuario",
    deleteUserByCpf: "DELETE FROM tbUsuario WHERE cpf = ?"
}

module.exports = queriesUser