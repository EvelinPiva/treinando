const {DataTypes} = require('sequelize')
const db = require('../db/conn')

const Movimentacao = db.define('movimentacao',{
    codMovimentacao:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idProduto:{
        type: DataTypes.INTEGER,
        references:{
            model: 'produtos',
            key: 'codProduto'
        },
        allowNull: false
    },
    tipo:{
        type: DataTypes.ENUM('ENTRADA','SAIDA'),
        allowNull: false
    },
    qtde:{
        type: DataTypes.STRING,
        allowNull: false
    },
    data:{
        type: DataTypes.DATEONLY,
        allowNull: false
    },
},{
    timestamps: false,
    tableName: 'Movimentacoes'
})
module.exports = Movimentacao