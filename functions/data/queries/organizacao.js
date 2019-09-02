const queriesOrganizacao = {
    getAllOrganizacoes: "SELECT * FROM tbOrganizacao",
    insertNewOrganizacao: "INSERT INTO tbOrganizacao (org_pai_id, org_nome, endereco, responsavel, contato) VALUES (0, ?, ?, ?, ?)"
}

module.exports = queriesOrganizacao