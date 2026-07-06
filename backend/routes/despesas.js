const { Router } = require('express')
const router = Router()

const despesaRepository = require('../repositories/despesaRepository')
const validarDados = require('../middlewares/validarDados')

router.get('/', async (req, res) => {
  try {
    const despesas = await despesaRepository.buscarTodas()

    return res.json(despesas)
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const despesa = await despesaRepository.buscarPorId(req.params.id)

    if (!despesa) {
      return res.status(404).json({
        error: 'Despesa não encontrada',
      })
    }

    return res.json(despesa)
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    })
  }
})

router.post('/', validarDados, async (req, res) => {
  try {
    const novaDespesa = await despesaRepository.criar(req.body)

    return res.status(201).json(novaDespesa)
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    })
  }
})

router.put('/:id', validarDados, async (req, res) => {
  try {
    const despesaAtualizada =
      await despesaRepository.atualizar(
        req.params.id,
        req.body,
      )

    if (!despesaAtualizada) {
      return res.status(404).json({
        error: 'Despesa não encontrada',
      })
    }

    return res.json(despesaAtualizada)
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const removida = await despesaRepository.deletar(
      req.params.id,
    )

    if (!removida) {
      return res.status(404).json({
        error: 'Despesa não encontrada',
      })
    }

    return res.status(204).send()
  } catch (error) {
    return res.status(500).json({ 
      error: error.message,
    })
  }
})

module.exports = router
