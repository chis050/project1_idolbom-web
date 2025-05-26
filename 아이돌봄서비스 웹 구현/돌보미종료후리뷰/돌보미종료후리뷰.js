
    function openModal() {
      document.getElementById("reviewModal").style.display = "flex";
    }

    const followUpBox = document.getElementById("followUpChoice");
    const followText = document.getElementById("followText");
    const followCheckbox = document.getElementById("followCheckbox");
    const checkboxContainer = document.getElementById("checkboxContainer");
    const questionText = document.getElementById("questionText");
    const stars = document.querySelectorAll("#stars span");

    const goodPoints = ["친절해요", "전문성이 있어요", "응답이 빨라요", "시간을 잘 지켜요"];
    const badPoints = ["시간 약속을 안 지켰어요", "설명이 부족했어요", "아이가 불편해했어요", "기타 문제"];

    let selectedScore = 0;

    stars.forEach(star => {
      star.addEventListener("click", () => {
        selectedScore = parseInt(star.dataset.score);
        stars.forEach(s => {
          s.textContent = s.dataset.score <= selectedScore ? "★" : "☆";
        });
        updateOptions(selectedScore);
      });
    });

    function updateOptions(score) {
      checkboxContainer.innerHTML = "";
      const options = score >= 4 ? goodPoints : badPoints;
      questionText.textContent = score >= 4 ? "어떤 점이 좋았나요?" : "어떤 점이 아쉬웠나요?";

      followUpBox.style.display = 'block';
      followText.textContent = score >= 4 ? "이 돌보미를 또 만나고 싶어요" : "이 돌보미는 다시 만나고 싶지 않아요";

      options.forEach(option => {
        const label = document.createElement("label");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.value = option;
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(" " + option));
        checkboxContainer.appendChild(label);

        if (option === "기타 문제") {
          checkbox.addEventListener("change", () => {
            let existingInput = document.getElementById("customReason");
            if (checkbox.checked) {
              if (!existingInput) {
                const input = document.createElement("input");
                input.type = "text";
                input.placeholder = "기타 내용을 입력해주세요";
                input.id = "customReason";
                input.style.marginTop = "8px";
                input.style.width = "100%";
                input.style.padding = "8px";
                input.style.borderRadius = "6px";
                input.style.border = "1px solid #ccc";
                label.appendChild(input);
              }
            } else {
              if (existingInput) existingInput.remove();
            }
          });
        }
      });
    }

    function submitReview() {
      const checked = Array.from(checkboxContainer.querySelectorAll("input[type=checkbox]:checked")).map(cb => cb.value);
      const comment = document.getElementById("freeComment").value;
      const customInput = document.getElementById("customReason");
      const customText = customInput ? customInput.value.trim() : "";

      if (checked.includes("기타 문제") && customText) {
        checked[checked.indexOf("기타 문제")] = `기타 문제 (${customText})`;
      }

      const followOpinion = followCheckbox.checked
        ? (selectedScore >= 4 ? "(돌보미 또 만나기 희망)" : "(돌보미 다시 만나지 않음)")
        : "(선택 안함)";

      alert(`⭐️ 별점: ${selectedScore}\n✅ 선택: ${checked.join(", ")}\n💬 후기: ${comment}\n📌 ${followOpinion}`);
      document.getElementById("reviewModal").style.display = "none";
    }
