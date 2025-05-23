// '회원탈퇴' 입력 확인 후 탈퇴 처리
document.querySelector('#withdraw-checkBtn').addEventListener('click', () => {
    const withdrawText = document.getElementById('withdraw-text').value.trim();

    if (withdrawText === '') {
        alert("회원탈퇴를 입력해주세요.");
        return;
    } else if (withdrawText !== '회원탈퇴') {
        alert("정확하게 '회원탈퇴'를 입력해주세요.");
        return;
    } else {
        alert("회원탈퇴 입력이 완료되었습니다.");
        document.querySelector('.withdraw-agree').style.display = 'block';
        document.querySelector('.withdraw-button').style.display = 'block';
        document.querySelector('#withdraw-checkBtn').style.display = 'none';
        document.getElementById('withdraw-text').disabled = true;
    }

});



document.querySelector('.withdraw-button').addEventListener('click', () => {
    const agreeChecked = document.querySelector('.withdraw-agree input[type="checkbox"]').checked;

    if (!agreeChecked) {
        alert("회원 탈퇴 동의에 체크해주세요.");
    } else {
        alert("회원 탈퇴가 완료되었습니다.");
        window.location.href = '메인화면.html';
    }


})

