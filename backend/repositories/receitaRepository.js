const db = require('../connection')

function buscarTodas() {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM receitas', (err, rows) => {
      if (err) return reject(err)

      resolve(rows)
    })
  })
}

function buscarPorId(id) {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM receitas WHERE id = ?', [id], (err, row) => {
      if (err) return reject(err)

      resolve(row)
    })
  })
}

function criar(receita) {
  return new Promise((resolve, reject) => {
    const { data, descricao, valor } = receita

    db.run(
      'INSERT INTO receitas (data, descricao, valor) VALUES (?, ?, ?)',
      [data, descricao, valor],
      function (err) {
        if (err) return reject(err)

        resolve({
          id: this.lastID,
          data,
          descricao,
          valor,
        })
      },
    )
  })
}

function atualizar(id, receita) {
  return new Promise((resolve, reject) => {
    const { data, descricao, valor } = receita

    db.run(
      'UPDATE receitas SET data = ?, descricao = ?, valor = ? WHERE id = ?',
      [data, descricao, valor, id],
      function (err) {
        if (err) return reject(err)

        if (this.changes === 0) {
          return resolve(null)
        }

        resolve({
          id: Number(id),
          data,
          descricao,
          valor,
        })
      },
    )
  })
}

function deletar(id) {
  return new Promise((resolve, reject) => {
    db.run(
      'DELETE FROM receitas WHERE id = ?',
      [id],
      function (err) {
        if (err) return reject(err)

        resolve(this.changes > 0)
      },
    )
  })
}

module.exports = {
  buscarTodas,
  buscarPorId,
  criar,
  atualizar,
  deletar,
}