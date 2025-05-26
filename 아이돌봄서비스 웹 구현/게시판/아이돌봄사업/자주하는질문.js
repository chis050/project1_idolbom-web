// 카테고리 필터 함수
function filterCategory(category) {
  const rows = document.querySelectorAll('.faq-table tbody tr');
  rows.forEach(row => {
    const rowCategory = row.children[1].innerText;
    if (category === '전체' || rowCategory === category) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });

  // 버튼 상태 업데이트
  const buttons = document.querySelectorAll('.category-btn');
  buttons.forEach(btn => {
    if (btn.innerText === category) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

// 검색 기능
function handleFaqSearch(event) {
  event.preventDefault();
  const keyword = document.getElementById('faqSearchInput').value.trim().toLowerCase();
  const rows = document.querySelectorAll('.faq-table tbody tr');

  rows.forEach(row => {
    const question = row.children[2].innerText.toLowerCase();
    if (question.includes(keyword)) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
}