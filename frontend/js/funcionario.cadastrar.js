let resposta = document.getElementById('resposta')
let btn_cadastrar = document.getElementById('btn_cadastrar')

btn_cadastrar.addEventListener('click',(e)=>{
    e.preventDefault()
    
    const nome = document.getElementById('nome').value 
    const email = document.getElementById('email').value
    const senha = document.getElementById('senha').value 

    const valores ={
        nome: nome,
        email: email,
        senha: senha
    }
    console.log(valores)

    fetch('http://localhost:3000/funcionario',{
        method: 'POST',
        headers: {'Content-Type' : 'application-json'},
        body: JSON.stringify(valores)
    })
    .then(res => res.json())
    .then(dados=>{
        resposta.innerHTML = `<p> ${dados.message}</p>`
        document.querySelector('form').reset()
    })
    .catch(err=>{
        console.error('erro ao cadastrar dados',err)
        resposta.innerHTML = `<p> Erro ao tentar conectar com servidor </p>`
    })
})