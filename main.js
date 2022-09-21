import countrys from "/localTimes.json";
const $ = function (selector) {
  return document.querySelector(selector);
};
const textArea = $("#textResult");
const countries = countrys;
$("form").addEventListener("submit", (event) => {
  event.preventDefault();
  let valueShow = ``;
  const dataCountries = Object.keys(Object.fromEntries(new window.FormData(event.target)));
  dataCountries.shift();
  const date = Object.fromEntries(new window.FormData(event.target)).date;
  for (let i = 0; i < dataCountries.length; i++) {
    for (let j = 0; j < countries.length; j++) {
      if (dataCountries[i] === countries[j].pais) {
        valueShow += `En ${countries[i].pais.charAt(0).toUpperCase() + countries[i].pais.slice(1)} es: ${convertir(
          date,
          countries[i].time
        )}\n`;
      }
    }
  }
  textArea.value = valueShow;
});
$("#copiar").addEventListener("click", (event) => {
  navigator.clipboard.writeText(textArea.value);
});
function convertir(horaLocal, pais) {
  const convertir = new Date(horaLocal).toLocaleString("es-ES", {
    timeZone: pais,
    hour12: true,
    minute: "numeric",
    hour: "numeric",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  return formatear(convertir);
}
function formatear(elemnt) {
  return elemnt.replace(" p. m.", "PM").replace(" a. m.", "AM");
}
