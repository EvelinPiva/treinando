
const cryptoJS = require('crypto-js')
const CHAVE_SECRETA = 'segredo'

function authMiddleware(req,res,next){
    const token = req.headers['authorization']
    if(!token){
        return res.status(401).json({message: 'Acesso negado'})

}
try{
    const bytes = cryptoJS.AES.decrypt(token,CHAVE_SECRETA)
    const dadosDescrypt = bytes.toString(cryptoJS.enc.Utf8)

    if(!dadosDescrypt){
        return res.status(401).json({message: 'Token inválido'})
    }
    const payload = JSON.parse(dadosDescrypt)
    if(Date.now() > payload.expiraEm){
        return res.status(401).json({message: 'token expirado'})
    }
    req.usuario =payload
    next()
}catch(err){
    console.error('err',err)
    res.status(500).json({message: 'erro'})
}



   
}
module.exports = authMiddleware