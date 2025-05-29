# pip install captcha
import os
import random   
import string
from captcha.image import ImageCaptcha

save_dir = 'C:\\Users\\smhrd\\Desktop\\핵심프로젝트 웹 구현\\핵심프로젝트\\아이돌봄서비스 웹 구현\\회원가입\\captcha_img'
image = ImageCaptcha(width=160, height=90)

txt_captcha  = {
    0: 'OL99DWM',
    1: 'A7PXQRK',
    2: 'B1L8V6Z',
    3: 'C4N2F3H',
    4: 'D5M9T8J',
    5: 'E3K7Y1Q',
    6: 'F2R5X4S',
    7: 'G6H8J0L',
    8: 'H9P1W3Z',
    9: 'I0Q2T5V',
    10: 'J8L4N6B'
}

for i in range(len(txt_captcha)):
    # txt_captcha = ''.join(random.choices(string.ascii_letters + string.digits, k=7))
    code = txt_captcha[i]
    file_path = os.path.join(save_dir, f'captcha_{i}.png')  # 경로 + 파일명 결합
    image.write(code, file_path)

# txt_captcha = '3ck8Bei'
image.generate(txt_captcha)
image.write(txt_captcha, 'captcha_result.png')

