// Supabase 설정
const supabaseUrl = 'https://kdmvxndklggzyynexiyu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtkbXZ4bmRrbGdnenl5bmV4aXl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2NDUxMjUsImV4cCI6MjA2MzIyMTEyNX0.iYwGk2isQQxzkvK51S99V21cOZowTooCyzM9jTqcK7U';
const db = supabase.createClient(supabaseUrl, supabaseKey);

// '회원탈퇴' 입력 확인
document.querySelector('#withdraw-checkBtn').addEventListener('click', () => {

    const withdrawText = document.getElementById('withdraw-text').value.trim();
    const agreeChecked = document.querySelector('.withdraw-agree input[type="checkbox"]').checked;

    if (withdrawText === '') {
        alert("'회원탈퇴'를 입력해주세요.");
    } else if (withdrawText !== '회원탈퇴') {
        alert("'회원탈퇴'를 정확하게 입력해주세요.");
    } else {
        // alert("회원탈퇴 입력이 완료되었습니다.");
        document.querySelector('.withdraw-agree').style.display = 'block';
        document.querySelector('.withdraw-button').style.display = 'block';
        document.querySelector('#withdraw-checkBtn').style.display = 'none';
        document.getElementById('withdraw-text').disabled = true;
    }



});

// '회원탈퇴' 동의 버튼 클릭
document.querySelector('.withdraw-button').addEventListener('click', async () => {

    const withdrawText = document.getElementById('withdraw-text').value.trim();
    const agreeChecked = document.querySelector('.withdraw-agree input[type="checkbox"]').checked;
    const user_id = sessionStorage.getItem('user_id')

    if (!agreeChecked) {
        alert("회원 탈퇴 동의에 체크해주세요.");
        return;
    } else if (withdrawText === '' && withdrawText !== '회원탈퇴') {
        alert("회원탈퇴 입력을 완료해주세요.");
    } else {
        const { error } = await db
            .from('user')
            .delete()
            .eq('user_id', user_id)
        sessionStorage.clear()
        alert("회원 탈퇴가 완료되었습니다.");

        window.location.href = '/메인페이지/메인페이지.html';
    }
});


// 기타(직접 입력) 체크 시 모달창 띄우기 및 입력 처리
// 1. 모달 HTML을 body에 추가
const modalHtml = `
<div id="customReasonModal" style="display:none; position:fixed; left:0; top:0; width:100vw; height:100vh; background:rgba(0,0,0,0.3); z-index:9999; align-items:center; justify-content:center;">
  <div style="background:#fff; border-radius:10px; padding:30px 24px; min-width:300px; box-shadow:0 2px 16px rgba(0,0,0,0.15); text-align:center;">
    <h3 style="margin-bottom:18px;">탈퇴 사유를 입력해주세요</h3>
    <input type="text" id="customReasonInput" style="width:90%; padding:10px; border-radius:6px; border:1px solid #ccc; margin-bottom:18px;" placeholder="탈퇴 사유 입력">
    <br>
    <button id="customReasonSubmit" style="background:#7DCD8C; color:#fff; border:none; border-radius:6px; padding:8px 22px; font-size:1rem; cursor:pointer;">입력</button>
  </div>
</div>
`;
document.body.insertAdjacentHTML('beforeend', modalHtml);

// 2. 체크박스 이벤트 연결
document.getElementById('checkbox5').addEventListener('change', function () {
    if (this.checked) {
        document.getElementById('customReasonModal').style.display = 'flex';
        document.getElementById('customReasonInput').focus();
    }
});

// 3. 입력 버튼 이벤트
document.getElementById('customReasonSubmit').addEventListener('click', function () {
    const reason = document.getElementById('customReasonInput').value.trim();
    if (reason === '') {
        alert('탈퇴 사유를 입력해주세요.');
        document.getElementById('customReasonInput').focus();
        return;
    }
    // 모달 닫기
    document.getElementById('customReasonModal').style.display = 'none';
});



