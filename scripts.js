document.addEventListener('DOMContentLoaded', () => {
    // Referencias al Popup de Video
    const btnPopupOpen = document.getElementById('btn-popup-open');
    const btnPopupClose = document.getElementById('btn-popup-close');
    const videoPopup = document.getElementById('video-popup');

    // Referencias al Modal de Registro
    const btnRegisterOpen = document.getElementById('btn-register-open');
    const btnRegisterClose = document.getElementById('btn-register-close');
    const registerModal = document.getElementById('register-modal');

    // Funciones para Video Popup
    if (btnPopupOpen && btnPopupClose && videoPopup) {
        btnPopupOpen.addEventListener('click', () => {
            videoPopup.classList.add('active');
        });
        
        btnPopupClose.addEventListener('click', () => {
            videoPopup.classList.remove('active');
            // Pausar el video al cerrar el popup (opcional, pero buena práctica)
            const video = videoPopup.querySelector('video');
            if (video) {
                video.pause();
            }
        });
    }

    // Funciones para Register Modal
    if (btnRegisterOpen && btnRegisterClose && registerModal) {
        btnRegisterOpen.addEventListener('click', () => {
            registerModal.classList.add('active');
        });
        
        btnRegisterClose.addEventListener('click', () => {
            registerModal.classList.remove('active');
        });
    }
});