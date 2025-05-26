
    const reviews = [
      { name: "misuk", date: "2025-05-20", score: 5, text: "매우 만족스러웠습니다. 외국인 분이 와주셔서 봐주셨는데 아이가 영어도 배우고, 1석 2조네요." },
      { name: "malsuk", date: "2025-05-18", score: 3.5, text: "외국인 돌보미 처음엔 선입견이 있었는데 아이가 너무 좋아해요." },
      { name: "eunsuk", date: "2025-05-21", score: 4, text: "처음엔 불안했는데 선생님 너무 잘해주세요! 정리도 해주시고 아이랑도 잘 놀아줘요." },
      { name: "jiwon", date: "2025-05-19", score: 4.5, text: "정말 아이 돌봄 전문가처럼 잘 대해주셨어요." }
    ];

    function renderReviews(data) {
      const container = document.querySelector(".review-list");
      container.innerHTML = "";
      document.getElementById("reviewCount").textContent = data.length;
      data.forEach(r => {
        const stars = getStars(r.score);
        container.innerHTML += `
          <article class="review">
            <div class="meta">
              <span class="name">${r.name}</span>
              <span class="date">${formatDate(r.date)}</span>
              <div class="stars">${stars}</div>
            </div>
            <p class="text">${r.text}</p>
          </article>
        `;
      });
    }

    function getStars(score) {
      const full = Math.floor(score);
      const half = score % 1 >= 0.5;
      let html = "";
      for (let i = 0; i < full; i++) html += '<span class="star on">★</span>';
      if (half) html += '<span class="star half">★</span>';
      for (let i = full + (half ? 1 : 0); i < 5; i++) html += '<span class="star off">☆</span>';
      return html;
    }

    function sortReviews(mode) {
      let sorted = [...reviews];
      if (mode === "score") {
        sorted.sort((a, b) => b.score - a.score);
      } else {
        sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
      }
      renderReviews(sorted);
    }

    function formatDate(dateStr) {
      const now = new Date();
      const date = new Date(dateStr);
      const diff = Math.floor((now - date) / (1000 * 60 * 60 * 24));
      if (diff === 0) return "오늘";
      if (diff === 1) return "어제";
      return `${diff}일전`;
    }

    function renderDistribution(data) {
      const dist = [0, 0, 0, 0, 0];
      data.forEach(r => {
        if (r.score >= 4.75) dist[0]++;     // 5점
        else if (r.score >= 3.75) dist[1]++; // 4점
        else if (r.score >= 2.75) dist[2]++; // 3점
        else if (r.score >= 1.75) dist[3]++; // 2점
        else dist[4]++;                      // 1점
      });
      const total = data.length;
      const container = document.getElementById("distribution");
      container.innerHTML = "";
      for (let i = 0; i < 5; i++) {
        const score = 5 - i;
        const count = dist[i];
        const percent = total ? (count / total) * 100 : 0;
        container.innerHTML += `
      <div class="row">
        <div class="label">${score}점</div>
        <div class="bar">
          <div class="fill" style="width: ${percent}%;"></div>
        </div>
        <div class="count">${count}</div>
      </div>
    `;
      }
    }

    document.addEventListener("DOMContentLoaded", () => {
      renderReviews(reviews);
      renderDistribution(reviews);
    });
