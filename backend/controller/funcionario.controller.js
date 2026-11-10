const cryptoJS = require('crypto-js')
const CHAVE_SECRETA = 'segredo'
const Funcionario = require('../models/Funcionario')

const cadastrar = async(req,res)=>{
    const valores = req.body
    if(!valores.nome || !valores.email || !valores.senha){
        return res.status(400).json({message: 'Todos os campos são obrigatorios'})
    }
    try{
        senhaCrypto = cryptoJS.AES.encrypt(valores.senha, CHAVE_SECRETA).toString
        cpfCrypto = cryptoJS.AES.encrypt(valores.cpf, CHAVE_SECRETA ).toString

        await Funcionario.create({
            nome: valores.nome,
            email: valores.email,
            senha: senhaCrypto,
            cpf: cpfCrypto
        })
        return res.status(201).json({message: 'Funcionário cadastrado'})
    }catch(err){
        res.status(500).json({message: 'Erro ao cadastrar Funcionário'})
        console.error('Erro',err)
    }
}


module.exports = {cadastrar}