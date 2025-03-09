function replaceTextContent(element) {
    element.querySelectorAll("*").forEach((child) => {
        if (child.children.length === 0) {
            child.innerText = "느에엥"; // 기존 HTML 태그는 유지하며 텍스트만 대체
        }
    });
}

replaceTextContent(document.body);
