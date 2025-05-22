
let caregivers = [];
let filteredData = [];
let renderedCount = 0;
const batchSize = 6;

function renderCaregivers(data, append = false) {
  const container = document.getElementById('results');
  if (!append) {
    container.innerHTML = '';
    renderedCount = 0;
  }

  const batch = data.slice(renderedCount, renderedCount + batchSize);
  batch.forEach(cg => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h3>${cg.name} <small style="font-weight:normal; font-size:14px; color:#666;">(${cg.gender})</small></h3>
      <p><strong>지역:</strong> ${cg.region}</p>
      <p><strong>유형:</strong> ${cg.type}</p>
      <p><strong>국적:</strong> ${cg.nationality}</p>
      <p><strong>경력:</strong> ${cg.experience}년</p>
      <p><strong>소개:</strong> ${cg.desc}</p>
      <p class="rating">⭐ ${cg.rating.toFixed(1)}</p>
      <span class="tag">#${cg.type}</span>
    `;
    container.appendChild(card);
  });

  renderedCount += batch.length;
}

function searchCaregivers() {
  const keyword = document.getElementById('searchInput').value.trim();
  const region = document.getElementById('regionFilter').value;
  const type = document.getElementById('typeFilter').value;
  const nationality = document.getElementById('nationalityFilter').value;

  filteredData = caregivers.filter(cg => {
    return (
      (keyword === '' || cg.name.includes(keyword) || cg.desc.includes(keyword)) &&
      (region === '' || cg.region === region) &&
      (type === '' || cg.type === type) &&
      (nationality === '' || cg.nationality === nationality)
    );
  });

  renderCaregivers(filteredData);
}

window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10 && renderedCount < filteredData.length) {
    renderCaregivers(filteredData, true);
  }
});

window.onload = () => {
  fetch('random_caregivers.json')
    .then(res => res.json())
    .then(data => {
      caregivers = data;
      filteredData = [...caregivers];
      renderCaregivers(filteredData);

      // 초기 로딩 시 화면을 채울 만큼 반복적으로 렌더링
      const checkScrollAndRender = () => {
        if (
          window.innerHeight + window.scrollY >= document.body.offsetHeight - 10 &&
          renderedCount < filteredData.length
        ) {
          renderCaregivers(filteredData, true);
          // 재귀 호출
          setTimeout(checkScrollAndRender, 100);
        }
      };

      setTimeout(checkScrollAndRender, 100);
    })
    .catch(err => {
      console.error("데이터 로딩 실패:", err);
      document.getElementById('results').innerHTML = "<p style='text-align:center;'>데이터를 불러오지 못했습니다.</p>";
    });
};
