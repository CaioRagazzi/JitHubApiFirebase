const queriesOrganizacao = {
    getAllOrganizacoes: "SELECT * FROM tbOrganizacao WHERE org_pai_id = 0",
    insertNewOrganizacao: "INSERT INTO tbOrganizacao (org_pai_id, org_nome, endereco, responsavel, contato) VALUES (0, ?, ?, ?, ?)",
    updateOrganizacao: "UPDATE tbOrganizacao set org_nome = ?, endereco = ?, responsavel = ?, contato = ? WHERE org_id = ?",
    updateOrganizacaoUser: "UPDATE tbRelacUserOrganizacao SET org_id = ? WHERE user_id = ? and org_id = ?",
    deleteOrganizacaoUser: "DELETE FROM tbRelacUserOrganizacao WHERE user_id = ? and org_id = ?",
    deleteOrganizacao: "DELETE FROM tbOrganizacao WHERE org_id = ?"
}

module.exports = queriesOrganizacao