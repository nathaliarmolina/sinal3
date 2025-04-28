import requests
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)
app.debug = True
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

# Sua chave da API do OpenWeather (você deve substituir pelo seu próprio)
API_KEY = '609fd09f12b961f0a87452bee11f26de'


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/get_weather', methods=['GET'])
def get_weather():
    city = request.args.get('city')  # Pega a cidade passada pelo Ajax

    if city:
        # Faz a requisição para o OpenWeather
        url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric&lang=pt_br"
        response = requests.get(url)
        data = response.json()

        # Se a cidade foi encontrada e os dados foram retornados
        if data['cod'] == 200:
            return jsonify(data)  # Retorna os dados como JSON
        else:
            return jsonify({'cod': data['cod'], 'message': data.get('message', 'Cidade não encontrada')})

    return jsonify({'cod': 400, 'message': 'Cidade não informada'})


@app.route('/favicon.ico')
def favicon():
    return '', 204


if __name__ == '__main__':
    app.run(debug=True)
