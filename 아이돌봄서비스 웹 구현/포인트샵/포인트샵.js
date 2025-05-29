
        let myPoints = 129300;

        const productList = [
            { name: "CU 상품권", original: 5000, discount: 4750, image: "cu상품권.jfif" },
            { name: "배민 상품권", original: 10000, discount: 9500, image: "배민상품권.png" },
            { name: "문화상품권", original: 5000, discount: 4750, image: "문화상품권 5천원.jfif" },
            { name: "네이버페이 포인트", original: 5000, discount: 4750, image: "네이버페이 5천원.png" },
            { name: "교보문고 상품권", original: 10000, discount: 9500, image: "교보문고 상품권.png" },
            { name: "올리브영 상품권", original: 10000, discount: 9500, image: "올리브영 상품권.jfif" },
            { name: "GS25 상품권", original: 5000, discount: 4750, image: "gs25.jfif" },
            { name: "스타벅스 카드", original: 10000, discount: 9500, image: "스타벅스 만원권.jfif" },
            { name: "이마트24 상품권", original: 5000, discount: 4750, image: "이마트24상품권.jfif" }
        ];

        const productGrid = document.getElementById("product-grid");

        productList.forEach((product, index) => {
            const card = document.createElement("div");
            card.classList.add("card");

            const img = document.createElement("img");
            img.src = `../Pointshopimg/${product.image}`;
            img.alt = product.name;
            img.className = "image-placeholder";

            const name = document.createElement("div");
            name.className = "product-name";
            name.textContent = product.name;

            const price = document.createElement("div");
            price.className = "price";
            price.innerHTML = `<del>${product.original.toLocaleString()}원</del> <span class="discounted">${product.discount.toLocaleString()}원</span>`;

            const button = document.createElement("button");
            button.className = "buy-button";
            button.textContent = "구매";

            if (myPoints < product.discount) {
                button.disabled = true;
            } else {
                button.addEventListener("click", () => buyProduct(product.name, product.discount, button));
            }

            card.appendChild(img);
            card.appendChild(name);
            card.appendChild(price);
            card.appendChild(button);
            productGrid.appendChild(card);
        });

        function buyProduct(name, price, buttonElement) {
            // SweetAlert 확인창
            Swal.fire({
                title: `${name}을(를) 구매하시겠습니까?`,
                text: `가격: ${price.toLocaleString()}P`,
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: '구매',
                cancelButtonText: '취소'
            }).then((result) => {
                if (result.isConfirmed) {
                    // 포인트 차감
                    myPoints -= price;
                    document.getElementById("myPoints").textContent = myPoints;

                    // 버튼 비활성화
                    buttonElement.disabled = true;
                    buttonElement.style.backgroundColor = "#ccc";
                    buttonElement.style.cursor = "not-allowed";

                    // 성공 알림
                    Swal.fire({
                        icon: 'success',
                        title: '구매 완료!',
                        text: `${name}을(를) 성공적으로 구매했습니다.`,
                        confirmButtonColor: '#32a37b'
                    });
                }
            });
        }

        document.getElementById("showMoreBtn").addEventListener("click", () => {
            document.querySelectorAll(".card.hidden").forEach(card => card.classList.remove("hidden"));
            document.getElementById("showMoreBtn").style.display = "none";
        });

        function closeModal() {
            document.getElementById("modal").style.display = "none";
        }
