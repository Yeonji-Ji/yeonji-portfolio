document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('[data-include]').forEach(el => {
    const file = el.getAttribute('data-include');
    if (file) {
      fetch(file)
        .then(response => {
          if (!response.ok) {
            throw new Error("File not found: " + file);
          }
          return response.text();
        })
        .then(data => {
          el.innerHTML = data;
        })
        .catch(err => {
          el.innerHTML = `<p style="color:red;">Error loading ${file}</p>`;
          console.error(err);
        });
    }
  });
});
