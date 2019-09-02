const queriesDisciplina = {
    getAllDisciplinas: "SELECT b.area_nome, b.area_id, a.disc_id, a.disc_nome, a.create_time FROM tbDisciplina a INNER JOIN tbArea b on a.area_id = b.area_id",
    insertNewDisciplina: "INSERT INTO tbDisciplina (area_id, disc_nome) VALUES (?, ?)"
}

module.exports = queriesDisciplina