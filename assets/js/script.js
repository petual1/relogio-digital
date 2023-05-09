const horas = document.getElementById("horas");
const minutos = document.getElementById("minutos");
const segundos = document.getElementById("segundos");
const paisElement = document.getElementById("pais");
const estadoElement = document.getElementById("estado");

const relogio = setInterval(function time() {
  let dateToday = new Date();
  let hr = dateToday.getHours();
  let min = dateToday.getMinutes();
  let sg = dateToday.getSeconds();

  if (hr < 10) hr = '0' + hr;
  if (min < 10) min = '0' + min;
  if (sg < 10) sg = '0' + sg;

  horas.textContent = hr;
  minutos.textContent = min;
  segundos.textContent = sg;

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

        const xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onreadystatechange = function() {
          if (xhr.readyState === 4 && xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            const address = response.address;

            const state = address.state;
            const country = address.country;

            paisElement.textContent = country;
            estadoElement.textContent = state;
          }
        };

        xhr.send();
      },
      error => {
        console.error('Erro ao obter a localização:', error);
      }
    );
  } else {
    console.error('Navegador não suporta geolocalização.');
  }
}, 1000);
