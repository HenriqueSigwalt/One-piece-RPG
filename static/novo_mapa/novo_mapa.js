let char_id=document.querySelector(".char_id")
let position_char=document.querySelector(".position_char")
let save_char=document.querySelector(".save_char")
let wave=document.querySelector(".wave")
let save_enimie=document.querySelector(".save_enimie")
let back=document.querySelector(".back")
let save=document.querySelector(".save")

let chars=""
let img_new=""

save_char.addEventListener("click",()=>{
    if(chars!=""){
        chars+=";"
    }
    chars+=char_id.value+":"+position_char.value+":"+wave.value
})

back.addEventListener("change",(e)=>{
    let target=e.target.files[0]
    if(target){
    const reader=new FileReader()
    reader.addEventListener("load",(e)=>{
        let thisReader=e.target
        let img=document.createElement("img")
        img.classList.add('picture__image2')
        img.src=thisReader.result
        img_new=img.src
    })
    reader.readAsDataURL(target)
    }
})

save.addEventListener("click",()=>{
    fetch(`/create_map`,{
        headers:{"Content-type": "application/json; charset=UTF-8"},
        method:'POST',
        body:JSON.stringify({chars:chars,fundo:img_new})
    })
})