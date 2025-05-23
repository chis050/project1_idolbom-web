from flask import Flask, request, jsonify
from flask_cors import CORS
from google.cloud import translate_v2 as translate
import os

app = Flask(__name__)
CORS(app)

# Google Cloud API 키 파일 경로 설정
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "C:/Users/smhrd/Desktop/API키/cloud-translation-api-460602-44b8e5e25ec7.json"

# # Google Translate 클라이언트 생성
client = translate.Client()

@app.route('/')
def home():
    return 'Flask 번역 서버가 실행 중입니다.'

# @app.route('/translate', methods=['POST'])
# def translate_text():

#     data = request.get_json()
#     text = data['text']
#     target_lang = data['lang']

#     result = client.translate(
#         text,
#         target_language=target_lang,
#         format_='html'  # HTML 태그 유지
#     )

#     return jsonify({'translated': result['translatedText']})

@app.route('/translate', methods=['POST'])
def translate_text():
    data = request.get_json()
    texts = data['text']  # 리스트로 받음
    target_lang = data['lang']

    results = []
    for text in texts:
        translated = client.translate(
            text,
            target_language=target_lang,
            format_='text'
        )
        results.append(translated['translatedText'])

    return jsonify({'translated': results})

if __name__ == '__main__':  
   app.run('0.0.0.0', port=5000, debug=True)