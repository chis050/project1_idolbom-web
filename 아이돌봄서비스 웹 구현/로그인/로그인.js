// Supabase 설정
const supabaseUrl = 'https://kdmvxndklggzyynexiyu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtkbXZ4bmRrbGdnenl5bmV4aXl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2NDUxMjUsImV4cCI6MjA2MzIyMTEyNX0.iYwGk2isQQxzkvK51S99V21cOZowTooCyzM9jTqcK7U';
const db = supabase.createClient(supabaseUrl, supabaseKey);

document.addEventListener('DOMContentLoaded', () => {
    // 로그인 상태에 따라 UI 토글
    function updateAuthUI() {
        const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
        const loginLink = document.getElementById("login-link");
        const userInfo = document.getElementById("user-info");
        const userName = document.getElementById("user-name");

        if (loginLink && userInfo && userName) {
            if (isLoggedIn) {
                loginLink.style.display = "none";
                userInfo.style.display = "inline-block";
                userName.textContent = sessionStorage.getItem("nickname") || "사용자";
            } else {
                loginLink.style.display = "inline-block";
                userInfo.style.display = "none";
            }
        }
    }

    // 로그아웃 처리
    window.handleLogout = function () {
        sessionStorage.clear();
        updateAuthUI();
        window.location.reload();
    };

    // 로그인 처리
    const login = async (e) => {
        e.preventDefault();

        let id_input = document.getElementById("id");
        let pw_input = document.getElementById("pw");
        let { data: user, error } = await db
            .from('user')
            .select('*')
            .eq('login_id', id_input.value)
            .eq('pw', pw_input.value);

        if (user && user.length > 0) {
            sessionStorage.setItem("isLoggedIn", "true");
            sessionStorage.setItem("user_id", user[0].user_id);
            sessionStorage.setItem("login_id", user[0].login_id);
            sessionStorage.setItem("nickname", user[0].nickname);
            sessionStorage.setItem("role", user[0].role);
            sessionStorage.setItem('email',user[0].email);
            alert("로그인 성공!");
            window.location.href = '/메인페이지/메인페이지.html';
        } else {
            alert("아이디 또는 비밀번호가 잘못되었습니다.");
        }
    };

    // 로그인 버튼 이벤트 연결
    const loginBtn = document.getElementById("login_btn");
    if (loginBtn) {
        loginBtn.addEventListener("click", login);
    }

    // 비밀번호 보기/숨기기
    const pwInput = document.querySelector("#pw");
    const eyeIcon = document.querySelector("#eye img");

    const pwchange = () => {
        if (pwInput.type === "password") {
            pwInput.type = "text";
            eyeIcon.src = "../로그인/img/eyeClose.png"; // 비밀번호 보임 상태일 때 이미지
            eyeIcon.alt = "비밀번호 숨기기";
        } else {
            pwInput.type = "password";
            eyeIcon.src = "../로그인/img/eyeOpen.png"; // 비밀번호 숨김 상태일 때 이미지
            eyeIcon.alt = "비밀번호 보기";
        }
    };

    eyeIcon.addEventListener("click", pwchange);

});