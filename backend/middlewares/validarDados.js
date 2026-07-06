const validarDados = (req, res, next) => {
  const { data, descricao, valor } = req.body

  if (!data || !descricao || valor === undefined) {
    return res.status(400).json({
      error: 'data, descricao e valor são obrigatórios',
    })
  }

  if (typeof descricao !== 'string' || descricao.trim() === '') {
    return res.status(400).json({
      error: 'Descrição inválida',
    })
  }

  if (typeof valor !== 'number' || valor <= 0) {
    return res.status(400).json({
      error: 'Valor deve ser um número maior que 0',
    })
  }

  const dataValida = /^\d{4}-\d{2}-\d{2}$/.test(data)
  if (!dataValida) {
    return res.status(400).json({
      error: 'Data inválida (use o formato YYYY-MM-DD)',
    })
  }

  next()
}

module.exports = validarDados