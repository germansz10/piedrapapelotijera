document.addEventListener("DOMContentLoaded", () => {
    const nombreInput = document.getElementById("nombre");
    const iniciarBtn = document.getElementById("iniciar");
    const juegoDiv = document.getElementById("juego");
    const mensaje = document.getElementById("mensaje");
    const opciones = document.querySelectorAll(".opcion");
    const resultado = document.getElementById("resultado");
    const puntajeJugadorSpan = document.getElementById("puntajeJugador");
    const puntajeMaquinaSpan = document.getElementById("puntajeMaquina");
    const reiniciarBtn = document.getElementById("reiniciar");//se conecta todos los botones e inputs del html con el js

    let nombreJugador = "";
    let puntajeJugador = 0;//se inicializa todo en 0
    let puntajeMaquina = 0;
    const opcionesJuego = ["piedra", "papel", "tijera"];

    iniciarBtn.addEventListener("click", () => {
        nombreJugador = nombreInput.value.trim() || "Lisa junior";
        mensaje.textContent = `Hola ${nombreJugador}, elige tu jugada:`;
        document.getElementById("nombreJugador").style.display = "none";
        juegoDiv.style.display = "block";
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
                reiniciarJuego();
            } else if (puntajeMaquina === 3) {
                alert("La máquina ganó 😢. ¡Suerte la próxima!");
                reiniciarJuego();
            }
        });
    });

    reiniciarBtn.addEventListener("click", reiniciarJuego);

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
    }
});
