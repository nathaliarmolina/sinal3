$(document).ready(function () {
    const apiKey = "609fd09f12b961f0a87452bee11f26de";

    $("#search-forecast-btn").on("click", function () {
        const city = $("#city-name-forecast").val().trim();

        if (!city) {
            alert("Por favor, digite o nome de uma cidade.");
            return;
        }

        $.ajax({
            url: `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`,
            method: "GET",
            success: function (response) {
                const forecasts = response.list;
                const groupedForecasts = [];

                // Agrupar por dia (exibe só um horário por dia, ex: 12h00)
                forecasts.forEach(forecast => {
                    const date = new Date(forecast.dt_txt);
                    const hour = date.getHours();
                    if (hour === 12) {
                        groupedForecasts.push(forecast);
                    }
                });

                if (groupedForecasts.length === 0) {
                    alert("Não foram encontradas previsões para a cidade informada.");
                    return;
                }

                // Esconder campo de busca e mostrar carrossel
                $("#search-elements").hide();
                $("#forecast-results").show();
                $("#forecast-carousel-container").html("");

                groupedForecasts.forEach((forecast, index) => {
                    const date = new Date(forecast.dt_txt);
                    const day = date.toLocaleDateString("pt-BR", {
                        weekday: "long",
                        day: "numeric",
                        month: "long"
                    });

                    const itemHTML = `
                        <div class="forecast-slide" style="display: ${index === 0 ? 'block' : 'none'}">
                            <h3>${day}</h3>
                            <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="${forecast.weather[0].description}">
                            <p><strong>${forecast.main.temp}°C</strong></p>
                            <p>${forecast.weather[0].description}</p>
                        </div>
                    `;
                    $("#forecast-carousel-container").append(itemHTML);
                });

                let currentSlide = 0;
                const slides = $(".forecast-slide");

                $("#next-forecast-btn").off().on("click", function () {
                    slides.eq(currentSlide).hide();
                    currentSlide = (currentSlide + 1) % slides.length;
                    slides.eq(currentSlide).show();
                });

                $("#prev-forecast-btn").off().on("click", function () {
                    slides.eq(currentSlide).hide();
                    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                    slides.eq(currentSlide).show();
                });
            },
            error: function () {
                alert("Erro ao buscar os dados. Verifique o nome da cidade.");
            }
        });
    });

    $("#new-search-forecast-btn").on("click", function () {
        $("#forecast-results").hide();
        $("#search-elements").show();
        $("#city-name-forecast").val("");
    });
});
