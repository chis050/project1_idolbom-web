flatpickr("#schedulePicker", {
    enableTime: false,
    mode: "single",
    dateFormat: "Y-m-d",
    minDate: "today",
});

// 시작 시간 선택
flatpickr("#startTimePicker", {
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i",
    time_24hr: true,
    minuteIncrement: 15
});

// 종료 시간 선택
flatpickr("#endTimePicker", {
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i",
    time_24hr: true,
    minuteIncrement: 15
});


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

// 전체 스크립트 내 목적/장소 선택 로직만 수정
function setupTagToggle(wrapperSelector, maxCount = Infinity) {
    const wrapper = document.querySelector(wrapperSelector);
    const tags = wrapper.querySelectorAll('.tag');

    tags.forEach(tag => {
        tag.addEventListener('click', () => {
            const isOther = tag.dataset.other;
            const inputSelector = `.custom-${isOther}`;
            const input = isOther ? document.querySelector(inputSelector) : null;
            const alreadySelected = tag.classList.contains('selected');

            // 성격: 최대 5개까지 선택 가능
            if (!alreadySelected && maxCount !== Infinity) {
                const selected = Array.from(tags).filter(t => t.classList.contains('selected'));
                if (selected.length >= maxCount) return;
            }

            // 목적/장소: 하나만 선택 가능, 기타 포함, 다시 클릭 시 해제
            if (maxCount === 1) {
                if (alreadySelected) {
                    tag.classList.remove('selected');
                } else {
                    tags.forEach(t => t.classList.remove('selected'));
                    tag.classList.add('selected');
                }
            } else {
                tag.classList.toggle('selected');
            }

            if (input) {
                const visible = tag.classList.contains('selected');
                input.style.display = visible ? 'block' : 'none';
                if (!visible) input.value = '';
            }
        });
    });
}
// ✅ 제출 및 이전 버튼 생성
// const footer = document.createElement('div');
// footer.className = 'form-actions';
// footer.style.cssText = 'display: flex; justify-content: flex-end; gap: 12px; margin-top: 40px;';

// const prevBtn = document.createElement('button');
// prevBtn.className = 'prev-btn';
// prevBtn.textContent = '이전 단계';
// prevBtn.style.cssText = 'padding: 10px 20px; font-size: 15px; border: none; border-radius: 4px; background: #f0f0f0; cursor: pointer;';

// const submitBtn = document.createElement('button');
// submitBtn.className = 'submit-btn';
// submitBtn.textContent = '신청 완료';
// submitBtn.style.cssText = 'padding: 10px 20px; font-size: 15px; background: var(--main-color); color: white; border: none; border-radius: 4px; cursor: pointer; opacity: 0.5;';
// submitBtn.disabled = true;

// submitBtn.addEventListener('click', () => {
//     if (!submitBtn.disabled) {
//         alert('신청이 완료되었습니다!');
//     }
// });

footer.appendChild(prevBtn);
footer.appendChild(submitBtn);
document.querySelector('main').appendChild(footer);

function validateForm() {
    const ageValue = document.getElementById('age-value').value.trim();
    const scheduleValue = document.getElementById('schedulePicker').value.trim();
    const startTime = document.getElementById("startTimePicker").value;
    const endTime = document.getElementById("endTimePicker").value;
    const personalityCount = document.querySelectorAll('.personality-tags .tag.selected').length;
    const purposeSelected = document.querySelector('.purpose-tags .tag.selected');
    const locationSelected = document.querySelector('.location-tags .tag.selected');

    const allFilled = ageValue !== '' && scheduleValue !== '' && personalityCount > 0 && purposeSelected && locationSelected;

    submitBtn.disabled = !allFilled;
    submitBtn.style.opacity = allFilled ? '1' : '0.5';

    if (!date || !startTime || !endTime) {
        alert("날짜와 시작/종료 시간을 모두 선택해주세요.");
        return;
    }

    if (startTime >= endTime) {
        alert("시작 시간은 종료 시간보다 이전이어야 합니다.");
        return;
    }

    const schedule = `${date} ${startTime} ~ ${endTime}`;
    console.log("선택한 일정:", schedule);
}

// 초기화 및 모든 입력 요소에 이벤트 연결
['input', 'change'].forEach(eventType => {
    document.querySelectorAll('#age-value, #schedulePicker').forEach(el => {
        el.addEventListener(eventType, validateForm);
    });
});

setupTagToggle('.personality-tags', 5);
setupTagToggle('.purpose-tags', 1);
setupTagToggle('.location-tags', 1);