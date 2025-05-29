
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

const supabaseClient = supabase.createClient(
  'https://kdmvxndklggzyynexiyu.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtkbXZ4bmRrbGdnenl5bmV4aXl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2NDUxMjUsImV4cCI6MjA2MzIyMTEyNX0.iYwGk2isQQxzkvK51S99V21cOZowTooCyzM9jTqcK7U'
);

async function submitPost() {
    const board = dropdownBtn.textContent;
    const title = document.querySelector('.title-input').value;
    const content = quill.getText().trim();
    const writer = "사용자id"; // 실제 로그인 정보로 대체
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

    const { data, error } = await supabaseClient
        .from('posts')
        .insert([
            {
                board: board,
                title: title,
                content: content,
                writer: writer,
                created_at: date,
                notice: board === '공지사항'
            }
        ]);

    if (error) {
        console.error('에러:', error);
        alert('글 등록에 실패했습니다.');
    } else {
        alert("글이 성공적으로 등록되었습니다!");
        window.location.href = "자유게시판.html";
    }

    quill.setText('');
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



