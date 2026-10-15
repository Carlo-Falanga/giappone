(function () {
  var tabs = [].slice.call(document.querySelectorAll('.tabs a'));
  var sections = [].slice.call(document.querySelectorAll('main > section'));
  if (!tabs.length || !sections.length) return;
  document.documentElement.classList.add('js');

  function show(id) {
    if (!document.getElementById(id)) id = sections[0].id;
    sections.forEach(function (section) {
      section.classList.toggle('on', section.id === id);
    });
    tabs.forEach(function (tab) {
      var on = tab.getAttribute('href') === '#' + id;
      tab.classList.toggle('on', on);
      if (on) tab.setAttribute('aria-current', 'page'); else tab.removeAttribute('aria-current');
    });
    window.scrollTo(0, 0);
  }

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function (event) {
      event.preventDefault();
      var id = tab.getAttribute('href').slice(1);
      try { history.replaceState(null, '', '#' + id); } catch (e) {}
      show(id);
    });
  });
  window.addEventListener('hashchange', function () {
    show(location.hash.slice(1));
  });
  // the browser still jumps to the anchor once the page has loaded: the section has to start from the top
  window.addEventListener('load', function () {
    window.scrollTo(0, 0);
  });
  show(location.hash.slice(1));
})();
