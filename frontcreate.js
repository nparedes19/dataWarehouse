const token = JSON.parse(localStorage.getItem("token"));
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", `Bearer ${token}`);
let boxUsuarios = document.createElement("div")
boxUsuarios.setAttribute('id', "containerUsuarios")
let windowRegion = document.getElementById("region").addEventListener("click", ()=>{
    window.location.href = "regiones.html";
  })
  
  document.getElementById("compañias").addEventListener("click", ()=>{
    window.location.href="companias.html"
  })
  
  document.getElementById("contactos").addEventListener("click",()=>{
    
      window.location.href="contactos.html"
    
  })

const registerBtn = document.querySelector(".loginBtn");

getUsuarios = async () => {
    const response = await fetch(`http://localhost:3000/usuarios`, {
      method: "GET",
      headers: myHeaders,
    })
    const json = await response.json()
  
    return json
}

showUsuarios = usuarios => {
    let divTitle = document.createElement("div")
    let title = document.createElement("h2")
    title.textContent="Usuarios"
    divTitle.appendChild(title)
    boxUsuarios.appendChild(divTitle)
    let companieTable = document.createElement("table");
    companieTable.setAttribute('id', "tablaCompany")
    boxUsuarios.appendChild(companieTable);
    let tableThead = document.createElement("thead");
    companieTable.appendChild(tableThead);
    let companieTr = document.createElement("tr");
    tableThead.appendChild(companieTr);
    let nameTitle = document.createElement("th");
    let nameAddress = document.createElement("th");
    let nameEmail = document.createElement("th");
    let nameCity = document.createElement("th");
    let nameOptions = document.createElement("th");
    companieTr.appendChild(nameTitle);
    companieTr.appendChild(nameAddress);
    companieTr.appendChild(nameEmail);
    companieTr.appendChild(nameCity);
    companieTr.appendChild(nameOptions);
    nameTitle.innerHTML = "Usuario";
    nameAddress.innerHTML = "Correo";
    nameEmail.innerHTML = "Nombre completo";
    nameCity.innerHTML = "Telefono";
    nameOptions.innerHTML = "Acciones";
    title.innerHTML = "Usuarios"
    document.getElementById("biggerBox").appendChild(boxUsuarios)
    divTitle.setAttribute('id', 'div_title')
    for (let i = 0; i < usuarios.length; i++){
        const usuario= usuarios[i]
        console.log(usuario) 
        
    let companieTableInfo = document.createElement("tbody");
    companieTable.appendChild(companieTableInfo);
    let trCompanie = document.createElement("tr");
      let name = document.createElement("th");
      let address = document.createElement("th");
      let email = document.createElement("th");
      let city = document.createElement("th");
      let options = document.createElement("th");
      let edit = document.createElement("h3");
      let deletecompany = document.createElement("img");
      companieTableInfo.appendChild(trCompanie);
      trCompanie.appendChild(name);
      trCompanie.appendChild(address);
      trCompanie.appendChild(email);
      trCompanie.appendChild(city);
      trCompanie.appendChild(options);
      options.appendChild(edit);
      options.appendChild(deletecompany);
      edit.setAttribute("class","edit");
      edit.style.cursor="pointer";
      deletecompany.setAttribute("class","delete");
      deletecompany.style.cursor="pointer";

      let id_company = usuario.id_usuario;
      name.innerHTML = usuario.usuario;
      address.innerHTML = usuario.correo;
      email.innerHTML = usuario.fullname;
      city.innerHTML = usuario.telefono;

      let company_name = usuario.usuario;
      let company_address = usuario.correo;
      let company_email= usuario.fullname;
      let company_phone = usuario.telefono
      let city_id = usuario.password;
      let admin = usuario.is_admin
      

      edit.innerHTML = 'Editar'
      edit.addEventListener('click', function() {
        updateCompany(company_name, company_address, company_email, company_phone, city_id, id_company,admin)
      })
      deletecompany.setAttribute('src', '/images/Button-close-hover-modo-noc.svg')
      deletecompany.addEventListener('click', function () {
          companyDelete(id_company)
          
      })
    }   
}

getUsuarios()
  .then(response => showUsuarios(response))

registerBtn.addEventListener("click", async() => {
    let inputCollection = document.querySelectorAll(".form input");
    let body = {};
    console.log(inputCollection[0].name)
    for (let i = 0; i < inputCollection.length; i++){
        let nombre = inputCollection[i].name
        let valor = inputCollection[i].value
        console.log(nombre,valor)
        body[nombre] = valor
    }
    console.log(body)
    if(body.password == body.rptPass){
    fetch ("http://localhost:3000/usuarios",{
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
        }
    }).then((response) => response.json())
    .then((json)=>{
        console.log(json);
        if(json.status=="Usuario creado exitosamente"){
            alert("Usuario creado exitosamente")
        }else{
            alert("Usuario existente o faltan datos por completar")
        }
    })
    .catch((error)=>console.error("Error:", error));
    }else{
        alert("Las contraseñas no coinciden")
    }
})

function companyDelete(id_company) {
    let requestProject = {
      method: "DELETE",
      headers: myHeaders,
    };
    
    const urlUsuarios = `http://localhost:3000/usuarios/${id_company}`;
    fetch(urlUsuarios, requestProject)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        if (json.message == "Usuario eliminado exitosamente") {
          alert("Usuario eliminado exitosamente");
          cargarCompanias();
        } else alert("Error al eliminar el usuario");
      })
      
      .catch((error) => console.error("Error:", error));
      
  }

  function updateCompany(company_name, company_address, company_email, company_phone, city_id, id_company,admin) {
  
    newDiv = document.createElement("div");
    newDiv.classList.add("new_div");
    newDiv.innerHTML = ` 
      <div class="bigger_gif">
        <p>Actualizar usuario</p>
      </div>
      <div class="add_company">
        <form class="new_company">
            <div>
                <p>Usuario</p>
                <input type="name" name="usuario" id="c_name" placeholder="" required textContent="Hello"/>
            </div>
             <div>
                <p>Correo</p>
                <input type="name" name="correo" id="c_address" placeholder="" required />
            </div>
            <div>
                <p>Nombre completo</p>
                <input type="name" name="fullname" id="c_email" placeholder="" required />
            </div>
            <div>
                <p>Numero de telefono</p>
                <input type="name" name="telefono" id="c_phone" placeholder="" required />
            </div>
            <div>
            <p>Contraseña</p>
            <input type="name" name="password" list="sel" id="city_name" placeholder="" required />
            </div>
            <div>
            <p>Es administrador?</p>
            <input type="name" name="is_admin" list="sel" id="isAdmin" placeholder="" required />
            </div>
        </form>
       
      </div>
      <div class="buttons_company">
        <button class="cancel" onclick="CerrarCompany()">Cancelar</button>
        <button class="save" onclick="updateCompanies(${id_company})">Actualizar usuario</button>
      </div>
      `;
    document.body.appendChild(newDiv);
    document.getElementById('c_name').value = `${company_name}`
    document.getElementById('c_address').value = `${company_address}`
    document.getElementById('c_email').value = `${company_email}`
    document.getElementById('c_phone').value =`${company_phone}`
    document.getElementById('city_name').value = `${city_id}`
    document.getElementById('isAdmin').value = `${admin}`
    //console.log(id_company)
    
  
  
  
  
  
  };
  
  
  async function updateCompanies(id_company) {
    
  
    let inputCollection = document.querySelectorAll('.new_company input')
    let body = {}
    
  
    for (let i = 0; i < inputCollection.length; i++) {
        let nombre = inputCollection[i].name 
        let valor = inputCollection[i].value 
        body[nombre] = valor
       
    }
    
    const response  = await fetch(`http://localhost:3000/usuarios/${id_company}`, {
    method: 'PATCH',
    body: JSON.stringify(body), 
    headers: myHeaders
  
    })
    console.log(body)
    const data = await response.json()
  
    if (data.message == "Usuario actualizado exitosamente") {
      alert("Usuario actualizado exitosamente");
      
    } else {
      alert("Error al actualizar el usuario");
    }
    console.log(data)
  }

function CerrarCompany() {
    document.body.removeChild(newDiv);
};