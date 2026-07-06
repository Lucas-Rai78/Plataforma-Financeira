const db = require('../connection')

function buscarTotalReceitas() {
  return new Promise((resolve, reject) => {
    db.get('SELECT SUM(valor) AS totalReceitas FROM receitas', (err, row) => {
      if (err) {
        return reject(err)
      }

      resolve(row.totalReceitas || 0)
    })
  })
}

function buscarTotalDespesas() {
  return new Promise((resolve, reject) => {
    db.get('SELECT SUM(valor) AS totalDespesas FROM despesas', (err, row) => {
      if (err) {
        return reject(err)
      }

      resolve(row.totalDespesas || 0)
    })
  })
}

async function buscarSaldo() {
  const [totalReceitas, totalDespesas] = await Promise.all([
    buscarTotalReceitas(),
    buscarTotalDespesas(),
  ])

  return {
    totalReceitas,
    totalDespesas,
    saldo: totalReceitas - totalDespesas,
  }
}

module.exports = {
  buscarTotalReceitas,
  buscarTotalDespesas,
  buscarSaldo,
}
