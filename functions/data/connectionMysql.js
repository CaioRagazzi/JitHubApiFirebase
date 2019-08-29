const mysql = require('mysql')

const pool = mysql.createPool({
    connectionLimit: 400,
    host: "35.247.198.179",
    port: "3306",
    user: "leandrotk",
    password: "github",
    database: "dbFirestore"
})

module.exports = pool
