const queriesUser = {
    getUserByCpf: "SELECT a.user_id, cpf, senha, email, nome, sobrenome, perfil_id, ativo_id, a.create_time, c.org_nome, c.org_id FROM tbUsuario a left join tbRelacUserOrganizacao b on a.user_id = b.user_id left join tbOrganizacao c on b.org_id = c.org_id WHERE cpf = ?",
    getUserByEstabelecimento: "select a.* FROM tbUsuario a where user_id in (select user_id from tbRelacUserOrganizacao b inner join tbOrganizacao c on b.org_id = c.org_id WHERE c.org_pai_id = ?)",
    insertNewUser: "INSERT INTO tbUsuario (cpf, senha, email, nome, sobrenome, perfil_id, ativo_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
    getAllUser: "select a.* FROM tbUsuario a where user_id in (select user_id from tbRelacUserOrganizacao b inner join tbOrganizacao c on b.org_id = c.org_id)",
    deleteUserByCpf: "DELETE FROM tbUsuario WHERE cpf = ?",
    insertUserOrganizacao: "INSERT INTO tbRelacUserOrganizacao (user_id, org_id) VALUES ?",
    updateUser: "UPDATE tbUsuario SET email = ?, nome = ?, sobrenome = ?, perfil_id = ?, ativo_id = 1 WHERE cpf = ?",
    updateUserOrganizacao: "UPDATE tbRelacUserOrganizacao SET org_id = ? WHERE user_id = ? and org_id = ?"
}

module.exports = queriesUser