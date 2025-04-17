//conectp el archivo js con el html
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
//inicializo las variables
    let nombreJugador = localStorage.getItem("nombreJugador") || "";
    let puntajeJugador = 0;
    let puntajeMaquina = 0;
    let historialJugador = parseInt(localStorage.getItem("historialJugador")) || 0;
    let historialMaquina = parseInt(localStorage.getItem("historialMaquina")) || 0;
    const opcionesJuego = ["piedra", "papel", "tijera"];
//si el nombre del jugador esta guardado en el local storage, se muestra el mensaje
    if (nombreJugador) {
        mensaje.textContent = `Hola ${nombreJugador}, elige tu jugada:`;
        document.getElementById("nombreJugador").style.display = "none";
        juegoDiv.style.display = "block";
        actualizarHistorial();
    }
//funcion para iniciar el juego
    function iniciarJuego() {
        nombreJugador = nombreInput.value.trim() || "Lisa junior";
        localStorage.setItem("nombreJugador", nombreJugador);
        mensaje.textContent = `Hola ${nombreJugador}, elige tu jugada:`;
        document.getElementById("nombreJugador").style.display = "none";
        juegoDiv.style.display = "block";
    }
//inicia el juego presionando enter
    iniciarBtn.addEventListener("click", iniciarJuego);
    nombreInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            iniciarJuego();
        }
    });
//selecciona la jugada del jugador y de la maquina
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
//si el jugador o la maquina llegan a 3 puntos, se muestra el mensaje de ganador
            if (puntajeJugador === 3) {
                Swal.fire({
                    title: '¡Ganaste la ronda!',
                    text: 'Sos el campeón 🏆',
                    icon: 'success',
                    confirmButtonText: 'Seguir jugando'
                  });
                  
                historialJugador++;
                localStorage.setItem("historialJugador", historialJugador);
                reiniciarJuego();
            } else if (puntajeMaquina === 3) {
                Swal.fire({
                    title: '¡Gano la maquina!',
                    text: 'Sos un looser 😢',
                    icon: 'error',
                    confirmButtonText: 'Seguir jugando'
                  });
                  
                historialMaquina++;
                localStorage.setItem("historialMaquina", historialMaquina);
                reiniciarJuego();
            }
        });
    });

//reinicia el juego, el historial o el nombre del jugador
    reiniciarBtn.addEventListener("click", reiniciarJuego);
    resetHistorialBtn.addEventListener("click", resetearHistorial);
    resetNombreBtn.addEventListener("click", resetearNombre);
//funcion para determinar el ganador
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
//funcion para reiniciar el juego 
    function reiniciarJuego() {
        puntajeJugador = 0;
        puntajeMaquina = 0;
        puntajeJugadorSpan.textContent = "0";
        puntajeMaquinaSpan.textContent = "0";
        resultado.textContent = "";
        mensaje.textContent = `Hola ${nombreJugador}, elige tu jugada:`;
        actualizarHistorial();
    }
//funcion para resetear el historial
    function resetearHistorial() {
        historialJugador = 0;
        historialMaquina = 0;
        localStorage.setItem("historialJugador", 0);
        localStorage.setItem("historialMaquina", 0);
        actualizarHistorial();
    }
//funcion para resetear el nombre del jugador
    function resetearNombre() {
        localStorage.removeItem("nombreJugador");
        location.reload();
    }
//funcion para actualizar el historial
    function actualizarHistorial() {
        historialJugadorSpan.textContent = historialJugador;
        historialMaquinaSpan.textContent = historialMaquina;
    }
});
