// 일정 데이터 받아오기 예시 (임시 더미 데이터)
const dummyEvents = [
  {
    date: '2025-05-23',
    name: '김호랑',
    age: 4,
    address: '서울시 강남구 테헤란로 203',
    notes: '아이가 장난감에 집착해요.',
    time: '17:00 - 20:00',
    avatar: '🦁'
  },
  {
    date: '2025-05-27',
    name: '최토끼',
    age: 7,
    address: '서울시 강서구 공항대로 200',
    notes: '케이크 유혹에 약해요.',
    time: '14:00 - 17:00',
    avatar: '🐰'
  }
];

window.addEventListener('DOMContentLoaded', () => {
  const listEl = document.getElementById('event-list');

  dummyEvents.forEach(event => {
    const card = document.createElement('div');
    card.className = 'event-card';
    card.innerHTML = `
      <div><strong class="avatar">${event.avatar}</strong> <strong>${event.name}</strong> (${event.age}세)</div>
      <div><strong>일정:</strong> ${event.date} ${event.time}</div>
      <div><strong>주소:</strong> ${event.address}</div>
      <div><strong>유의사항:</strong> ${event.notes}</div>
    `;
    listEl.appendChild(card);
  });
});
