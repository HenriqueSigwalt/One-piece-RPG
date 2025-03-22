//elementos
const name=document.querySelector(".nome")
const password=document.querySelector(".senha")
const password_confirm=document.querySelector(".senha_confirma")
const send=document.querySelector(".send")

//verificar login
send.addEventListener("click",()=>{
    let nome=name.value
    let senha=password.value
    let confirma=password_confirm.value
    if(nome==""||senha==""||confirma==""){
        alert("Algum dos campos não foi preenchido.")
    }
    else if(senha!=confirma){
        alert("Senhas não condizem")
    }
    else{
        fetch("/register",{
            headers:{"Content-type": "application/json; charset=UTF-8"},
            method:'POST',
            body:JSON.stringify({nome:nome,senha:senha})
        }).then(res=>res.json()).then(data=>check(data))
    }
})

function check(data){
    if(data){
        localStorage.setItem("logado",JSON.stringify(data))
        window.location="/"
    }
    else{
        alert("Usuario já existe.")
    }
}