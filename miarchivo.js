document.addEventListener("DOMContentLoaded", () => {
    const nombreInput = document.getElementById("nombre");
    const iniciarBtn = document.getElementById("iniciar");
    const juegoDiv = document.getElementById("juego");
    const mensaje = document.getElementById("mensaje");
    const opciones = document.querySelectorAll(".opcion");
    const resultado = document.getElementById("resultado");
    const puntajeJugadorSpan = document.getElementById("puntajeJugador");
    const puntajeMaquinaSpan = document.getElementById("puntajeMaquina");
    const reiniciarBtn = document.getElementById("reiniciar");
    const historialJugadorSpan = document.getElementById("historialJugador");
    const historialMaquinaSpan = document.getElementById("historialMaquina");
    const resetHistorialBtn = document.getElementById("resetHistorial");
    const resetNombreBtn = document.getElementById("resetNombre");

    let nombreJugador = localStorage.getItem("nombreJugador") || "";
    let puntajeJugador = 0;
    let puntajeMaquina = 0;
    let historialJugador = parseInt(localStorage.getItem("historialJugador")) || 0;
    let historialMaquina = parseInt(localStorage.getItem("historialMaquina")) || 0;
    const opcionesJuego = ["piedra", "papel", "tijera"];

    if (nombreJugador) {
        mensaje.textContent = `Hola ${nombreJugador}, elige tu jugada:`;
        document.getElementById("nombreJugador").style.display = "none";
        juegoDiv.style.display = "block";
        actualizarHistorial();
    }

    function iniciarJuego() {
        nombreJugador = nombreInput.value.trim() || "Lisa junior";
        localStorage.setItem("nombreJugador", nombreJugador);
        mensaje.textContent = `Hola ${nombreJugador}, elige tu jugada:`;
        document.getElementById("nombreJugador").style.display = "none";
        juegoDiv.style.display = "block";
    }

    iniciarBtn.addEventListener("click", iniciarJuego);
    nombreInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            iniciarJuego();
        }
    });

    opciones.forEach(boton => {
        boton.addEventListener("click", () => {
            let jugadaJugador = boton.dataset.jugada;
            let jugadaMaquina = opcionesJuego[Math.floor(Math.random() * opcionesJuego.length)];

            resultado.textContent = `Elegiste ${jugadaJugador.toUpperCase()} - La máquina eligió ${jugadaMaquina.toUpperCase()}`;

            let ganador = determinarGanador(jugadaJugador, jugadaMaquina);
            if (ganador === "jugador") {
                puntajeJugador++;
            } else if (ganador === "maquina") {
                puntajeMaquina++;
            }

            puntajeJugadorSpan.textContent = puntajeJugador;
            puntajeMaquinaSpan.textContent = puntajeMaquina;

            if (puntajeJugador === 3) {
                alert(`¡Felicidades ${nombreJugador}, ganaste! 🎉`);
                historialJugador++;
                localStorage.setItem("historialJugador", historialJugador);
                reiniciarJuego();
            } else if (puntajeMaquina === 3) {
                alert("La máquina ganó 😢. ¡Suerte la próxima!");
                historialMaquina++;
                localStorage.setItem("historialMaquina", historialMaquina);
                reiniciarJuego();
            }
        });
    });

    reiniciarBtn.addEventListener("click", reiniciarJuego);
    resetHistorialBtn.addEventListener("click", resetearHistorial);
    resetNombreBtn.addEventListener("click", resetearNombre);

    function determinarGanador(jugador, maquina) {
        if (jugador === maquina) return "empate";
        if (
            (jugador === "piedra" && maquina === "tijera") ||
            (jugador === "papel" && maquina === "piedra") ||
            (jugador === "tijera" && maquina === "papel")
        ) {
            return "jugador";
        }
        return "maquina";
    }

    function reiniciarJuego() {
        puntajeJugador = 0;
        puntajeMaquina = 0;
        puntajeJugadorSpan.textContent = "0";
        puntajeMaquinaSpan.textContent = "0";
        resultado.textContent = "";
        mensaje.textContent = `Hola ${nombreJugador}, elige tu jugada:`;
        actualizarHistorial();
    }

    function resetearHistorial() {
        historialJugador = 0;
        historialMaquina = 0;
        localStorage.setItem("historialJugador", 0);
        localStorage.setItem("historialMaquina", 0);
        actualizarHistorial();
        alert("Historial reiniciado");
    }

    function resetearNombre() {
        localStorage.removeItem("nombreJugador");
        location.reload();
    }

    function actualizarHistorial() {
        historialJugadorSpan.textContent = historialJugador;
        historialMaquinaSpan.textContent = historialMaquina;
    }
});
