const queriesEstabelecimento = {
    getAllEstabelecimento: "SELECT * FROM tbOrganizacao WHERE org_pai_id = ?",
    insertEstabelecimento: "INSERT INTO tbOrganizacao (org_pai_id, org_nome, endereco, responsavel, contato) VALUES (?,?,?,?,?)",
    deleteEstabelecimento: "DELETE FROM tbOrganizacao WHERE org_id = ?",
    updateEstabelecimento: "UPDATE tbOrganizacao SET org_nome = ?, endereco = ?, responsavel = ?, contato = ? WHERE org_id = ?"
}

module.exports = queriesEstabelecimento