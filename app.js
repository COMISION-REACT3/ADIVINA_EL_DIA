// Seleccionamos el contenedor donde se mostrará el mensaje hablado por el usuario
const messageDiv = document.getElementById("message");

// Array con los días de la semana en español
const daysOfTheWeek = ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"];

// Seleccionamos un día aleatorio del array como el objetivo del juego
let randomDay = daysOfTheWeek[Math.floor(Math.random() * 7)];
console.log("Día aleatorio:", randomDay); // Mensaje en consola para depuración

// Inicializamos la API de SpeechRecognition, compatible con diferentes navegadores
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recog = new window.SpeechRecognition();

// Configuramos el idioma del reconocimiento de voz a español
recog.lang = "es-ES";

// Iniciamos el reconocimiento de voz automáticamente
recog.start();

// Event Listener: Captura el resultado del reconocimiento de voz
recog.addEventListener("result", (e) => {
  // Extraemos el texto reconocido por la API, limpiamos espacios y lo convertimos a minúsculas
  const userSpeech = e.results[0][0].transcript.trim().toLowerCase();
  showMessage(userSpeech); // Mostramos el mensaje capturado en la interfaz
});

// Event Listener: Reinicia el reconocimiento de voz automáticamente cuando se detiene
recog.addEventListener("end", () => recog.start());

// Función para mostrar el mensaje hablado por el usuario y verificar si coincide con el día aleatorio
function showMessage(message) {
  // Inserta el texto dicho por el usuario en el contenedor del DOM
  messageDiv.innerHTML = `<div> Dijiste: ${message} </div>`;
  checkDaysOfTheWeek(message); // Comprobamos si el texto coincide con el día seleccionado
}

// Función para verificar si el mensaje del usuario coincide con el día aleatorio
function checkDaysOfTheWeek(message) {
  if (message === randomDay) {
    // Si el usuario acierta, detenemos el reconocimiento de voz
    recog.abort();

    // Mostramos un modal de éxito utilizando SweetAlert2
    Swal.fire({
      title: `¡Correcto! ¡El día era ${randomDay}!`, // Mensaje de éxito
      width: 600,
      padding: "3em", // Relleno interno del modal
      color: "#716add", // Color del texto
      background: "#fff url(/images/trees.png)", // Fondo con imagen personalizada
      backdrop: `
        rgba(0,0,123,0.4)
        url("https://i.gifer.com/PYh.gif")
        left top
        no-repeat
      `, // Efecto de fondo
      showConfirmButton: true, // Mostrar botón de confirmación
      confirmButtonText: "¿Intentar nuevamente?" // Texto del botón de confirmación
    });

    // Reiniciamos el juego después de 3 segundos
    setTimeout(restartGame, 3000);
  } else {
    // Si la respuesta es incorrecta, mostramos un toast de error
    Swal.fire({
      toast: true,
      position: "bottom", // Posición del toast en la parte inferior
      icon: "error", // Ícono de error
      title: "¡Incorrecto! ¡Intenta otra vez!", // Mensaje de error
      showConfirmButton: false, // Sin botón de confirmación
      timer: 1500, // Duración del toast en milisegundos
      timerProgressBar: true, // Barra de progreso visual
      background: "#302927", // Fondo oscuro personalizado
      color: "white", // Texto blanco
    });
  }
}

// Función para reiniciar el juego seleccionando un nuevo día aleatorio y limpiando la interfaz
function restartGame() {
  // Seleccionamos un nuevo día aleatorio como objetivo
  randomDay = daysOfTheWeek[Math.floor(Math.random() * 7)];

  // Limpiamos el mensaje mostrado en pantalla
  messageDiv.innerHTML = "";

  // Reiniciamos el reconocimiento de voz
  recog.start();
}
