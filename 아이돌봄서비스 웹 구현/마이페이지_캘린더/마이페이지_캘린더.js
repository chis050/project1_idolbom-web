// Supabase 설정
const supabaseUrl = 'https://kdmvxndklggzyynexiyu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtkbXZ4bmRrbGdnenl5bmV4aXl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2NDUxMjUsImV4cCI6MjA2MzIyMTEyNX0.iYwGk2isQQxzkvK51S99V21cOZowTooCyzM9jTqcK7U';
const db = supabase.createClient(supabaseUrl, supabaseKey);

document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
        },
        initialDate: new Date,
        navLinks: true, // can click day/week names to navigate views
        businessHours: true, // display business hours
        editable: true,
        selectable: true,
        events: [
            // 이벤트 부분에 db에서 연동해줘야 함 지금은 더미데이터
            {
                title: '🦁 김호랑 (4세)',
                start: '2025-05-23T17:00:00',
                end: '2025-05-23T20:00:00',
                constraint: 'availableForMeeting',
                color: '#f7b267'
            },
            {
                title: '🐰 최토끼 (7세)',
                start: '2025-05-27',
                constraint: 'availableForMeeting',

            },
            {
                title: '🦊 박여우 (5세)',
                start: '2025-05-29T09:00:00',
                end: '2025-05-29T12:00:00',
                constraint: 'businessHours',
                color: '#ff9999'
            },
            {
                title: '🧸 이곰이 (6세)',
                start: '2025-05-30T13:00:00',
                end: '2025-05-30T16:00:00',
                constraint: 'businessHours',
                color: '#b39ddb'
            },

            {
                title: 'Business Lunch',
                start: '2023-01-03T13:00:00',
                constraint: 'businessHours'
            },
            {
                title: 'Meeting',
                start: '2023-01-13T11:00:00',
                constraint: 'availableForMeeting', // defined below
                color: '#257e4a'
            },
            {
                title: 'Conference',
                start: '2023-01-18',
                end: '2023-01-20'
            },
            {
                title: 'Party',
                start: '2023-01-29T20:00:00'
            },

            // areas where "Meeting" must be dropped
            {
                groupId: 'availableForMeeting',
                start: '2023-01-11T10:00:00',
                end: '2023-01-11T16:00:00',
                display: 'background'
            },
            {
                groupId: 'availableForMeeting',
                start: '2023-01-13T10:00:00',
                end: '2023-01-13T16:00:00',
                display: 'background'
            },

            // red areas where no events can be dropped
            {
                start: '2023-01-24',
                end: '2023-01-28',
                overlap: false,
                display: 'background',
                color: '#ff9f89'
            },
            {
                start: '2023-01-06',
                end: '2023-01-08',
                overlap: false,
                display: 'background',
                color: '#ff9f89'
            }
        ]
    });

    calendar.render();
});

window.addEventListener('DOMContentLoaded', () => {

    if (window.__calendarInitialized__) return;  // 이미 실행된 경우 종료
    window.__calendarInitialized__ = true;

    const listEl = document.getElementById('event-list');

    dummyEvents.forEach(event => {
        const card = document.createElement('div');
        card.className = 'event-card';
        card.innerHTML = `
      <div><strong class="avatar">${event.avatar}</strong> <strong>${event.name}</strong> (${event.age}세)</div>
      <div><strong>일정:</strong> ${event.date} ${event.time}</div>
      <div>
        <strong>주소:</strong>
        <span class="clickable-address" style="color:#007BFF; cursor:pointer;" data-address="${event.address}">
          ${event.address}
        </span>
      </div>
      <div><strong>유의사항:</strong> ${event.notes}</div>
    `;
        listEl.appendChild(card);
    });

    listEl.addEventListener('click', (e) => {
        if (e.target.classList.contains('clickable-address')) {
            const address = e.target.dataset.address;

            fetch('http://127.0.0.1:5000/show_map', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ address })
            })
                .then(response => response.text())
                .then(html => {
                    document.getElementById('map-view').innerHTML = html;
                    document.getElementById('mapModal').classList.remove('hidden');
                });
        }
    });
});

function closeModal() {
    document.getElementById('mapModal').classList.add('hidden');
}

document.getElementById('mapModal').addEventListener('click', function (e) {
    if (e.target.id === 'mapModal') closeModal();
});
