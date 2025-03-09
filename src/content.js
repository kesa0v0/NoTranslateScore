(() => {
    console.log("[Remove Font Tag] 확장 프로그램 실행됨!");

    const removeFontTags = (node) => {
        let fontTags = node.querySelectorAll("font");
        while (fontTags.length > 0) { // 모든 <font> 태그가 사라질 때까지 반복
            fontTags.forEach(font => {
                console.log("[Remove Font Tag] 감지됨:", font);
                font.replaceWith(...font.childNodes); // <font> 태그 제거하고 내부 요소 유지
            });
            fontTags = node.querySelectorAll("font"); // 다시 <font> 태그가 있는지 확인
        }
    };

    const observer = new MutationObserver(mutationsList => {
        mutationsList.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                // 요소(Element)인지 확인하고 <font> 태그 제거 실행
                if (node.nodeType === 1) {
                    removeFontTags(node);
                }
            });

            // 텍스트 노드가 변경되었을 때도 감지하여 부모 노드 검사
            if (mutation.type === "characterData" && mutation.target.parentElement) {
                removeFontTags(mutation.target.parentElement);
            }
        });
    });

    // 문서 전체에서 감지 (subtree: true로 모든 하위 요소 포함)
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });

})();
