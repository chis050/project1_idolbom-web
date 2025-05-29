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
  const role = sessionStorage.getItem('role');
  if (!isLoggedIn) {
    alert('로그인이 필요합니다. 로그인 페이지로 이동합니다.');
    window.location.href = `../로그인/로그인.html?redirect=${encodeURIComponent(window.location.href)}`;
    return;
  }

  // type에 따라 고정된 링크로 이동
  if (type === 'parent') {
    window.location.href = '/돌봄서비스 신청(캘린더에서 날짜 선택)/ex돌보미신청정보.html';
  } else if (type === 'sitter') {
    window.location.href = '/돌보미신청(돌보미 서류제출)/돌보미신청(돌보미서류제출).html';
  }
}

// role에 따라 마이페이지 링크 설정
function setMyPageLink() {
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
  const role = sessionStorage.getItem('role');
  const myPageLink = document.getElementById('user_link');

  if (!myPageLink) return;

  if (isLoggedIn) {
    if (role === '1') {
      myPageLink.href = '/마이페이지(사용자)/마이페이지(사용자).html';
    } else if (role === '2') {
      myPageLink.href = '/마이페이지(돌보미)/마이페이지(돌보미).html';
    }
  } else {
    myPageLink.href = '/로그인/로그인.html';
  }
}

// 예시: DOMContentLoaded 또는 로그인/로그아웃 직후
document.addEventListener('DOMContentLoaded', setMyPageLink);

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