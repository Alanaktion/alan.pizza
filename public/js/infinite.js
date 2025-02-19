document.addEventListener('DOMContentLoaded', () => {
  const pages = JSON.parse(document.querySelector('script[data-infinite]').textContent);
  let currentPageIndex = 0;
  let loading = false;

  // use IntersectionObserver to load next page via fetch when nearing the bottom of the page, appending the fetched html to #content.
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !loading) {
        if (currentPageIndex > pages.length) return;
        loading = true;
        fetch(`/index-pages${pages[++currentPageIndex]}`)
          .then(data => data.text())
          .then(data => {
            document.getElementById('content').innerHTML += data;
            observer.unobserve(entry.target);
            observer.observe(document.querySelector('#content>article:last-of-type'));
          })
          .finally(() => {
            loading = false;
          });
      }
    });
  }, {
    threshold: 0.2,
  });

  document.querySelectorAll('[data-infinite="hide"]').forEach(v => v.remove());
  observer.observe(document.querySelector('#content>article:last-of-type'));
})
