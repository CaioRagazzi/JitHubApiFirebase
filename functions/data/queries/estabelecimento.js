const queriesEstabelecimento = {
    getAllEstabelecimento: "SELECT * FROM tbOrganizacao WHERE org_pai_id = ?",
    insertEstabelecimento: "INSERT INTO tbOrganizacao (org_pai_id, org_nome, endereco, responsavel, contato) VALUES (?,?,?,?,?)",
    deleteEstabelecimento: "DELETE FROM tbOrganizacao WHERE org_id = ?",
    updateEstabelecimento: "UPDATE tbOrganizacao SET org_nome = ?, endereco = ?, responsavel = ?, contato = ? WHERE org_id = ?",
    getEstabelecimentosByUser: "select * from tbRelacUserOrganizacao a inner join tbOrganizacao b on a.org_id = b.org_id where user_id = ?"
}

module.exports = queriesEstabelecimento