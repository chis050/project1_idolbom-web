const supabaseUrl = 'https://kdmvxndklggzyynexiyu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtkbXZ4bmRrbGdnenl5bmV4aXl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2NDUxMjUsImV4cCI6MjA2MzIyMTEyNX0.iYwGk2isQQxzkvK51S99V21cOZowTooCyzM9jTqcK7U';
const db = supabase.createClient(supabaseUrl, supabaseKey);

document.addEventListener('DOMContentLoaded', () => {
  const ageSelect = document.getElementById('age');
  for (let i = 19; i <= 65; i++) {
    const opt = document.createElement('option');
    opt.value = i;
    opt.textContent = `${i}세`;
    ageSelect.appendChild(opt);
  }

  const nationality = document.getElementById('nationality');
  const korDocs = document.getElementById('korean-documents');
  const forDocs = document.getElementById('foreigner-documents');
  const foreignerExtra = document.getElementById('foreigner-extra');
  const countrySelect = document.getElementById('countrySelect');
  const sidoSelects = [document.getElementById('sidoSelect'), document.getElementById('sidoSelect2')];
  const gugunSelects = [document.getElementById('gugunSelect'), document.getElementById('gugunSelect2')];
  const submitBtn = document.querySelector('.submit-btn');
  const agreeCheckbox = document.getElementById('agree');
  const formWrapper = document.querySelector('.form-wrapper'); // ✅ 폼 범위 지정

  nationality.addEventListener('change', () => {
    const isForeigner = nationality.value === 'foreigner';
    korDocs.classList.toggle('hidden', isForeigner);
    forDocs.classList.toggle('hidden', !isForeigner);
    foreignerExtra.classList.toggle('hidden', !isForeigner);
    validateForm();
  });

  fetch('https://restcountries.com/v3.1/all')
    .then(res => res.json())
    .then(data => {
      data.sort((a, b) => a.name.common.localeCompare(b.name.common)).forEach(c => {
        const option = document.createElement('option');
        option.value = c.name.common;
        option.textContent = c.name.common;
        countrySelect.appendChild(option);
      });
    });

  fetch('korea_regions.json')
    .then(res => res.json())
    .then(regionData => {
      sidoSelects.forEach((sidoSelect, idx) => {
        sidoSelect.innerHTML = '<option value="">시/도 선택</option>';
        gugunSelects[idx].innerHTML = '<option value="">구/군 선택</option>';
        Object.keys(regionData).forEach(sido => {
          const option = document.createElement('option');
          option.value = sido;
          option.textContent = sido;
          sidoSelect.appendChild(option);
        });
        sidoSelect.addEventListener('change', () => {
          const selectedSido = sidoSelect.value;
          const gugunSelect = gugunSelects[idx];
          gugunSelect.innerHTML = '<option value="">구/군 선택</option>';
          if (regionData[selectedSido]) {
            regionData[selectedSido].forEach(gugun => {
              const option = document.createElement('option');
              option.value = gugun;
              option.textContent = gugun;
              gugunSelect.appendChild(option);
            });
          }
          validateForm();
        });
      });
    });

  function validateForm() {
    let isValid = true;
    const inputs = formWrapper.querySelectorAll('input[type="text"], input[type="date"], select');
    inputs.forEach(input => {
      if (!input.closest('.hidden') && input.value === '') {
        isValid = false;
      }
    });
    if (!agreeCheckbox.checked) isValid = false;
    submitBtn.disabled = !isValid;
    submitBtn.style.opacity = isValid ? '1' : '0.5';
  }

  const inputs = formWrapper.querySelectorAll('input[type="text"], input[type="date"], select');
  inputs.forEach(input => {
    input.addEventListener('input', validateForm);
    input.addEventListener('change', validateForm);
  });
  agreeCheckbox.addEventListener('change', validateForm);
  validateForm();

  const fileInputs = document.querySelectorAll('input[type="file"]');
  fileInputs.forEach(input => {
    const num = input.id.replace("file", "");
    const nameBox = document.getElementById("file-name" + num);
    input.addEventListener("change", () => {
      nameBox.textContent = input.files.length > 0 ? input.files[0].name : "선택된 파일 없음";
    });
  });

  submitBtn.addEventListener('click', async () => {
    let login_id = sessionStorage.getItem('login_id')
    const { data, error } = await db
      .from('user')
      .update({ role: 2 })
      .eq('login_id', login_id)
    sessionStorage.setItem("role", "2");

    Swal.fire({
      icon: 'success',
      title: '신청 완료!',
      text: '정상적으로 신청이 접수되었습니다.',
      confirmButtonText: '확인'
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = '/마이페이지(돌보미)/마이페이지(돌보미).html';
      }
    });
  });
});
