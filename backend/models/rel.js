const Fornecedor = require('./Fornecedor')
const Funcionario = require('./Funcionario')
const Produto = require('./Produto')
const Movimentacao = require('./Movimentacao')

Fornecedor.hasMany(Produto,{
    foreignKey: 'idFornecedor',
    as: 'produtoFornecedor',
    onDelete: 'CASCADE'
})

Produto.belongsTo(Fornecedor,{
    foreignKey: 'idFornecedor',
    as: 'fornecedorProduto',
    allowNull: false
})

Produto.hasMany(Movimentacao,{
    foreignKey: 'idProduto',
    as: 'movimentacaoProduto',
    onDelete: 'CASCADE'
})

Movimentacao.belongsTo(Produto,{
    foreignKey: 'idProduto',
    as: 'produtoMovimentacao',
    allowNull: false
})

module.exports = {Funcionario,Produto, Movimentacao, Fornecedor}