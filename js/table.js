document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('[data-include]').forEach(el => {
    const file = el.getAttribute('data-include');
    if (!file) return;

    const url = new URL(file, window.location.href);

    fetch(url)
      .then(response => {
        if (!response.ok) throw new Error("File not found: " + url);
        return response.text();
      })
      .then(data => {
        el.innerHTML = data;
      })
      .catch(err => {
        el.innerHTML = `<p style="color:red;">Error loading ${file}</p>`;
        console.error(err);
      });
  });
});


// document.addEventListener("DOMContentLoaded", function () {
//   document.querySelectorAll('[data-include]').forEach(el => {
//     const file = el.getAttribute('data-include');
//     if (!file) return;

//     const url = file.startsWith('/') ? file : new URL(file, window.location.href).toString();

//     fetch(url, { cache: "no-cache" })
//       .then(res => {
//         if (!res.ok) throw new Error(`Fetch failed: ${res.status} ${url}`);
//         return res.text();
//       })
//       .then(html => { el.innerHTML = html; })
//       .catch(err => {
//         el.innerHTML = `<p style="color:red;">Error loading ${file}</p>`;
//         console.error(err);
//       });
//   });
// });
