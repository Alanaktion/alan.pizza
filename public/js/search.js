"use strict";

document.addEventListener('DOMContentLoaded', () => {
  const noResultsEl = document.getElementById("noResultsFound");
  const postlist = document.querySelector('.postlist');
  const searchField = document.getElementById("searchField");

  const search = (e) => {
    const results = window.searchIndex.search(searchField.value, {
      bool: "OR",
      expand: true,
    });

    const items = postlist.querySelectorAll('.postlist-item');
    if (!searchField.value.length) {
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
      links.forEach(item => {
        item.style.display = "none";
      });
    }
  };

  fetch("/search-index.json").then(response =>
    response.json().then(rawIndex => {
      window.searchIndex = elasticlunr.Index.load(rawIndex);
      searchField.addEventListener("input", search);
      search();
    })
  );
});
