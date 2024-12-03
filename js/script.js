const products = [
    {
        id: 1,
        name: "Producto 1",
        price: 10000,
        image: "../imgs/gal6.png"
    },
    {
        id: 2,
        name: "Producto 2",
        price: 15000,
        image: "../imgs/gal7.png"
    },
    {
        id: 3,
        name: "Producto 3",
        price: 12000,
        image: "../imgs/gal8.png"
    },
    {
        id: 4,
        name: "Producto 4",
        price: 16000,
        image: "../imgs/gal2.png"
    },
    {
        id: 5,
        name: "Producto 5",
        price: 25000,
        image: "../imgs/gal3.png"
    },
    {
        id: 6,
        name: "Producto 6",
        price: 30000,
        image: "../imgs/gal4.png"
    },
    {
        id: 7,
        name: "Producto 7 ",
        price: 40000,
        image: "../imgs/gal1.png"
    },
    {
        id: 8,
        name: "Producto 8",
        price: 50000,
        image: "../imgs/gal5.png"
    },
    {
        id: 9,
        name: "Producto 9",
        price: 80000,
        image: "../imgs/gal10.png"
    }
];

let cart = [];
let selectedProductId = null; 


function loadProducts() {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";
    products.forEach((product) => {
        const productItem = document.createElement("li");
        productItem.className = "product-item";
        productItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>$${product.price.toFixed(2)}</p>
            <button class="add-to-cart-btn" data-id="${product.id}">Agregar al carrito</button>
        `;
        productList.appendChild(productItem);
    });
}


function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);
    

    if (!product) {
        console.error("Producto no encontrado")
        return;
    }if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCart();
    showNotification(); 
}


function updateCart() {
    const cartList = document.getElementById("cart-list");
    cartList.innerHTML = ""; 
    let totalPrice = 0;

    
    cart.forEach((item) => {
        const cartItem = document.createElement("li");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h2>${item.name}</h2>
            <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
        `;
        cartList.appendChild(cartItem);
        totalPrice += item.price * item.quantity; 
    });

    document.getElementById("total-price").innerText = `$${totalPrice.toFixed(2)}`;
}


function showNotification() {
    const notification = document.getElementById("notification");
    notification.style.display = "block"; 

    
    setTimeout(() => {
        notification.style.display = "none";
    }, 3000);
}


document.addEventListener('click', (event) => {
    if (event.target.classList.contains('add-to-cart-btn')) {
        const productId = parseInt(event.target.getAttribute('data-id'));
        addToCart(productId);
    }
});


document.addEventListener("click", (event) => {
    if (event.target.classList.contains("add-to-cart-btn")) {
        const productId = parseInt(event.target.getAttribute("data-id"));
        addToCart(productId);
    }
});


document.getElementById("checkout-btn").addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Tu carrito está vacío.");
    } else {
        alert("Gracias por tu compra!");
        cart = []; 
        updateCart();
    }
});


loadProducts();
