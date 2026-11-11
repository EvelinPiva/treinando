const express = require('express')
const app = express()
const cors = require('cors')

const conn = require('./db/conn')
const PORT = 3000
const hostname = 'localhost'

const fornecedorController = require('./controller/fornecedor.controller')
const funcionarioController = require('./controller/funcionario.controller')
const movimentacaoController = require('./controller/movimentacao.controller')
const produtoController = require('./controller/produto.controller')

require('./models/rel')
const authController = require('./controller/auth.controller')
const authMiddleware = require('./middleware/auth.middleware')

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())


app.post('/funcionario',funcionarioController.cadastrar)


app.get('/',(req,res)=>{
    res.status(200).json({message: 'Sincronizado'})
})
app.use(authMiddleware)
conn.sync()

.then(()=>{
    app.listen(PORT, hostname,()=>{
        console.log(`Servidor rodando em http://${hostname}:${PORT}`)
    })
})
.catch((err)=>{
    console.error('erro',err)
})