from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from google.cloud import translate_v2 as translate
from geopy.geocoders import Nominatim
import folium
import os

app = Flask(__name__)
CORS(app)

# Google Translate 클라이언트 설정
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "C:/Users/smhrd/Desktop/API키/cloud-translation-api-460602-44b8e5e25ec7.json"
translate_client = translate.Client()

# 🧠 기본 라우트
@app.route('/')
def home():
    return 'Flask 번역 및 지도 서버가 실행 중입니다.'

# 📍 주소 → 지도
@app.route('/mypage_calendar', methods=['GET', 'POST'])
def mypage_calendar():
    map_html = None
    address = ""

    if request.method == 'POST':
        address = request.form['address']
        geolocator = Nominatim(user_agent="map_app")
        location = geolocator.geocode(address)

        if location:
            lat, lon = location.latitude, location.longitude
            m = folium.Map(location=[lat, lon], zoom_start=16)
            folium.Marker([lat, lon], tooltip=address, popup=address).add_to(m)
            map_html = m._repr_html_()
        else:
            map_html = "<p style='color:red;'>주소를 찾을 수 없습니다.</p>"

    return render_template('mypage_calendar.html', map_html=map_html, address=address)

@app.route('/show_map', methods=['POST'])
def show_map():
    data = request.get_json()
    address = data.get('address')
    geolocator = Nominatim(user_agent="flask_map_app")
    location = geolocator.geocode(address)

    if location:
        lat, lon = location.latitude, location.longitude
        m = folium.Map(location=[lat, lon], zoom_start=16)
        folium.Marker([lat, lon], tooltip=address, popup=address).add_to(m)
        return m._repr_html_()
    else:
        return "<p style='color:red;'>주소를 찾을 수 없습니다.</p>"

# 🔤 텍스트 번역 API
@app.route('/translate', methods=['POST'])
def translate_text():
    data = request.get_json()
    texts = data.get('text', [])
    target_lang = data.get('lang', 'en')

    results = []
    for text in texts:
        translated = translate_client.translate(
            text,
            target_language=target_lang,
            format_='text'
        )
        results.append(translated['translatedText'])

    return jsonify({'translated': results})

# 🚀 실행
if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
