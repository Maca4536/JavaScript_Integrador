const usuario = "ADMIN";
const contra = "1234";

let usuario_txt = document.getElementById("usuario");
let contra_txt = document.getElementById("contra");
let enviar = document.getElementById("enviar");
let admin;
let contenedor_admin = document.getElementById("contenedor-admin");
let titulo = document.getElementById("titulo");
let formulario = document.getElementById("formulario");
let cerrar_sesion = document.createElement("button");
cerrar_sesion.setAttribute("id", "cerrar_sesion");
cerrar_sesion.innerText = "Cerrar sesión";
let sesion = document.getElementById("sesion");

enviar.onclick = (e) => {
    if((usuario_txt.value).toUpperCase() == usuario && (contra_txt.value).toUpperCase() == contra){
        admin = 1;
        localStorage.setItem("admin", admin);
    }

    else if(((usuario_txt.value).toUpperCase() != usuario || (contra_txt.value).toUpperCase() != contra) && (usuario_txt.value != "" && contra_txt.value != "")){
        e.preventDefault();
        document.getElementById("incorrecto").innerText = "El usuario o la contraseña es incorrecta.";
    }
}

if(localStorage.getItem("admin")){
    titulo.innerText = "Bienvenido, Administrador";
    contenedor_admin.removeChild(formulario);
    contenedor_admin.appendChild(cerrar_sesion);

    sesion.innerText = "Administrador";
    
    cerrar_sesion.onclick = () => {
        localStorage.removeItem("admin");
        location.reload();
    }
}