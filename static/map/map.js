let map=document.querySelector(".map")
let wave=0
let char_list

fetch("/envia_mapa").then(res=>res.json()).then(data=>renderiza(data))

function renderiza(data){
    map.style.backgroundImage=`url(${data.fundo})`
    char_list=data.chars.split(";")
    create_wave()
    for(i=0;i<char_list.length;i++){
        let char_info=char_list[i].split(":")
    }
}

function create_wave(){
    for(i=0;i<char_list.length;i++){
        let char_info=char_list[i].split(":")
        if(char_info[3]==wave){
            fetch(`/get_fichas?ficha=${char_info[0]}`).then(res=>res.json()).then(data=>coloca_char([data,char_info[1],char_info[2]]))
        }
    }
}

function coloca_char(data){
    let char=document.createElement("div")
    char.className="char"
    char.style.backgroundImage=`url(${data[0].img})`
    char.style.top=`${(data[1]-1)*3}vw`
    char.style.left=`${(data[2]-1)*3}vw`
    console.log(data[1]*3)
    char.style.height=`3vw`
    char.style.width=`3vw`
    char.addEventListener("contextmenu",(e)=>{
        e.preventDefault()
        let answer=confirm("Quer deletar esse elemento?")
        if(answer){
            char.remove()
        }
    })
    map.appendChild(char)
    char.onmousedown=function(){
        drag=char
    }
}

let drag

document.onmouseup = function(e){
    drag=null
}

document.onmousemove = function(e){
    if(drag!=null){
        let x = e.pageX
        let y = e.pageY
        drag.style.left=`${x}px`
        drag.style.top=`${y}px`
    }
}

let audio=document.querySelector(".song")

document.addEventListener("click",()=>{
    audio.play()
    audio.addEventListener("ended",()=>{
        audio.play()
    })
})

document.addEventListener("keydown",(e)=>{
    let key=e.key
    if(key=="p"){
        wave++
        create_wave()
    }
})