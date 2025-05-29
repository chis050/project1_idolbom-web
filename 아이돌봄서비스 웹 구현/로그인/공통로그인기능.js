document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
  const loginLink = document.getElementById("login-link");
  const userInfo = document.getElementById("user-info");
  const userName = document.getElementById("user-name");

  if (loginLink && userInfo && userName) {
    if (isLoggedIn) {
      loginLink.style.display = "none";
      userInfo.style.display = "block";
      userName.textContent = sessionStorage.getItem("nickname") || "사용자";
    } else {
      loginLink.style.display = "block";
      userInfo.style.display = "none";
    }
  }
});

// 로그아웃 버튼에서 호출될 함수
window.handleLogout = function () {
  sessionStorage.clear();
  location.reload(); // 또는 window.location.href = '메인페이지.html'
};
