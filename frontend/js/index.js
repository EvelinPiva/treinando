const verificar_log = document.getElementById('verificar_log')
const token = localStorage.getItem('token')
const nome = localStorage.getItem('nome')

if(token){
    verificar_log.innerHTML+=`<a href="#">LOGOUT</a>`
    verificar_log.innerHTML+=`<span id="titulo_menu">${nome}</span>`

    const btn_logout = document.getElementById('btn_logout')
    btn_logout.addEventListener('click',()=>{
        localStorage.clear()
        localStorage.reload()
    })
}else{
    verificar_log.innerHTML+=`<a href=".html/login.html">LOGIN</a>`
}