import React, { useState, useEffect } from 'react';

const Contador = () => {
    const [clics, setClics] = useState(0);
    const [enJuego, setEnJuego] = useState(false);
    const [tiempoRestante, setTiempoRestante] = useState(5);
    const [resultado, setResultado] = useState(null);

    // Inicia el juego
    const iniciarJuego = () => {
        setEnJuego(true);
        setClics(0);
        setTiempoRestante(5);
        setResultado(null);
    };

    // Contador de clics
    const contarClic = () => {
        if (enJuego && tiempoRestante > 0) {
            setClics(clics + 1);  // Incrementar clics
        }
    };

    // Usamos useEffect para manejar el temporizador
    useEffect(() => {
        let timer;

        // Solo ejecutar el temporizador si el juego ha comenzado y el tiempo restante es mayor a 0
        if (enJuego && tiempoRestante > 0) {
            // Intervalo para restar 1 segundo del tiempo restante
            timer = setInterval(() => {
                setTiempoRestante((prev) => prev - 1);  // Reducir el tiempo restante
            }, 1000);
        } else if (tiempoRestante === 0) {
            // Cuando el tiempo se acaba, termina el juego y muestra el resultado
            setEnJuego(false);
            setResultado(clics);
        }

        // Limpiar el intervalo si el componente se desmonta o el tiempo termina
        return () => clearInterval(timer);
    }, [enJuego, tiempoRestante]);  // Eliminamos clics de las dependencias

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Juego Contador</h1>
            <div style={styles.gameContainer}>
                {!enJuego && !resultado && (
                    <button onClick={iniciarJuego} style={styles.startButton}>
                        Iniciar Juego
                    </button>
                )}

                {enJuego && (
                    <div style={styles.gameInfo}>
                        <h2 style={styles.time}>Tiempo restante: {tiempoRestante} segundos</h2>
                        <button onClick={contarClic} style={styles.clickButton}>
                            Haz clic aquí
                        </button>
                    </div>
                )}

                {resultado !== null && (
                    <div style={styles.resultContainer}>
                        <h2 style={styles.resultText}>¡El tiempo ha terminado!</h2>
                        <h3 style={styles.resultText}>Hiciste {resultado} clics en 5 segundos</h3>
                        <button onClick={iniciarJuego} style={styles.restartButton}>
                            Jugar otra vez
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f3f4f6',
        fontFamily: 'Arial, sans-serif',
        color: '#333',
        position: 'relative',
        padding: '20px', // Asegura que no haya recortes en dispositivos móviles
    },
    title: {
        fontSize: '3rem',
        color: '#4a90e2',
        marginBottom: '30px',
        textAlign: 'center',
    },
    gameContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
        borderRadius: '15px',
        backgroundColor: '#fff',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
        width: '100%',  // Asegura que el contenedor ocupe el 100% del ancho en dispositivos pequeños
        maxWidth: '400px', // Limita el ancho máximo para hacerlo más estético
        textAlign: 'center',
    },
    startButton: {
        padding: '15px 30px',
        fontSize: '1.2rem',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        width: '100%',
        marginBottom: '20px',
        transition: 'background-color 0.3s',
    },
    gameInfo: {
        marginTop: '20px',
        width: '100%',
    },
    time: {
        fontSize: '1.5rem',
        marginBottom: '20px',
        color: '#e67e22',
    },
    clickButton: {
        padding: '20px 35px',
        fontSize: '1.5rem',
        backgroundColor: '#3498db',
        color: 'white',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
        width: '100%',
    },
    resultContainer: {
        marginTop: '30px',
        width: '100%',
    },
    resultText: {
        fontSize: '1.5rem',
        color: '#2c3e50',
    },
    restartButton: {
        padding: '15px 30px',
        fontSize: '1.2rem',
        backgroundColor: '#e74c3c',
        color: 'white',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        width: '100%',
        marginTop: '20px',
        transition: 'background-color 0.3s',
    },
};

export default Contador;
