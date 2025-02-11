// Este código se ejecuta cuando la página web termina de cargar completamente
document.addEventListener('DOMContentLoaded', () => {
    // Buscamos el formulario de login en la página
    const loginForm = document.querySelector('.form--login');
    
    // Si encontramos el formulario, le decimos que cuando se envíe haga algo
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
});

// Esta función se encarga de procesar el login cuando enviamos el formulario
async function handleLogin(e) {
    // Evitamos que la página se recargue al enviar el formulario
    e.preventDefault();
    
    // Guardamos lo que el usuario escribió en los campos
    const email = document.getElementById('login-email').value; // El correo
    const password = document.getElementById('login-password').value; // La contraseña
    const remember = document.getElementById('remember').checked; // Si marcó "recordarme"

    // Primero revisamos que el correo tenga buena pinta
    if (!validateEmail(email)) {
        // Si el correo no es válido, mostramos un mensaje de error
        showError('login-email', 'Por favor, introduce un email válido');
        return; // Y no seguimos con el login
    }

    // También revisamos que haya escrito una contraseña
    if (!password) {
        // Si no escribió nada, mostramos error
        showError('login-password', 'Por favor, introduce tu contraseña');
        return; // Y no seguimos
    }

    // Si todo está bien, mostramos un círculo que da vueltas
    // para que el usuario sepa que estamos trabajando
    showSpinner();

    // Ahora intentamos hacer el login
    try {
        // Aquí normalmente hablaríamos con el servidor, pero por ahora solo fingimos
        await simulateLogin();
        
        // Si todo salió bien, llevamos al usuario a la página principal
        window.location.href = '/';
    } catch (error) {
        // Si algo salió mal, mostramos un error
        showError('login-password', 'Credenciales incorrectas');
        // Y quitamos el círculo que da vueltas
        removeSpinner();
    }
}

// Esta función revisa si un correo tiene buena pinta
// (que tenga @ y un punto, básicamente)
function validateEmail(email) {
    // Esta línea parece complicada pero solo revisa que el correo tenga buena pinta
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Esta función muestra un mensaje de error debajo de un campo
function showError(fieldId, message) {
    // Encontramos el campo donde está el error
    const field = document.getElementById(fieldId);
    // Y el espacio donde pondremos el mensaje (está justo después del campo)
    const errorSpan = field.nextElementSibling;
    
    // Ponemos el campo en rojo
    field.classList.add('form__input--error');
    // Escribimos el mensaje de error
    errorSpan.textContent = message;
    // Y lo hacemos visible
    errorSpan.classList.add('form__error');
}

// Esta función pone un círculo que da vueltas en el botón
function showSpinner() {
    // Encontramos el botón
    const button = document.querySelector('.button--primary');
    // Lo desactivamos para que no se pueda hacer clic otra vez
    button.disabled = true;
    
    // Creamos el círculo que da vueltas
    const spinner = document.createElement('div');
    spinner.className = 'spinner';
    // Y lo ponemos dentro del botón
    button.appendChild(spinner);
}

// Esta función quita el círculo que da vueltas
function removeSpinner() {
    // Encontramos el botón
    const button = document.querySelector('.button--primary');
    // Lo volvemos a activar
    button.disabled = false;
    // Buscamos el círculo
    const spinner = button.querySelector('.spinner');
    // Y si lo encontramos, lo quitamos
    if (spinner) {
        spinner.remove();
    }
}

// Esta función finge que estamos hablando con el servidor
// (en un proyecto real, aquí hablaríamos con un servidor de verdad)
function simulateLogin() {
    return new Promise((resolve, reject) => {
        // Esperamos 1.5 segundos para que parezca que estamos haciendo algo
        setTimeout(() => {
            // Y luego decidimos al azar si el login funcionó o no
            // Es como tirar una moneda: 50% de probabilidad de éxito
            if (Math.random() > 0.5) {
                resolve(); // Si sale cara, el login funciona
            } else {
                reject(); // Si sale cruz, el login falla
            }
        }, 1500);
    });
} 