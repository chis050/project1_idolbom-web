// 날짜 선택기
flatpickr("#schedulePicker", {
    enableTime: false,
    mode: "single",
    dateFormat: "Y-m-d",
    minDate: "today",
});

flatpickr("#startTimePicker", {
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i",
    time_24hr: true,
    minuteIncrement: 15
});

flatpickr("#endTimePicker", {
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i",
    time_24hr: true,
    minuteIncrement: 15
});

// 나이 입력 유효성 검사
const ageInput = document.getElementById('age-value');
const ageUnit = document.getElementById('age-unit');

function validateAgeInput() {
    const value = parseInt(ageInput.value, 10);
    const unit = ageUnit.value;
    if (unit === 'month') {
        if (value < 3) ageInput.value = 3;
        if (value > 24) ageInput.value = 24;
    } else {
        if (value < 1) ageInput.value = 1;
        if (value > 12) ageInput.value = 12;
    }
}

ageInput.addEventListener('input', validateAgeInput);
ageUnit.addEventListener('change', validateAgeInput);

// 태그 선택 처리 (성격: 다중, 목적/장소: 단일)
function setupTagToggle(wrapperSelector, maxCount = Infinity) {
    const wrapper = document.querySelector(wrapperSelector);
    const tags = wrapper.querySelectorAll('.tag');

    tags.forEach(tag => {
        tag.addEventListener('click', () => {
            const isOther = tag.dataset.other;
            const inputSelector = `.custom-${isOther}`;
            const input = isOther ? document.querySelector(inputSelector) : null;
            const alreadySelected = tag.classList.contains('selected');

            // 성격: 최대 개수 제한
            if (!alreadySelected && maxCount !== Infinity) {
                const selected = Array.from(tags).filter(t => t.classList.contains('selected'));
                if (selected.length >= maxCount) return;
            }

            // 목적/장소: 하나만 선택
            if (maxCount === 1) {
                tags.forEach(t => t.classList.remove('selected'));
                tag.classList.add('selected');
            } else {
                tag.classList.toggle('selected');
            }

            if (input) {
                const visible = tag.classList.contains('selected');
                input.style.display = visible ? 'block' : 'none';
                if (!visible) input.value = '';
            }

            // 선택 후 유효성 다시 확인
            validateForm();
        });
    });
}

// 유효성 검사
function validateForm() {
    const submitBtn = document.getElementById('submit');
    if (!submitBtn) return;

    const ageValue = document.getElementById('age-value').value.trim();
    const date = document.getElementById('schedulePicker').value.trim();
    const startTime = document.getElementById("startTimePicker").value.trim();
    const endTime = document.getElementById("endTimePicker").value.trim();
    const personalityCount = document.querySelectorAll('.personality-tags .tag.selected').length;
    const purposeSelected = document.querySelector('.purpose-tags .tag.selected');
    const locationSelected = document.querySelector('.location-tags .tag.selected');

    const allFilled = ageValue && date && startTime && endTime &&
        personalityCount > 0 && purposeSelected && locationSelected;

    submitBtn.disabled = !allFilled;
    submitBtn.style.opacity = allFilled ? '1' : '0.5';
}

// 입력 요소에 이벤트 연결
['input', 'change'].forEach(eventType => {
    document.querySelectorAll('#age-value, #schedulePicker, #startTimePicker, #endTimePicker').forEach(el => {
        el.addEventListener(eventType, validateForm);
    });
});

// 태그 선택 이벤트 연결
setupTagToggle('.personality-tags', 5);
setupTagToggle('.purpose-tags', 1);
setupTagToggle('.location-tags', 1);

// 버튼 클릭 시 페이지 이동
const submitBtn = document.getElementById('submit');
const prevBtn = document.getElementById('before');

prevBtn.addEventListener('click', () => {
    window.location.href = '/돌봄서비스 신청(돌보미 찾기)/ex돌보미찾기1.html';
});

submitBtn.addEventListener('click', () => {
    if (!submitBtn.disabled) {
        alert('신청이 완료되었습니다!');
        window.location.href = '/메인페이지/메인페이지.html';
    }
});
