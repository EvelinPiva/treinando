const {DataTypes} = require('sequelize')
const db = require('../db/conn')

const Fornecedor = db.define('fornecedor',{
    codFornecedor:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome:{
        type: DataTypes.STRING,
        allowNull: false
    },
    cpf:{
        type: DataTypes.STRING,
        allowNull: false
    },
    cnpj:{
        type: DataTypes.STRING,
        allowNull: false
    },
    codIdentificacao:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    timestamps: false,
    tableName: 'fornecedores'
})
module.exports = Fornecedor