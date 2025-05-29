from flask import Flask, render_template, request
from flask_cors import CORS
from geopy.geocoders import Nominatim
import folium

app = Flask(__name__)
CORS(app) 

@app.route('/', methods=['GET', 'POST'])
def index():
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

@app.route('/mypage_calendar')
def mypage_calendar():
    return render_template("마이페이지_캘린더.html")

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)

