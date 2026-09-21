(function () {
  // ---- Theme toggle ----
  var root = document.documentElement;
  var toggle = document.getElementById('themeToggle');
  var tIcon = document.getElementById('themeIcon');
  var tLabel = document.getElementById('themeLabel');
  function prefersDark(){ return window.matchMedia && window.matchMedia('(prefers-color-scheme:dark)').matches; }
  function isDark(){ var t = root.getAttribute('data-theme'); return t === 'dark' || (t == null && prefersDark()); }
  function sync(){ if(!tIcon) return; var d = isDark(); tIcon.textContent = d ? '☀' : '◑'; tLabel.textContent = d ? 'Light' : 'Dark'; }
  try { var saved = localStorage.getItem('lts-theme'); if (saved === 'dark' || saved === 'light') root.setAttribute('data-theme', saved); } catch(e){}
  sync();
  if (toggle) toggle.addEventListener('click', function () {
    var next = isDark() ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('lts-theme', next); } catch(e){}
    sync();
  });

  // ---- Category filter (home page only) ----
  var chips = Array.prototype.slice.call(document.querySelectorAll('.chip'));
  var cards = Array.prototype.slice.call(document.querySelectorAll('.card'));
  var countEl = document.getElementById('count');
  if (chips.length) {
    function applyFilter(f) {
      var n = 0;
      cards.forEach(function (c) {
        var match = (f === 'all' || c.getAttribute('data-cat') === f);
        c.hidden = !match; if (match) n++;
      });
      if (countEl) countEl.textContent = n + (n === 1 ? ' story' : ' stories');
      chips.forEach(function (ch) { ch.setAttribute('aria-pressed', ch.getAttribute('data-filter') === f ? 'true' : 'false'); });
    }
    chips.forEach(function (ch) { ch.addEventListener('click', function () { applyFilter(ch.getAttribute('data-filter')); }); });
    applyFilter('all');
  }

  // ---- Subscribe form (Netlify Forms) ----
  var subForm = document.getElementById('subForm');
  if (subForm) {
    subForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var body = new URLSearchParams(new FormData(subForm)).toString();
      var done = function () {
        subForm.innerHTML = '<div class="sub-thanks">Thanks — you’re on the list. Watch your inbox for the next one.</div>';
        var n = document.getElementById('subNote'); if (n) n.hidden = true;
      };
      try {
        fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: body }).then(done, done);
      } catch (err) { done(); }
    });
  }
})();
