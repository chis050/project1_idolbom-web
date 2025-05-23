# pip install captcha
import os
import random   
import string
from captcha.image import ImageCaptcha

save_dir = 'C:\\Users\\smhrd\\Desktop\\핵심프로젝트 웹 구현\\핵심프로젝트\\아이돌봄서비스 웹 구현\\회원탈퇴\\captcha_img'
image = ImageCaptcha(width=160, height=90)

for i in range(50):
    txt_captcha = ''.join(random.choices(string.ascii_letters + string.digits, k=7))
    file_path = os.path.join(save_dir, f'captcha_{i}.png')  # 경로 + 파일명 결합
    image.write(txt_captcha, file_path)

# txt_captcha = '3ck8Bei'
# image.generate(txt_captcha)
# image.write(txt_captcha, 'captcha_result.png')

