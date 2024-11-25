const paisesCapitales = [
    { pais: "España", capital: "Madrid" },
    { pais: "Francia", capital: "París" },
    { pais: "Italia", capital: "Roma" },
    { pais: "Alemania", capital: "Berlín" },
    { pais: "Argentina", capital: "Buenos Aires" },
    { pais: "Brasil", capital: "Brasilia" },
    { pais: "Japón", capital: "Tokio" },
    { pais: "España", capital: "Madrid" },
    { pais: "Francia", capital: "París" },
    { pais: "Italia", capital: "Roma" },   
    { pais: "Alemania", capital: "Berlín" },
    { pais: "Argentina", capital: "Buenos Aires" },     
    { pais: "Brasil", capital: "Brasilia" },
    { pais: "Japón", capital: "Tokio" },
    { pais: "México", capital: "Ciudad de México" },
    { pais: "Rusia", capital: "Moscú" },
    { pais: "Canadá", capital: "Ottawa" },
    { pais: "Estados Unidos", capital: "Washington D.C." },
    { pais: "China", capital: "Pekín" },
    { pais: "Australia", capital: "Canberra" },
    { pais: "India", capital: "Nueva Delhi" },
    { pais: "Egipto", capital: "El Cairo" },
    { pais: "México", capital: "Ciudad de México" },
    { pais: "Rusia", capital: "Moscú" },
    { pais: "Canadá", capital: "Ottawa" },
    { pais: "Estados Unidos", capital: "Washington D.C." },
    { pais: "China", capital: "Pekín" },
    { pais: "Australia", capital: "Canberra" },
    { pais: "India", capital: "Nueva Delhi" },
    { pais: "Egipto", capital: "El Cairo" },
    { pais: "Sudáfrica", capital: "Pretoria" },
    { pais: "Chile", capital: "Santiago" },
    { pais: "Colombia", capital: "Bogotá" },
    { pais: "Perú", capital: "Lima" },
    { pais: "Suecia", capital: "Estocolmo" }
];

const usuarioValido = "jugador1";
const contraseñaValida = "12345";

let resultados = [];
let jugadores = [];

function iniciarSesion() {
    for (let i = 0; i < 3; i++) {
        const usuario = prompt("Por favor, ingresa tu nombre de usuario:").trim();
        const contraseña = prompt("Por favor, ingresa tu contraseña:").trim();

        if (usuario === usuarioValido && contraseña === contraseñaValida) {
            alert(`¡Bienvenido, ${usuario}! Ahora empieza el juego de Geografía.`);
            menuPrincipal(usuario);
            return;
        } else {
            alert("Nombre de usuario o contraseña incorrectos.");
        }
    }
    alert("Has excedido el número de intentos. Adiós.");
}

function menuPrincipal(usuario) {
    let continuar = true;

    while (continuar) {
        const opcion = prompt("Elige una opción:\n1. Jugar\n2. Agregar país y capital\n3. Eliminar país y capital\n4. Salir");
        
        switch (opcion) {
            case '1':
                jugar(usuario);
                break;
            case '2':
                agregarPaisCapital();
                break;
            case '3':
                eliminarPaisCapital();
                break;
            case '4':
                continuar = false;
                alert("Gracias por jugar. ¡Hasta la próxima!");
                break;
            default:
                alert("Opción no válida. Por favor, elige una opción del 1 al 4.");
        }
    }
}

function obtenerCapitalAleatoria(capitalesUsadas) {
    const filtradas = paisesCapitales.filter(p => !capitalesUsadas.includes(p.capital));
    return filtradas.length ? filtradas[Math.floor(Math.random() * filtradas.length)] : null;
}

function buscarPaisPorCapital(capital) {
    const resultado = paisesCapitales.find(p => p.capital.toLowerCase() === capital.toLowerCase());
    return resultado ? resultado.pais : null;
}

function jugar(usuario) {
    let continuarJuego = true;

    while (continuarJuego) {
        const resultado = iniciarJuego(usuario);
        resultados.push(resultado);
        actualizarPuntaje(usuario, resultado.totalCorrectas);

        let respuestaContinuar = prompt("¿Te gustaría jugar otra vez? (sí/no)").toLowerCase();
        while (respuestaContinuar !== "sí" && respuestaContinuar !== "no") {
            alert("Por favor, responde con 'sí' o 'no'.");
            respuestaContinuar = prompt("¿Te gustaría jugar otra vez? (sí/no)").toLowerCase();
        }

        continuarJuego = (respuestaContinuar === "sí");
    }

    alert("Gracias por jugar. ¡Hasta la próxima!");
    mostrarResultados();
}

function iniciarJuego(usuario) {
    const intentosMaximos = 3;
    let totalCorrectas = 0;
    const capitalesIntentadas = [];
    const capitalesCorrectas = [];
    const respuestasIncorrectas = [];

    while (true) {
        const capitalData = obtenerCapitalAleatoria(capitalesIntentadas);

        if (!capitalData) {
            alert("¡Has respondido todas las capitales! Fin del juego.");
            break;
        }

        const { pais, capital } = capitalData;
        capitalesIntentadas.push(capital);
        let intentos = 0;
        let respuestaCorrecta = false;

        while (intentos < intentosMaximos) {
            const respuesta = prompt(`Hola ${usuario}, ¿a qué país pertenece la capital: ${capital}?`);

            if (!respuesta || respuesta.trim() === "") {
                alert("Por favor, ingresa una respuesta válida.");
                continue;
            }

            if (buscarPaisPorCapital(capital) === respuesta.trim()) {
                alert("¡Correcto!");
                totalCorrectas++;
                capitalesCorrectas.push(capital);
                respuestaCorrecta = true;
                break;
            } else {
                respuestasIncorrectas.push({ capital, respuesta });
                intentos++;
                alert(`Incorrecto. Te quedan ${intentosMaximos - intentos} intentos.`);
            }
        }

        if (!respuestaCorrecta) {
            alert(`Lo siento, ${usuario}, has fallado. La respuesta correcta era: ${pais}.`);
        }
    }

    alert(`Juego terminado. Has acertado un total de ${totalCorrectas} respuestas correctas.`);
    return { totalCorrectas, capitalesCorrectas, respuestasIncorrectas };
}

function mostrarResultados() {
    if (resultados.length > 0) {
        alert("Resultados de tus sesiones:");
        resultados.sort((a, b) => b.totalCorrectas - a.totalCorrectas);

        resultados.forEach((resultado, index) => {
            alert(`Sesión ${index + 1}: ${resultado.totalCorrectas} respuestas correctas.`);
            if (resultado.capitalesCorrectas.length > 0) {
                alert(`Capitales acertadas: ${resultado.capitalesCorrectas.join(', ')}`);
            }
            if (resultado.respuestasIncorrectas.length > 0) {
                alert("Respuestas incorrectas:");
                resultado.respuestasIncorrectas.forEach(respuesta => {
                    alert(`Capital: ${respuesta.capital}, Tu respuesta: ${respuesta.respuesta}`);
                });
            }
        });
    } else {
        alert("No hay resultados para mostrar.");
    }

    mostrarClasificacion();
}

function mostrarClasificacion() {
    if (jugadores.length > 0) {
        jugadores.sort((a, b) => b.puntaje - a.puntaje);
        alert("Clasificación de jugadores:");

        jugadores.forEach((jugador, index) => {
            alert(`${index + 1}. ${jugador.nombre} - Puntaje: ${jugador.puntaje}`);
        });
    } else {
        alert("No hay jugadores registrados.");
    }
}

function actualizarPuntaje(usuario, puntajeObtenido) {
    const jugador = jugadores.find(j => j.nombre === usuario);
    if (jugador) {
        jugador.puntaje += puntajeObtenido;
    } else {
        jugadores.push({ nombre: usuario, puntaje: puntajeObtenido });
    }
}

function agregarPaisCapital() {
    const nuevoPais = prompt("Ingrese el nombre del país:").trim();
    const nuevaCapital = prompt("Ingrese el nombre de la capital:").trim();

    if (nuevoPais && nuevaCapital) {
        paisesCapitales.push({ pais: nuevoPais, capital: nuevaCapital });
        alert(`Se ha agregado: ${nuevoPais} - ${nuevaCapital}`);
    } else {
        alert("Debe ingresar un país y una capital válidos.");
    }
}

function eliminarPaisCapital() {
    const paisAEliminar = prompt("Ingrese el nombre del país a eliminar:").trim();

    const indice = paisesCapitales.findIndex(p => p.pais.toLowerCase() === paisAEliminar.toLowerCase());

    if (indice !== -1) {
        const eliminado = paisesCapitales.splice(indice, 1);
        alert(`Se ha eliminado: ${eliminado[0].pais} - ${eliminado[0].capital}`);
    } else {
        alert("No se encontró el país especificado.");
    }
}

iniciarSesion();
  