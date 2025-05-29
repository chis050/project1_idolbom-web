const supabaseUrl = 'https://kdmvxndklggzyynexiyu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtkbXZ4bmRrbGdnenl5bmV4aXl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2NDUxMjUsImV4cCI6MjA2MzIyMTEyNX0.iYwGk2isQQxzkvK51S99V21cOZowTooCyzM9jTqcK7U';
const db = supabase.createClient(supabaseUrl, supabaseKey);

document.addEventListener('click', function (e) {
    if (e.target.classList.contains('menu-item')) {
        const redirect = e.target.dataset.redirect;
        if (redirect) {
            window.location.href = redirect;
            return;
        }

        document.querySelectorAll('.menu-item').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.content-tab').forEach(tab => tab.classList.remove('active'));
        e.target.classList.add('active');
        const targetId = e.target.dataset.target;
        const targetTab = document.getElementById(targetId);
        if (targetTab) targetTab.classList.add('active');
    }
});

// 마이페이지 들어가면 로그인 정보에 따라서 id, email, nickname 변환
document.addEventListener('DOMContentLoaded', async () => {
    const user_id = sessionStorage.getItem('user_id');

    if (!user_id) {
        alert('로그인이 필요합니다 !')
        window.location.href = "/로그인/로그인.html";
        return;
    }
    let { data: user, error } = await db
        .from('user')
        .select("*")
        .eq('user_id', user_id);

    if (user && user.length > 0) {
        document.getElementById('id').textContent = user[0].user_name;
        document.getElementById('email').textContent = user[0].email;
        document.getElementById('email2').textContent = user[0].email;
        document.getElementById('nickname').textContent = user[0].nickname;
    }

})