
    const popup = document.getElementById('popup');
    const popupName = document.getElementById('popup-name');
    const popupDate = document.getElementById('popup-date');
    const popupTime = document.getElementById('popup-time');
    let currentCard = null;

    document.querySelectorAll('.accept-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        currentCard = btn.closest('.match-card');
        popupName.textContent = currentCard.dataset.name;
        popupDate.textContent = currentCard.dataset.date;
        popupTime.textContent = currentCard.dataset.time;
        popup.style.display = 'flex';
      });
    });

    document.querySelector('.confirm').addEventListener('click', () => {
      alert(`${currentCard.dataset.name} 매칭을 수락했습니다.`);
      popup.style.display = 'none';
    });

    document.querySelector('.cancel').addEventListener('click', () => {
      popup.style.display = 'none';
    });

