// Supabase 설정
const supabaseUrl = 'https://kdmvxndklggzyynexiyu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtkbXZ4bmRrbGdnenl5bmV4aXl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2NDUxMjUsImV4cCI6MjA2MzIyMTEyNX0.iYwGk2isQQxzkvK51S99V21cOZowTooCyzM9jTqcK7U';
const db = supabase.createClient(supabaseUrl, supabaseKey);

document.addEventListener('DOMContentLoaded', () => {
    // 아이디 비밀번호 입력해서 db에 있으면 로그인 성공하게 하기
    const login = async (e) => {
        e.preventDefault(); // 폼 제출(새로고침) 막기

        // 아이디, 비밀번호 입력받은거 저장
        let id_input = document.getElementById("id");
        let pw_input = document.getElementById("pw");
        let { data: user, error } = await db
            .from('user')
            .select('*')
            .eq('login_id', id_input.value)
            .eq('pw', pw_input.value);

        // login_id와 pw가 일치하면 로그인성공시키기
        if (user.length > 0) {
            sessionStorage.setItem("isLoggedIn", "true");         // 로그인 시키기
            sessionStorage.setItem("user_id", user[0].user_id);   // 브라우저에 닉네임 저장
            sessionStorage.setItem("login_id", user[0].login_id); // 브라우저에 비밀번호 저장(원래는 보안상 안씀)
            sessionStorage.setItem("nickname", user[0].nickname); // 닉네임 헤더에서 보여줄려고 저장
            window.location.href = '../메인페이지/메인화면.html';
        } else {
            alert("아이디 또는 비밀번호가 잘못되었습니다.")
        }


    }
    document.getElementById("login_btn").addEventListener("click", login)
});
