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

    // Referencias al Modal de Compras
    const btnBuyOpen = document.getElementById('btn-buy-open');
    const buyModal = document.getElementById('buy-modal');

    if (btnBuyOpen && buyModal) {
        btnBuyOpen.addEventListener('click', (e) => {
            e.preventDefault();
            mostrarEstadios();
            buyModal.classList.add('active');
        });
    }

    // Renderiza el paso 1: selección de estadio
    function mostrarEstadios() {
        const modalBody = buyModal.querySelector('.modal-body');
        modalBody.innerHTML = `
            <span id="btn-buy-close" class="modal-close-btn">&times;</span>
            <h2 class="modal-title">Comprar Entradas</h2>
            <div class="stadiums-grid">
                <button type="button" class="stadium-btn st-river" data-stadium="estadio-river" title="Estadio River">
                    <img src="./images/estadios/river.png" alt="Estadio River">
                </button>
                <button type="button" class="st-center">Elige<br>Sede</button>
                <button type="button" class="stadium-btn st-velez" data-stadium="estadio-velez" title="Estadio Vélez">
                    <img src="./images/estadios/velez.png" alt="Estadio Velez">
                </button>
                <button type="button" class="stadium-btn st-movistar" data-stadium="estadio-movistar" title="Movistar Arena">
                    <img src="./images/estadios/movistar.png" alt="Estadio Movistar">
                </button>
            </div>
        `;

        // Botón cerrar: cierra el modal completamente
        modalBody.querySelector('#btn-buy-close').addEventListener('click', () => {
            buyModal.classList.remove('active');
        });

        // Botones de estadios: van al paso 2
        modalBody.querySelectorAll('.stadium-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                mostrarFechas(btn.getAttribute('data-stadium'));
            });
        });
    }

    // Renderiza el paso 2: selección de fecha
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
            <span id="btn-buy-close" class="modal-close-btn">&times;</span>
            <h2 class="modal-title">Seleccionar Fecha</h2>
            <p class="buy-modal-subtitle">${estadio.show}</p>
            <div class="fechas-grid">
                ${botonesHTML}
            </div>
        `;

        // Botón cerrar: vuelve al paso 1 (estadios)
        modalBody.querySelector('#btn-buy-close').addEventListener('click', () => {
            mostrarEstadios();
        });

        // Listeners de las fechas → paso 3
        modalBody.querySelectorAll('.fecha-btn').forEach(fechaBtn => {
            fechaBtn.addEventListener('click', () => {
                const estadioId = fechaBtn.getAttribute('data-estadio');
                const fecha = fechaBtn.getAttribute('data-fecha');
                mostrarUbicaciones(estadioId, fecha);
            });
        });
    }

    // Renderiza el paso 3: selección de ubicación
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
            <span id="btn-buy-close" class="modal-close-btn">&times;</span>
            <h2 class="modal-title">Elige Ubicación</h2>
            <p class="buy-modal-subtitle">${estadio.show} · ${fechaData.dia} · ${fechaData.horario}</p>

            <div class="ubicaciones-layout">
                <img src="./images/asientos/ubicaciones.png" alt="Mapa de ubicaciones" class="ubicaciones-img">
                <div class="sectores-grid">
                    ${sectoresHTML}
                </div>
            </div>
        `;

        // Botón cerrar: vuelve al paso 2 (fechas)
        modalBody.querySelector('#btn-buy-close').addEventListener('click', () => {
            mostrarFechas(estadioId);
        });

        // Botones de agregar al carrito
        modalBody.querySelectorAll('.add-cart-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const sectorKey = btn.getAttribute('data-sector');
                const subKey = btn.getAttribute('data-subsector');
                // Buscar el input de cantidad correspondiente
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

                // Feedback visual al usuario
                btn.innerHTML = '<i class="fa-solid fa-check"></i> ¡Agregado!';
                btn.disabled = true;
                setTimeout(() => {
                    btn.innerHTML = '<i class="fa-solid fa-cart-plus"></i> Agregar';
                    btn.disabled = false;
                }, 1500);
            });
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
