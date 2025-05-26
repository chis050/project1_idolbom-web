let isTranslated = false;
let originalTexts = []; // ✅ 함수 바깥에서 초기화!

document.getElementById('translateBtn').addEventListener('click', async () => {
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

    if (!isTranslated) {
        originalTexts = textNodes.map(node => node.nodeValue); // ✅ 접근 가능

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
    } else {
        textNodes.forEach((node, i) => {
            node.nodeValue = originalTexts[i];
        });
        isTranslated = false;
    }
});


document.getElementById('translateBtn').addEventListener('click', translate);
