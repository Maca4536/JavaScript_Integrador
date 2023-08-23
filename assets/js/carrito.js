let carrito = [];
let contenedor_carrito_vacio = document.getElementById("contenedor_carrito_vacio");
let prods_carrito;
let total_texto;
let total = 0;
let comprar_vaciar;
let comprar;
let vaciar;
let sesion = document.getElementById("sesion");

if(localStorage.getItem("carrito")){
    carrito = JSON.parse(localStorage.getItem("carrito"));
    document.querySelector("main").removeChild(contenedor_carrito_vacio);

    total_texto = document.createElement("h4");
    document.querySelector("main").appendChild(total_texto);

    comprar_vaciar = document.createElement("div");
    comprar_vaciar.className = "comprar_vaciar";
    document.querySelector("main").appendChild(comprar_vaciar);

    comprar = document.createElement("button");
    comprar.setAttribute("type", "button");
    comprar.className = "btn btn-success";
    comprar.innerText = "Finalizar compra";
    comprar_vaciar.appendChild(comprar);

    vaciar = document.createElement("button");
    vaciar.setAttribute("type", "button");
    vaciar.className = "btn btn-danger";
    vaciar.innerText = "Vaciar carrito";
    comprar_vaciar.appendChild(vaciar);
    
    prods_carrito = document.createElement("section");
    prods_carrito.setAttribute("id", "prods_carrito");
    document.querySelector("main").appendChild(prods_carrito);

    carrito.forEach((producto) => {
        total += parseFloat(producto.precio);
        total_texto.innerText = "Total: $" + total;
        
        let card = document.createElement("div");
        card.className = "card";
        card.style.width = "18rem";
        prods_carrito.appendChild(card);

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
    });

    comprar.onclick = () => {
        Swal.fire({
            title: '¿Confirma la compra?',
            showCancelButton: true,
            confirmButtonText: 'Confirmar',
            confirmButtonColor: '#20A027',
            cancelButtonText: 'Cancelar',
            cancelButtonColor: '#d33',
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire('Compra realizada con éxito', '', 'success');
              localStorage.removeItem("carrito");
              document.querySelector("main").innerHTML = "<h2>Carrito</h2>";
              document.querySelector("main").appendChild(contenedor_carrito_vacio);
            }
          })
    }

    vaciar.onclick = () => {
        Swal.fire({
            title: '¿Seguro que quiere vaciar el carrito?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#20A027',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si',
            cancelButtonText: 'Cancelar',
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Se vació el carrito',
                '',
                'success'
              );

              localStorage.removeItem("carrito");
              document.querySelector("main").innerHTML = "<h2>Carrito</h2>";
              document.querySelector("main").appendChild(contenedor_carrito_vacio);
            }
          })
    }
}

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

if(localStorage.getItem("admin")){
  cargarUsuario();
}