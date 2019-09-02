const queriesOrganizacao = {
    getAllOrganizacoes: "SELECT * FROM tbOrganizacao",
    insertNewOrganizacao: "INSERT INTO tbOrganizacao (org_pai_id, org_nome, endereco, responsavel, contato) VALUES (0, ?, ?, ?, ?)",
    updateOrganizacao: "UPDATE tbOrganizacao set org_nome = ?, endereco = ?, responsavel = ?, contato = ? WHERE org_id = ?"
}

module.exports = queriesOrganizacao