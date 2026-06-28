document.addEventListener('DOMContentLoaded', () => {

    const btnPopupOpen = document.getElementById('btn-popup-open');
    const btnPopupClose = document.getElementById('btn-popup-close');
    const videoPopup = document.getElementById('video-popup');


    const btnRegisterOpen = document.getElementById('btn-register-open');
    const btnRegisterClose = document.getElementById('btn-register-close');
    const registerModal = document.getElementById('register-modal');


    if (btnPopupOpen && btnPopupClose && videoPopup) {
        btnPopupOpen.addEventListener('click', () => {
            videoPopup.classList.add('active');
        });

        btnPopupClose.addEventListener('click', () => {
            videoPopup.classList.remove('active');
            const video = videoPopup.querySelector('video');
            if (video) {
                video.pause();
            }
        });
    }


    if (btnRegisterOpen && btnRegisterClose && registerModal) {
        btnRegisterOpen.addEventListener('click', () => {
            registerModal.classList.add('active');
        });

        btnRegisterClose.addEventListener('click', () => {
            registerModal.classList.remove('active');
        });
    }
});

// --- Lógica del Carrito de Compras ---

let cartItems = [];
const storedCart = localStorage.getItem('shoppingCart');
if (storedCart) {
    cartItems = JSON.parse(storedCart);
}

function saveCart() {
    localStorage.setItem('shoppingCart', JSON.stringify(cartItems));
}

function addItem(item) {
    const existingItemIndex = cartItems.findIndex(i => i.id === item.id);

    if (existingItemIndex !== -1) {

        cartItems[existingItemIndex].cantidad_asientos += (item.cantidad_asientos || 1);
    } else {

        cartItems.push({
            ...item,
            cantidad_asientos: item.cantidad_asientos || 1
        });
    }

    saveCart();
    return cartItems;
}

function removeItem(itemId) {
    cartItems = cartItems.filter(item => item.id !== itemId);
    saveCart();
    return cartItems;
}

function clearCart() {
    cartItems = [];
    saveCart();
}

function listItems() {
    return cartItems;
}

function getTotal() {
    return cartItems.reduce((total, item) => {
        const precio = item.precio || 0;
        const cantidad = item.cantidad_asientos || 0;
        return total + (precio * cantidad);
    }, 0);
}
