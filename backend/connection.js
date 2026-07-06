const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database('./database/database.db', (err) => {
  if (err) {
    console.error('Erro ao conectar no banco:', err.message)
  } else {
    console.log('Banco SQLite conectado com sucesso!')
  }
})

module.exports = db
