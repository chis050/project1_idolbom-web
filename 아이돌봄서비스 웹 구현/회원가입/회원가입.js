// Supabase 설정
const supabaseUrl = 'https://kdmvxndklggzyynexiyu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtkbXZ4bmRrbGdnenl5bmV4aXl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2NDUxMjUsImV4cCI6MjA2MzIyMTEyNX0.iYwGk2isQQxzkvK51S99V21cOZowTooCyzM9jTqcK7U';
const db = supabase.createClient(supabaseUrl, supabaseKey);

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signupForm');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // 2. 입력값 수집
        const username = document.getElementById('user_name').value;
        const rrn = document.getElementById('rrn').value;
        const login_id = document.getElementById('login_id').value;
        const password = document.getElementById('pw').value;
        const emailId = document.getElementById('email').value;
        const emailDomain = document.getElementById('email-domain').value;
        const phone = document.getElementById('phone').value;
        const fullEmail = `${emailId}@${emailDomain}`;

        // 4. Supabase에 회원 데이터 저장
        const { data, error } = await db.from('user').insert([
            {
                user_name: username,
                rrn: rrn,
                login_id: login_id,
                pw: password,
                email: fullEmail,
                phone: phone,
                nickname: login_id
            }
        ]);

        if (error) {
            alert('회원가입 실패: ' + error.message);
        } else {
            alert('회원가입 성공!');
            // 필요 시 리다이렉트
            // window.location.href = '로그인화면.html';
            window.location.href = "../로그인/로그인.html"
        }
    });
});
