import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login: React.FC<{ onLogin: (role: string) => void }> = ({ onLogin }) => {
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [clave, setClave] = useState('');
    const [mensaje, setMensaje] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nombreUsuario, clave }),
            });

            if (response.ok) {
                const usuario = await response.json();
                onLogin(usuario.rol); // Llamar a la función onLogin con el rol del usuario
                navigate('/instrumentos'); // Redirigir a la pantalla de productos
            } else {
                setMensaje('Usuario y/o Clave incorrectos, vuelva a intentar');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            setMensaje('Error al intentar iniciar sesión');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Nombre de Usuario"
                value={nombreUsuario}
                onChange={(e) => setNombreUsuario(e.target.value)}
            />
            <input
                type="password"
                placeholder="Clave"
                value={clave}
                onChange={(e) => setClave(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
            {mensaje && <p>{mensaje}</p>}
        </div>
    );
};

export default Login;
