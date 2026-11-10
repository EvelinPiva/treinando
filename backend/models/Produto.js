const {DataTypes} = require('sequelize')
const db = require('../db/conn')

const Produto = db.define('produto',{
    codProduto:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    idFornecedor:{
        type: DataTypes.INTEGER,
        references:{
            model: 'fornecedores',
            key: 'codFornecedor'
        },
        allowNull: false
    },
    descricao:{
        type: DataTypes.STRING,
        allowNull: false
    },
    categoria:{
        type: DataTypes.STRING,
        allowNull: false
    },
    qtdeEstoque:{
        type: DataTypes.STRING,
        allowNull: false
    },
    codLote:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    timestamps: false,
    tableName: 'produtos'
})
module.exports = Produto