// 로그인 상태 체크
function isUserLoggedIn() {
    return localStorage.getItem('authToken') !== null;
}

// 페이지 로딩 시 UI 업데이트
function updateUIBasedOnLogin() {
    const loginLink = document.getElementById('login-link');
    const userInfo = document.getElementById('user-info');
    const userNameElement = document.getElementById('user-name');

    if (isUserLoggedIn()) {
        const userData = JSON.parse(localStorage.getItem('userData'));
        userNameElement.textContent = userData?.name || "사용자";

        loginLink.style.display = "none";
        userInfo.style.display = "flex"; // 또는 block
    } else {
        loginLink.style.display = "block";
        userInfo.style.display = "none";
    }
}

// 로그아웃 처리
function handleLogout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    updateUIBasedOnLogin();
}

// 페이지 처음 로드될 때 실행
window.onload = function () {
    updateUIBasedOnLogin();
}

// 로그인 성공 시 (예: 로그인.html 페이지에서)
localStorage.setItem('authToken', '토큰_예시');
localStorage.setItem('userData', JSON.stringify({ name: "내향아이들" }));
window.location.href = "../메인페이지/메인화면.html";