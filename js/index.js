let fragment = document.createDocumentFragment();
let divProductos = document.querySelector(".products");
let template_products = document.getElementById("template_products");
let template_car = document.getElementById("template_car");
let contentCar = document.querySelector(".contentCar");


function llenarDatos() {
  productos.forEach((products) => {
    let clon = template_products.content.cloneNode(true);
    clon.querySelector("h2").textContent = products.title;
    clon.querySelector("p").textContent = "$"+products.precio;
    clon.querySelector("img").setAttribute("src", products.thumbnailUrl);

    fragment.appendChild(clon);
  });
  divProductos.appendChild(fragment);
}



document.addEventListener("DOMContentLoaded", () => {
  llenarDatos();
});
