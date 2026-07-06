const { Router } = require('express')
const router = Router()

const saldoRepository = require('../repositories/saldoRepository')

router.get('/', async (req, res) => {
  try {
    const saldo = await saldoRepository.buscarSaldo()

    return res.json(saldo)
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    })
  }
})

module.exports = router