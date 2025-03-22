const name=document.querySelector(".name")
const bounty=document.querySelector(".bounty")
const mod=document.querySelectorAll(".mod")
const status=document.querySelectorAll(".status")
const value=document.querySelectorAll(".value")
const hp_max=document.querySelector(".hp_max")
const ac=document.querySelector(".ac")
const perception=document.querySelector(".perception")
const infamy=document.querySelector(".infamy")
const fortitude=document.querySelector(".fortitude")
const reflex=document.querySelector(".reflex")
const will=document.querySelector(".will")
const armament=document.querySelector(".armament")
const observation=document.querySelector(".observation")
const emperor=document.querySelector(".emperor")
const charge=document.querySelector(".charge")
const atacks=document.querySelector(".atacks")
const result=document.querySelector(".result")
const botao=document.querySelectorAll(".botao")
const char_img=document.querySelector(".char")

let mods=[0,0,0,0,0,0,0,0]

let ficha=new URLSearchParams(document.location.search).get("char")

fetch(`get_fichas?ficha=${ficha}`).then(res=>res.json()).then(data=>popula(data))

function popula(data){
    char_img.src=data.img
    name.innerHTML=data.nome
    bounty.innerHTML=`$${data.recompensa}`
    let stats=data.status.split(";")
    for(i=0;i<7;i++){
        let new_p=document.createElement("p")
        new_p.innerHTML=stats[i]
        value[i].appendChild(new_p)
        status[i].setAttribute("mod",Math.floor((stats[i]-10)/2))
        mods[i]=Math.floor((stats[i]-10)/2)
    }
    let caracteristicas=data.caracteristicas.split(";")
    let hp=document.createElement("p")
    hp.innerHTML=(Number(caracteristicas[0])+Number(data.classe)+(Number(data.raca)+mods[2])*Number(data.nivel))
    hp_max.appendChild(hp)
    let armor=document.createElement("p")
    armor.innerHTML=(Number(caracteristicas[1])+mods[1])
    ac.appendChild(armor)
    let percep=document.createElement("p")
    percep.innerHTML=(Number(caracteristicas[2])+mods[1])
    perception.appendChild(percep)
    perception.addEventListener("click",()=>{
        result.innerHTML=(Number(caracteristicas[2])+mods[1])+Math.floor(Math.random()*20)+1
    })
    let inf=document.createElement("p")
    inf.innerHTML=caracteristicas[3]
    infamy.appendChild(inf)
    let hakis=data.haki.split(";")
    let arm=document.createElement("p")
    arm.innerHTML=hakis[0]
    armament.appendChild(arm)
    let obs=document.createElement("p")
    obs.innerHTML=hakis[1]
    observation.appendChild(obs)
    let king=document.createElement("p")
    king.innerHTML=hakis[2]
    emperor.appendChild(king)
    let carga=document.createElement("p")
    carga.innerHTML=hakis[3]
    charge.appendChild(carga)
    let resistencia=data.resistencia.split(";")
    let fort=document.createElement("p")
    fort.innerHTML=(Number(resistencia[0])+mods[2])
    fortitude.appendChild(fort)
    fortitude.addEventListener("click",()=>{
        result.innerHTML=(Number(resistencia[0])+mods[2])+Math.floor(Math.random()*20)+1
    })
    let ref=document.createElement("p")
    ref.innerHTML=(Number(resistencia[1])+mods[1])
    reflex.appendChild(ref)
    reflex.addEventListener("click",()=>{
        result.innerHTML=(Number(resistencia[1])+mods[1])+Math.floor(Math.random()*20)+1
    })
    let wil=document.createElement("p")
    wil.innerHTML=(Number(resistencia[2])+mods[6])
    will.appendChild(wil)
    will.addEventListener("click",()=>{
        result.innerHTML=(Number(resistencia[2])+mods[6])+Math.floor(Math.random()*20)+1
    })
    let pericias=data.pericias.split(";")
    for(i=0;i<2;i++){
        let new_a=document.createElement("p")
        new_a.innerHTML=(Number(pericias[i])+mods[0])
        value[i+7].appendChild(new_a)
        status[i+7].setAttribute("mod",(Number(pericias[i])+mods[0]))
    }
    for(i=2;i<4;i++){
        let new_a=document.createElement("p")
        new_a.innerHTML=(Number(pericias[i])+mods[1])
        value[i+7].appendChild(new_a)
        status[i+7].setAttribute("mod",(Number(pericias[i])+mods[0]))
    }
    for(i=4;i<8;i++){
        let new_a=document.createElement("p")
        new_a.innerHTML=(Number(pericias[i])+mods[3])
        value[i+7].appendChild(new_a)
        status[i+7].setAttribute("mod",(Number(pericias[i])+mods[0]))
    }
    for(i=8;i<12;i++){
        let new_a=document.createElement("p")
        new_a.innerHTML=(Number(pericias[i])+mods[4])
        value[i+7].appendChild(new_a)
        status[i+7].setAttribute("mod",(Number(pericias[i])+mods[0]))
    }
    for(i=12;i<16;i++){
        let new_a=document.createElement("p")
        new_a.innerHTML=(Number(pericias[i])+mods[5])
        value[i+7].appendChild(new_a)
        status[i+7].setAttribute("mod",(Number(pericias[i])+mods[0]))
    }
    for(i=0;i<7;i++){
        let new_w=document.createElement("p")
        new_w.innerHTML=mods[i]
        mod[i].appendChild(new_w)
    }
    let ataques=data.ataques.split(";")
    for(i=0;i<ataques.length;i++){
        let atack=document.createElement("div")
        atack.className="atack"
        let partes=ataques[i].split(":")
        let atack_name=document.createElement("div")
        atack_name.innerHTML=partes[0]
        atack_name.className="atack_name"
        atack_name.setAttribute("mod",(mods[Number(partes[3])]+Number(partes[4])))
        let atack_bonus=document.createElement("div")
        atack_bonus.innerHTML=mods[Number(partes[3])]+Number(partes[4])
        atack_bonus.className="atack_bonus"
        let atack_damage=document.createElement("div")
        atack_damage.innerHTML=`${partes[1]}d${partes[2]}`
        atack_damage.setAttribute("dice",partes[2])
        atack_damage.setAttribute("num",partes[1])
        atack_damage.setAttribute("mod",(mods[Number(partes[3])]+Number(partes[4])))
        atack_damage.className="atack_damage"
        atacks.appendChild(atack)
        atack.appendChild(atack_name)
        atack.appendChild(atack_bonus)
        atack.appendChild(atack_damage)
        atack_name.addEventListener("click",()=>{
            result.innerHTML=Number(atack_name.getAttribute("mod"))+Math.floor(Math.random()*20)+1
        })
        atack_damage.addEventListener("click",()=>{
            result.innerHTML=atack_damage.getAttribute("num")*(Math.floor(Math.random()*atack_damage.getAttribute("dice"))+1)+Number(atack_damage.getAttribute("mod"))
        })
    }
    status.forEach(stat=>{
        stat.addEventListener("click",()=>{
            result.innerHTML=Number(stat.getAttribute("mod"))+Math.floor(Math.random()*20)+1
        })
    })
}

botao[0].addEventListener("click",()=>{
    window.location=`/editar?ficha=${ficha}`
})

botao[1].addEventListener("click",()=>{
    window.open("/mapa")
})

botao[2].addEventListener("click",()=>{
    window.location="/"
})

botao[3].addEventListener("click",()=>{
    localStorage.removeItem("logado")
    window.location="/"
})