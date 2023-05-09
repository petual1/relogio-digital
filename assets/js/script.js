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
                const apiKey = '76b56adcec854a77a2863374a27e79d7';
                const apiUrl = `https://api.opencagedata.com/geocode/v1/json?key=${apiKey}&q=${latitude},${longitude}`;

                fetch(apiUrl)
                    .then(response => response.json())
                    .then(data => {
                        const country = data.results[0].components.country;
                        const state = data.results[0].components.state;
                        paisElement.textContent = country;
                        estadoElement.textContent = state;
                    })
                    .catch(error => {
                        console.error('Erro ao obter informações de geolocalização:', error);
                    });
            },
            error => {
                console.error('Erro ao obter a localização:', error);
            }
        );
    } else {
        console.error('Navegador não suporta geolocalização.');
    }
}, 1000);
