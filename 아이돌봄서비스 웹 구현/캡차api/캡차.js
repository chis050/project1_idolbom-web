// 1. 이미지 번호 → 정답 문자열 매핑
const captchaAnswers = {
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
};

let currentIndex = 0;
function loadCaptchaImage() {
  currentIndex = Math.floor(Math.random() * Object.keys(captchaAnswers).length);
  const img = document.getElementById('captcha_img');
  img.src = `./captcha_img/captcha_${currentIndex}.png`;
}

function verifyCaptchaInput() {
  const userInput = document.getElementById('captcha_input').value.trim().toUpperCase();
  const correctAnswer = captchaAnswers[currentIndex];

  if (userInput === correctAnswer) {
    alert("✅ 인증 성공!");
    // 다음 단계로 진행...
  } else {
    alert("❌ 인증 실패. 다시 입력하세요.");
    document.getElementById('captcha_input').value = '';
    loadCaptchaImage();
  }
}

document.getElementById('verify_btn').addEventListener('click', verifyCaptchaInput);
window.addEventListener('DOMContentLoaded', () => {
  loadCaptchaImage();
});

// 2. 자체 캡차 인증
// let currentCaptcha = "";

// // 캡차 문자열 생성
// function generateCaptcha(length = 6) {
//     const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
//     let code = '';
//     for (let i = 0; i < length; i++) {
//         code += chars.charAt(Math.floor(Math.random() * chars.length));
//     }
//     return code;
// }

// // 캡차 캔버스에 그리기
// function drawCaptcha(code) {
//     const canvas = document.getElementById('captcha_canvas');
//     const ctx = canvas.getContext('2d');
//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     // 배경
//     ctx.fillStyle = "#eafaf1";
//     ctx.fillRect(0, 0, canvas.width, canvas.height);

//     // 문자
//     ctx.font = "32px Verdana";
//     ctx.fillStyle = "#388e3c";
//     ctx.textBaseline = "middle";
//     ctx.textAlign = "center";
//     ctx.fillText(code, canvas.width / 2, canvas.height / 2);

//     // 노이즈(선)
//     for (let i = 0; i < 4; i++) {
//         ctx.strokeStyle = "#7DCD8C";
//         ctx.beginPath();
//         ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
//         ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
//         ctx.stroke();
//     }
// }

// // 캡차 새로고침
// function refreshCaptcha() {
//     currentCaptcha = generateCaptcha();
//     drawCaptcha(currentCaptcha);
// }

// let captchaPassed = false;

// // 캡차 검증
// function verifyCaptcha() {
//     const userInput = document.getElementById('captcha_input').value.trim().toUpperCase();
//     if (userInput === currentCaptcha) {
//         alert("캡차가 일치합니다!");
//         captchaPassed = true;
//     } else {
//         alert("문자가 동일하지 않습니다. 다시 시도해주세요.");
//         captchaPassed = false;
//         refreshCaptcha();
//         document.getElementById('captcha_input').value = "";
//     }
// }

// // 이벤트 연결
// window.addEventListener('DOMContentLoaded', () => {
//     refreshCaptcha();
//     document.getElementById('refresh_captcha').addEventListener('click', (e) => {
//         e.preventDefault();
//         refreshCaptcha();
//     });
//     document.getElementById('verify_captcha').addEventListener('click', (e) => {
//         e.preventDefault();
//         verifyCaptcha();
//     });
//     document.getElementById('signupForm').addEventListener('submit', function(e) {
//         if (!captchaPassed) {
//             alert("캡차를 먼저 통과해야 합니다.");
//             e.preventDefault();
//         }
//     });
// });