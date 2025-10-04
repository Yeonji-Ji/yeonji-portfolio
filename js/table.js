document.addEventListener('DOMContentLoaded', async () => {
const targets = document.querySelectorAll('[data-include]');
const toAbs = (path) => new URL(path, document.baseURI).toString();

await Promise.all([...targets].map(async el => {
  const rel = el.getAttribute('data-include');
  const url = toAbs(rel);
  try {
    const res = await fetch(url, { cache: 'no-cache' });
    if (!res.ok) throw new Error(res.status + ' ' + res.statusText);
    el.innerHTML = await res.text();
  } catch (e) {
    el.innerHTML = `<div style="color:#c00">Failed to load: ${rel}</div>`;
    console.error('Include error:', rel, e);
  }
}));
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
