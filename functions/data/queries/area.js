const queriesArea = {
    getAllArea: "SELECT * FROM tbArea",
    insertNewArea: "INSERT INTO tbArea (area_nome) VALUES (?)",
    updateArea: "UPDATE tbArea set area_nome = ? WHERE area_id = ?",
    deleteArea: "DELETE FROM tbArea WHERE area_id = ?"
}

module.exports = queriesArea