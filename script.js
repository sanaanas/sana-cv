//Mobile navigation toggle
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
navToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

    // Terminal typing + test results reveal
    
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const typedEl = document.getElementById('typed-line');
  const resultsEl = document.getElementById('test-results');
  const command = '$ run sana_nawaz --profile';

  const results = [
    { text: '✓ 5+ years QA — Booking.com', cls: 'pass' },
    { text: '✓ Automation — Playwright, JavaScript', cls: 'pass' },
    { text: '✓ Accessibility — WCAG 2.1', cls: 'pass' },
    { text: '✓ API testing — Postman, SQL', cls: 'pass' },
    { text: 'All tests passed. Status: ready for development.', cls: 'summary' }
  ];

   function showResultsInstantly(){
    typedEl.textContent = command;
    results.forEach(r => {
      const div = document.createElement('div');
      div.className = 'test-line ' + r.cls;
      div.style.opacity = '1';
      div.textContent = r.text;
      resultsEl.appendChild(div);
    });
  }

   if (reduceMotion) {
    showResultsInstantly();
  } else {
    let i = 0;
    typedEl.innerHTML = '<span class="cursor">&nbsp;</span>';
    const typeInterval = setInterval(() => {
      i++;
      typedEl.innerHTML = command.slice(0, i) + '<span class="cursor">&nbsp;</span>';
      if (i >= command.length) {
        clearInterval(typeInterval);
        let r = 0;
        const lineInterval = setInterval(() => {
          if (r >= results.length) { clearInterval(lineInterval); return; }
          const div = document.createElement('div');
          div.className = 'test-line ' + results[r].cls;
          div.textContent = results[r].text;
          resultsEl.appendChild(div);
          r++;
        }, 220);
      }
    }, 35);
  }