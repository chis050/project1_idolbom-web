
    const calendarEl = document.getElementById('calendarDays');
    const timeListEl = document.getElementById('timeList');
    const selectedDateLabel = document.getElementById('selected-date');
    const monthLabel = document.getElementById('monthLabel');
    const durationDisplay = document.getElementById('durationDisplay');

    let currentDate = new Date(2025, 4);
    let selectedDay = null;
    let selectedTimes = new Set();

    function renderCalendar() {
      calendarEl.innerHTML = '';
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      monthLabel.textContent = `${year}년 ${month + 1}월`;

      const firstDay = new Date(year, month, 1);
      const lastDate = new Date(year, month + 1, 0).getDate();
      const offset = firstDay.getDay();

      for (let i = 0; i < offset; i++) {
        const empty = document.createElement('div');
        empty.innerHTML = '&nbsp;';
        calendarEl.appendChild(empty);
      }
      for (let day = 1; day <= lastDate; day++) {
        const cell = document.createElement('div');
        cell.textContent = day;
        cell.onclick = () => selectDate(year, month, day, cell);
        calendarEl.appendChild(cell);
      }
    }

    function selectDate(year, month, day, cell) {
      selectedDay = new Date(year, month, day);
      document.querySelectorAll('.calendar-grid div').forEach(div => div.classList.remove('selected'));
      cell.classList.add('selected');
      selectedDateLabel.textContent = `${year}년 ${month + 1}월 ${day}일 선택됨`;
      renderTimeSlots();
    }

    function renderTimeSlots() {
      timeListEl.innerHTML = '';
      selectedTimes.clear();
      durationDisplay.textContent = '';
      const hours = [9,10,11,12,13,14,15,16,17,18];
      hours.forEach(h => {
        ['00', '30'].forEach(m => {
          const t = `${String(h).padStart(2, '0')}:${m}`;
          const div = document.createElement('div');
          div.textContent = t;
          div.className = 'time-slot';
          div.onclick = () => toggleTime(div, t);
          timeListEl.appendChild(div);
        });
      });
    }

    function toggleTime(el, time) {
      if (el.classList.contains('selected')) {
        el.classList.remove('selected');
        selectedTimes.delete(time);
      } else {
        el.classList.add('selected');
        selectedTimes.add(time);
      }
      updateDuration();
    }

    function updateDuration() {
      const sorted = Array.from(selectedTimes).map(t => timeToMinutes(t)).sort((a, b) => a - b);
      for (let i = 1; i < sorted.length; i++) {
        if (sorted[i] - sorted[i - 1] !== 30) {
          durationDisplay.textContent = '시간은 연속으로 선택해야 합니다';
          return;
        }
      }
      if (sorted.length < 2) {
        durationDisplay.textContent = '';
        return;
      }
      const duration = (sorted[sorted.length - 1] + 30 - sorted[0]) / 60;
      durationDisplay.textContent = `총 ${duration}시간`;
    }

    function timeToMinutes(time) {
      const [h, m] = time.split(':').map(Number);
      return h * 60 + m;
    }

    function changeMonth(delta) {
      currentDate.setMonth(currentDate.getMonth() + delta);
      renderCalendar();
    }

    function confirmSelection() {
      const sorted = Array.from(selectedTimes).map(t => timeToMinutes(t)).sort((a, b) => a - b);
      for (let i = 1; i < sorted.length; i++) {
        if (sorted[i] - sorted[i - 1] !== 30) {
          alert('시간은 연속으로 선택해야 합니다.');
          return;
        }
      }
      if (!selectedDay || sorted.length < 2) {
        alert('날짜와 시간(2개 이상)을 선택해주세요.');
        return;
      }
      const times = sorted.map(m => `${String(Math.floor(m/60)).padStart(2,'0')}:${String(m%60).padStart(2,'0')}`);
      const dateStr = `${selectedDay.getFullYear()}-${String(selectedDay.getMonth() + 1).padStart(2, '0')}-${String(selectedDay.getDate()).padStart(2, '0')}`;
      const dayName = ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'][selectedDay.getDay()];
      const result = `${dateStr} ${dayName} ${times[0]} – ${times[times.length - 1]}`;
      localStorage.setItem('selectedSchedule', result);
      window.location.href = 'care-request.html';
    }

    renderCalendar();
