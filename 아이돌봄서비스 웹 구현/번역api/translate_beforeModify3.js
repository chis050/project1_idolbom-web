let isTranslated = false;
let originalTexts = [];

// 텍스트 노드 수집 함수
function getTextNodes() {
    const main = document.getElementById("main");
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
    return textNodes;
}

// 영어 번역
async function translateToEnglish() {
    const textNodes = getTextNodes();
    if (!isTranslated) {
        originalTexts = textNodes.map(node => node.nodeValue);
        const response = await fetch('http://127.0.0.1:5000/translate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: originalTexts, lang: "en" })
        });
        if (response.ok) {
            const result = await response.json();
            result.translated.forEach((translatedText, i) => {
                textNodes[i].nodeValue = translatedText;
            });
            isTranslated = true;
        }
    }
}

// 한글로 복원
function restoreKorean() {
    const textNodes = getTextNodes();
    if (isTranslated && originalTexts.length === textNodes.length) {
        textNodes.forEach((node, i) => {
            node.nodeValue = originalTexts[i];
        });
        isTranslated = false;
    }
}

// 이벤트 바인딩

document.getElementById('lang-en').addEventListener('click', translateToEnglish);
document.getElementById('lang-kr').addEventListener('click', restoreKorean);
