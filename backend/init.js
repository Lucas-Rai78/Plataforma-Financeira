  const connection = require('./connection')

  connection.serialize(() => {
    connection.run(`
      CREATE TABLE IF NOT EXISTS receitas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        data TEXT NOT NULL,
        descricao TEXT NOT NULL,
        valor REAL NOT NULL
      )
    `)

    connection.run(`
      CREATE TABLE IF NOT EXISTS despesas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        data TEXT NOT NULL,
        descricao TEXT NOT NULL,
        valor REAL NOT NULL
      )
    `)

    connection.run(`
      INSERT INTO despesas (data, descricao, valor) VALUES
        ('2026-06-26', 'Aluguel', 1000.0),
        ('2026-06-26', 'Internet', 120.0),
        ('2026-06-26', 'Conta de água', 80.0),
        ('2026-06-26', 'Conta de luz', 150.0)
    `)
    console.log('Tabelas criadas com sucesso!')
    console.log('Dados de receitas inseridos com sucesso!')
    console.log('Dados de despesas inseridos com sucesso!')
  })

  module.exports = connection
