const API_URL = 'http://localhost:3000/hltlAuth';

function showRegister() {
    document.getElementById('register-form').style.display = 'block';
    document.getElementById('login-form').style.display = 'none';
    clearMessages();
}

function showLogin() {
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
    clearMessages();
}

function clearMessages() {
    const registerMessage = document.getElementById('register-message');
    const loginMessage = document.getElementById('login-message');
    registerMessage.style.display = 'none';
    registerMessage.innerHTML = '';
    loginMessage.style.display = 'none';
    loginMessage.innerHTML = '';
}

function showMessage(elementId, message, isError) {
    const messageElement = document.getElementById(elementId);
    messageElement.innerHTML = message;
    messageElement.className = `message ${isError ? 'error' : 'success'}`;
    messageElement.style.display = 'block';
}

async function handleRegister() {
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            showMessage('register-message', 'Usuario registrado correctamente', false);
            document.getElementById('register-email').value = '';
            document.getElementById('register-password').value = '';
            setTimeout(showLogin, 2000);
        } else {
            showMessage('register-message', data.error || 'Error en el registro', true);
        }
    } catch (error) {
        showMessage('register-message', 'Error en el servidor', true);
    }
}

async function handleLogin() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            showMessage('login-message', 'Inicio de sesión exitoso', false);
            localStorage.setItem('token', data.token);
            document.getElementById('login-email').value = '';
            document.getElementById('login-password').value = '';
            
            console.log('Token:', data.token);
        } else {
            showMessage('login-message', data.error || 'Error en el inicio de sesión', true);
        }
    } catch (error) {
        showMessage('login-message', 'Error en el servidor', true);
    }
}