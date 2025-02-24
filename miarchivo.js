function obtenerNombreJugador() {
    let nombre = prompt('Bienvenido al piedra, papel o tijera. Gana el juego el primero en lograr 3 victorias ¿Cómo te llamas?').trim();
    if (nombre === "") {
        alert('No ingresaste un nombre, te llamare Lisa junior.');
        console.log('Hola Lisa junior');
        return "Lisa junior";
    }
    console.log('Hola ' + nombre);
    return nombre;
}

function obtenerJugadaJugador(juego) {
    let jugada;
    do {
        jugada = prompt('¿Qué eliges? Piedra🪨 , papel📃 o tijera ✂️?').toLowerCase().trim();
        if (!juego.includes(jugada)) {
            alert('Elección inválida. Debe ser piedra, papel o tijera.');
        }
    } while (!juego.includes(jugada));
    return jugada;
}

function obtenerJugadaMaquina(juego) {
    return juego[Math.floor(Math.random() * juego.length)];
}

function determinarGanador(jugadaJugador, jugadaMaquina) {
    if (jugadaJugador === jugadaMaquina) {
        return "empate";
    } else if (
        (jugadaJugador === 'piedra' && jugadaMaquina === 'tijera') ||
        (jugadaJugador === 'papel' && jugadaMaquina === 'piedra') ||
        (jugadaJugador === 'tijera' && jugadaMaquina === 'papel')
    ) {
        return "jugador";
    } else {
        return "maquina";
    }
}

function mostrarPuntuacion(nombreJugador, ganoJugador, ganoMaquina) {
    alert(`Puntuación: 🧑‍💻${nombreJugador} ${ganoJugador} - 🤖 Máquina  ${ganoMaquina}`);
}

function jugarDeNuevo() {
    let respuesta = prompt('¿Querés volver a jugar? Ingrese "si" o "no" o presione tecla cualquiera').toLowerCase().trim();
    if (respuesta === 'si') {
        jugarPiedraPapelTijera();
    } else if (respuesta === 'no') {
        alert('¡Gracias por jugar! vuelva prontos');
    }   else {  
        alert('No hay tecla cualquiera. Ingrese "si" o "no"');
        jugarDeNuevo();
    }
}

function jugarPiedraPapelTijera() {
    let nombreDelJugador = obtenerNombreJugador();
    let juego = ['piedra', 'papel', 'tijera'];
    let ganoJugador = 0;
    let ganoMaquina = 0;

    while (ganoJugador < 3 && ganoMaquina < 3) {
        let jugadaJugador = obtenerJugadaJugador(juego);
        let jugadaMaquina = obtenerJugadaMaquina(juego);

        alert(`🧑‍💻 Tu Eleccion: ${jugadaJugador.toUpperCase()} \n🤖 Maquina: ${jugadaMaquina.toUpperCase()}`);

        let resultado = determinarGanador(jugadaJugador, jugadaMaquina);

        if (resultado === "empate") {
            alert('Empate');
        } else if (resultado === "jugador") {
            alert('¡Ganaste esta ronda! 🎉');
            ganoJugador++;
        } else {
            alert('Perdiste esta ronda.😢');
            ganoMaquina++;
        }

        mostrarPuntuacion(nombreDelJugador, ganoJugador, ganoMaquina);
    }

    if (ganoJugador === 3) {
        alert('¡Felicidades! Ganaste el juego 🎉');
    } else {
        alert('La máquina ganó el juego.😢 ¡Suerte la próxima! ');
    }

    jugarDeNuevo();
}

//Función para comenzar el juego
jugarPiedraPapelTijera();