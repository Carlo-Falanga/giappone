(function () {
  var tabs = [].slice.call(document.querySelectorAll('.tabs a'));
  var sections = [].slice.call(document.querySelectorAll('main > section'));
  if (!tabs.length || !sections.length) return;
  document.documentElement.classList.add('js');

  // a hash can point to a section or to something inside one (a day, a place, a hotel)
  function show(hash) {
    var target = document.getElementById(hash);
    var section = target ? target.closest('main > section') : sections[0];
    var id = section.id;
    sections.forEach(function (item) {
      item.classList.toggle('on', item === section);
    });
    tabs.forEach(function (tab) {
      var on = tab.getAttribute('href') === '#' + id;
      tab.classList.toggle('on', on);
      if (on) tab.setAttribute('aria-current', 'page'); else tab.removeAttribute('aria-current');
    });
    if (target && target !== section) target.scrollIntoView();
    else window.scrollTo(0, 0);
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
  // the browser still jumps to the anchor once the page has loaded: redo the scroll after that
  window.addEventListener('load', function () {
    show(location.hash.slice(1));
  });
  show(location.hash.slice(1));
})();
