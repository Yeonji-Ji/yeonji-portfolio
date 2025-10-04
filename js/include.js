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
