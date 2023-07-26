let fragment = document.createDocumentFragment();
let divProductos = document.querySelector(".products");
let template_products = document.getElementById("template_products");
let template_car = document.getElementById("template_car");
let contentCar = document.querySelector(".contentCar");

let carrito = [];

function aumentarCarrito(productoExistente) {
  productoExistente.cantidad += 1;
}

function decrementarCarrito(productoExistente) {
  productoExistente.cantidad -= 1;

  let posicion = carrito.indexOf(productoExistente);

  if (productoExistente.cantidad == 0) {
    carrito.splice(posicion);
  }
}

function llenarDatos() {
  productos.forEach((products) => {
    let clon = template_products.content.cloneNode(true);
    clon.querySelector("h2").textContent = products.title;
    clon.querySelector("p").textContent = "$"+products.precio;
    clon.querySelector("img").setAttribute("src", products.thumbnailUrl);

    clon.querySelector(".comprar").addEventListener("click", () => {
      let productoExistente = carrito.find((item) => item.id == products.id);

      if (productoExistente) {
        aumentarCarrito(productoExistente);
      } else {
        carrito.push({
          id: products.id,
          nombre: products.title,
          url: products.thumbnailUrl,
          precio: products.precio,
          cantidad: 1,
        });
      }

      pintarCarrito(carrito);
    });

    fragment.appendChild(clon);
  });
  divProductos.appendChild(fragment);
}

function pintarCarrito(carrito) {
  let totalCantidad = 0;
  let totalPrecio = 0;

  contentCar.innerHTML = "";

  if (carrito.length > 0) {
    carrito.forEach((products) => {
      let clon = template_car.content.cloneNode(true);
      clon.querySelector("h2").textContent = products.nombre;
      clon.querySelector("p").textContent = products.precio;
      clon.querySelector("img").setAttribute("src", products.url);
      clon.querySelector(".cantidad").textContent = products.cantidad;

      clon.querySelector(".incrementar").addEventListener("click", () => {
        let productoExistente = carrito.find((item) => item.id == products.id);

        if (productoExistente) {
          aumentarCarrito(productoExistente);
        }

        pintarCarrito(carrito);
      });

      clon.querySelector(".decrementar").addEventListener("click", () => {
        let productoExistente = carrito.find((item) => item.id == products.id);

        if (productoExistente && productoExistente.cantidad > 0) {
          decrementarCarrito(productoExistente);
        }

        pintarCarrito(carrito);
      });

      totalCantidad += products.cantidad;
      totalPrecio += products.cantidad * products.precio;

      fragment.appendChild(clon);
    });

    document.getElementById("cantidad").textContent = totalCantidad;
    document.getElementById("total").textContent = totalPrecio;
    contentCar.appendChild(fragment);
  }

  if (carrito.length == 0) {
    totalCantidad = 0;
    totalPrecio = 0;
    document.getElementById("cantidad").textContent = totalCantidad;
    document.getElementById("total").textContent = totalPrecio;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  llenarDatos();

  let totalCantidad = 0;
  let totalPrecio = 0;
  document.getElementById("cantidad").textContent = totalCantidad;
  document.getElementById("total").textContent = totalPrecio;
});
