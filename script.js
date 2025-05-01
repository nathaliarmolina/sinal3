$(document).ready(function() {

    $('#weather-data').hide(); // Começa escondido

    $('#search-btn').click(function() {
        let city = $('#city-name').val();

        if (city) {
            $.ajax({
                url: '/get_weather',
                type: 'GET',
                data: { city: city },
                success: function(data) {
                    if (data.cod === 200) {
                        $('#search-elements, .overlay h1, .overlay p').fadeOut(400, function() {
                            $('#weather-data').html(`
                                <h1>${data.name}</h1>
                                <p>Temperatura: ${Math.round(data.main.temp)}°C</p>
                                <p>Condição: ${data.weather[0].description}</p>
                                <p>Umidade: ${data.main.humidity}%</p>
                                <p>Velocidade do Vento: ${data.wind.speed} m/s</p>
                                <button id="new-search-btn" style="margin-top:20px;padding:10px 20px;font-size:1em;background-color:#D2691E;color:white;border:none;cursor:pointer;">Nova Busca</button>
                            `).fadeIn(600);

                            $('#new-search-btn').click(function() {
                                $('#weather-data').fadeOut(400, function() {
                                    $('#city-name').val('');
                                    $('#search-elements, .overlay h1, .overlay p').fadeIn(400);
                                });
                            });
                        });
                    } else {
                        $('#weather-data').html(`
                            <p>Cidade não encontrada. Tente novamente!</p>
                            <button id="new-search-btn" style="margin-top:20px;padding:10px 20px;font-size:1em;background-color:#D2691E;color:white;border:none;cursor:pointer;">Nova Busca</button>
                        `).fadeIn(500);

                        $('#new-search-btn').click(function() {
                            $('#weather-data').fadeOut(400, function() {
                                $('#city-name').val('');
                                $('#search-elements, .overlay h1, .overlay p').fadeIn(400);
                            });
                        });
                    }
                },
                error: function() {
                    $('#weather-data').html('<p>Ocorreu um erro ao buscar os dados.</p>').fadeIn(500);
                }
            });
        } else {
            alert("Por favor, insira o nome de uma cidade!");
        }
    });
});

    });
});

