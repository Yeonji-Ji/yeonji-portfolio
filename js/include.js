document.addEventListener('DOMContentLoaded', async () => {
  const targets = document.querySelectorAll('[data-include]');
  await Promise.all([...targets].map(async el => {
    const url = el.getAttribute('data-include');
    try {
      const res = await fetch(url, { cache: 'no-cache' });
      if (!res.ok) throw new Error(res.status + ' ' + res.statusText);
      el.innerHTML = await res.text();
    } catch (e) {
      el.innerHTML = `<div style="color:#c00">Failed to load: ${url}</div>`;
      console.error('Include error:', url, e);
    }
  }));
});
