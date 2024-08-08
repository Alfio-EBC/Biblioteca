import React from "react";
import { useNavigate } from "react-router-dom";
import iAx from "./ConfigAXIOS";
import '../src/Estilos.css';
const AuthHandler = () => {
    const navigate = useNavigate();

    async function valToken(token) {
        try {
            const data = {
                accessToken: token,
            };
            const rta = await iAx.post('/valUsu', JSON.stringify(data));
            console.log("rta ====== " + JSON.stringify(rta));
            console.log("data ====== " + JSON.stringify(rta.data));
            console.log("status ====== " + rta.status);
            console.log("ch ====== " + rta.config.headers);

            if (rta.data.msg === "ER") {
                alert(rta.data.info);
                navigate('/AuthError');
            } else {
                console.log("======> ", rta.data.info);
                navigate('/home');
            }
        } catch (error) {
            console.log("ERROR: " + error.message);
            navigate('/AuthError');
        }
    }

    const handleLogin = () => {
        const simulatedToken = "dummy_token"; 
        valToken(simulatedToken);
    }

    return (
        <div className="auth-container">
            <h1 className="auth-title">Bienvenido a tu Biblioteca libro feliz</h1>
            <div className="login-container">
                <button onClick={handleLogin} className="login-button">Iniciar Sesión</button>
            </div>
        </div>
    );
}

export default AuthHandler;
