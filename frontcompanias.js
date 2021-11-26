const token = JSON.parse(localStorage.getItem("token"));
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", `Bearer ${token}`);
let windowRegion = document.getElementById("region").addEventListener("click", ()=>{
  window.location.href = "regiones.html";
})

document.getElementById("contactos").addEventListener("click", ()=>{
  window.location.href="contactos.html"
})

document.getElementById("usuarios_inicio").addEventListener("click",()=>{
  if(admin == 1){
    window.location.href="createuser.html"
  }else{
    alert("No tienen permisos para crear o manipular usuarios")
  }
})
/*traer las comapñias*/

let boxCompanias = document.getElementById("boxCompanias")


getCompanias = async () => {
    const response = await fetch(`http://localhost:3000/companias`, {
      method: "GET",
      headers: myHeaders,
    })
    const json = await response.json()
  
    return json
}

showCompanias = companias => {
    let divTitle = document.createElement("div")
    let title = document.createElement("h2")
    let addButton = document.createElement('button')
    addButton.setAttribute('id', "company")
    addButton.addEventListener('click', newCompany)
    title.textContent="Compañías"
    divTitle.appendChild(title)
    divTitle.appendChild(addButton)
    boxCompanias.appendChild(divTitle)
    
    let companieTable = document.createElement("table");
    companieTable.setAttribute('id', "tablaCompany")
    boxCompanias.appendChild(companieTable);
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
    nameTitle.innerHTML = "Compañia";
    nameAddress.innerHTML = "Direccion";
    nameEmail.innerHTML = "Email";
    nameCity.innerHTML = "Ciudad";
    nameOptions.innerHTML = "Acciones";
    title.innerHTML = "Compañias"
    addButton.innerHTML ="Agregar"
    divTitle.setAttribute('id', 'div_title')
    for (let i = 0; i < companias.length; i++){
        const compania = companias[i]
        console.log(compania) 
        
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

      let id_company = compania.id_compania;
      name.innerHTML = compania.nombre;
      address.innerHTML = compania.direccion;
      email.innerHTML = compania.email;
      city.innerHTML = compania.ciudad;

      let company_name = compania.nomnre;
      let company_address = compania.direccion;
      let company_email= compania.email;
      let company_phone = compania.telefono
      let city_id = compania.id_ciudad;
      

      edit.innerHTML = 'Editar'
      edit.addEventListener('click', function() {
        updateCompany(company_name, company_address, company_email, company_phone, city_id, id_company)
      })
      deletecompany.setAttribute('src', '/images/Button-close-hover-modo-noc.svg')
      deletecompany.addEventListener('click', function () {
          companyDelete(id_company)
          
      })
    }   
}

getCompanias()
  .then(response => showCompanias(response))


function newCompany() {
  
    newDiv = document.createElement("div");
    newDiv.classList.add("new_div");
    newDiv.innerHTML = ` 
      <div class="bigger_gif">
        <p>Nueva Compañia</p>
      </div>
      <div class="add_company">
        <form class="new_company">
            <div>
                <p>Nombre</p>
                <input type="name" name="nombre" placeholder="" required/>
            </div>
             <div>
                <p>Direccion</p>
                <input type="name" name="direccion" placeholder="" required />
            </div>
            <div>
                <p>Email</p>
                <input type="name" name="email" placeholder="" required />
            </div>
            <div>
                <p>Numero de telefono</p>
                <input type="name" name="telefono" placeholder="" required />
            </div>
            <div>
            <p>Ciudad</p>
            <input type="name" name="id_ciudad" list="sel" id="city_name" placeholder="" required />
            <datalist id="sel" >
                <option value="" >-- Select --</option>
            </datalist>
            </div>
        </form>
       
      </div>
      <div class="buttons_company">
        <button class="cancel" onclick="CerrarCompany()">Cancelar</button>
        <button class="save" onclick="newCompanies()">Guardar compañia</button>
      </div>
      `;
    document.body.appendChild(newDiv);
  
  async function loadData() {
      let url = "http://localhost:3000/ciudades"
  
      let requestInfo = {
          method: "GET",
          headers: myHeaders,
        };
  
      const response = await fetch(url, requestInfo)
      const data = await response.json()
      console.log(data[0].city_name)
      citiesList(data)
    
     
     
  }
  
  
function citiesList (data) {
    var ele = document.getElementById('sel');
    console.log(ele)
    for (var i = 0; i < data.length; i++) {
        // POPULATE SELECT ELEMENT WITH JSON.
        ele.innerHTML = ele.innerHTML +
            '<option value="' + data[i].id_ciudad + '">' + data[i].ciudad + '</option>';
    }
  
  }
  loadData();
  
};
  



async function newCompanies() {
  

  let inputCollection = document.querySelectorAll('.new_company input')
  let body = {}
  

  for (let i = 0; i < inputCollection.length; i++) {
      let nombre = inputCollection[i].name 
      let valor = inputCollection[i].value 
      body[nombre] = valor
     
  }
  
  const response  = await fetch('http://localhost:3000/companias', {
  method: 'POST',
  body: JSON.stringify(body), 
  headers: myHeaders

  })
  console.log(body)
  const data = await response.json()

  if (data.message == "Compañia creada exitosamente") {
    alert("Compañia creada exitosamente");
    CerrarCompany();
    cargarCompanias();
  } else {
    alert("Error al crear la compañia, la misma ya existe o faltan campos por completar");
  }
  console.log(data)
}

function companyDelete(id_company) {
    let requestProject = {
      method: "DELETE",
      headers: myHeaders,
    };
    
    const urlUsuarios = `http://localhost:3000/companias/${id_company}`;
    fetch(urlUsuarios, requestProject)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        if (json.message == "Compañia eliminada exitosamente") {
          alert("Compañia eliminada exitosamente");
          cargarCompanias();
        } else alert("Error al eliminar la compañia, la misma esta en uso por otra seccion");
      })
      
      .catch((error) => console.error("Error:", error));
      
  }
  

function CerrarCompany() {
    document.body.removeChild(newDiv);
};

function updateCompany(company_name, company_address, company_email, company_phone, city_id, id_company) {
  
    newDiv = document.createElement("div");
    newDiv.classList.add("new_div");
    newDiv.innerHTML = ` 
      <div class="bigger_gif">
        <p>Nueva Compañia</p>
      </div>
      <div class="add_company">
        <form class="new_company">
            <div>
                <p>Nombre</p>
                <input type="name" name="name" id="c_name" placeholder="" required textContent="Hello"/>
            </div>
             <div>
                <p>Direccion</p>
                <input type="name" name="address" id="c_address" placeholder="" required />
            </div>
            <div>
                <p>Email</p>
                <input type="name" name="email" id="c_email" placeholder="" required />
            </div>
            <div>
                <p>Numero de telefono</p>
                <input type="name" name="phone" id="c_phone" placeholder="" required />
            </div>
            <div>
            <p>Ciudad</p>
            <input type="name" name="id_city" list="sel" id="city_name" placeholder="" required />
            <datalist id="sel" >
                <option value="" >-- Select --</option>
            </datalist>
            </div>
        </form>
       
      </div>
      <div class="buttons_company">
        <button class="cancel" onclick="CerrarCompany()">Cancelar</button>
        <button class="save" onclick="updateCompanies(${id_company})">Actualizar compañia</button>
      </div>
      `;
    document.body.appendChild(newDiv);
    document.getElementById('c_name').value = `${company_name}`
    document.getElementById('c_address').value = `${company_address}`
    document.getElementById('c_email').value = `${company_email}`
    document.getElementById('c_phone').value =`${company_phone}`
    document.getElementById('city_name').value = `${city_id}`
    //console.log(id_company)
    
  
  async function loadData() {
      let url = "http://localhost:3000/ciudades"
  
      let requestInfo = {
          method: "GET",
          headers: myHeaders,
        };
  
      const response = await fetch(url, requestInfo)
      const data = await response.json()
      console.log(data[0].city_name)
      citiesList(data)
     
     
  }
  
  
  function citiesList (data) {
    var ele = document.getElementById('sel');
    console.log(ele)
    for (var i = 0; i < data.length; i++) {
        // POPULATE SELECT ELEMENT WITH JSON.
        ele.innerHTML = ele.innerHTML +
            '<option value="' + data[i].id + '">' + data[i].city_name + '</option>';
        
    }
  
  }
  loadData();
  };
  
  
  async function updateCompanies(id_company) {
    
  
    let inputCollection = document.querySelectorAll('.new_company input')
    let body = {}
    
  
    for (let i = 0; i < inputCollection.length; i++) {
        let nombre = inputCollection[i].name 
        let valor = inputCollection[i].value 
        body[nombre] = valor
       
    }
    
    const response  = await fetch(`http://localhost:3000/companias/${id_company}`, {
    method: 'PATCH',
    body: JSON.stringify(body), 
    headers: myHeaders
  
    })
    console.log(body)
    const data = await response.json()
  
    if (data.message == "Compañia actualizada exitosamente") {
      alert("Compañia actualizada exitosamente");
      CerrarCompany();
      cargarCompanias();
    } else {
      alert("Error al actualizar la compañia, la misma ya existe o faltan campos por completar");
    }
    console.log(data)
  }