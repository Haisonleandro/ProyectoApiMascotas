window.addEventListener('load', () => {
    const loginForm = document.querySelector('.login-form');

    const handleLogin = async (event) => {
        event.preventDefault();

        const emailInput = document.querySelector('#email').value.trim();
        const passwordInput = document.querySelector('#password').value.trim();

        try {
            const res = await fetch('http://192.168.1.1:3000/loginhltl', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: emailInput, password: passwordInput }),
            });

            const result = await res.json();

            if (res.ok) {
                localStorage.setItem('token', result.token);
                window.location.assign('listarMascotashltl.html');
            } else {
                alert(`Error: ${result.msg}`);
            }
        } catch (err) {
            console.error('Error al intentar iniciar sesión:', err);
            alert('No se pudo conectar con el servidor.');
        }
    };

    loginForm.addEventListener('submit', handleLogin);
});