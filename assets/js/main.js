class Producto{
    constructor(nombre, precio){
        this.nombre = nombre;
        this.precio = precio;
    };
};

let productos = [
    {nombre: "Producto1", precio: 1000},
    {nombre: "Producto2", precio: 2000},
    {nombre: "Producto3", precio: 3000},
    {nombre: "Producto4", precio: 4000},
];

window.onload = () => {
    productos.forEach((producto) => {
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
    
        let card_btn = document.createElement("a");
        card_btn.setAttribute("href", "#");
        card_btn.className = "btn btn-primary";
        card_btn.innerText = "Añadir al carrito";
        card_body.appendChild(card_btn);
    });
};

let nombre_txt = document.getElementById("nombre_prod");
let precio_txt = document.getElementById("precio");

const agregarProducto = () => {
    let nombre = nombre_txt.value;
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
    
    let card_btn = document.createElement("a");
    card_btn.setAttribute("href", "#");
    card_btn.className = "btn btn-primary";
    card_btn.innerText = "Añadir al carrito";
    card_body.appendChild(card_btn);
};

let agregar = document.getElementById("agregar");

agregar.onclick = (e) => {
    if((nombre_txt.value).trim() !== "" && (precio_txt.value).trim() !== ""){
        e.preventDefault();
        agregarProducto();
        nombre_txt.value = "";
        precio_txt.value = "";
    };
};

if(localStorage.getItem("productos") != ""){
    productos = JSON.parse(localStorage.getItem("productos"));
};