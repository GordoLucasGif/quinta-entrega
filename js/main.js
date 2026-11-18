class Producto {
    constructor(nombre, precio, categoria, stock) {
        this.nombre = nombre;
        this.precio = precio;
        this.categoria = categoria;
        this.stock = stock;
    }

    vender(cantidad) {
        if (!Number.isInteger(cantidad) || cantidad <= 0 || cantidad > this.stock) {
            return false;
        }

        this.stock -= cantidad;
        return true;
    }
}

const lapiz = new Producto("Lápiz", 120, "Escritura", 10);
const cuaderno = new Producto("Cuaderno", 250, "Papelería", 6);
const lapicera = new Producto("Lapicera", 180, "Escritura", 8);
const carpeta = new Producto("Carpeta", 350, "Papelería", 4);
const goma = new Producto("Goma", 90, "Accesorios", 12);

const catalogo = [lapiz, cuaderno, lapicera, carpeta, goma];
const carrito = [];
const costoEnvio = 500;

function mostrarMensaje(mensaje) {
    console.log(mensaje);
    alert(mensaje);
}

function armarMenu(productos) {
    let menu = "Elegí un producto:\n";
    let numero = 1;

    for (const producto of productos) {
        menu += numero + ". " + producto.nombre + " (" + producto.categoria + ") - $" +
            producto.precio + " - Stock: " + producto.stock + "\n";
        numero++;
    }

    return menu + "0. Finalizar compra";
}

function mostrarResumen(compras, envio) {
    if (compras.length === 0) {
        mostrarMensaje("El carrito está vacío.");
        return;
    }

    let resumen = "Resumen de compra:\n";
    let subtotal = 0;

    for (const compra of compras) {
        const importe = compra.producto.precio * compra.cantidad;
        subtotal += importe;
        resumen += compra.cantidad + " x " + compra.producto.nombre +
            " - $" + importe.toFixed(2) + "\n";
    }

    resumen += "Subtotal: $" + subtotal.toFixed(2) + "\n";
    resumen += "Envío: $" + envio + "\n";
    resumen += "Total: $" + (subtotal + envio).toFixed(2);
    mostrarMensaje(resumen);
}

while (true) {
    const entrada = prompt(armarMenu(catalogo));

    if (entrada === null || entrada.trim() === "0") {
        break;
    }

    const opcion = Number(entrada);

    if (!Number.isInteger(opcion) || opcion < 1 || opcion > catalogo.length) {
        mostrarMensaje("Elegí un número del menú.");
        continue;
    }

    const producto = catalogo[opcion - 1];
    const respuesta = prompt("¿Cuántas unidades de " + producto.nombre + " querés?");

    if (respuesta === null) {
        continue;
    }

    const cantidad = Number(respuesta);

    if (producto.vender(cantidad)) {
        carrito.push({ producto, cantidad });
        mostrarMensaje("Agregaste " + cantidad + " x " + producto.nombre +
            ". Stock restante: " + producto.stock + ".");
    } else {
        mostrarMensaje("Cantidad inválida o stock insuficiente. Stock disponible: " +
            producto.stock + ".");
    }
}

mostrarResumen(carrito, costoEnvio);