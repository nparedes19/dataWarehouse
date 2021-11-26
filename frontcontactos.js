var myHeaders = new Headers();
const token = JSON.parse(localStorage.getItem("token"))
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", `Bearer ${token}`);
const admin = JSON.parse(localStorage.getItem("admin"))

let windowRegion = document.getElementById("region").addEventListener("click", ()=>{
  window.location.href = "regiones.html";
})

document.getElementById("compañias").addEventListener("click", ()=>{
  window.location.href="companias.html"
})

document.getElementById("usuarios_inicio").addEventListener("click",()=>{
  if(admin == 1){
    window.location.href="createuser.html"
  }else{
    alert("No tienen permisos para crear o manipular usuarios")
  }
})



traerRegion();
traerPais();
traerCiudad();
traerCompanias();


const urlContactos = "http://localhost:3000/contactos";
  let requestOptions = {
    method: "GET",
    headers: myHeaders,
  };
  fetch(urlContactos, requestOptions)
    .then((res) => res.json())
    .then((json) => {
      // console.log(json);
      arrayContactos = [];
      for (x = 0; x < json.length; x++) {
        let contLimpio = {
          id_contact: json[x].id_contacto,
          fname: json[x].nombre,
          lname: json[x].apellido,
          position: json[x].cargo,
          nombre_compania: json[x].nombre_compania,
          nombre_ciudad: json[x].nombre_ciudad,
          nombre_pais: json[x].nombre_pais,
          nombre_region: json[x].nombre_region,
          address: json[x].direccion,
          interest: json[x].interes,
          account_phone: json[x].cuenta_telefono,
          preferencia_telefono: json[x].preferencia_telefono,
          account_whatsapp: json[x].cuenta_whatsapp,
          preference_whatsapp: json[x].preferencia_whatsapp,
          account_instagram: json[x].cuenta_instagram,
          preferencia_instagram: json[x].preferencia_instagram,
          account_facebook: json[x].cuenta_facebook,
          preferencia_facebook: json[x].preferencia_facebook,
          account_linkedin: json[x].cuenta_linkedin,
          preferencia_linkedin: json[x].preferencia_linkedin,
        };
        arrayContactos.push(contLimpio);
        console.log(contLimpio);
      }
      console.log(arrayContactos);
      console.log(json);
     
      cabeceraContactos(arrayContactos);
      cabeceraTablaContactos(arrayContactos);
      datosContactos(json);
    })
    .catch((error) => console.error("Error:", error));

function traerRegion() {
      const urlRegiones = "http://localhost:3000/regiones";
      let requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
      },
      };
      fetch(urlRegiones, requestOptions)
        .then((res) => res.json())
        .then((json) => {
          // console.table(json);
          arrayRegiones = [];
          for (x = 0; x < json.length; x++) {
            let contLimpio = {
              id_region: json[x].id_regiones,
              nombre_region: json[x].region,
            };
            arrayRegiones.push(contLimpio);
            console.log(contLimpio);
          }
          console.log(arrayRegiones);
        })
        .catch((error) => console.error("Error:", error));
    }

function traerPais() {
      const urlPais = "http://localhost:3000/paises";
      let requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
      },
      };
      fetch(urlPais, requestOptions)
        .then((res) => res.json())
        .then((json) => {
          arrayPaises = [];
          for (x = 0; x < json.length; x++) {
            let contLimpio = {
              id_country: json[x].id_pais,
              nombre_pais: json[x].pais,
              id_region: json[x].id_regiones,
            };
            arrayPaises.push(contLimpio);
          }
          console.log(arrayPaises);
        })
        .catch((error) => console.error("Error:", error));
    }

function traerCiudad() {
      const urlCiudades = "http://localhost:3000/ciudades";
      let requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
      },
      };
      fetch(urlCiudades, requestOptions)
        .then((res) => res.json())
        .then((json) => {
          arrayCities = [];
          for (x = 0; x < json.length; x++) {
            let contLimpio = {
              id_city: json[x].id_ciudad,
              nombre_ciudad: json[x].ciudad,
              id_country: json[x].id_pais,
            };
            arrayCities.push(contLimpio);
          }
          console.log(arrayCities);
        })
        .catch((error) => console.error("Error:", error));
    }

function traerCompanias() {
      const urlCompanias = "http://localhost:3000/companias";
      let requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
      },
      };
      fetch(urlCompanias, requestOptions)
        .then((res) => res.json())
        .then((json) => {
          // console.log(json);
          arrayCompanias = [];
          for (x = 0; x < json.length; x++) {
            let contLimpio = {
              id_company: json[x].id_compania,
              name: json[x].nombre,
            };
            arrayCompanias.push(contLimpio);
          }
          console.log(arrayCompanias);
        })
        .catch((error) => console.error("Error:", error));
    }


    
    function datosContactos(json) {
      for (i = 0; i < json.length; i++) {
        let contactos = document.createElement("tr");
        document.getElementById("tcontenido").appendChild(contactos);
        contactos.setAttribute("id", "contacto" + json[i].id_contact);
    
        let square = document.createElement("th");
        let check = document.createElement("i");
        let spanCheck = document.createElement("span");
        let contacto = document.createElement("th");
        let paisRegion = document.createElement("th");
        let compania = document.createElement("th");
        let cargo = document.createElement("th");
        let interes = document.createElement("th");
        let accion = document.createElement("th");
        contactos.appendChild(square);
        square.appendChild(spanCheck);
        spanCheck.appendChild(check);
        contactos.appendChild(contacto);
        contactos.appendChild(paisRegion);
        contactos.appendChild(compania);
        contactos.appendChild(cargo);
        contactos.appendChild(interes);
        contactos.appendChild(accion);
        check.setAttribute("class", "far fa-square");
        check.setAttribute("id", "check" + json[i].id_contacto);
        contacto.innerHTML = json[i].nombre + " " + json[i].apellido;
        paisRegion.innerHTML = json[i].nombre_pais + " - " + json[i].nombre_region;
        compania.innerHTML = json[i].nombre_compania;
        cargo.innerHTML = json[i].cargo;
        interes.innerHTML = json[i].interes+"%";
    
        let id_contact = json[i].id_contacto;
        arrayEliminar = [];
        square.addEventListener("click", function () {
          if (arrayEliminar.some((elem) => elem == id_contact)) {
            for (i = 0; i < arrayEliminar.length; i++) {
              if (arrayEliminar[i] === id_contact) {
                arrayEliminar.splice(i, 1);
              }
            }
            document.getElementById("check" + id_contact).removeAttribute("class", "far fa-check-square");
            document.getElementById("check" + id_contact).setAttribute("class", "far fa-square");
            contactos.removeAttribute("class","contactive");
          } else {
            arrayEliminar.push(id_contact);
            document.getElementById("check" + id_contact).removeAttribute("class", "far fa-square");
            document.getElementById("check" + id_contact).setAttribute("class", "far fa-check-square");
            contactos.setAttribute("class","contactive");
          }
          seleccionEliminar();
        });

        let editar = document.createElement("h3");
        let eliminar = document.createElement("h3");
        accion.appendChild(editar);
        accion.appendChild(eliminar);
        editar.innerHTML = "Editar";
        editar.setAttribute("class","editar");
        editar.style.cursor="pointer";
        eliminar.innerHTML = "Eliminar";
        eliminar.setAttribute("class","eliminar");
        eliminar.style.cursor="pointer";
    
        // console.log(json[i]);
        let data = json[i];
        console.log(data)
        editar.addEventListener("click", function () {
          modificarContacto(data, id_contact);
        });
        eliminar.addEventListener("click", ()=>{
          fetch (`http://localhost:3000/contactos/${id_contact}`,
                                    {
                                      method: "DELETE",
                                      headers:{
                                      "Content-Type": "application/json",}
                                    }
                          ).then((res)=>res.json()).then((json)=>{
                            if(json.message=="Contacto eliminado"){
                              alert("Contacto eliminado satisfactoriamente")
                            }else
                              alert("Error al eliminar contacto")
                            
                          })
                  location.reload()
        });
      }
    }

// CABECERA CONTACTOS
function cabeceraContactos(arrayContactos) {
  let cabeContactos = document.createElement("h2");
  let cabecera = document.createElement("div");
  let cabIzquierda = document.createElement("div");
  let search = document.createElement("input");
  let conteLupa = document.createElement("span");
  let lupa = document.createElement("i");
  let cabDerecha = document.createElement("div");
  let agregarContacto = document.createElement("h2");
  document.getElementById("boxContactos").appendChild(cabeContactos);
  document.getElementById("boxContactos").appendChild(cabecera);
  cabecera.appendChild(cabIzquierda);
  cabIzquierda.appendChild(search);
  cabIzquierda.appendChild(conteLupa);
  conteLupa.appendChild(lupa);
  cabecera.appendChild(cabDerecha);
  cabDerecha.appendChild(agregarContacto);
  cabeContactos.innerHTML = "CONTACTOS";
  agregarContacto.innerHTML = "Agregar contacto";
  agregarContacto.style.cursor="pointer";
  search.setAttribute("type", "text");
  search.setAttribute("id", "inputsearch");
  cabecera.setAttribute("id", "cabecera");
  lupa.setAttribute("class", "fas fa-search");
  conteLupa.addEventListener("click", function () {
    busqueda(arrayContactos);
  });
  agregarContacto.addEventListener("click", newContact);
  let conteDelete = document.createElement("div");
  cabecera.appendChild(conteDelete);
  conteDelete.setAttribute("id", "arrayDelete");
}

// CABECERA TABLA CONTACTOS
function cabeceraTablaContactos(arrayContactos) {
  let tContactos = document.createElement("div");
  document.getElementById("boxContactos").appendChild(tContactos);
  let table = document.createElement("table");
  tContactos.appendChild(table);
  table.setAttribute("class", "default");
  let thead = document.createElement("thead");
  table.appendChild(thead);
  let trTitulos = document.createElement("tr");
  thead.appendChild(trTitulos);

  let thCheck = document.createElement("th");
  // let iThCheck = document.createElement("i");
  trTitulos.appendChild(thCheck);
  // thCheck.appendChild(iThCheck);
  // iThCheck.setAttribute("class", "far fa-square");

  let thContacto = document.createElement("th");
  let spanThContacto = document.createElement("span");
  let iThContacto = document.createElement("i");
  thContacto.innerHTML = "Contacto";
  iThContacto.setAttribute("class", "fas fa-sort");
  trTitulos.appendChild(thContacto);
  thContacto.appendChild(spanThContacto);
  spanThContacto.appendChild(iThContacto);
  spanThContacto.addEventListener("click", function () {
    ordenContacto(arrayContactos);
  });

  let thZona = document.createElement("th");
  let spanThZona = document.createElement("span");
  let iThZona = document.createElement("i");
  thZona.innerHTML = "Pais/Región";
  iThZona.setAttribute("class", "fas fa-sort");
  trTitulos.appendChild(thZona);
  thZona.appendChild(spanThZona);
  spanThZona.appendChild(iThZona);
  spanThZona.addEventListener("click", function () {
    ordenZona(arrayContactos);
  });

  let thCompania = document.createElement("th");
  let spanThCompania = document.createElement("span");
  let iThCompania = document.createElement("i");
  thCompania.innerHTML = "Compañia";
  iThCompania.setAttribute("class", "fas fa-sort");
  trTitulos.appendChild(thCompania);
  thCompania.appendChild(spanThCompania);
  spanThCompania.appendChild(iThCompania);
  spanThCompania.addEventListener("click", function () {
    ordenCompania(arrayContactos);
  });

  let thCargo = document.createElement("th");
  let spanThCargo = document.createElement("span");
  let iThCargo = document.createElement("i");
  thCargo.innerHTML = "Cargo";
  iThCargo.setAttribute("class", "fas fa-sort");
  trTitulos.appendChild(thCargo);
  thCargo.appendChild(spanThCargo);
  spanThCargo.appendChild(iThCargo);
  spanThCargo.addEventListener("click", function () {
    ordenCargo(arrayContactos);
  });

  let thInteres = document.createElement("th");
  let spanThInteres = document.createElement("span");
  let iThInteres = document.createElement("i");
  thInteres.innerHTML = "Interés";
  iThInteres.setAttribute("class", "fas fa-sort");
  trTitulos.appendChild(thInteres);
  thInteres.appendChild(spanThInteres);
  spanThInteres.appendChild(iThInteres);
  spanThInteres.addEventListener("click", function () {
    ordenInteres(arrayContactos);
  });

  let thAccion = document.createElement("th");
  thAccion.innerHTML = "Acciones";
  trTitulos.appendChild(thAccion);

  let tbody = document.createElement("tbody");
  table.appendChild(tbody);
  tbody.setAttribute("id", "tcontenido");
}

function busqueda(arrayContactos) {
  console.log(arrayContactos);
  let palabra = document.getElementById("inputsearch").value;
  let encontrado = arrayContactos.filter(
    (a) =>
      a.fname.toLowerCase().includes(palabra.toLowerCase()) == true ||
      a.lname.toLowerCase().includes(palabra.toLowerCase()) == true ||
      a.position.toLowerCase().includes(palabra.toLowerCase()) == true ||
      a.nombre_compania.toLowerCase().includes(palabra.toLowerCase()) == true ||
      a.nombre_ciudad.toLowerCase().includes(palabra.toLowerCase()) == true ||
      a.nombre_pais.toLowerCase().includes(palabra.toLowerCase()) == true ||
      a.nombre_region.toLowerCase().includes(palabra.toLowerCase()) == true ||
      a.interest == palabra
  );
  console.log(encontrado);
  let borraTabla = document.getElementById("tcontenido");
  while (borraTabla.firstChild) {
    borraTabla.removeChild(borraTabla.firstChild);
  }
  function datosContactos(encontrado) {
    for (i = 0; i < encontrado.length; i++) {
      let contactos = document.createElement("tr");
      document.getElementById("tcontenido").appendChild(contactos);
      contactos.setAttribute("id", "contacto" + encontrado[i].id_contact);
  
      let square = document.createElement("th");
      let check = document.createElement("i");
      let spanCheck = document.createElement("span");
      let contacto = document.createElement("th");
      let paisRegion = document.createElement("th");
      let compania = document.createElement("th");
      let cargo = document.createElement("th");
      let interes = document.createElement("th");
      let accion = document.createElement("th");
      contactos.appendChild(square);
      square.appendChild(spanCheck);
      spanCheck.appendChild(check);
      contactos.appendChild(contacto);
      contactos.appendChild(paisRegion);
      contactos.appendChild(compania);
      contactos.appendChild(cargo);
      contactos.appendChild(interes);
      contactos.appendChild(accion);
      check.setAttribute("class", "far fa-square");
      check.setAttribute("id", "check" + encontrado[i].id_contacto);
      contacto.innerHTML = encontrado[i].fname + " " + encontrado[i].lname;
      paisRegion.innerHTML = encontrado[i].nombre_pais + " - " + encontrado[i].nombre_region;
      compania.innerHTML = encontrado[i].nombre_compania;
      cargo.innerHTML = encontrado[i].position;
      interes.innerHTML = encontrado[i].interest+"%";
  
      let id_contact =encontrado[i].id_contacto;
      arrayEliminar = [];
      square.addEventListener("click", function () {
        if (arrayEliminar.some((elem) => elem == id_contact)) {
          for (i = 0; i < arrayEliminar.length; i++) {
            if (arrayEliminar[i] === id_contact) {
              arrayEliminar.splice(i, 1);
            }
          }
          document.getElementById("check" + id_contact).removeAttribute("class", "far fa-check-square");
          document.getElementById("check" + id_contact).setAttribute("class", "far fa-square");
          contactos.removeAttribute("class","contactive");
        } else {
          arrayEliminar.push(id_contact);
          document.getElementById("check" + id_contact).removeAttribute("class", "far fa-square");
          document.getElementById("check" + id_contact).setAttribute("class", "far fa-check-square");
          contactos.setAttribute("class","contactive");
        }
        seleccionEliminar();
      });

      let editar = document.createElement("h3");
      let eliminar = document.createElement("h3");
      accion.appendChild(editar);
      accion.appendChild(eliminar);
      editar.innerHTML = "Editar";
      editar.setAttribute("class","editar");
      editar.style.cursor="pointer";
      eliminar.innerHTML = "Eliminar";
      eliminar.setAttribute("class","eliminar");
      eliminar.style.cursor="pointer";
  
      // console.log(json[i]);
      let data = encontrado[i];
      console.log(data)
      editar.addEventListener("click", function () {
        modificarContacto(data, id_contact);
      });
      eliminar.addEventListener("click", ()=>{
        fetch (`http://localhost:3000/contactos/${id_contact}`,
                                  {
                                    method: "DELETE",
                                    headers:{
                                    "Content-Type": "application/json",}
                                  }
                        ).then((res)=>res.encontrado()).then((encontrado)=>{
                          if(json.message=="Contacto eliminado"){
                            alert("Contacto eliminado satisfactoriamente")
                          }else
                            alert("Error al eliminar contacto")
                          
                        })
                location.reload()
      });
    }
  }
  datosContactos(encontrado)
}


function newContact() {
        formularioContacto();
        let botonAccion = document.getElementById("botonaccion");
        botonAccion.innerHTML = "Crear";
        botonAccion.addEventListener("click", function () {
          postContact();
        });
      }

function ordenContacto(arrayContactos) {
        if (orden == undefined || orden == true) {
          arrayContactos.sort((a, b) => (a.nombre > b.nombre ? 1 : -1));
          orden = false;
        } else {
          arrayContactos.sort((a, b) => (a.nombre < b.nombre ? 1 : -1));
          orden = true;
        }
        borrarDatos();
        datosContactos(arrayContactos);
      }

function ordenCompania(arrayContactos) {
        if (orden == undefined || orden == true) {
          arrayContactos.sort((a, b) => (a.compañia > b.compañia ? 1 : -1));
          orden = false;
        } else {
          arrayContactos.sort((a, b) => (a.compañia < b.compañia ? 1 : -1));
          orden = true;
        }
        borrarDatos();
        datosContactos(arrayContactos);
      }
      
function ordenCargo(arrayContactos) {
        if (orden == undefined || orden == true) {
          arrayContactos.sort((a, b) => (a.cargo > b.cargo ? 1 : -1));
          orden = false;
        } else {
          arrayContactos.sort((a, b) => (a.cargo < b.cargo ? 1 : -1));
          orden = true;
        }
        borrarDatos();
        datosContactos(arrayContactos);
      }
      
function ordenInteres(arrayContactos) {
        if (orden == undefined || orden == true) {
          arrayContactos.sort((a, b) => (a.interes > b.interes ? 1 : -1));
          orden = false;
        } else {
          arrayContactos.sort((a, b) => (a.interes < b.interes ? 1 : -1));
          orden = true;
        }
        borrarDatos();
        datosContactos(arrayContactos);
      }

function seleccionEliminar() {
        let cd = document.getElementById("arrayDelete");
        while (cd.firstChild) {
          cd.removeChild(cd.firstChild);
        }
        let selDelete = document.createElement("h5");
        cd.appendChild(selDelete);
        selDelete.innerHTML = "seleccionados " + arrayEliminar.length;
      
        let multiDelete = document.createElement("h5");
        cd.appendChild(multiDelete);
        multiDelete.innerHTML = "Eliminar contactos seleccionados";
      
        if (arrayEliminar.length === 0) {
          selDelete.style.visibility = "hidden";
          multiDelete.style.visibility = "hidden";
        } else {
          selDelete.style.visibility = "initial";
          multiDelete.style.visibility = "initial";
        }
      
        multiDelete.addEventListener("click", function () {
          let confirmacion = confirm("Realmente desea eliminar los contactos?");
          if (confirmacion == true) {
            for (i = 0; i < arrayEliminar.length; i++) {
              deleteContacts(arrayEliminar[i]);
            }
            alert("Contacto eliminado exitosamente");
            /*cargarContactos();*/
          }
        });
      }

function formularioContacto(data) {
        /*eliminarContenido();*/
        console.log(data);
        let cabeContactos = document.createElement("h2");
        let boxEditar = document.createElement("div")
        let boxCabecera = document.createElement("div")
        document.getElementById("boxContactos").appendChild(boxEditar);
        cabeContactos.innerHTML = "Nuevo contacto";
        boxCabecera.appendChild(cabeContactos);
        boxEditar.appendChild(boxCabecera);
        boxCabecera.setAttribute("id","boxCabecera")
        cabeContactos.setAttribute("id","cabeContactos")
        boxEditar.setAttribute("id","boxEditar")
        let formulario = document.createElement("form");
        let ulPrincipal = document.createElement("ul");
        let li1 = document.createElement("li");
        let li2 = document.createElement("li");
        let li3 = document.createElement("li");
        let li4 = document.createElement("li");
        let li5 = document.createElement("li");
        let lblForm1 = document.createElement("label");
        let lblForm2 = document.createElement("label");
        let lblForm3 = document.createElement("label");
        let lblForm4 = document.createElement("label");
        let lblForm5 = document.createElement("label");
        let inputForm1 = document.createElement("input");
        let inputForm2 = document.createElement("input");
        let inputForm3 = document.createElement("input");
        let inputForm4 = document.createElement("input");
        let selectForm5 = document.createElement("select");
        boxEditar.appendChild(formulario)
        document.getElementById("boxContactos").appendChild(boxEditar);
        formulario.appendChild(ulPrincipal);
        ulPrincipal.appendChild(li1);
        ulPrincipal.appendChild(li2);
        ulPrincipal.appendChild(li3);
        ulPrincipal.appendChild(li4);
        ulPrincipal.appendChild(li5);
        li1.appendChild(lblForm1);
        li2.appendChild(lblForm2);
        li3.appendChild(lblForm3);
        li4.appendChild(lblForm4);
        li5.appendChild(lblForm5);
        li1.appendChild(inputForm1);
        li2.appendChild(inputForm2);
        li3.appendChild(inputForm3);
        li4.appendChild(inputForm4);
        li5.appendChild(selectForm5);
      
        ulPrincipal.setAttribute("id", "cont-up");
        lblForm1.setAttribute("for", "cfname");
        lblForm1.innerHTML = "Nombre*";
        lblForm2.setAttribute("for", "clname");
        lblForm2.innerHTML = "Apellido*";
        lblForm3.setAttribute("for", "cposition");
        lblForm3.innerHTML = "Cargo*";
        lblForm4.setAttribute("for", "cemail");
        lblForm4.innerHTML = "Correo electronico*";
        lblForm5.setAttribute("for", "id_company");
        lblForm5.innerHTML = "Compañia*";
        // lblForm5.setAttribute("disabled", "disabled");
      
        inputForm1.setAttribute("type", "text");
        inputForm1.setAttribute("id", "cfname");
        inputForm2.setAttribute("type", "text");
        inputForm2.setAttribute("id", "clname");
        inputForm3.setAttribute("type", "text");
        inputForm3.setAttribute("id", "cposition");
        inputForm4.setAttribute("type", "email");
        inputForm4.setAttribute("id", "cemail");
        selectForm5.setAttribute("id", "id_company");
      
        let opcion0 = document.createElement("option");
        opcion0.innerHTML = "Seleccione una compañia...";
        selectForm5.appendChild(opcion0);
        for (i = 0; i < arrayCompanias.length; i++) {
          let opcion = document.createElement("option");
          opcion.innerHTML = arrayCompanias[i].name;
          selectForm5.appendChild(opcion);
          opcion.setAttribute("value", arrayCompanias[i].id_company);
        }
      
        let select = document.getElementById("id_company");
        select.addEventListener("change", function () {
          var optionCompany = this.options[select.selectedIndex].value;
          console.log(optionCompany);
          selectForm5.setAttribute("value", optionCompany);
        });
      
        let ulSecundario = document.createElement("ul");
        let li01 = document.createElement("li");
        let li02 = document.createElement("li");
        let li03 = document.createElement("li");
        let li04 = document.createElement("li");
        let li05 = document.createElement("li");
        let liCanal = document.createElement("li");
        let li06 = document.createElement("li");
        let li07 = document.createElement("li");
        let li08 = document.createElement("li");
        let li09 = document.createElement("li");
        let li010 = document.createElement("li");
        li01.setAttribute("class","reg");
        li02.setAttribute("class","pai");
        li03.setAttribute("class","ciu");
        li04.setAttribute("class","dir");
        li05.setAttribute("class","int");
        liCanal.setAttribute("class","canal");
        li06.setAttribute("class","tel");
        li07.setAttribute("class","wha");
        li08.setAttribute("class","ins");
        li09.setAttribute("class","fac");
        li010.setAttribute("class","lin");
      
        let lblForm01 = document.createElement("label");
        let lblForm02 = document.createElement("label");
        let lblForm03 = document.createElement("label");
        let lblForm04 = document.createElement("label");
        let lblForm05 = document.createElement("label");
        let lblForm06 = document.createElement("label");
        let lblForm07 = document.createElement("label");
        let lblForm08 = document.createElement("label");
        let selectForm01 = document.createElement("select");
        let selectForm02 = document.createElement("select");
        let selectForm03 = document.createElement("select");
        let inputForm04 = document.createElement("input");
        let selectForm05 = document.createElement("select");
        let lblCanal06 = document.createElement("label");
        let inputForm06 = document.createElement("input");
        let selectForm06 = document.createElement("select");
        let lblCanal07 = document.createElement("label");
        let inputForm07 = document.createElement("input");
        let selectForm07 = document.createElement("select");
        let lblCanal08 = document.createElement("label");
        let inputForm08 = document.createElement("input");
        let selectForm08 = document.createElement("select");
        let lblCanal09 = document.createElement("label");
        let inputForm09 = document.createElement("input");
        let selectForm09 = document.createElement("select");
        let lblCanal010 = document.createElement("label");
        let inputForm010 = document.createElement("input");
        let selectForm010 = document.createElement("select");
      
        formulario.appendChild(ulSecundario);
        ulSecundario.appendChild(li01);
        ulSecundario.appendChild(li02);
        ulSecundario.appendChild(li03);
        ulSecundario.appendChild(li04);
        ulSecundario.appendChild(li05);
        ulSecundario.appendChild(liCanal);
        ulSecundario.appendChild(li06);
        ulSecundario.appendChild(li07);
        ulSecundario.appendChild(li08);
        ulSecundario.appendChild(li09);
        ulSecundario.appendChild(li010);
        li01.appendChild(lblForm01);
        li02.appendChild(lblForm02);
        li03.appendChild(lblForm03);
        li04.appendChild(lblForm04);
        li05.appendChild(lblForm05);
        liCanal.appendChild(lblForm06);
        liCanal.appendChild(lblForm07);
        liCanal.appendChild(lblForm08);
        li01.appendChild(selectForm01);
        li02.appendChild(selectForm02);
        li03.appendChild(selectForm03);
        li04.appendChild(inputForm04);
        li05.appendChild(selectForm05);
        li06.appendChild(lblCanal06);
        li06.appendChild(inputForm06);
        li06.appendChild(selectForm06);
        li07.appendChild(lblCanal07);
        li07.appendChild(inputForm07);
        li07.appendChild(selectForm07);
        li08.appendChild(lblCanal08);
        li08.appendChild(inputForm08);
        li08.appendChild(selectForm08);
        li09.appendChild(lblCanal09);
        li09.appendChild(inputForm09);
        li09.appendChild(selectForm09);
        li010.appendChild(lblCanal010);
        li010.appendChild(inputForm010);
        li010.appendChild(selectForm010);
      
        ulSecundario.setAttribute("id", "cont-down");
        lblForm01.setAttribute("for", "cregion");
        lblForm01.innerHTML = "Region*";
        // lblForm01.setAttribute("disabled", "disabled");
        lblForm02.setAttribute("for", "cpais");
        lblForm02.innerHTML = "Pais*";
        // lblForm02.setAttribute("disabled", "disabled");
        lblForm03.setAttribute("for", "cciudad");
        lblForm03.innerHTML = "Ciudad*";
        // lblForm03.setAttribute("disabled", "disabled");
        lblForm04.setAttribute("for", "cdireccion");
        lblForm04.innerHTML = "Direccion:";
        lblForm05.setAttribute("for", "cinteres");
        lblForm05.innerHTML = "Interes:";
        // lblForm05.setAttribute("disabled", "disabled");
        lblForm06.innerHTML = "Canal de contacto";
        lblForm07.innerHTML = "Dato de contacto";
        lblForm08.innerHTML = "Preferencia";
        lblCanal06.setAttribute("for", "ctelefono");
        lblCanal06.innerHTML = "Telefono";
        lblCanal07.setAttribute("for", "cwhatsapp");
        lblCanal07.innerHTML = "Whatsapp";
        lblCanal08.setAttribute("for", "cinstagram");
        lblCanal08.innerHTML = "Instagram";
        lblCanal09.setAttribute("for", "cfacebook");
        lblCanal09.innerHTML = "Facebook";
        lblCanal010.setAttribute("for", "clinkedin");
        lblCanal010.innerHTML = "Linkedin";
      
        selectForm01.setAttribute("id", "cregion");
        selectForm02.setAttribute("id", "cpais");
        selectForm03.setAttribute("id", "cciudad");
        inputForm04.setAttribute("type", "text");
        inputForm04.setAttribute("id", "cdireccion");
        selectForm05.setAttribute("id", "cinteres");
        inputForm06.setAttribute("type", "text");
        inputForm06.setAttribute("id", "ctelefono");
        inputForm07.setAttribute("type", "text");
        inputForm07.setAttribute("id", "cwhatsapp");
        inputForm08.setAttribute("type", "text");
        inputForm08.setAttribute("id", "cinstagram");
        inputForm09.setAttribute("type", "text");
        inputForm09.setAttribute("id", "cfacebook");
        inputForm010.setAttribute("type", "text");
        inputForm010.setAttribute("id", "clinkedin");
        selectForm06.setAttribute("id", "ctel");
        selectForm07.setAttribute("id", "cwha");
        selectForm08.setAttribute("id", "cins");
        selectForm09.setAttribute("id", "cfac");
        selectForm010.setAttribute("id", "clin");
      
        let opcionReg = document.createElement("option");
        opcionReg.innerHTML = "Seleccione una Region...";
        selectForm01.appendChild(opcionReg);
        for (i = 0; i < arrayRegiones.length; i++) {
          let opcionR = document.createElement("option");
          opcionR.innerHTML = arrayRegiones[i].nombre_region;
          selectForm01.appendChild(opcionR);
          opcionR.setAttribute("value", arrayRegiones[i].id_region);
          // if (data.id_contact) {
          //   if (arrayRegiones[i].id_region == data.id_region) {
          //     opcionR.setAttribute("selected", "selected");
          //   }
          // }
        }
      
        let selectReg = document.getElementById("cregion");
        let selectPai = document.getElementById("cpais");
        let selectCiu = document.getElementById("cciudad");
        selectReg.addEventListener("change", function () {
          var optionRegion = this.options[selectReg.selectedIndex].value;
          console.log(optionRegion);
          selectForm01.setAttribute("value", optionRegion);
      
          let borraPais = document.getElementById("cpais");
          while (borraPais.firstChild) {
            borraPais.removeChild(borraPais.firstChild);
          }
      
          let opcionPai = document.createElement("option");
          opcionPai.innerHTML = "Seleccione un Pais...";
         
          selectForm02.appendChild(opcionPai);
          for (i = 0; i < arrayPaises.length; i++) {
            if (arrayPaises[i].id_region == optionRegion) {
              let opcionP = document.createElement("option");
              opcionP.innerHTML = arrayPaises[i].nombre_pais;
              selectForm02.appendChild(opcionP);
              opcionP.setAttribute("value", arrayPaises[i].id_country);
              // if (data.id_contact) {
              //   if (arrayPaises[i].id_country == data.id_country) {
              //     opcionP.setAttribute("selected", "selected");
              //   }
              // }
            }
          }
          selectPai.addEventListener("change", function () {
            var optionPais = this.options[selectPai.selectedIndex].value;
            console.log(optionPais);
            selectForm02.setAttribute("value", optionPais);
      
            let borraCiudad = document.getElementById("cciudad");
            while (borraCiudad.firstChild) {
              borraCiudad.removeChild(borraCiudad.firstChild);
            }
      
            let opcionCiu = document.createElement("option");
            opcionCiu.innerHTML = "Seleccione una Ciudad...";
            selectForm03.appendChild(opcionCiu);
            for (i = 0; i < arrayCities.length; i++) {
              if (arrayCities[i].id_country == optionPais) {
                let opcionC = document.createElement("option");
                opcionC.innerHTML = arrayCities[i].nombre_ciudad;
                selectForm03.appendChild(opcionC);
                opcionC.setAttribute("value", arrayCities[i].id_city);
                // if (data.id_contact) {
                //   if (arrayCities[i].id_city == data.id_city) {
                //     opcionC.setAttribute("selected", "selected");
                //   }
                // }
              }
            }
            selectCiu.addEventListener("change", function () {
              var optionCiudad = this.options[selectCiu.selectedIndex].value;
              console.log(optionCiudad);
              selectForm03.setAttribute("value", optionCiudad);
            });
          });
        });
      
        let opcion00 = document.createElement("option");
        opcion00.innerHTML = "0%";
        selectForm05.appendChild(opcion00);
        opcion00.setAttribute("value", 0);
        let opcion25 = document.createElement("option");
        opcion25.innerHTML = "25%";
        selectForm05.appendChild(opcion25);
        opcion25.setAttribute("value", 25);
        let opcion50 = document.createElement("option");
        opcion50.innerHTML = "50%";
        selectForm05.appendChild(opcion50);
        opcion50.setAttribute("value", 50);
        let opcion75 = document.createElement("option");
        opcion75.innerHTML = "75%";
        selectForm05.appendChild(opcion75);
        opcion75.setAttribute("value", 75);
        let opcion100 = document.createElement("option");
        opcion100.innerHTML = "100%";
        selectForm05.appendChild(opcion100);
        opcion100.setAttribute("value", 100);
      
        let selectInt = document.getElementById("cinteres");
        selectInt.addEventListener("change", function () {
          var optionInt = this.options[selectInt.selectedIndex].value;
          console.log(optionInt);
          selectForm05.setAttribute("value", optionInt);
        });
      
        let opcionTel1 = document.createElement("option");
        opcionTel1.innerHTML = "Sin preferencia";
        selectForm06.appendChild(opcionTel1);
        opcionTel1.setAttribute("value", 1);
        let opcionTel2 = document.createElement("option");
        opcionTel2.innerHTML = "Canal Favorito";
        selectForm06.appendChild(opcionTel2);
        opcionTel2.setAttribute("value", 2);
        let opcionTel3 = document.createElement("option");
        opcionTel3.innerHTML = "No molestar";
        selectForm06.appendChild(opcionTel3);
        opcionTel3.setAttribute("value", 3);
      
        let selectTel = document.getElementById("ctel");
        selectTel.addEventListener("change", function () {
          var optionTel = this.options[selectTel.selectedIndex].value;
          console.log(optionTel);
          selectForm06.setAttribute("value", optionTel);
        });
      
        let opcionWha1 = document.createElement("option");
        opcionWha1.innerHTML = "Sin preferencia";
        selectForm07.appendChild(opcionWha1);
        opcionWha1.setAttribute("value", 1);
        let opcionWha2 = document.createElement("option");
        opcionWha2.innerHTML = "Canal Favorito";
        selectForm07.appendChild(opcionWha2);
        opcionWha2.setAttribute("value", 2);
        let opcionWha3 = document.createElement("option");
        opcionWha3.innerHTML = "No molestar";
        selectForm07.appendChild(opcionWha3);
        opcionWha3.setAttribute("value", 3);
      
        let selectWha = document.getElementById("cwha");
        selectWha.addEventListener("change", function () {
          var optionWha = this.options[selectWha.selectedIndex].value;
          console.log(optionWha);
          selectForm07.setAttribute("value", optionWha);
        });
      
        let opcionIns1 = document.createElement("option");
        opcionIns1.innerHTML = "Sin preferencia";
        selectForm08.appendChild(opcionIns1);
        opcionIns1.setAttribute("value", 1);
        let opcionIns2 = document.createElement("option");
        opcionIns2.innerHTML = "Canal Favorito";
        selectForm08.appendChild(opcionIns2);
        opcionIns2.setAttribute("value", 2);
        let opcionIns3 = document.createElement("option");
        opcionIns3.innerHTML = "No molestar";
        selectForm08.appendChild(opcionIns3);
        opcionIns3.setAttribute("value", 3);
      
        let selectIns = document.getElementById("cins");
        selectIns.addEventListener("change", function () {
          var optionIns = this.options[selectIns.selectedIndex].value;
          console.log(optionIns);
          selectForm08.setAttribute("value", optionIns);
        });
      
        let opcionFac1 = document.createElement("option");
        opcionFac1.innerHTML = "Sin preferencia";
        selectForm09.appendChild(opcionFac1);
        opcionFac1.setAttribute("value", 1);
        let opcionFac2 = document.createElement("option");
        opcionFac2.innerHTML = "Canal Favorito";
        selectForm09.appendChild(opcionFac2);
        opcionFac2.setAttribute("value", 2);
        let opcionFac3 = document.createElement("option");
        opcionFac3.innerHTML = "No molestar";
        selectForm09.appendChild(opcionFac3);
        opcionFac3.setAttribute("value", 3);
      
        let selectFac = document.getElementById("cfac");
        selectFac.addEventListener("change", function () {
          var optionFac = this.options[selectFac.selectedIndex].value;
          console.log(optionFac);
          selectForm09.setAttribute("value", optionFac);
        });
      
        let opcionLin1 = document.createElement("option");
        opcionLin1.innerHTML = "Sin preferencia";
        selectForm010.appendChild(opcionLin1);
        opcionLin1.setAttribute("value", 1);
        let opcionLin2 = document.createElement("option");
        opcionLin2.innerHTML = "Canal Favorito";
        selectForm010.appendChild(opcionLin2);
        opcionLin2.setAttribute("value", 2);
        let opcionLin3 = document.createElement("option");
        opcionLin3.innerHTML = "No molestar";
        selectForm010.appendChild(opcionLin3);
        opcionLin3.setAttribute("value", 3);
      
        let selectLin = document.getElementById("clin");
        selectLin.addEventListener("change", function () {
          var optionLin = this.options[selectLin.selectedIndex].value;
          console.log(optionLin);
          selectForm010.setAttribute("value", optionLin);
        });
      
        if (data) {
          let aviso = document.createElement("h5");
          cabeContactos.appendChild(aviso);
          aviso.innerHTML =
            "Solo se aplicaran cambios cuando exista iteraccion del usuario sobre el campo, de lo contrario se mantendra la misma informacion.";
          inputForm1.setAttribute("value", data.nombre);
          inputForm2.setAttribute("value", data.apellido);
          inputForm3.setAttribute("value", data.cargo);
          selectForm5.setAttribute("value", data.id_compaia);
          selectForm01.setAttribute("value", data.id_regiones);
          selectForm02.setAttribute("value", data.id_pais);
          selectForm03.setAttribute("value", data.id_ciudad);
          inputForm04.setAttribute("value", data.direccion);
          selectForm05.setAttribute("value", data.interes);
          inputForm06.setAttribute("value", data.cuenta_telefono);
          selectForm06.setAttribute("value", data.preferencia_telefono);
          inputForm07.setAttribute("value", data.cuenta_whatsapp);
          selectForm07.setAttribute("value", data.preferencia_whatsapp);
          inputForm08.setAttribute("value", data.cuenta_instagram);
          selectForm08.setAttribute("value", data.preferencia_instagram);
          inputForm09.setAttribute("value", data.cuenta_facebook);
          selectForm09.setAttribute("value", data.preferencia_facebook);
          inputForm010.setAttribute("value", data.cuenta_linkedin);
          selectForm010.setAttribute("value", data.preferencia_linkedin);
      
          let dataAntCom = document.createElement("h4");
          li5.append(dataAntCom);
          dataAntCom.innerHTML = "(Anterior: " + data.nombre_compania + ")";
          let dataAntReg = document.createElement("h4");
          li01.append(dataAntReg);
          dataAntReg.innerHTML = "(Anterior: " + data.nombre_region + ")";
          let dataAntPai = document.createElement("h4");
          li02.append(dataAntPai);
          dataAntPai.innerHTML = "(Anterior: " + data.nombre_pais + ")";
          let dataAntCiu = document.createElement("h4");
          li03.append(dataAntCiu);
          dataAntCiu.innerHTML = "(Anterior: " + data.nombre_ciudad + ")";
          let dataAntInt = document.createElement("h4");
          li05.append(dataAntInt);
          dataAntInt.innerHTML = "(Anterior: " + data.interest + ")";
          let dataAntTel = document.createElement("h4");
          li06.append(dataAntTel);
          dataAntTel.innerHTML = "(Anterior: " + data.preferencia_phone + ")";
          let dataAntWha = document.createElement("h4");
          li07.append(dataAntWha);
          dataAntWha.innerHTML = "(Anterior: " + data.preferencia_whatsapp + ")";
          let dataAntIns = document.createElement("h4");
          li08.append(dataAntIns);
          dataAntIns.innerHTML = "(Anterior: " + data.preferencia_instagram + ")";
          let dataAntFac = document.createElement("h4");
          li09.append(dataAntFac);
          dataAntFac.innerHTML = "(Anterior: " + data.preferencia_facebook + ")";
          let dataAnteLin = document.createElement("h4");
          li010.append(dataAnteLin);
          dataAnteLin.innerHTML = "(Anterior: " + data.preferencia_linkedin + ")";
        }
      
        var botonAccion = document.createElement("h2");
        formulario.appendChild(botonAccion);
        botonAccion.setAttribute("id", "botonaccion");
        botonAccion.style.cursor="pointer";
      }

/*function eliminarContenido() {
        let borraContactos = document.getElementById("contactos");
        while (borraContactos.firstChild) {
          borraContactos.removeChild(borraContactos.firstChild);
        }
        let borraUsuarios = document.getElementById("usuarios");
        while (borraUsuarios.firstChild) {
          borraUsuarios.removeChild(borraUsuarios.firstChild);
        }
        let borraCompanias = document.getElementById("companias");
        while (borraCompanias.firstChild) {
          borraCompanias.removeChild(borraCompanias.firstChild);
        }
        let borraZonas = document.getElementById("zonas");
        while (borraZonas.firstChild) {
          borraZonas.removeChild(borraZonas.firstChild);
        }
        let borrarBienvenida= document.getElementById("bienvenida");
        while (borrarBienvenida.firstChild) {
          borrarBienvenida.removeChild(borrarBienvenida.firstChild);
        }
      }   */   

function modificarContacto(data, id_contact) {
        formularioContacto(data);
        let botonAccion = document.getElementById("botonaccion");
        botonAccion.innerHTML = "Modificar";
        botonAccion.addEventListener("click", function () {
          patchContact(id_contact);
        });
      }

function patchContact(id_contact) {
        let companyContact = document.getElementById("id_company").value;
        let ciudadContact = document.getElementById("cciudad").value;
        let interesContact = document.getElementById("cinteres").value;
        let preTel = document.getElementById("ctel").value;
        let preWha = document.getElementById("cwha").value;
        let preIns = document.getElementById("cins").value;
        let preFac = document.getElementById("cfac").value;
        let preLin = document.getElementById("clin").value;
        let editContact = {
          nombre: cfname.value,
          apellido: clname.value,
          cargo: cposition.value,
          id_compania: companyContact,
          id_ciudad: ciudadContact,
          direccion: cdireccion.value,
          interes: interesContact,
          cuenta_telefono: ctelefono.value,
          preferencia_telefono: preTel,
          cuenta_whatsapp: cwhatsapp.value,
          preferencia_whatsapp: preWha,
          cuenta_instagram: cinstagram.value,
          preferencia_instagram: preIns,
          cuenta_facebook: cfacebook.value,
          preferencia_facebook: preFac,
          cuenta_linkedin: clinkedin.value,
          preferencia_linkedin: preLin,
        };
      
        console.log(editContact);
      
        let requestOptions = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",},
          body: JSON.stringify(editContact),
        };
      
        const urlContactos = `http://localhost:3000/contactos/${id_contact}`;
        fetch(urlContactos, requestOptions)
          .then((res) => res.json())
          .then((json) => {
            console.log(json);
            if (json.msj == "Contacto modificado exitosamente") {
              alert("Contacto modificado exitosamente");
              cargarContactos();
            } else {
              alert("Error al modificar el contacto, el mismo ya existe o faltan campos por completar");
            }
          })
          .catch((error) => console.error("Error:", error));
      }

    function datosContactos(json) {
      for (i = 0; i < json.length; i++) {
        let contactos = document.createElement("tr");
        document.getElementById("tcontenido").appendChild(contactos);
        contactos.setAttribute("id", "contacto" + json[i].id_contact);
    
        let square = document.createElement("th");
        let check = document.createElement("i");
        let spanCheck = document.createElement("span");
        let contacto = document.createElement("th");
        let paisRegion = document.createElement("th");
        let compania = document.createElement("th");
        let cargo = document.createElement("th");
        let interes = document.createElement("th");
        let accion = document.createElement("th");
        contactos.appendChild(square);
        square.appendChild(spanCheck);
        spanCheck.appendChild(check);
        contactos.appendChild(contacto);
        contactos.appendChild(paisRegion);
        contactos.appendChild(compania);
        contactos.appendChild(cargo);
        contactos.appendChild(interes);
        contactos.appendChild(accion);
        check.setAttribute("class", "far fa-square");
        check.setAttribute("id", "check" + json[i].id_contacto);
        contacto.innerHTML = json[i].nombre + " " + json[i].apellido;
        paisRegion.innerHTML = json[i].nombre_pais + " - " + json[i].nombre_region;
        compania.innerHTML = json[i].nombre_compania;
        cargo.innerHTML = json[i].cargo;
        interes.innerHTML = json[i].interes+"%";
    
        let id_contact = json[i].id_contacto;
        arrayEliminar = [];
        square.addEventListener("click", function () {
          if (arrayEliminar.some((elem) => elem == id_contact)) {
            for (i = 0; i < arrayEliminar.length; i++) {
              if (arrayEliminar[i] === id_contact) {
                arrayEliminar.splice(i, 1);
              }
            }
            document.getElementById("check" + id_contact).removeAttribute("class", "far fa-check-square");
            document.getElementById("check" + id_contact).setAttribute("class", "far fa-square");
            contactos.removeAttribute("class","contactive");
          } else {
            arrayEliminar.push(id_contact);
            document.getElementById("check" + id_contact).removeAttribute("class", "far fa-square");
            document.getElementById("check" + id_contact).setAttribute("class", "far fa-check-square");
            contactos.setAttribute("class","contactive");
          }
          seleccionEliminar();
        });

        let editar = document.createElement("h3");
        let eliminar = document.createElement("h3");
        accion.appendChild(editar);
        accion.appendChild(eliminar);
        editar.innerHTML = "Editar";
        editar.setAttribute("class","editar");
        editar.style.cursor="pointer";
        eliminar.innerHTML = "Eliminar";
        eliminar.setAttribute("class","eliminar");
        eliminar.style.cursor="pointer";
    
        // console.log(json[i]);
        let data = json[i];
        console.log(data)
        editar.addEventListener("click", function () {
          modificarContacto(data, id_contact);
        });
        eliminar.addEventListener("click", ()=>{
          fetch (`http://localhost:3000/contactos/${id_contact}`,
                                    {
                                      method: "DELETE",
                                      headers:{
                                      "Content-Type": "application/json",}
                                    }
                          ).then((res)=>res.json()).then((json)=>{
                            if(json.message=="Contacto eliminado"){
                              alert("Contacto eliminado satisfactoriamente")
                            }else
                              alert("Error al eliminar contacto")
                            
                          })
                  location.reload()
        });
      }
    }

function deleteContacts(id_contact) {
      let requestOptions = {
        method: "DELETE",
        headers: myHeaders,
      };
    
      const urlContactos = `http://localhost:3000/contactos/${id_contact}`;
      fetch(urlContactos, requestOptions)
        .then((res) => res.json())
        .then((json) => {})
        .catch((error) => console.error("Error:", error));
}

function postContact() {
  let companyContact = document.getElementById("id_company").value;
  let ciudadContact = document.getElementById("cciudad").value;
  let interesContact = document.getElementById("cinteres").value;
  let preTel = document.getElementById("ctel").value;
  let preWha = document.getElementById("cwha").value;
  let preIns = document.getElementById("cins").value;
  let preFac = document.getElementById("cfac").value;
  let preLin = document.getElementById("clin").value;
  let newContact = {
    nombre: cfname.value,
    apellido: clname.value,
    cargo: cposition.value,
    id_compania: companyContact,
    id_ciudad: ciudadContact,
    direccion: cdireccion.value,
    interes: interesContact,
    cuenta_telefono: ctelefono.value,
    preferencia_telefono: preTel,
    cuenta_whatsapp: cwhatsapp.value,
    preferencia_whatsapp: preWha,
    cuenta_instagram: cinstagram.value,
    preferencia_instagram: preIns,
    cuenta_facebook: cfacebook.value,
    preferencia_facebook: preFac,
    cuenta_linkedin: clinkedin.value,
    preferencia_linkedin: preLin,
  };

  console.log(newContact);

  let requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(newContact),
  };

  const urlContactos = "http://localhost:3000/contactos";
  fetch(urlContactos, requestOptions)
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      if (json.status == "Contacto creado exitosamente") {
        alert("Contacto creado exitosamente");
        cargarContactos();
      } else {
        alert("Error al generar el contacto, el mismo ya existe o faltan campos por completar");
      }
    })
    .catch((error) => console.error("Error:", error));
}