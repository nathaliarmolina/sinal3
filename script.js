$(document).ready(function() {
    $('#weather-data').hide(); // Começa o conteúdo oculto
    $('main').hide(); // O main começa oculto também

    $('#search-btn').click(function() {
        let city = $('#city-name').val(); // Pega o nome da cidade

        if (city) {
            $.ajax({
                url: '/get_weather',  // Rota do Flask que vai pegar os dados
                type: 'GET',
                data: { city: city }, // Passa o nome da cidade
                success: function(data) {
                    // Exibe os dados retornados
                    if (data.cod === 200) {
                        $('#weather-data').html(`
                            <h3>Resultados para: ${data.name}</h3>
                            <p>Temperatura: ${data.main.temp}°C</p>
                            <p>Condição: ${data.weather[0].description}</p>
                            <p>Umidade: ${data.main.humidity}%</p>
                            <p>Velocidade do Vento: ${data.wind.speed} m/s</p>
                        `).fadeIn(500); // Faz aparecer suavemente

                        $('main').fadeIn(500); // Exibe o main quando a pesquisa for feita com sucesso
                    } else {
                        $('#weather-data').html('<p>Cidade não encontrada. Tente novamente!</p>').fadeIn(500);
                        $('main').fadeIn(500); // Exibe o main mesmo em caso de erro
                    }
                },
                error: function() {
                    $('#weather-data').html('<p>Ocorreu um erro ao buscar os dados.</p>').fadeIn(500);
                    $('main').fadeIn(500); // Exibe o main em caso de erro
                }
            });
        } else {
            alert("Por favor, insira o nome de uma cidade!");
        }
    });
});
