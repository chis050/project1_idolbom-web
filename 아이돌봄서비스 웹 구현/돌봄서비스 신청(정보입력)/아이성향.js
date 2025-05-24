
function toggleButtonGroup(selector, single, maxCount) {
    document.querySelectorAll(selector).forEach(group => {
        group.addEventListener('click', function (e) {
            if (e.target.tagName !== 'BUTTON') return;
            if (single) {
                group.querySelectorAll('button').forEach(btn => btn.classList.remove('selected'));
                e.target.classList.add('selected');
            } else {
                // 최대 선택 개수 제한
                if (e.target.classList.contains('selected')) {
                    e.target.classList.remove('selected');
                } else {
                    const selected = group.querySelectorAll('button.selected').length;
                    if (!maxCount || selected < maxCount) {
                        e.target.classList.add('selected');
                    }
                }
            }
        });
    });
}

// 성별(단일), 성격(최대 5개), 목적(단일), 장소(단일)
toggleButtonGroup('.age-gender-group', true);
toggleButtonGroup('.trait-buttons', false, 5);
toggleButtonGroup('.purpose-buttons', true);
toggleButtonGroup('.place-buttons', true);

// 요일 선택
document.addEventListener('DOMContentLoaded', function () {
    const dateInput = document.querySelector('.date-time-group input[type="date"]');
    const daySpan = document.querySelector('.date-time-group span');
    const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];

    function updateDay() {
        const val = dateInput.value;
        if (val) {
            const d = new Date(val);
            daySpan.textContent = days[d.getDay()];
        } else {
            daySpan.textContent = '';
        }
    }

    dateInput.addEventListener('input', updateDay);
    updateDay();
});

// 시간 차이 계산
function updateDuration() {
    const startInput = document.getElementById('startTime').value;
    const endInput = document.getElementById('endTime').value;

    if (startInput && endInput) {
        const [startHour, startMin] = startInput.split(':').map(Number);
        const [endHour, endMin] = endInput.split(':').map(Number);

        // Date 객체 사용해 시간 차이 계산
        const startDate = new Date(0, 0, 0, startHour, startMin);
        const endDate = new Date(0, 0, 0, endHour, endMin);

        let diff = (endDate - startDate) / (1000 * 60); // 분 단위
        if (diff < 0) diff += 24 * 60; // 자정 넘어간 경우

        const hours = Math.floor(diff / 60);
        const minutes = diff % 60;

        const timeText = minutes === 0
            ? `총 ${hours}시간`
            : `총 ${hours}시간 ${minutes}분`;

        document.getElementById('totalTime').textContent = `(${timeText})`;
    }
}

// 장소 입력
const buttons = document.querySelectorAll('.place-btn');
const placeValueInput = document.getElementById('placeValue');
const customInputWrapper = document.getElementById('customInputWrapper');
const customPlaceInput = document.getElementById('customPlace');

placeValueInput.value = "자택";

buttons.forEach(button => {
    button.addEventListener('click', () => {
        // 모든 버튼에서 selected 제거
        buttons.forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');

        const value = button.getAttribute('data-value');

        if (value === '기타') {
            customInputWrapper.style.display = 'block';
            customPlaceInput.focus();
            placeValueInput.value = customPlaceInput.value; // 초기 상태
        } else {
            customInputWrapper.style.display = 'none';
            placeValueInput.value = value;
        }
    });
});



// 이벤트 연결
document.getElementById('dayOfWeek').textContent = getKoreanDayOfWeek(document.getElementById('dateInput').value);
document.getElementById('startTime').addEventListener('input', updateDuration);
document.getElementById('endTime').addEventListener('input', updateDuration);
customPlaceInput.addEventListener('input', () => {
    placeValueInput.value = customPlaceInput.value;
});
window.addEventListener('DOMContentLoaded', updateDuration);

updateDuration();

