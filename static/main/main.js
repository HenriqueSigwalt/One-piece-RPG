//seções
const unlogged=document.querySelector(".unlodged")
const logged=document.querySelector(".logged")
//botões
const log=document.querySelector(".log")
const sing=document.querySelector(".sing")
const enter=document.querySelector(".enter")
const loggout=document.querySelector(".loggout")
//select
const chars=document.querySelector(".chars")

//verificar login
let logado=JSON.parse(localStorage.getItem("logado"))||false
console.log(logado)
if(logado){
    unlogged.style.display="none"
    logged.style.display="flex"
    let dono=JSON.parse(localStorage.getItem("logado"))[0]
    if(logado[1]){
        let mestre=document.querySelector(".mestre")
        mestre.style.display="block"
        mestre.addEventListener("click",()=>{
            window.location="/novo_mapa"
        })
    }
    fetch(`/send_fichas?dono=${dono}`).then(res=>res.json()).then(data=>fill(data))
}

function fill(data){
    for(i=0;i<data.length;i++){
        let option=document.createElement("option")
        option.value=data[i].ID
        option.innerHTML=data[i].nome
        chars.appendChild(option)
    }
}

//redirects
log.addEventListener("click",()=>{
    window.location="/entrar"
})

sing.addEventListener("click",()=>{
    window.location="/cadastrar"
})

enter.addEventListener("click",()=>{
    let ficha=chars.value
    window.location=`/ficha?char=${ficha}`
})

loggout.addEventListener("click",()=>{
    localStorage.removeItem("logado")
    window.location="/"
})