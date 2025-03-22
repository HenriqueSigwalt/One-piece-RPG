//inputs
const inputs=document.querySelectorAll("input")
//enviar
const send=document.querySelector(".send")
const new_atack=document.querySelector(".atack")

let ficha=new URLSearchParams(document.location.search).get("ficha")

let atack=""

fetch(`get_fichas?ficha=${ficha}`).then(res=>res.json()).then(data=>popula(data))

function popula(data){
    inputs[0].value=data.nome
    inputs[1].value=data.raca
    inputs[2].value=data.classe
    let status=data.status.split(";")
    for(i=3;i<10;i++){
        inputs[i].value=status[i-3]
    }
    let caracteristicas=data.caracteristicas.split(";")
    for(i=10;i<14;i++){
        inputs[i].value=caracteristicas[i-10]
    }
    let resistencia=data.resistencia.split(";")
    for(i=14;i<17;i++){
        inputs[i].value=resistencia[i-14]
    }
    inputs[17].value=data.nivel
    inputs[18].value=data.recompensa
    let pericias=data.pericias.split(";")
    for(i=19;i<35;i++){
        inputs[i].value=pericias[i-19]
    }
    atack=data.ataques
    let hakis=data.haki.split(";")
    for(i=40;i<44;i++){
        inputs[i].value=hakis[i-40]
    }
}

send.addEventListener("click",()=>{
    let status=""
    for(i=3;i<10;i++){
        let new_char=inputs[i].value
        status+=(new_char+";")
    }
    let caracteristicas=""
    for(i=10;i<14;i++){
        let new_char=inputs[i].value
        caracteristicas+=(new_char+";")
    }
    let resistencia=""
    for(i=14;i<17;i++){
        let new_char=inputs[i].value
        resistencia+=(new_char+";")
    }
    let pericias=""
    for(i=19;i<35;i++){
        let new_char=inputs[i].value
        pericias+=(new_char+";")
    }
    let hakis=""
    for(i=40;i<44;i++){
        let new_char=inputs[i].value
        hakis+=(new_char+";")
    }
    let char={
        nome:inputs[0].value,
        recompensa:inputs[18].value,
        status:status.slice(0,-1),
        caracteristicas:caracteristicas.slice(0,-1),
        haki:hakis.slice(0,-1),
        resistencia:resistencia.slice(0,-1),
        pericias:pericias.slice(0,-1),
        ataques:atack,
        nivel:inputs[17].value,
        raca:inputs[1].value,
        classe:inputs[2].value
    }
    console.log(char)
    fetch(`/edit_char?ficha=${ficha}`,{
        headers:{"Content-type": "application/json; charset=UTF-8"},
        method:'POST',
        body:JSON.stringify(char)
    })
    window.location=`/ficha?char=${ficha}`
})

new_atack.addEventListener("click",()=>{
    let new_atack=""
    for(i=35;i<40;i++){
        let new_char=inputs[i].value
        new_atack+=(new_char+":")
    }
    atack+=(";"+(new_atack.slice(0,-1)))
})