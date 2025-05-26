// 캐릭터 애니메이션
function shootStars(e) {
  const sparkleCount = 6;
  const shootingCount = 3;
  for (let i = 0; i < sparkleCount; i++) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    document.body.appendChild(sparkle);
    sparkle.style.left = `${e.clientX + (Math.random() - 0.5) * 80}px`;
    sparkle.style.top = `${e.clientY}px`;
    sparkle.style.animationDelay = `${Math.random() * 0.3}s`;
    setTimeout(() => sparkle.remove(), 1600);
  }
  for (let i = 0; i < shootingCount; i++) {
    const star = document.createElement('div');
    star.className = 'shooting-star';
    document.body.appendChild(star);
    star.style.left = `${e.clientX + (Math.random() - 0.5) * 60}px`;
    star.style.top = `${e.clientY}px`;
    star.style.animationDelay = `${Math.random() * 0.2}s`;
    setTimeout(() => star.remove(), 1200);
  }
}

// 로그인/로그아웃 처리
function handleServiceClick(type) {
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
  if (!isLoggedIn) {
    alert('로그인이 필요합니다. 로그인 페이지로 이동합니다.');
    window.location.href = `../로그인/로그인.html?redirect=${encodeURIComponent(window.location.href)}`;
    return;
  } 
  window.location.href = `../돌봄서비스 신청(돌보미 찾기)/ex돌보미찾기1.html`
  // window.location.href = `../아이돌봄서비스신청/아이돌봄서비스신청.html?type=${type}`;
  // if (type === 'applyService') {
  //   window.location.href = encodeURI('../아이돌봄서비스신청/아이돌봄서비스신청.html');
  // } else if (type === 'applySitter') {
  //   window.location.href = encodeURI('../아이돌보미신청/아이돌보미신청.html');
  // }
}

// // ✅ 로그인 상태에 따라 UI 업데이트
window.addEventListener('#main', () => {
  const isLoggedIn = sessionStorage.setItem('isLoggedIn') === 'true';
  const loginLink = document.getElementById('login-link');
  const userInfo = document.getElementById('user-info');
  const userName = document.getElementById('user-name');

  if (isLoggedIn) {
    loginLink.style.display = 'none';
    userInfo.style.display = 'flex';
    userName.textContent = sessionStorage.getItem("nickname") || "사용자";
  } else {
    loginLink.style.display = 'block';
    userInfo.style.display = 'none';
  }
});

function handleLogout() {
  // sessionStorage.clear();
  sessionStorage.removeItem('isLoggedIn');
  sessionStorage.removeItem('username');
  window.location.reload(); // 다시 로드해서 UI 리셋
}


// ✅ 전역 등록 (onclick 속성에서 쓸 수 있게)
window.setLanguage = setLanguage;
function setLanguage(lang) {
  if (lang === 'kr') {
    applyKorean();
  } else if (lang === 'en') {
    applyEnglish();
  } else if (lang === 'cn') {
    alert('중국어는 현재 지원되지 않습니다.');
  }
  document.getElementById('languageDropdown').classList.add('hidden');
}

// ✅ DOM 로드 후 버튼 이벤트 연결
document.addEventListener('DOMContentLoaded', () => {
  const dropdown = document.getElementById('languageDropdown');
  const btn = document.getElementById('translateBtn');

  btn.addEventListener('click', () => {
    dropdown.classList.toggle('hidden');
  });
});



