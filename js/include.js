// DOMContentLoaded 이벤트가 발생하면 includeHTML 함수를 처음으로 실행합니다.
document.addEventListener("DOMContentLoaded", function() {
    includeHTML();
});

function includeHTML() {
    // 'data-include' 속성을 가진 모든 요소를 찾습니다.
    const elements = document.querySelectorAll('[data-include]');
    
    // 찾은 요소들을 순회합니다.
    for (let i = 0; i < elements.length; i++) {
        const el = elements[i];
        // 파일 경로를 가져옵니다.
        const file = el.getAttribute('data-include');
        
        if (file) {
            // fetch를 사용해 파일을 가져옵니다.
            fetch(file)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok.");
                    }
                    return response.text();
                })
                .then(data => {
                    // 가져온 데이터(HTML)를 요소의 내부 HTML로 설정합니다.
                    el.innerHTML = data;
                    
                    // 중요: 방금 처리한 요소에서 'data-include' 속성을 제거합니다.
                    // 이렇게 하지 않으면 무한 반복에 빠질 수 있습니다.
                    el.removeAttribute('data-include');
                    
                    // 중요: 새로운 내용이 추가되었으므로, 그 안에 또 다른 include가 있는지
                    // 확인하기 위해 함수를 다시 호출합니다 (재귀 호출).
                    includeHTML();
                })
                .catch(error => {
                    console.error('Error fetching file:', error);
                    el.innerHTML = "Page not found.";
                });
        }
    }
}

// document.addEventListener('DOMContentLoaded', async () => {
//   const targets = document.querySelectorAll('[data-include]');
//   const toAbs = (path) => new URL(path, document.baseURI).toString();

//   await Promise.all([...targets].map(async el => {
//     const rel = el.getAttribute('data-include');
//     const url = toAbs(rel);
//     try {
//       const res = await fetch(url, { cache: 'no-cache' });
//       if (!res.ok) throw new Error(res.status + ' ' + res.statusText);
//       el.innerHTML = await res.text();
//     } catch (e) {
//       el.innerHTML = `<div style="color:#c00">Failed to load: ${rel}</div>`;
//       console.error('Include error:', rel, e);
//     }
//   }));
// });
