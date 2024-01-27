let agregarDato=()=>{
    let stitle=(document.getElementById('searchQueryInput').value);
    console.log(stitle);
    // FETCH DE BUSQUEDA POR TITULO
    const url = `http://localhost:3000/book/${stitle}`
    fetch(url)
    .then((res)=>{
        if(!res.ok){
            throw new Error("Error al obtener la url")
            }
            return res.json()
        })
        .then((data)=>{
          console.log(data)
        //   const books = document.querySelector("#viewBook")
       
          for (let obj of data){
            
            if (obj.imagen){
               
                let newboxent = document.createElement('li');
                newboxent.setAttribute('class','item');
                newboxent.setAttribute('id','lviewBook' + `'${obj.id_libro}'`);
                let nuevocontenedor=document.getElementById('hBook');
                nuevocontenedor.insertAdjacentElement('beforeend',newboxent);

                document.querySelector(`#lviewBook${data.id_libro}`)
                let strImgs = ""
                newboxent.innerHTML=
                strImgs += `<img class="iImg_t" onclick="eliminar(), OnImageClick('${obj.id_libro}')" src=${obj.imagen}/>
                <div class="title_book">
                    <h5>${obj.titulo}</h5>
                </div>`
               
            }   
        }
        })
}