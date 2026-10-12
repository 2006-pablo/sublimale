// Base de datos de productos con las imágenes adjuntas
const products = [

    {
        id: 1,
        name: "Body de Bebé Personalizado",
        price: 10500,
        img: "img/producto1.jpeg" 
    },
    {
        id: 2,
        name: "Tarjetas Personalizadas (pack x 100)",
        price: 10000,
        img: "img/producto2.jpeg"
    },
    {
        id: 3,
        name: "Remera Sublimada Foto / Frase",
        price: 16000,
        img: "img/producto3.jpeg"
    },
    {
        id: 4,
        name: "Almohadón Sublimado (promoción 2x10000)",
        price: 6000,
        img: "img/producto4.jpeg"
    },
    {
        id: 5,
        name: "Taza de Cerámica",
        price: 10000,
        img: "img/producto5.jpeg"
    },
    {
        id: 6,
        name: "Cantimplora",
        price: 8000, 
        img: "img/producto6.jpeg"
    },
    {
        id: 7,
        name: "Mate Listo",
        price: 8000,
        img: "img/producto7.jpeg"
    },
    {
        id: 8,
        name: "Chopp Cerámica",
        price: 15000,
        img: "img/producto8.jpeg"
    },
     {
        id: 9,
        name: "Chopp Plástica",
        price: 10000,
        img: "img/producto8.jpeg"
    },
     {
        id: 10,
        name: "Set de Mate",
        price: 15000,
        img: "img/producto9.jpeg"
     },
];

let cart = [];

// Cargar productos en la grilla
function loadProducts() {
    const container = document.getElementById('products-container');
    container.innerHTML = '';

    products.forEach(p => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${p.img}" alt="${p.name}">
            <div class="product-info">
                <h3 class="product-title">${p.name}</h3>
                <p class="product-price">$${p.price.toLocaleString('es-AR')}</p>
                <button class="btn-add-cart" onclick="addToCart(${p.id})">
                    <i class="fa-solid fa-cart-plus"></i> Agregar al Carrito
                </button>
            </div>
        `;
        container.appendChild(card);
    });
}

// Agregar producto al carrito
function addToCart(id) {
    const product = products.find(p => p.id === id);
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
    toggleCart(true); // Abre el carrito al agregar
}

// Eliminar producto del carrito
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
}

// Actualizar la interfaz del carrito
function updateCartUI() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotalPrice = document.getElementById('cart-total-price');

    // Actualizar contador
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    cartCount.innerText = totalItems;

    // Si el carrito está vacío
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart-msg">El carrito está vacío</p>';
        cartTotalPrice.innerText = '$0';
        return;
    }

    // Renderizar ítems del carrito
    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <div class="cart-item-details">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">${item.quantity}x $${item.price.toLocaleString('es-AR')}</div>
            </div>
            <div class="cart-item-remove" onclick="removeFromCart(${item.id})">
                <i class="fa-solid fa-trash-can"></i>
            </div>
        `;
        cartItemsContainer.appendChild(itemElement);
    });

    cartTotalPrice.innerText = `$${total.toLocaleString('es-AR')}`;
}

// Mostrar u ocultar el carrito
function toggleCart(forceOpen = false) {
    const modal = document.getElementById('cart-modal');
    if (forceOpen) {
        modal.classList.add('active');
    } else {
        modal.classList.toggle('active');
    }
}

// Enviar pedido por WhatsApp
function sendOrderWhatsApp() {
    if (cart.length === 0) {
        alert("Tu carrito está vacío. Agrega productos antes de realizar el pedido.");
        return;
    }

    let message = "¡Hola *SubliMale*! Quisiera realizar el siguiente pedido:\n\n";
    let total = 0;

    cart.forEach(item => {
        const subtotal = item.price * item.quantity;
        total += subtotal;
        message += `• ${item.quantity}x *${item.name}* - $${subtotal.toLocaleString('es-AR')}\n`;
    });

    message += `\n*Total a pagar: $${total.toLocaleString('es-AR')}*`;
    message += "\n\n¿Cómo coordinamos el pago y el envío?";

    // Cambia el número de teléfono con tu código de país y número 
    const phoneNumber = "5493534771950";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, '_blank');
}

// Inicialización
window.onload = loadProducts;