/*botones*/



/*log in*/

document.getElementById("login_Btn").addEventListener("click", () => {
    const email = document.getElementById("email").value;
  const pass = document.getElementById("contraseña").value;
  const login = { correo: email, password: pass };
  const url = "http://localhost:3000/login";
  console.log(email)
  console.log(pass)

  fetch(url, {
    method: "POST",
    body: JSON.stringify(login),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      if (json.msj == "Correo o contraseña incorrectos") {
        alert("Error en login");
      } else {
        localStorage.setItem("token", JSON.stringify(json.token));
        localStorage.setItem("admin", JSON.stringify(json.admin));
        window.location.href = "contactos.html";
      }
    })
    .catch((error) => console.error("Error:", error));
});



