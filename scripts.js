//CONFIGURACION INICIAL Y FORMATEO. FUNCIONES GLOBALES.
let cartUi = {
    badge: null,
    modal: null,
    closeBtn: null,
    itemsContainer: null,
    total: null,
    feedback: null,
    finishBtn: null,
    clearBtn: null
};

function formatCurrency(value) {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        maximumFractionDigits: 0
    }).format(value);
}

function setCartFeedback(message) {
    if (cartUi.feedback) {
        cartUi.feedback.textContent = message || '';
    }
}

function irAlInicioYCarrito(modal) {
    if (modal) {
        modal.classList.remove('active');
    }
    const path = window.location.pathname;
    if (!path.endsWith('index.html') && path !== '/' && path !== '') {
        window.location.href = 'index.html';
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// RENDERIZADO DEL CARRITO Y SINCRONIZACION CON LA UI
function renderCartModal() {
    if (!cartUi.itemsContainer || !cartUi.total) return;

    if (!cartItems.length) {
        cartUi.itemsContainer.innerHTML = '<p class="cart-empty">Tu carrito está vacío por el momento.</p>';
        cartUi.total.textContent = formatCurrency(0);
        if (cartUi.finishBtn) cartUi.finishBtn.disabled = true;
        if (cartUi.clearBtn) cartUi.clearBtn.disabled = true;
        return;
    }

    cartUi.itemsContainer.innerHTML = cartItems.map(item => `
        <article class="cart-item">
            <div>
                <h3 class="cart-item-title">${item.show}</h3>
                <p class="cart-item-meta">${item.sector}</p>
                <p class="cart-item-meta">${item.fecha}</p>
            </div>
            <div class="cart-item-amount">
                <div class="cart-item-actions">
                    <button type="button" class="qty-btn" data-cart-action="decrease" data-item-id="${item.id}">−</button>
                    <span>${item.cantidad_asientos} entradas</span>
                    <button type="button" class="qty-btn" data-cart-action="increase" data-item-id="${item.id}">+</button>
                </div>
                <span>${formatCurrency(item.precio * item.cantidad_asientos)}</span>
                <button type="button" class="remove-item-btn" data-cart-action="remove" data-item-id="${item.id}">Eliminar</button>
            </div>
        </article>
    `).join('');

    cartUi.total.textContent = formatCurrency(getTotal());
    if (cartUi.finishBtn) cartUi.finishBtn.disabled = false;
    if (cartUi.clearBtn) cartUi.clearBtn.disabled = false;
}

function syncCartUI() {
    const totalTickets = cartItems.reduce((total, item) => total + (item.cantidad_asientos || 0), 0);

    if (cartUi.badge) {
        cartUi.badge.textContent = totalTickets;
        cartUi.badge.style.display = totalTickets > 0 ? 'inline-flex' : 'none';
    }

    renderCartModal();
}
// INICIALIZACION DE EVENTOS DEL DOM

document.addEventListener('DOMContentLoaded', () => {

    const btnPopupOpen = document.getElementById('btn-popup-open');
    const btnPopupClose = document.getElementById('btn-popup-close');
    const videoPopup = document.getElementById('video-popup');


    const btnRegisterOpen = document.getElementById('btn-register-open');
    const btnRegisterClose = document.getElementById('btn-register-close');
    const registerModal = document.getElementById('register-modal');

    const btnCartOpen = document.getElementById('btn-cart-open');
    cartUi.badge = document.getElementById('cart-badge');
    cartUi.modal = document.getElementById('cart-modal');
    cartUi.closeBtn = document.getElementById('btn-cart-close');
    cartUi.itemsContainer = document.getElementById('cart-items-container');
    cartUi.total = document.getElementById('cart-total');
    cartUi.feedback = document.getElementById('cart-feedback');
    cartUi.finishBtn = document.getElementById('btn-finish-purchase');
    cartUi.clearBtn = document.getElementById('btn-clear-cart');


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

        const btnRegisterHome = document.getElementById('btn-register-home');
        if (btnRegisterHome) {
            btnRegisterHome.addEventListener('click', () => {
                irAlInicioYCarrito(registerModal);
            });
        }
    }


    const btnBuyOpen = document.getElementById('btn-buy-open');
    const buyModal = document.getElementById('buy-modal');

    if (btnBuyOpen && buyModal) {
        btnBuyOpen.addEventListener('click', (e) => {
            e.preventDefault();
            mostrarEstadios();
            buyModal.classList.add('active');
        });
    }

    if (btnCartOpen && cartUi.modal && cartUi.closeBtn) {
        btnCartOpen.addEventListener('click', () => {
            setCartFeedback('');
            renderCartModal();
            cartUi.modal.classList.add('active');
        });

        cartUi.closeBtn.addEventListener('click', () => {
            cartUi.modal.classList.remove('active');
        });

        const btnCartHome = document.getElementById('btn-cart-home');
        if (btnCartHome) {
            btnCartHome.addEventListener('click', () => {
                irAlInicioYCarrito(cartUi.modal);
            });
        }
    }

    if (cartUi.finishBtn) {
        cartUi.finishBtn.addEventListener('click', () => {
            if (!cartItems.length) {
                setCartFeedback('Tu carrito está vacío.');
                return;
            }

            clearCart();
            setCartFeedback('¡Compra finalizada! Gracias por tu compra.');
            renderCartModal();
        });
    }

    if (cartUi.clearBtn) {
        cartUi.clearBtn.addEventListener('click', () => {
            if (!cartItems.length) {
                setCartFeedback('Tu carrito ya está vacío.');
                return;
            }

            clearCart();
            setCartFeedback('Se vació el carrito.');
            renderCartModal();
        });
    }

    if (cartUi.itemsContainer) {
        cartUi.itemsContainer.addEventListener('click', (event) => {
            const button = event.target.closest('[data-cart-action]');
            if (!button) return;

            const itemId = button.getAttribute('data-item-id');
            const action = button.getAttribute('data-cart-action');

            if (!itemId) return;

            if (action === 'increase') {
                const item = cartItems.find(i => i.id === itemId);
                if (item) {
                    item.cantidad_asientos += 1;
                    saveCart();
                    setCartFeedback('Cantidad actualizada.');
                }
            }

            if (action === 'decrease') {
                const item = cartItems.find(i => i.id === itemId);
                if (item) {
                    item.cantidad_asientos -= 1;
                    if (item.cantidad_asientos <= 0) {
                        removeItem(itemId);
                        setCartFeedback('Se eliminó una selección.');
                    } else {
                        saveCart();
                        setCartFeedback('Cantidad actualizada.');
                    }
                }
            }

            if (action === 'remove') {
                removeItem(itemId);
                setCartFeedback('Se eliminó la selección.');
            }
        });
    }

    syncCartUI();

    // FLUJO DE COMPRAS - PASO 1 - MOSTRAR ESTADIOS

    function mostrarEstadios() {
        const modalBody = buyModal.querySelector('.modal-body');
        modalBody.innerHTML = `
            <div class="modal-nav-container">
                <span id="btn-buy-close" class="modal-nav-btn back-btn" title="Atrás"><i class="fa-solid fa-arrow-left"></i></span>
                <span id="btn-buy-home" class="modal-nav-btn home-btn" title="Inicio"><i class="fa-solid fa-xmark"></i></span>
            </div>
            <h2 class="modal-title">Comprar Entradas</h2>
            <div class="stadiums-grid">
                <button type="button" class="stadium-btn st-movistar" data-stadium="estadio-movistar" title="Movistar Arena">
                    <img src="./images/estadios/movistar.png" alt="Estadio Movistar">
                </button>
                <button type="button" class="st-center">Elige<br>Sede</button>
                <button type="button" class="stadium-btn st-river" data-stadium="estadio-river" title="Estadio River">
                    <img src="./images/estadios/river.png" alt="Estadio River">
                </button>
                <button type="button" class="stadium-btn st-velez" data-stadium="estadio-velez" title="Estadio Vélez">
                    <img src="./images/estadios/velez.png" alt="Estadio Velez">
                </button>

            </div>
        `;

        modalBody.querySelector('#btn-buy-close').addEventListener('click', () => {
            buyModal.classList.remove('active');
        });


        const btnHome = modalBody.querySelector('#btn-buy-home');
        if (btnHome) {
            btnHome.addEventListener('click', () => {
                irAlInicioYCarrito(buyModal);
            });
        }


        modalBody.querySelectorAll('.stadium-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                mostrarFechas(btn.getAttribute('data-stadium'));
            });
        });
    }

    // FLUJO DE COMPRAS - PASO 2 - MOSTRAR FECHAS

    function mostrarFechas(estadioId) {
        const estadio = baseDatosEstadios[estadioId];
        if (!estadio) return;

        const modalBody = buyModal.querySelector('.modal-body');
        const fechas = Object.entries(estadio.fechas);

        const botonesHTML = fechas.map(([fechaKey, fechaData]) => `
            <button type="button" class="fecha-btn" data-estadio="${estadioId}" data-fecha="${fechaKey}">
                <i class="fa-solid fa-calendar-days"></i>
                <span class="fecha-dia">${fechaData.dia}</span>
                <span class="fecha-horario">${fechaData.horario}</span>
            </button>
        `).join('');

        modalBody.innerHTML = `
            <div class="modal-nav-container">
                <span id="btn-buy-close" class="modal-nav-btn back-btn" title="Atrás"><i class="fa-solid fa-arrow-left"></i></span>
                <span id="btn-buy-home" class="modal-nav-btn home-btn" title="Inicio"><i class="fa-solid fa-xmark"></i></span>
            </div>
            <h2 class="modal-title">Seleccionar Fecha</h2>
            <p class="buy-modal-subtitle">${estadio.show}</p>
            <div class="fechas-grid">
                ${botonesHTML}
            </div>
        `;

        modalBody.querySelector('#btn-buy-close').addEventListener('click', () => {
            mostrarEstadios();
        });


        const btnHome = modalBody.querySelector('#btn-buy-home');
        if (btnHome) {
            btnHome.addEventListener('click', () => {
                irAlInicioYCarrito(buyModal);
            });
        }


        modalBody.querySelectorAll('.fecha-btn').forEach(fechaBtn => {
            fechaBtn.addEventListener('click', () => {
                const estadioId = fechaBtn.getAttribute('data-estadio');
                const fecha = fechaBtn.getAttribute('data-fecha');
                mostrarUbicaciones(estadioId, fecha);
            });
        });
    }
    // FLUJO DE COMPRAS - PASO 3 - MOSTRAR UBICACIONES

    function mostrarUbicaciones(estadioId, fecha) {
        const estadio = baseDatosEstadios[estadioId];
        if (!estadio) return;

        const fechaData = estadio.fechas[fecha];
        if (!fechaData) return;

        const modalBody = buyModal.querySelector('.modal-body');

        // Construir tarjetas de subSectores por cada sector principal
        function buildSectorCards(sectores) {
            return Object.entries(sectores).map(([sectorKey, sector]) => {
                const subCards = Object.entries(sector.subSectores).map(([subKey, sub]) => {
                    const disponible = sub.asientosDisponibles > 0;
                    return `
                        <div class="subsector-card ${!disponible ? 'agotado' : ''}">
                            <span class="subsector-nombre">${sub.nombre}</span>
                            <span class="subsector-precio">$${sub.precio.toLocaleString('es-AR')}</span>
                            <span class="subsector-disp">${disponible ? sub.asientosDisponibles + ' disponibles' : 'AGOTADO'}</span>
                            ${disponible ? `
                                <div class="subsector-acciones">
                                    <input type="number" class="cantidad-input" min="1" max="${sub.asientosDisponibles}" value="1"
                                        data-estadio="${estadioId}" data-fecha="${fecha}"
                                        data-sector="${sectorKey}" data-subsector="${subKey}"
                                        data-show="${estadio.show}" data-precio="${sub.precio}"
                                        data-nombre="${sector.nombre} – ${sub.nombre}">
                                    <button type="button" class="add-cart-btn draw-btn"
                                        data-estadio="${estadioId}" data-fecha="${fecha}"
                                        data-sector="${sectorKey}" data-subsector="${subKey}">
                                        <i class="fa-solid fa-cart-plus"></i> Agregar
                                    </button>
                                </div>
                            ` : ''}
                        </div>
                    `;
                }).join('');
                return `
                    <div class="sector-card">
                        <h3 class="sector-titulo">${sector.nombre}</h3>
                        ${subCards}
                    </div>
                `;
            }).join('');
        }

        const sectoresHTML = buildSectorCards(fechaData.sectores);

        modalBody.innerHTML = `
            <div class="modal-nav-container">
                <span id="btn-buy-close" class="modal-nav-btn back-btn" title="Atrás"><i class="fa-solid fa-arrow-left"></i></span>
                <span id="btn-buy-home" class="modal-nav-btn home-btn" title="Inicio"><i class="fa-solid fa-xmark"></i></span>
            </div>
            <h2 class="modal-title">Elige Ubicación</h2>
            <p class="buy-modal-subtitle">${estadio.show} · ${fechaData.dia} · ${fechaData.horario}</p>

            <div class="ubicaciones-layout">
                <img src="./images/asientos/ubicaciones.png" alt="Mapa de ubicaciones" class="ubicaciones-img">
                <div class="sectores-grid">
                    ${sectoresHTML}
                </div>
            </div>
        `;


        modalBody.querySelector('#btn-buy-close').addEventListener('click', () => {
            mostrarFechas(estadioId);
        });


        const btnHome = modalBody.querySelector('#btn-buy-home');
        if (btnHome) {
            btnHome.addEventListener('click', () => {
                irAlInicioYCarrito(buyModal);
            });
        }


        modalBody.querySelectorAll('.add-cart-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const sectorKey = btn.getAttribute('data-sector');
                const subKey = btn.getAttribute('data-subsector');

                const input = modalBody.querySelector(
                    `input[data-sector="${sectorKey}"][data-subsector="${subKey}"]`
                );
                const cantidad = parseInt(input.value) || 1;
                const itemId = `${estadioId}__${fecha}__${sectorKey}__${subKey}`;

                addItem({
                    id: itemId,
                    show: input.getAttribute('data-show'),
                    fecha: fecha,
                    sector: input.getAttribute('data-nombre'),
                    cantidad_asientos: cantidad,
                    precio: parseFloat(input.getAttribute('data-precio'))
                });


                btn.innerHTML = '<i class="fa-solid fa-check"></i> ¡Agregado!';
                btn.disabled = true;
                setTimeout(() => {
                    btn.innerHTML = '<i class="fa-solid fa-cart-plus"></i> Agregar';
                    btn.disabled = false;
                }, 400);
            });
        });
    }
});

// LOGICA CARRITO DE COMPRAS
let cartItems = [];
const storedCart = localStorage.getItem('shoppingCart');
if (storedCart) {
    cartItems = JSON.parse(storedCart);
}

function saveCart() {
    localStorage.setItem('shoppingCart', JSON.stringify(cartItems));
    syncCartUI();
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
