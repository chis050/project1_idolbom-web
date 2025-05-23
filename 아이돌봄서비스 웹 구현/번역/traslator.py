from google.cloud import translate_v2 as translate
import os

# 키 파일 연결
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "./API_keys/cloud-translation-api-460602-44b8e5e25ec7.json"

# 클라이언트 객체 생성
client = translate.Client()

# 번역 함수 정의
def translate_html(text, target_language='ko'):
    result = client.translate(
        text,
        target_language=target_language,
        format_='html',  # 중요: HTML 태그 유지
        # source_language='auto'  # 자동 언어 감지
    )
    return result['translatedText']

# 사용 예시
html_text = "<p>Hello, <b>world!</b> Welcome to our service.</p>"
translated = translate_html(html_text, target_language='ko')
print(translated)