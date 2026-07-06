const express = require('express')

const receitasRoutes = require('./routes/receitas')
const despesasRoutes = require('./routes/despesas')
const saldoRoutes = require('./routes/saldo')

const app = express()
const port = 3000

app.use(express.json())

app.use('/receitas', receitasRoutes)
app.use('/despesas', despesasRoutes)
app.use('/saldo', saldoRoutes)

app.get('/', (req, res) => {
  res.send('API de Controle Financeiro está funcionando!')
})

app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`),
)
