// Split-flap counter: flips from START to END over DURATION_MS.
(function () {
  const START = 1000000;
  const END = 1750000;
  const DURATION_MS = 4000;
  const TICK_MS = 50;
  const FLIP_MS = 200;

  const root = document.getElementById('flap-counter');
  if (!root) return;

  function makeCell(char) {
    const cell = document.createElement('div');
    cell.className = 'flap';
    cell.setAttribute('aria-hidden', 'true');
    cell.innerHTML =
      '<div class="flap-top"><span></span></div>' +
      '<div class="flap-bottom"><span></span></div>' +
      '<div class="flap-fold-top"><span></span></div>' +
      '<div class="flap-fold-bottom"><span></span></div>';
    cell.value = char;
    setStatic(cell, char);
    return cell;
  }

  function setText(cell, selector, char) {
    cell.querySelector(selector + ' span').textContent = char;
  }

  function setStatic(cell, char) {
    setText(cell, '.flap-top', char);
    setText(cell, '.flap-bottom', char);
    setText(cell, '.flap-fold-top', char);
    setText(cell, '.flap-fold-bottom', char);
  }

  function flipTo(cell, char) {
    if (cell.value === char) return;
    const old = cell.value;
    cell.value = char;
    clearTimeout(cell.timer);
    cell.classList.remove('flipping');
    setText(cell, '.flap-top', char);
    setText(cell, '.flap-bottom', old);
    setText(cell, '.flap-fold-top', old);
    setText(cell, '.flap-fold-bottom', char);
    void cell.offsetWidth; // restart the CSS animation
    cell.classList.add('flipping');
    cell.timer = setTimeout(() => {
      cell.classList.remove('flipping');
      setStatic(cell, char);
    }, FLIP_MS);
  }

  const format = n => '$' + Math.round(n).toLocaleString('en-US');

  const initial = format(START);
  const cells = [...initial].map(ch => {
    if (ch === '$' || ch === ',') {
      const sep = document.createElement('span');
      sep.className = 'flap-sep';
      sep.setAttribute('aria-hidden', 'true');
      sep.textContent = ch;
      root.appendChild(sep);
      return null;
    }
    const cell = makeCell(ch);
    root.appendChild(cell);
    return cell;
  });

  const t0 = performance.now();
  const timer = setInterval(() => {
    const p = Math.min((performance.now() - t0) / DURATION_MS, 1);
    const text = format(START + (END - START) * p);
    [...text].forEach((ch, i) => cells[i] && flipTo(cells[i], ch));
    if (p >= 1) clearInterval(timer);
  }, TICK_MS);
})();
