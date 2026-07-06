const { Router } = require('express')
const router = Router()

const receitaRepository = require('../repositories/receitaRepository')
const validarDados = require('../middlewares/validarDados')

router.get('/', async (req, res) => {
  console.log('ROTA RECEITAS CHAMADA')

  try {
    const receitas = await receitaRepository.buscarTodas()

    console.log('RESULTADO:', receitas)

    return res.json(receitas)
  } catch (error) {
    console.error('ERRO:', error)

    return res.status(500).json({
      error: error.message,
    })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const receita = await receitaRepository.buscarPorId(req.params.id)

    if (!receita) {
      return res.status(404).json({
        error: 'Receita não encontrada',
      })
    }

    return res.json(receita)
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    })
  }
})

router.post('/', validarDados, async (req, res) => {
  try {
    const novaReceita = await receitaRepository.criar(req.body)

    return res.status(201).json(novaReceita)
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    })
  }
})

router.put('/:id', validarDados, async (req, res) => {
  try {
    const receitaAtualizada =
      await receitaRepository.atualizar(
        req.params.id,
        req.body,
      )

    if (!receitaAtualizada) {
      return res.status(404).json({
        error: 'Receita não encontrada',
      })
    }

    return res.json(receitaAtualizada)
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const removida = await receitaRepository.deletar(
      req.params.id,
    )

    if (!removida) {
      return res.status(404).json({
        error: 'Receita não encontrada',
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
