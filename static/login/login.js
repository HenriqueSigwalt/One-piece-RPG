//elementos
const name=document.querySelector(".nome")
const password=document.querySelector(".senha")
const send=document.querySelector(".send")

//verificar login
send.addEventListener("click",()=>{
    let nome=name.value
    let senha=password.value
    if(nome==""||senha==""){
        alert("Algum dos campos não foi preenchido.")
    }
    else{
        fetch("/check",{
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
        alert("Usuario ou senha incorretos. Tente novamente.")
    }
}