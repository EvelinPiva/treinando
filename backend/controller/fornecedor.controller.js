const cryptoJS = require('crypto-js')
const CHAVE_SECRETA = 'segredo'
const Fornecedor = require('../models/Fornecedor')

const cadastrar = async(req,res)=>{
    const valores = req.body
    if(!valores.nome || !valores.cpf || !valores.cnpj || !valores.codIdentificacao){
        return res.status(400).json({message: 'Todos os campos são obrigatorios'})
    }
    try{
        senhaCrypto = cryptoJS.AES.encrypt(valores.senha, CHAVE_SECRETA).toString
        cpfCrypto = cryptoJS.AES.encrypt(valores.cpf, CHAVE_SECRETA ).toString

        await Funcionario.create({
            nome: valores.nome,
            cpf: cpfCrypto,
            cnpj: cnpj,
            codIdentificacao: codIdentificacao
        })
        return res.status(201).json({message: 'Fornecedor cadastrado'})
    }catch(err){
        res.status(500).json({message: 'Erro ao cadastrar Fornecedor'})
        console.error('Erro',err)
    }
}
const listar = async(req,res)=>{
    try{
        const fornecedor = await Fornecedor.findAll()
        if(!fornecedor){
            return res.status(404).json({message: 'Paciente não encontrado'})
        }
        
    }
}


module.exports = {cadastrar}