class Producto{
    constructor(nombre, precio){
        this.nombre = nombre;
        this.precio = precio;
    };
};

let productos = [];
let carrito = [];
let card_btn;
let agregar_prod = document.getElementById("agregar_prod");
let sesion = document.getElementById("sesion");

async function cargarUsuario(){
    let perfil;
    let perfilCargado = JSON.parse(localStorage.getItem("perfil"));

    if(!localStorage.getItem("perfil")){
        console.log("Perfil");
        perfil = await fetch('https://randomuser.me/api/');
        perfil = await perfil.json();
        sesion.innerText = `${perfil.results[0].name.first} ${perfil.results[0].name.last}`;
        sesion.innerHTML += `<img src="${perfil.results[0].picture.thumbnail}" alt="Foto de perfil" id="foto_perfil">`;
        localStorage.setItem("perfil", JSON.stringify(perfil));
    }
    
    else {
        console.log("Perfil Cargado");
        sesion.innerText = `${perfilCargado.results[0].name.first} ${perfilCargado.results[0].name.last}`;
        sesion.innerHTML += `<img src="${perfilCargado.results[0].picture.thumbnail}" alt="Foto de perfil" id="foto_perfil">`;
        localStorage.setItem("perfil", JSON.stringify(perfilCargado));
    }
    
}

document.addEventListener("DOMContentLoaded", function() {
    if(localStorage.getItem("productos")){
        productos = JSON.parse(localStorage.getItem("productos"));
    }

    else {
        productos = [
            {nombre: "Producto1", precio: 1000},
            {nombre: "Producto2", precio: 2000},
            {nombre: "Producto3", precio: 3000},
            {nombre: "Producto4", precio: 4000},
        ];

        localStorage.setItem("productos", JSON.stringify(productos));
    };

    if(localStorage.getItem("carrito")){
        carrito = JSON.parse(localStorage.getItem("carrito"));
    };

    if(!localStorage.getItem("admin")){
        document.querySelector("main").removeChild(agregar_prod);
        document.querySelector("main").removeChild(document.querySelector("hr"));
    }

    else{
        cargarUsuario();
    }
    
    productos.forEach((producto) => {
        producto.nombre = producto.nombre.toUpperCase();

        let i = productos.indexOf(producto);

        let contenedor_cards = document.getElementById("contenedor-cards");
        
        let card = document.createElement("div");
        card.className = "card";
        card.style.width = "18rem";
        contenedor_cards.appendChild(card);
    
        let img = document.createElement("img");
        img.setAttribute("src", "https://dummyimage.com/600x400/000/fff");
        img.className = "card-img-top";
        img.setAttribute("alt", "...");
        card.appendChild(img);
    
        let card_body = document.createElement("div");
        card_body.className = "card-body";
        card.appendChild(card_body);
    
        let card_title = document.createElement("h5");
        card_title.className = "card-title";
        card_title.innerText = producto.nombre;
        card_body.appendChild(card_title);
    
        let card_text = document.createElement("p");
        card_text.className = "card-text";
        card_text.innerText = "$" + producto.precio;
        card_body.appendChild(card_text);
    
        card_btn = document.createElement("a");
        card_btn.setAttribute("href", "#");
        card_btn.setAttribute("id", "boton" + i);
        card_btn.className = "btn btn-primary";
        card_btn.innerText = "Añadir al carrito";
        card_body.appendChild(card_btn);

        const botones = document.querySelectorAll("#boton" + i);

        botones.forEach((boton) => {
            boton.onclick = (e) => {
                e.preventDefault();
                carrito.push(productos[i]);
                localStorage.setItem("carrito", JSON.stringify(carrito));
            };
        });
    });
});

let nombre_txt = document.getElementById("nombre_prod");
let precio_txt = document.getElementById("precio");
let agregar = document.getElementById("agregar");

agregar.onclick = (e) => {
    if((nombre_txt.value).trim() !== "" && (precio_txt.value).trim() !== ""){
        e.preventDefault();
        location.reload();
        
        let nombre = (nombre_txt.value).toUpperCase();
        let precio = parseFloat(precio_txt.value);
        let producto = new Producto(nombre, precio);
        productos.push(producto);

        localStorage.setItem("productos", JSON.stringify(productos));

        let contenedor_cards = document.getElementById("contenedor-cards");

        let card = document.createElement("div");
        card.className = "card";
        card.style.width = "18rem";
        contenedor_cards.appendChild(card);

        let img = document.createElement("img");
        img.setAttribute("src", "https://dummyimage.com/600x400/000/fff");
        img.className = "card-img-top";
        img.setAttribute("alt", "...");
        card.appendChild(img);

        let card_body = document.createElement("div");
        card_body.className = "card-body";
        card.appendChild(card_body);

        let card_title = document.createElement("h5");
        card_title.className = "card-title";
        card_title.innerText = (producto.nombre).toUpperCase();
        card_body.appendChild(card_title);

        let card_text = document.createElement("p");
        card_text.className = "card-text";
        card_text.innerText = "$" + producto.precio;
        card_body.appendChild(card_text);
        
        card_btn = document.createElement("a");
        card_btn.setAttribute("href", "#");
        card_btn.setAttribute("id", "boton" + productos.indexOf(producto));
        card_btn.className = "btn btn-primary";
        card_btn.innerText = "Añadir al carrito";
        card_body.appendChild(card_btn);
        nombre_txt.value = "";
        precio_txt.value = "";
    };
};