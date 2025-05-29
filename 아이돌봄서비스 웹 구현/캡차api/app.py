from flask import Flask, render_template, request, session, redirect, url_for, jsonify
from captcha.image import ImageCaptcha
import random, string, io, base64

app = Flask(__name__)
app.secret_key = 'your-secret-key'  # session 사용을 위한 필수

# 캡차 이미지 생성
def generate_captcha():
    captcha_text = ''.join(random.choices(string.ascii_letters + string.digits, k=6))
    image = ImageCaptcha(width=160, height=60)
    data = image.generate(captcha_text)

    session['captcha'] = captcha_text  # 정답 저장
    return base64.b64encode(data.read()).decode('utf-8')  # base64 문자열로 변환

@app.route('/')
def index():
    return render_template('captcha_page.html')  # HTML은 아래에 설명

@app.route('/get_captcha')
def get_captcha():
    img_base64 = generate_captcha()
    return jsonify({ 'image': img_base64 })

@app.route('/verify', methods=['POST'])
def verify():
    user_input = request.form.get('captcha_input')
    if user_input and user_input.lower() == session.get('captcha', '').lower():
        return '인증 성공'
    else:
        return '인증 실패'
