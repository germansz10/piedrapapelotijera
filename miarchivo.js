// Declarar historialAcumulado como una variable global
let historialAcumulado =
  JSON.parse(localStorage.getItem("historialAcumulado")) || [];

// Función para mostrar el historial acumulado en el DOM
function mostrarHistorial() {
  const listaHistorial = document.getElementById("listaHistorial");
  listaHistorial.innerHTML = ""; // Limpiar la lista
  historialAcumulado.forEach((entry) => {
    const li = document.createElement("li");
    li.textContent = `Jugador: ${entry.nombre} - Rondas Ganadas: ${entry.rondasGanadas} - Rondas Perdidas: ${entry.rondasPerdidas}`;
    listaHistorial.appendChild(li);
  });
}

// Conecto el archivo JS con el HTML
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
  const resetHistorialBtn = document.getElementById("resetHistorial");
  const resetNombreBtn = document.getElementById("resetNombre");

  // Limpia el nombre del jugador al cargar la página
  localStorage.removeItem("nombreJugador");
  let nombreJugador = "";
  let puntajeJugador = 0;
  let puntajeMaquina = 0;
  const opcionesJuego = ["piedra", "papel", "tijera"];

  // Mostrar siempre la pantalla de ingreso del nombre
  document.getElementById("nombreJugador").style.display = "block";
  juegoDiv.style.display = "none";

  // Mostrar el historial acumulado al cargar la página
  mostrarHistorial();

  // Función para iniciar el juego
  function iniciarJuego() {
    nombreJugador = nombreInput.value.trim() || "Lisa Junior";
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

  // Selecciona la jugada del jugador y de la máquina
  opciones.forEach((boton) => {
    boton.addEventListener("click", () => {
      let jugadaJugador = boton.dataset.jugada;
      let jugadaMaquina =
        opcionesJuego[Math.floor(Math.random() * opcionesJuego.length)];

      resultado.textContent = `Elegiste ${jugadaJugador.toUpperCase()} - La máquina eligió ${jugadaMaquina.toUpperCase()}`;

      let ganador = determinarGanador(jugadaJugador, jugadaMaquina);
      if (ganador === "jugador") {
        puntajeJugador++;
      } else if (ganador === "maquina") {
        puntajeMaquina++;
      }

      puntajeJugadorSpan.textContent = puntajeJugador;
      puntajeMaquinaSpan.textContent = puntajeMaquina;

      // Si el jugador o la máquina llegan a 3 puntos, se muestra el mensaje de ganador
      if (puntajeJugador === 3) {
        Swal.fire({
          title: "¡Ganaste la ronda!",
          text: "Sos el campeón 🏆",
          icon: "success",
          confirmButtonText: "Seguir jugando",
        });

        agregarHistorial(nombreJugador, "Ganó");
        reiniciarJuego();
      } else if (puntajeMaquina === 3) {
        Swal.fire({
          title: "¡Gano la máquina!",
          text: "Sos un looser 😢",
          icon: "error",
          confirmButtonText: "Seguir jugando",
        });

        agregarHistorial(nombreJugador, "Perdió");
        reiniciarJuego();
      }
    });
  });

  // Función para determinar el ganador
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

  // Función para reiniciar el juego
  function reiniciarJuego() {
    puntajeJugador = 0;
    puntajeMaquina = 0;
    puntajeJugadorSpan.textContent = "0";
    puntajeMaquinaSpan.textContent = "0";
    resultado.textContent = "";
    mensaje.textContent = `Hola ${nombreJugador}, elige tu jugada:`;
  }

  // Función para agregar o actualizar el historial de un jugador
  function agregarHistorial(nombre, resultado) {
    // Busca si ya existe un registro para el jugador en el historial
    const jugadorExistente = historialAcumulado.find(
      (entry) => entry.nombre === nombre
    );

    if (jugadorExistente) {
      // Si el jugador ya existe, actualiza las rondas ganadas o perdidas
      if (resultado === "Ganó") {
        jugadorExistente.rondasGanadas++;
      } else if (resultado === "Perdió") {
        jugadorExistente.rondasPerdidas++;
      }
    } else {
      // Si el jugador no existe, crea un nuevo registro
      historialAcumulado.push({
        nombre: nombre,
        rondasGanadas: resultado === "Ganó" ? 1 : 0,
        rondasPerdidas: resultado === "Perdió" ? 1 : 0,
      });
    }

    // Guarda el historial actualizado en localStorage
    localStorage.setItem(
      "historialAcumulado",
      JSON.stringify(historialAcumulado)
    );

    // Actualiza el historial en el DOM
    mostrarHistorial();
  }

  // Función para resetear el historial
  resetHistorialBtn.addEventListener("click", () => {
    localStorage.removeItem("historialAcumulado");
    historialAcumulado.length = 0; // Vaciar el array
    mostrarHistorial();
  });

  // Función para resetear el nombre del jugador
  resetNombreBtn.addEventListener("click", () => {
    nombreJugador = "";
    puntajeJugador = 0;
    puntajeMaquina = 0;
    puntajeJugadorSpan.textContent = "0";
    puntajeMaquinaSpan.textContent = "0";
    resultado.textContent = "";
    mensaje.textContent = "Ingresa tu nombre para comenzar a jugar";
    document.getElementById("nombreJugador").style.display = "block";
    juegoDiv.style.display = "none";
  });
});

// Función para cargar el historial desde un archivo JSON
function cargarHistorialDesdeJSON() {
  fetch("./data/historial.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Error al cargar el archivo JSON: ${response.status} ${response.statusText}`
        );
      }
      return response.json();
    })
    .then((data) => {
      // Actualizar el historial acumulado con los datos del JSON
      historialAcumulado.push(...data);
      localStorage.setItem(
        "historialAcumulado",
        JSON.stringify(historialAcumulado)
      );
      mostrarHistorial();
    })
    .catch((error) => {
      console.error("Error al cargar el historial:", error);
    });
}
