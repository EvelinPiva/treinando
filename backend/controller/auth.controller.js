const cryptoJS = require('crypto-js')
const CHAVE_SECRETA = 'segredo'
const Funcionario = require('../models/Funcionario')

const login = async(req, res)=>{
    const valores = req.body
    if(!valores.email || !valores.senha){
        return res.status(500).json({message: 'Para fazer login é necessário preencher senha e email'})
    }
    try{
        const funcionario = await Funcionario.findOne({where: {email: valores.email}})
        if(!paciente){
            return res.status(404).json({message: 'Token inválido'})
        }
        const bytes = cryptoJS.AES.decrypt(funcionario.senha, CHAVE_SECRETA)
        console.log(bytes)
        const senhaBD = bytes.toString(cryptoJS.enc.Utf8)
        console.log(senhaBD)

        if(valores.senha !== senhaBD){
            return res.status(401).json({message: 'Senha incorreta'})
        }

        const duasHorasMs = 2 * 60 * 60 *1000 // 240 minutos
        const tempoExpira = Date.now() + duasHorasMs

        const payload ={
            codFuncionario : funcionario.codFuncionario,
            nome: funcionario.nome,
            token: token
        }
    }catch(err){
        res.status(500).json({message: 'Erro ao logar'})
        console.error('erro',err)
    }
}
module.exports = {login}