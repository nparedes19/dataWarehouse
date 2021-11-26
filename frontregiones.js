var myHeaders = new Headers();
const token = JSON.parse(localStorage.getItem("token"))
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", `Bearer ${token}`);
let windowRegion = document.getElementById("contactos").addEventListener("click", ()=>{
  window.location.href = "contactos.html";
})

document.getElementById("companias").addEventListener("click", ()=>{
  window.location.href="companias.html"
})

document.getElementById("usuarios_inicio").addEventListener("click",()=>{
  if(admin == 1){
    window.location.href="createuser.html"
  }else{
    alert("No tienen permisos para crear o manipular usuarios")
  }
})

/*traer las regiones*/

let boxRegiones = document.getElementById("boxRegiones")

getRegiones = async () => {
    const response = await fetch(`http://localhost:3000/regiones`,{method: "GET", headers: myHeaders,})
    const json = await response.json()
  
    return json
}



showRegiones = async regiones => {
    for (let i = 0; i < regiones.length; i++){
        const region = regiones[i]
        console.log(region) 
        let divRegion = document.createElement("div")
        let nombreRegion =  document.createElement("p")
        let boxRegion = document.createElement("div")
        let editarRegion = document.createElement("p")
        let eliminarRegion = document.createElement("p")
        let agregarPais = document.createElement("p")
        editarRegion.textContent = "editar"
        eliminarRegion.textContent = "x"
        agregarPais.textContent = "Agregar país"
        editarRegion.setAttribute("class","editarRegion")
        eliminarRegion.setAttribute("class","eliminarRegion")
        agregarPais.setAttribute("class","agregarPais")
        boxRegion.appendChild(nombreRegion)
        boxRegion.appendChild(editarRegion)
        boxRegion.appendChild(eliminarRegion)
        boxRegion.appendChild(agregarPais)
        boxRegion.setAttribute("class","boxRegion")
        nombreRegion.textContent = region.region
        nombreRegion.setAttribute("class","nombreRegion")
        boxRegiones.appendChild(divRegion)
        divRegion.setAttribute("class","divRegion")
        divRegion.appendChild(boxRegion)
        let idRegion = region.id_regiones
        console.log(idRegion)
        const pais = await getPaises(idRegion)

        /*eliminar una region*/

        eliminarRegion.addEventListener("click", ()=>{
          fetch (`http://localhost:3000/regiones/${idRegion}`,
                              {
                                method: "DELETE",
                                headers: myHeaders,
                              }
                    ).then((res)=>res.json()).then((json)=>{
                      if(json.message=="Región eliminada"){
                        alert("Región eliminada")
                      }else
                        alert("Error al eliminar la región, puede que este asociada a un país existente")
                      
                    })
          location.reload()
        })

        /*editar una región*/

        editarRegion.addEventListener("click", ()=>{
              newDiv = document.createElement("div");
              newDiv.classList.add("new_div");
              newDiv.innerHTML = ` 
                <div class="bigger_gif">
                  <p>Editar región</p>
                </div>
                <div class="add_company">
                  <form class="formularioRegionesEditar">
                      <div>
                          <p>Nombre Región</p>
                          <input type="name" name="region" placeholder="" required />
                      </div>
                  </form>
                </div>
                <div class="buttons_company">
                  <button onclick="CerrarCompany()">Cancelar</button>
                  <button id="btnEditarRegion">Editar region</button>
                </div>
                `;
              document.body.appendChild(newDiv);
              const btnEditar = document.getElementById("btnEditarRegion")

              btnEditar.addEventListener("click", async () =>{
                let inputCollection = document.querySelectorAll(".formularioRegionesEditar input");
                let body = {};
                console.log(inputCollection[0].name)
                for (let i = 0; i < inputCollection.length; i++){
                    let nombre = inputCollection[i].name
                    let valor = inputCollection[i].value
                    console.log(nombre,valor)
                    body[nombre] = valor
                }
                console.log(body)
                editarRegiones(idRegion,body)
              })

        })

        /*agregar un país*/

        agregarPais.addEventListener("click", ()=>{
              newDiv = document.createElement("div");
              newDiv.classList.add("new_div");
              newDiv.innerHTML = ` 
                <div class="bigger_gif">
                  <p>Nuevo País</p>
                </div>
                <div class="add_company">
                  <form class="formularioPaises">
                      <div>
                          <p>Nombre Pais</p>
                          <input type="name" name="pais" placeholder="" required />
                      </div>
                  </form>
                </div>
                <div class="buttons_company">
                  <button onclick="CerrarCompany()">Cancelar</button>
                  <button id="btnCrearPais">Agregar País</button>
                </div>
                `;
              document.body.appendChild(newDiv);
              const btnCrear = document.getElementById("btnCrearPais")

              btnCrear.addEventListener("click", async () =>{
                let inputCollection = document.querySelectorAll(".formularioPaises input");
                let body = {"id_regiones":idRegion};
                console.log(inputCollection[0].name)
                for (let i = 0; i < inputCollection.length; i++){
                    let nombre = inputCollection[i].name
                    let valor = inputCollection[i].value
                    console.log(nombre,valor)
                    body[nombre] = valor
                }
                console.log(body)
                fetch ("http://localhost:3000/paises",{
                    method: "POST",
                    body: JSON.stringify(body),
                    headers: myHeaders,
                }).then((res)=>res.json()).then((json)=>{
                  if(json.status=="País creado exitosamente"){
                    alert("País creado exitosamente")
                  }else
                    alert("Error al crear país, puede que ya exista")
                  
                })
                CerrarCompany()
              })
        })

        for (let i = 0; i < pais.length; i++){
            const p = pais[i]
            let divPais = document.createElement("div")
            let boxPais = document.createElement("div")
            let nombrePais =  document.createElement("p")
            let editarPais= document.createElement("p")
            let eliminarPais = document.createElement("p")
            let agregarCiudad = document.createElement("p")
            agregarCiudad.textContent="Agregar ciudad"
            eliminarPais.textContent="x"
            editarPais.textContent = "editar"
            nombrePais.textContent = p.pais
            boxPais.appendChild(nombrePais)
            boxPais.appendChild(editarPais)
            boxPais.appendChild(eliminarPais)
            boxPais.appendChild(agregarCiudad)
            divPais.appendChild(boxPais)
            divRegion.appendChild(divPais)
            divPais.setAttribute("class","boxPais")
            boxPais.setAttribute("class","containerPais")
            editarPais.setAttribute("class","editarPais")
            eliminarPais.setAttribute("class","eliminarPais")
            agregarCiudad.setAttribute("class","agregarCiudad")
            nombrePais.setAttribute("class","nombrePais")
            let idPais = p.id_pais
            const ciudad = await getCiudades(idPais)
            console.log(ciudad)

            /*eliminar un país*/

            eliminarPais.addEventListener("click", ()=>{
              fetch (`http://localhost:3000/paises/${idPais}`,
                                  {
                                    method: "DELETE",
                                    headers: myHeaders,
                                  }
                        ).then((res)=>res.json()).then((json)=>{
                          if(json.message=="Pais eliminado"){
                            alert("País eliminado")
                          }else
                            alert("Error al eliminar país, puede que esta asociado a alguna ciudad existente")
                          
                        })
              location.reload()
            })

            /*editar un país*/

            editarPais.addEventListener("click", ()=>{
              newDiv = document.createElement("div");
              newDiv.classList.add("new_div");
              newDiv.innerHTML = ` 
                <div class="bigger_gif">
                  <p>Editar país</p>
                </div>
                <div class="add_company">
                  <form class="formularioPaisEditar">
                      <div>
                          <p>Nombre País</p>
                          <input type="name" name="pais" placeholder="" required />
                          <p>ID asociado a región</p>
                          <input type="name" name="id_regiones" placeholder="" required />
                      </div>
                  </form>
                </div>
                <div class="buttons_company">
                  <button onclick="CerrarCompany()">Cancelar</button>
                  <button id="btnEditarPais">Editar país</button>
                </div>
                `;
              document.body.appendChild(newDiv);
              const btnEditar = document.getElementById("btnEditarPais")

              btnEditar.addEventListener("click", async () =>{
                let inputCollection = document.querySelectorAll(".formularioPaisEditar input");
                let body = {};
                console.log(inputCollection[0].name)
                for (let i = 0; i < inputCollection.length; i++){
                    let nombre = inputCollection[i].name
                    let valor = inputCollection[i].value
                    console.log(nombre,valor)
                    body[nombre] = valor
                }
                console.log(body)
                fetch (`http://localhost:3000/paises/${idPais}`,
                                {
                                  method: "PUT",
                                  body: JSON.stringify(body),
                                  headers: myHeaders,
                                }
                      ).then((res)=>res.json()).then((json)=>{
                        if(json.message=="País actualizado"){
                          alert("País actualizado")
                        }else
                          alert("Error al actualizar país")
                        
                      })
                  CerrarCompany()
                  location.reload()
              })

        })

            
            
            /*agregar una ciudad*/

            agregarCiudad.addEventListener("click", () => {
              newDiv = document.createElement("div");
              newDiv.classList.add("new_div");
              newDiv.innerHTML = ` 
                <div class="bigger_gif">
                  <p>Nueva Ciudad</p>
                </div>
                <div class="add_company">
                  <form class="formularioCiudades">
                      <div>
                          <p>Nombre Ciudad</p>
                          <input type="name" name="ciudad" placeholder="" required />
                      </div>
                  </form>
                </div>
                <div class="buttons_company">
                  <button onclick="CerrarCompany()">Cancelar</button>
                  <button id="btnCrearCiudad">Agregar Ciudad</button>
                </div>
                `;
              document.body.appendChild(newDiv);
              const btnCrear = document.getElementById("btnCrearCiudad")

              btnCrear.addEventListener("click", async () =>{
                let inputCollection = document.querySelectorAll(".formularioCiudades input");
                let body = {"id_pais":idPais};
                console.log(inputCollection[0].name)
                for (let i = 0; i < inputCollection.length; i++){
                    let nombre = inputCollection[i].name
                    let valor = inputCollection[i].value
                    console.log(nombre,valor)
                    body[nombre] = valor
                }
                console.log(body)
                fetch ("http://localhost:3000/ciudades",{
                    method: "POST",
                    body: JSON.stringify(body),
                    headers: myHeaders,
                }).then((res)=>res.json()).then((json)=>{
                  if(json.status=="Ciudad creada exitosamente"){
                    alert("Ciudad creada exitosamente")
                  }else
                    alert("Error al crear la ciudad, puede que ya exista")
                  
                })
                CerrarCompany()
                location.reload()
              })
            })

            for (let i = 0; i < ciudad.length; i++){
                const city = ciudad[i]
                let divCiudades = document.createElement("div")
                let nombreCiudad =  document.createElement("p")
                let editarCiudad= document.createElement("p")
                let eliminarCiudad = document.createElement("p")
                let idCiudad = city.id_ciudad
                nombreCiudad.textContent = city.ciudad
                editarCiudad.textContent="editar"
                eliminarCiudad.textContent="x"
                divCiudades.appendChild(nombreCiudad)
                divCiudades.appendChild(editarCiudad)
                divCiudades.appendChild(eliminarCiudad)
                console.log(nombreCiudad)
                divPais.appendChild(divCiudades)
                divCiudades.setAttribute("class","boxCiudad")
                editarCiudad.setAttribute("class","editarCiudad")
                eliminarCiudad.setAttribute("class","eliminarCiudad")
                nombreCiudad.setAttribute("class","nombreCiudad")
                editarCiudad.addEventListener("click", () =>{
                  newDiv = document.createElement("div");
                  newDiv.classList.add("new_div");
                  newDiv.innerHTML = ` 
                    <div class="bigger_gif">
                      <p>Editar Ciudad</p>
                    </div>
                    <div class="add_company">
                      <form class="formularioCiudadEditar">
                          <div>
                              <p>Nombre Ciudad</p>
                              <input type="name" name="ciudad" placeholder="" required />
                              <p>ID asociado a país</p>
                              <input type="name" name="id_pais" placeholder="" required />
                          </div>
                      </form>
                    </div>
                    <div class="buttons_company">
                      <button onclick="CerrarCompany()">Cancelar</button>
                      <button id="btnEditarCiudad">Editar ciudad</button>
                    </div>
                    `;
                  document.body.appendChild(newDiv);
                  const btnEditar = document.getElementById("btnEditarCiudad")

                  btnEditar.addEventListener("click", async () =>{
                    let inputCollection = document.querySelectorAll(".formularioCiudadEditar input");
                    let body = {};
                    console.log(inputCollection[0].name)
                    for (let i = 0; i < inputCollection.length; i++){
                        let nombre = inputCollection[i].name
                        let valor = inputCollection[i].value
                        console.log(nombre,valor)
                        body[nombre] = valor
                    }
                    console.log(body)
                    fetch (`http://localhost:3000/ciudades/${idCiudad}`,
                                    {
                                      method: "PUT",
                                      body: JSON.stringify(body),
                                      headers: myHeaders,
                                    }
                          ).then((res)=>res.json()).then((json)=>{
                            if(json.message=="Ciudad actualizada"){
                              alert("Ciudad actualizada exitosamente")
                            }else
                              alert("Error al actualizar la ciudad")
                            
                          })
                    CerrarCompany()
                  })
                })

                eliminarCiudad.addEventListener("click", () => {
                  fetch (`http://localhost:3000/ciudades/${idCiudad}`,
                                    {
                                      method: "DELETE",
                                      headers: myHeaders,
                                    }
                          ).then((res)=>res.json()).then((json)=>{
                            if(json.message=="Ciudad eliminada"){
                              alert("Ciudad eliminada satisfactoriamente")
                            }else
                              alert("Error al eliminar ciudad")
                            
                          })
                  location.reload()
                } )
            }
        }   
    
}}

getRegiones()
  .then(response => showRegiones(response))

/*traer los paises*/

const getPaises = async (id_region) => {
    const response = await fetch (`http://localhost:3000/paises/${id_region}`, {method: "GET", headers: myHeaders,} )
    const json = await response.json()
  
    return json
  }

/*traer las ciudades*/

const getCiudades = async (id_pais) => {
    const response = await fetch (`http://localhost:3000/ciudades/${id_pais}`, {method: "GET", headers: myHeaders,})
    const json = await response.json()
  
    return json
  }

/*función para editar regiones*/

const editarRegiones = async (id_regiones,body) => {
  const response = await fetch (`http://localhost:3000/regiones/${id_regiones}`,
                                {
                                  method: "PUT",
                                  body: JSON.stringify(body),
                                  headers: myHeaders,
                                }
  ).then((res)=>res.json()).then((json)=>{
    if(json.message=="Región actualizada"){
      alert("Región actualizada")
    }else
      alert("Error al actualizar región")
    
  })
  CerrarCompany()
  location.reload()
}


/*agregar una región*/

document.getElementById("agregarRegion").addEventListener("click", ()=>{
  newDiv = document.createElement("div");
  newDiv.classList.add("new_div");
  newDiv.innerHTML = ` 
    <div class="bigger_gif">
      <p>Nueva Región</p>
    </div>
    <div class="add_company">
      <form class="formularioRegiones">
          <div class="divFormulario">
              <p class="nombreRegion">Nombre región</p>
              <input class="entradas" type="name" name="region" placeholder="" required />
          </div>
      </form>
    </div>
    <div class="buttons_company">
      <button onclick="CerrarCompany()">Cancelar</button>
      <button id="btnCrearRegion">Guardar región</button>
    </div>
    `;
  document.body.appendChild(newDiv);
  const btnCrear = document.getElementById("btnCrearRegion")

  btnCrear.addEventListener("click", async () =>{
    let inputCollection = document.querySelectorAll(".formularioRegiones input");
    let body = {};
    console.log(inputCollection[0].name)
    for (let i = 0; i < inputCollection.length; i++){
        let nombre = inputCollection[i].name
        let valor = inputCollection[i].value
        console.log(nombre,valor)
        body[nombre] = valor
    }
    console.log(body)
    fetch ("http://localhost:3000/regiones",{
        method: "POST",
        body: JSON.stringify(body),
        headers: myHeaders,
    }).then((res)=>res.json()).then((json)=>{
      if(json.status=="Región creada exitosamente"){
        alert("Región creada exitosamente")
      }else
        alert("Error al crear región, puede ya exista")
      
    })
    location.reload()
  })

})

/*cerrar div*/

function CerrarCompany() {
  document.body.removeChild(newDiv);
};




