// ✅ 전역 등록 (onclick 속성에서 쓸 수 있게)
window.setLanguage = setLanguage;

function setLanguage(lang) {
    if (lang === 'kr') {
        applyKorean();
    } else if (lang === 'en') {
        applyEnglish();
    } else if (lang === 'cn') {
        alert('중국어는 현재 지원되지 않습니다.');
    }

    document.getElementById('languageDropdown').classList.add('hidden');
}

function applyKorean() {
    document.querySelector('.hero-title').textContent = '아이 돌봄 서비스 신청';
    document.querySelectorAll('.service-btn')[0].innerHTML = '아이 돌봄 서비스<br>신청';
    document.querySelectorAll('.service-btn')[1].innerHTML = '아이 돌보미<br>신청';
}

function applyEnglish() {
    document.querySelector('.hero-title').textContent = 'Childcare Service Application';
    document.querySelectorAll('.service-btn')[0].innerHTML = 'Apply for<br>Childcare Service';
    document.querySelectorAll('.service-btn')[1].innerHTML = 'Apply to be<br>a Sitter';
}

// ✅ DOM 로드 후 버튼 이벤트 연결
document.addEventListener('DOMContentLoaded', () => {
    const dropdown = document.getElementById('languageDropdown');
    const btn = document.getElementById('translateBtn');

    btn.addEventListener('click', () => {
        dropdown.classList.toggle('hidden');
    });
});

function execDaumPostcode() {
    new daum.Postcode({
        oncomplete: function (data) {
            document.getElementById('child-address').value = data.roadAddress || data.jibunAddress;
            validateForm(); // 주소 입력되었을 때 유효성 검사 재확인
        }
    }).open();

}

flatpickr("#schedulePicker", {
    enableTime: true,
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
    minuteIncrement: 30
});

// 종료 시간 선택
flatpickr("#endTimePicker", {
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i",
    time_24hr: true,
    minuteIncrement: 30
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
const footer = document.createElement('div');
footer.className = 'form-actions';
footer.style.cssText = 'display: flex; justify-content: flex-end; gap: 12px; margin-top: 40px;';

const prevBtn = document.createElement('button');
prevBtn.className = 'prev-btn';
prevBtn.textContent = '이전 단계';
prevBtn.style.cssText = 'padding: 10px 20px; font-size: 15px; border: none; border-radius: 4px; background: #f0f0f0; cursor: pointer;';

const submitBtn = document.createElement('button');
submitBtn.className = 'submit-btn';
submitBtn.textContent = '신청 완료';
submitBtn.style.cssText = 'padding: 10px 20px; font-size: 15px; background: var(--main-color); color: white; border: none; border-radius: 4px; cursor: pointer; opacity: 0.5;';
submitBtn.disabled = true;

submitBtn.addEventListener('click', () => {
    if (!submitBtn.disabled) {
        alert('신청이 완료되었습니다!');
    }
});

footer.appendChild(prevBtn);
footer.appendChild(submitBtn);
document.querySelector('main').appendChild(footer);

function validateForm() {
    const childName = document.getElementById('child-name').value.trim();
    const childAddress = document.getElementById('child-address').value.trim();
    const detailAddress = document.getElementById('child-detail').value.trim();

    const ageValue = document.getElementById('age-value').value.trim();
    const scheduleDate = document.getElementById('schedulePicker').value.trim();
    const startTime = document.getElementById("startTimePicker").value.trim();
    const endTime = document.getElementById("endTimePicker").value.trim();
    const personalityCount = document.querySelectorAll('.personality-tags .tag.selected').length;
    const purposeSelected = document.querySelector('.purpose-tags .tag.selected');
    const locationSelected = document.querySelector('.location-tags .tag.selected');
    const requestText = document.querySelector('textarea[placeholder="요청사항을 입력하세요."]').value.trim();

    const hasDateAndTime = scheduleDate !== '' && startTime !== '' && endTime !== '';
    let validTime = false;

    if (hasDateAndTime) {
        const start = new Date(`${scheduleDate}T${startTime}`);
        const end = new Date(`${scheduleDate}T${endTime}`);
        validTime = start < end;
    }

    const allFilled =
        childName !== '' &&
        childAddress !== '' &&
        detailAddress !== '' &&
        ageValue !== '' &&
        personalityCount > 0 &&
        purposeSelected &&
        locationSelected &&
        requestText !== '' &&
        hasDateAndTime &&
        validTime;

    submitBtn.disabled = !allFilled;
    submitBtn.style.opacity = allFilled ? '1' : '0.5';
}

['input', 'change'].forEach(eventType => {
    [
        '#age-value', '#age-unit',
        '#schedulePicker', '#startTimePicker', '#endTimePicker',
        '.custom-personality', '.custom-purpose', '.custom-location',
        'textarea[placeholder="요청사항을 입력하세요."]'
    ].forEach(selector => {
        document.querySelector(selector)?.addEventListener(eventType, validateForm);
    });
});

// 태그 선택 시도 후 validateForm 호출
document.querySelectorAll('.tag').forEach(tag => {
    tag.addEventListener('click', validateForm);
});

setupTagToggle('.personality-tags', 5);
setupTagToggle('.purpose-tags', 1);
setupTagToggle('.location-tags', 1);
