const apiKey = '609fd09f12b961f0a87452bee11f26de';

document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('search-forecast-btn');
    const newSearchBtn = document.getElementById('new-search-forecast-btn');
    const cityInput = document.getElementById('city-name-forecast');
    const forecastContainer = document.getElementById('carousel-container');
    const forecastSection = document.getElementById('forecast-results');
    const header = document.querySelector('header');
    const searchElements = document.getElementById('search-elements');
    const headerParagraph = document.querySelector('header p');
    const forecastTitle = document.getElementById('forecast-title');

    let currentIndex = 0;
    let prevBtn, nextBtn;

    searchBtn.addEventListener('click', async () => {
        const city = cityInput.value.trim();
        if (!city) return alert('Digite o nome de uma cidade.');

        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=pt_br&appid=${apiKey}`;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Erro na resposta da API');

            const data = await response.json();
            const dailyForecasts = data.list.filter(item => item.dt_txt.includes('12:00:00'));

            // Limpa resultados anteriores
            forecastContainer.innerHTML = '';
            if (prevBtn) prevBtn.remove();
            if (nextBtn) nextBtn.remove();

            dailyForecasts.forEach(forecast => {
                const date = new Date(forecast.dt * 1000).toLocaleDateString('pt-BR');
                const temperature = Math.round(forecast.main.temp);
                const condition = forecast.weather[0].description;
                const humidity = forecast.main.humidity;
                const windSpeed = Math.round(forecast.wind.speed * 3.6); // m/s para km/h

                const forecastDiv = document.createElement('div');
                forecastDiv.classList.add('forecast-day');

                const iconCode = forecast.weather[0].icon;
                const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

                forecastDiv.innerHTML = `
                    <div class="forecast-header">
                        <img src="${iconUrl}" alt="${condition}" class="weather-icon">
                        <h3>${data.city.name}</h3>
                    </div>
                    <p><strong>Data:</strong> ${date}</p>
                    <p><strong>Temperatura:</strong> ${temperature}°C</p>
                    <p><strong>Condição:</strong> ${condition}</p>
                    <p><strong>Umidade:</strong> ${humidity}%</p>
                    <p><strong>Vento:</strong> ${windSpeed} km/h</p>
                `;

                forecastContainer.appendChild(forecastDiv);
            });

            // Esconde elementos da busca
            searchElements.style.display = 'none';
            if (headerParagraph) headerParagraph.style.display = 'none';

            // Mostra carrossel dentro do header
            forecastSection.style.display = 'block';
            header.appendChild(forecastSection);

            if (forecastTitle) forecastTitle.classList.add('discreto');

            // Cria botões com ícones Font Awesome
            prevBtn = document.createElement('button');
            prevBtn.id = 'prev-btn';
            prevBtn.innerHTML = '<i class="fas fa-arrow-left"></i>';
            prevBtn.onclick = () => {
                if (currentIndex > 0) {
                    currentIndex--;
                    showForecastDay(currentIndex);
                }
            };

            nextBtn = document.createElement('button');
            nextBtn.id = 'next-btn';
            nextBtn.innerHTML = '<i class="fas fa-arrow-right"></i>';
            nextBtn.onclick = () => {
                if (currentIndex < forecastContainer.children.length - 1) {
                    currentIndex++;
                    showForecastDay(currentIndex);
                }
            };

            forecastSection.appendChild(prevBtn);
            forecastSection.appendChild(nextBtn);

            currentIndex = 0;
            showForecastDay(currentIndex);

        } catch (error) {
            alert('Erro ao buscar a previsão. Verifique o nome da cidade e tente novamente.');
            console.error(error);
        }
    });

    newSearchBtn.addEventListener('click', () => {
        forecastSection.style.display = 'none';
        searchElements.style.display = 'flex';
        if (headerParagraph) headerParagraph.style.display = 'block';
        cityInput.value = '';
        forecastContainer.innerHTML = '';
        currentIndex = 0;
        if (prevBtn) prevBtn.remove();
        if (nextBtn) nextBtn.remove();
        if (forecastTitle) forecastTitle.classList.remove('discreto');
    });

    function showForecastDay(index) {
        const days = document.querySelectorAll('.forecast-day');
        days.forEach((day, i) => {
            day.style.display = i === index ? 'block' : 'none';
        });
    }
});





