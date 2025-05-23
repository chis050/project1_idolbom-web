window.addEventListener('DOMContentLoaded', () => {
  // 이름 쓸 때 특수문자 제거하기
  document.getElementById('user_name')?.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣ\s]/g, "")
  });

  // 주민등록번호 글자 수 제한하기
  document.getElementById("rrn")?.addEventListener("input", function () {
    let val = this.value.replace(/[^0-9]/g, "");
    if (val.length > 6) {
      this.value = val.slice(0, 6) + "-" + val.slice(6, 13);
    } else {
      this.value = val;
    }
  });

  // 로그인 아이디 유형 제한하기
  document.getElementById("login_id")?.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^a-z0-9]/g, "");
  });

  // 비밀번호 체크하기
  const pwInput = document.getElementById('pw');
  const confirmInput = document.getElementById('confirm-password');
  const message = document.getElementById('pw_message');

  function checkPasswordMatch() {
    if (!confirmInput.value) {
      message.textContent = '';
      return;
    }

    if (pwInput.value === confirmInput.value) {
      message.textContent = '비밀번호가 일치합니다.';
      message.style.color = 'green';
    } else {
      message.textContent = '비밀번호가 일치하지 않습니다.';
      message.style.color = 'red';
    }
  }

  pwInput?.addEventListener('input', checkPasswordMatch);
  confirmInput?.addEventListener('input', checkPasswordMatch);

  // 이메일 아이디 특수문자 제거
  document.getElementById("email")?.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^a-z0-9A-Z]/g, "")
  });

  // 이메일 도메인 설정
  const domainSelect = document.getElementById('domain-select');
  const domainInput = document.getElementById('email-domain');

  domainSelect?.addEventListener('change', function () {
    const selected = this.value;
    if (selected === 'custom') {
      domainInput.value = '';
      domainInput.readOnly = false;
    } else {
      domainInput.value = selected;
      domainInput.readOnly = true;
    }
  });

  domainSelect?.dispatchEvent(new Event('change'));

  // 핸드폰 번호 형식 제한
  document.getElementById("phone")?.addEventListener('input', (e) => {
    let val = e.target.value.replace(/[^0-9]/g, "");
    if (val.length <= 3) {
      e.target.value = val;
    } else if (val.length <= 7) {
      e.target.value = val.slice(0, 3) + "-" + val.slice(3);
    } else {
      e.target.value = val.slice(0, 3) + "-" + val.slice(3, 7) + "-" + val.slice(7, 11);
    }
  });
});
