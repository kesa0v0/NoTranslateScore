(() => {
    console.log("[Remove Font Tag] 확장 프로그램 실행됨!");

    const removeAllFontTags = (node) => {
        let fontTags = node.querySelectorAll("font");

        fontTags.forEach(font => {
            console.log("[Remove Font Tag] 감지됨:", font);
            while (font.firstChild) {
                font.parentNode.insertBefore(font.firstChild, font);
            }
            font.remove();
        });

        // 재귀적으로 다시 호출하여 중첩된 <font> 태그 제거
        if (node.querySelector("font")) {
            removeAllFontTags(node);
        }
    };

    let timeoutId = null; // 중복 실행 방지를 위한 타이머

    const observer = new MutationObserver(mutationsList => {
        clearTimeout(timeoutId); // 기존 실행 예약된 작업 취소

        timeoutId = setTimeout(() => {

            console.log(mutationsList);

            mutationsList.forEach(mutation => {
                // 새로운 노드가 추가된 경우
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        console.log("[Remove Font Tag] 추가된 노드:", node);
                        removeAllFontTags(node);
                    }
                });

                // 텍스트 변경 시 부모 요소 검사
                if (mutation.type === "characterData" && mutation.target.parentElement) {
                    console.log("[Remove Font Tag] 텍스트 변경됨:", mutation.target);
                    removeAllFontTags(mutation.target.parentElement);
                }

                // 스타일 변경 시에도 부모 요소 검사
                if (mutation.type === "attributes" && mutation.target) {
                    console.log("[Remove Font Tag] 스타일 변경됨:", mutation.target);
                    removeAllFontTags(mutation.target);
                }
            });
        }, 50); // 50ms 대기 후 실행
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: true, // 스타일 변경도 감지
        attributeFilter: ["style"] // 스타일이 변경될 때만 감지
    });

})();