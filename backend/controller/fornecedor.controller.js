const cryptoJS = require('crypto-js')
const CHAVE_SECRETA = 'segredo'
const Fornecedor = require('../models/Fornecedor')

const cadastrar = async(req,res)=>{
    const valores = req.body
    if(!valores.nome || !valores.senha || !valores.cpf || !valores.cnpj || !valores.codIdentificacao){
        return res.status(400).json({message: 'Preencha'})
    }
    try{
        const cpfCripto = cryptoJS.AES.encrypt(valores.cpf,CHAVE_SECRETA).toString()
        const senhaCripto = cryptoJS.AES.encrypt(valores.senha, CHAVE_SECRETA).toString()

        await Fornecedor.create({
            nome: valores.nome,
            cpf: cpfCripto,
            senha: senhaCripto,
            cnpj: valores.cnpj,
            codIdentificacao: valores.codIdentificacao
        })
        return res.statu(201).json({message: 'Fornecedor cadastrado com sucesso'})
    }catch(err){
        console.error('erro',err)
        res.status(500).json({message: 'erro'})
    }
}


const consultarId = async(req,res)=>{
    const id = req.params.id

    try{
        const fornecedor = await Fornecedor.findByPk(id)
        if(!fornecedor){
            return res.status(400).json({message: 'Fornecedor não enontrado'})
        }
        const bytes = cryptoJS.AES.decrypt(fornecedor.cpf,CHAVE_SECRETA)
        const cpfDescriptografado = bytes.toString(cryptoJS.enc.Utf8)

        return res.status(200).json({
            codFornecedor: fornecedor.codFornecedor,
            nome: fornecedor.nome,
            cpf: cpfDescriptografado,
            cnpj: fornecedor.cnpj,
            codIdentificacao: fornecedor.codIdentificacao

        })
    }catch(err){
        console.error('err',err)
        res.status(500).json({message: 'erro'})
    }
}
const consultarNome = async(req,res)=>{
    const id = req.params.id

    try{
        const fornecedor = await Fornecedor.findOne({where: {codFornecedor:id}})
        if(!fornecedor){
            return res.status(400).json({message: 'Fornecedor não enontrado'})
        }
        const bytes = cryptoJS.AES.decrypt(fornecedor.cpf,CHAVE_SECRETA)
        const cpfDescriptografado = bytes.toString(cryptoJS.enc.Utf8)

        return res.status(200).json({
            codFornecedor: fornecedor.codFornecedor,
            nome: fornecedor.nome,
            cpf: cpfDescriptografado,
            cnpj: fornecedor.cnpj,
            codIdentificacao: fornecedor.codIdentificacao

        })
    }catch(err){
        console.error('err',err)
        res.status(500).json({message: 'erro'})
    }
}
const apagar = async(req,res)=>{
    const id = req.params.id

    try{
        const fornecedor = await Fornecedor.findByPk(id)
        if(!fornecedor){
            return res.status(400).json({message: 'Fornecedor não enontrado'})
        }
        await Fornecedor.destroy({where: {codFornecedor:id}})
        return req.status(200).json({message: 'dados apagados'})
    }catch(err){
        console.error('err',err)
        res.status(500).json({message: 'erro'})
    }
}

const listar = async(req,res)=>{
    try {
        const fornecedor = await Fornecedor.findAll()

        if(!fornecedor){
            return res.status(404).json({message: "Motorista não encontrado!"})
        }

        const bytes = cryptoJS.AES.decrypt(fornecedor.cpf, CHAVE_SECRETA)

        const cpfCriptografado = bytes.toString(cryptoJS.enc.Utf8)

        const dados = {
            nome: fornecedor.nome,
            cpf: cpfCriptografado,
            email: fornecedor.email,
            telefone: fornecedor.telefone
        }

        return res.status(200).json(dados)

    } catch (err) {
        console.error('Erro ao consultar o fornecedor',err)
        return res.status(500).json({message: 'Erro ao consultar o fornecedor' })
    }
}


module.exports = {cadastrar,consultarId,consultarNome,apagar,listar}