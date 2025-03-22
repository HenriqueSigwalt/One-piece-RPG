//inputs
const inputs=document.querySelectorAll("input")
//enviar
const send=document.querySelector(".send")
const new_atack=document.querySelector(".atack")

let atack=""
let new_img=""

inputs[37].addEventListener("change",(e)=>{
    let target=e.target.files[0]
    if(target){
    const reader=new FileReader()
    reader.addEventListener("load",(e)=>{
        let thisReader=e.target
        let img=document.createElement("img")
        img.classList.add('picture__image2')
        img.src=thisReader.result
        new_img=img.src
    })
    reader.readAsDataURL(target)
    }
})

send.addEventListener("click",()=>{
    let status=""
    for(i=3;i<10;i++){
        let new_char=inputs[i].value
        status+=(new_char+";")
    }
    let caracteristicas=""
    for(i=10;i<13;i++){
        let new_char=inputs[i].value
        caracteristicas+=(new_char+";")
    }
    let resistencia=""
    for(i=13;i<16;i++){
        let new_char=inputs[i].value
        resistencia+=(new_char+";")
    }
    let pericias=""
    for(i=16;i<32;i++){
        let new_char=inputs[i].value
        pericias+=(new_char+";")
    }
    let char={
        dono:JSON.parse(localStorage.getItem("logado"))[0],
        nome:inputs[0].value,
        recompensa:0,
        status:status.slice(0,-1),
        caracteristicas:(caracteristicas+"0"),
        haki:"0;0;0;2",
        resistencia:resistencia.slice(0,-1),
        pericias:pericias.slice(0,-1),
        ataques:atack.slice(0,-1),
        nivel:1,
        raca:inputs[1].value,
        classe:inputs[2].value,
        img:new_img
    }
    fetch("/new_char",{
        headers:{"Content-type": "application/json; charset=UTF-8"},
        method:'POST',
        body:JSON.stringify(char)
    })
})

new_atack.addEventListener("click",()=>{
    let new_atack=""
    for(i=32;i<37;i++){
        let new_char=inputs[i].value
        new_atack+=(new_char+":")
    }
    atack+=((new_atack.slice(0,-1))+";")
})