# pip install folium geopy

import folium
from geopy.geocoders import Nominatim

def address_to_map(address: str, zoom: int = 16, filename='map.html'):
    # 주소 → 위도/경도 변환
    geolocator = Nominatim(user_agent="geoapi")
    location = geolocator.geocode(address)

    if location is None:
        print(f"[오류] 주소를 찾을 수 없습니다: {address}")
        return

    lat = location.latitude
    lon = location.longitude

    print(f"입력한 주소: {address}")
    print(f"위도: {lat}, 경도: {lon}")

    # 지도 생성
    m = folium.Map(location=[lat, lon], zoom_start=zoom)

    # 마커 추가
    folium.Marker(
        [lat, lon],
        tooltip=address,
        popup=f"위도: {lat}<br>경도: {lon}",
        icon=folium.Icon(color='blue')
    ).add_to(m)

    # HTML 저장
    m.save(filename)
    print(f"지도 저장 완료: {filename}")