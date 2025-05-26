            
  
                function goToForm() {
                    const selected = document.querySelector('input[name="consent"]:checked');
                    if (!selected) {
                        alert("약관 동의 여부를 선택해주세요.");
                        return;
                    }

                    if (selected.value === 'agree') {
                        window.location.href = 'register-form.html'; // 회원가입 정보입력 페이지로 수정
                    } else {
                        alert("동의하지 않으면 회원가입이 어렵습니다.");
                    }
                }

                function goToMain() {
                    window.location.href = 'index.html'; // 메인 페이지 경로로 수정
                }
  
