
let isAdminVerified = false;
let selectedBoard = '';

const dropdownBtn = document.querySelector('.dropdown-btn');
const dropdownList = document.querySelector('.dropdown-list');

dropdownBtn.addEventListener('click', () => {
    dropdownList.classList.toggle('show');
});

document.querySelectorAll('.dropdown-list div').forEach(item => {
    item.addEventListener('click', () => {
        const selected = item.textContent;
        if (selected === '공지사항') {
            selectedBoard = selected;
            openAdminModal();
        } else {
            isAdminVerified = true;
            dropdownBtn.textContent = selected;
            dropdownList.classList.remove('show');
        }
    });
});

document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown')) {
        dropdownList.classList.remove('show');
    }
});

const quill = new Quill('#editor', {
    theme: 'snow',
    modules: { toolbar: '#toolbar' },
    placeholder: '내용을 입력해주세요...'
});

function goBack() {
    window.history.back();
}

function submitPost() {
    const board = dropdownBtn.textContent;
    const title = document.querySelector('.title-input').value;
    const content = quill.root.innerHTML;
    const writer = "사용자id"; // 실제 사용자 ID로 변경 필요
    const date = new Date().toISOString().split('T')[0];
    const files = document.getElementById('fileInput').files;

    if (board === '공지사항' && !isAdminVerified) {
        alert("공지사항은 관리자만 작성할 수 있습니다.");
        return;
    }

    if (board === '게시판을 선택해주세요' || !title.trim() || !content.trim()) {
        alert("모든 항목을 입력해주세요.");
        return;
    }

    const fileNames = [];
    for (let i = 0; i < files.length; i++) {
        fileNames.push(files[i].name);
    }



    alert("글이 성공적으로 작성되었습니다!");
    const postId = Date.now(); // 고유 ID 생성
    const newPost = { id: postId, title, date, writer, content, files: fileNames, notice: board === '공지사항' };
    localStorage.setItem(`post-${postId}`, JSON.stringify(newPost));

    const postIndex = JSON.parse(localStorage.getItem("posts") || "[]");
    postIndex.unshift(postId);
    localStorage.setItem("posts", JSON.stringify(postIndex));

    window.location.href = "자유게시판.html";
    quill.setText(''); // 에디터 초기화


}

function openAdminModal() {
    document.getElementById('admin-modal').style.display = 'block';
    document.getElementById('admin-password').value = '';
    document.getElementById('admin-password').type = 'password';
}

function closeAdminModal() {
    document.getElementById('admin-modal').style.display = 'none';
    selectedBoard = '';
}

function confirmAdminPassword() {
    const pw = document.getElementById('admin-password').value;
    if (pw === '12345678*') {
        isAdminVerified = true;
        dropdownBtn.textContent = selectedBoard;
        dropdownList.classList.remove('show');
        closeAdminModal();
    } else {
        alert('비밀번호가 틀렸습니다.');
    }
}

document.getElementById('toggle-password').addEventListener('click', () => {
    const pwField = document.getElementById('admin-password');
    pwField.type = pwField.type === 'password' ? 'text' : 'password';
});



