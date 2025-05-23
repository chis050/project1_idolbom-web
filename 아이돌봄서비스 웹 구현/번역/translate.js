// async function translate() {
//     const originalText = document.getElementById("main").innerText;

//     const response = await fetch('http://127.0.0.1:5000/translate', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ text: originalText, lang: "en" })
//     });

//     if (response.ok) {
//         const result = await response.json();
//         document.getElementById("main").innerText = result.translated;
//     } else {
//         alert("번역 서버 오류!");
//     }
// }

// document.getElementById('translateBtn').addEventListener('click', translate);

async function translate() {
    const main = document.getElementById("main");

    // 1. 텍스트 노드들만 추출
    const textNodes = [];
    function collectTextNodes(node) {
        for (let child of node.childNodes) {
            if (child.nodeType === Node.TEXT_NODE && child.nodeValue.trim() !== '') {
                textNodes.push(child);
            } else {
                collectTextNodes(child);
            }
        }
    }
    collectTextNodes(main);

    // 2. 원본 텍스트 배열 생성
    const originalTexts = textNodes.map(node => node.nodeValue);

    // 3. 번역 요청
    const response = await fetch('http://127.0.0.1:5000/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: originalTexts, lang: "en" })  // 다중 텍스트 번역 요청
    });

    if (response.ok) {
        const result = await response.json(); // { translated: [...] }

        // 4. 번역된 텍스트를 원래 위치에 삽입
        result.translated.forEach((translatedText, i) => {
            textNodes[i].nodeValue = translatedText;
        });

    } else {
        alert("번역 서버 오류!");
    }
}

document.getElementById('translateBtn').addEventListener('click', translate);
