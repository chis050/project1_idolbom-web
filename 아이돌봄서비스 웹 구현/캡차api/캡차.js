function generateSecurityCode(length = 7) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

function showSecurityPrompt(callback) {
    const code = generateSecurityCode();
    const userInput = prompt(`아래 보안 코드를 입력해주세요:\n\n[ ${code} ]`);
    if (userInput === null) {
        callback(false);
        return;
    }

    const isCorrect = userInput.toUpperCase() === code;
    if (!isCorrect) {
        alert("보안 코드가 일치하지 않습니다.");
    }
    callback(isCorrect);
}


document.querySelector('.withdraw-button').addEventListener('click', () => {
    const passwordInput = document.querySelector('input[type="text"]').value;
    const agreeChecked = document.querySelector('.withdraw-agree input[type="checkbox"]').checked;

    if (!passwordInput) {
        alert("보안 코드를 입력해주세요.");
        return;
    }

    if (!agreeChecked) {
        alert("회원 탈퇴 동의에 체크해주세요.");
        return;
    }

    showSecurityPrompt((success) => {
        if (success) {
            alert("회원 탈퇴가 완료되었습니다.");
            window.location.href = '메인화면.html';
        }
    });
});

function refreshCaptcha() {
    document.getElementById("captcha-image").src = "/captcha?" + new Date().getTime();
}

function submitCaptcha() {
    const input = document.getElementById("captcha-input").value;
    fetch('/captcha/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `userInput=${encodeURIComponent(input)}`
    }).then(res => {
        if (res.ok) alert("검증 성공!");
        else alert("틀렸습니다.");
    });
}