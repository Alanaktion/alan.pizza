(function (window, document) {
  "use strict";

  let noResultsEl;
  let postlist;
  document.addEventListener('DOMContentLoaded', () => {
    noResultsEl = document.getElementById("noResultsFound");
    postlist = document.querySelector('.postlist');
  });

  const search = (e) => {
    const results = window.searchIndex.search(e.target.value, {
      bool: "OR",
      expand: true,
    });

    const items = postlist.querySelectorAll('.postlist-item');
    if (!e.target.value.length) {
      noResultsEl.style.display = "none";
      items.forEach(item => {
        item.style.display = null;
        item.style.order = null;
      });
    } else if (results.length) {
      noResultsEl.style.display = "none";
      items.forEach(item => {
        item.style.display = "none";
      });
      results.forEach(r => {
        const link = postlist.querySelector(`[href="${r.ref}"]`);
        if (!link) return;
        const item = link.closest('.postlist-item');
        item.style.display = null;
        item.style.order = Math.round(0 - r.score * 1000);
      });
    } else {
      noResultsEl.style.display = "block";
      links.forEach(element => {
        item.style.display = "none";
      });
    }
  };

  fetch("/search-index.json").then(response =>
    response.json().then(rawIndex => {
      window.searchIndex = elasticlunr.Index.load(rawIndex);
      document.getElementById("searchField").addEventListener("input", search);
    })
  );
})(window, document);
