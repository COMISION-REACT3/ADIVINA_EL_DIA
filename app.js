const messageDiv = document.getElementById("message");
const resultText = document.getElementById("result");
const daysOfTheWeek = ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"];

// Día aleatorio
let randomDay = daysOfTheWeek[Math.floor(Math.random() * 7)];
console.log("Día aleatorio:", randomDay); // Para depuración

// Inicializar SpeechRecognition
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recog = new window.SpeechRecognition();
recog.lang = "es-ES"; // Configurar idioma a español

recog.start();

// Listeners
recog.addEventListener("result", (e) => {
  const userSpeech = e.results[0][0].transcript.trim().toLowerCase();
  showMessage(userSpeech);
});
recog.addEventListener("end", () => recog.start());

// Mostrar mensaje del usuario
function showMessage(message) {
  messageDiv.innerHTML = `<div> Dijiste: ${message} </div>`;
  checkDaysOfTheWeek(message);
}

// Verificar la respuesta
function checkDaysOfTheWeek(message) {
  if (message === randomDay) {
    resultText.innerHTML = `
      <span style="color: #00F700;">¡Adivinaste! El día era: ${randomDay}.</span>
      <br>
      <button id="play-again-btn">Intenta nuevamente</button>`;
    recog.abort(); // Detener reconocimiento de voz
  } else {
    resultText.innerHTML = `<span style="color: #F54A19;">Oops! Incorrecto. Intenta otra vez.</span>`;
  }
}

// Reiniciar el juego
document.body.addEventListener("click", (e) => {
  if (e.target.id === "play-again-btn") {
    randomDay = daysOfTheWeek[Math.floor(Math.random() * 7)];
    resultText.innerHTML = "";
    messageDiv.innerHTML = "";
    recog.start();
  }
});

