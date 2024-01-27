
// FETCH DE TODOS LOS LIBROS
url = "http://localhost:3000/title"
fetch(url)
.then((res)=>{
    if(!res.ok){
        throw new Error("Error al obtener la url")
    }
    return res.json()
})
.then((data)=>{
    // const books = document.querySelector("#iBooks")
    // let strImgs = ""
    for (let obj of data){
        let strImgs = ""
       
        if (obj.imagen){
            let newboxent2 = document.createElement('div');
             newboxent2.setAttribute('class','bookView');
             newboxent2.setAttribute('id','sviewBook' + `'${obj.id_libro}'`);
            
             let nuevocontenedor2=document.getElementById('cBookstore');
             nuevocontenedor2.insertAdjacentElement('beforeend',newboxent2);

             document.querySelector(`#sviewBook${data.id_libro}`)
                // let strImgs = ""
                newboxent2.innerHTML=
                strImgs += `<img class="iImg_t" onclick="eliminar(), OnImageClick('${obj.id_libro}') " src=${obj.imagen}/>
                <div class="title_book">
                    <h5>${obj.titulo}</h5>
                </div>`
        }
    }
})
let eliminar=()=>{
    let elemento = document.getElementById('head_book');
    let elementodelete = document.getElementById('head_b');
     if(elementodelete){
        console.log(elementodelete)
        elemento.removeChild(elementodelete);
    }
    else{
        alert('Ya no existen elementos para eliminar');
   }
}


function OnImageClick(id){
//    console.log(id)
// const idlibro = new string(id);
const url2 = `http://localhost:3000/searchbook/${id}`
fetch(url2)
    .then ((res) =>{
        if(!res.ok){
            throw new Error("Error al obtener la url")
        }
        return res.json()
    })
    .then((data)=>{
        // console.log(data)
        for (let obj of data){
            let strImgs = ""
            
            if (obj.id_libro){
                
                let newboxent2 = document.createElement('div');
                 newboxent2.setAttribute('class','chead_Book');
                 newboxent2.setAttribute('id','head_b');
                //  newboxent2.setAttribute('id','head_b' + `'${obj.id_libro}'`);
                
                 let nuevocontenedor2=document.getElementById('head_book');
                 nuevocontenedor2.insertAdjacentElement('beforeend',newboxent2);
    
                //  document.querySelector(`#head_b${data.id_libro}`)
                document.querySelector('#head_b')
                    // let strImgs = ""
                    newboxent2.innerHTML=
                    strImgs += `<img class="iImg_t" onclick="OnImageClick('${obj.id_libro}')" src=${obj.imagen}/>
                    <div class="title_book">
                        <h5>${obj.titulo}</h5>
                        <p>${obj.categoria}</p>
                        <p>${obj.nombre_editorial}</p>
                        <p>${obj.autor}</p>
                        <p>${obj.anio_edicion}</p>

                    </div>`
                    let vantes = obj.id_libro
            }
        }
    })

}