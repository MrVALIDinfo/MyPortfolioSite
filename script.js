/* =========================
  script.js — burger, theme, smooth scroll, scroll-top
   ========================= */

(() => {
  // элементы
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  const navLinks = document.querySelectorAll('.nav-link');
  const themeToggle = document.getElementById('theme-toggle');
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  const header = document.getElementById('siteHeader');

  /* ---------- THEME ---------- */
  (function initTheme() {
    const saved = localStorage.getItem('theme') || 'dark';
    document.body.classList.remove('dark', 'light');
    document.body.classList.add(saved);
    themeToggle.setAttribute('aria-pressed', saved === 'light' ? 'true' : 'false');
  })();

  themeToggle.addEventListener('click', (e) => {
    const isDark = document.body.classList.contains('dark');
    document.body.classList.toggle('dark', !isDark);
    document.body.classList.toggle('light', isDark);
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
    themeToggle.setAttribute('aria-pressed', isDark ? 'true' : 'false');
  });

  /* ---------- BURGER MENU ---------- */
  // helper: toggle nav
  function openNav() {
    nav.classList.add('active');
    burger.classList.add('active');
    burger.setAttribute('aria-expanded', 'true');
  }
  function closeNav() {
    nav.classList.remove('active');
    burger.classList.remove('active');
    burger.setAttribute('aria-expanded', 'false');
  }
  function toggleNav() {
    if (nav.classList.contains('active')) closeNav();
    else openNav();
  }

  // клик по бургеру
  burger.addEventListener('click', (e) => {
    e.stopPropagation(); // чтобы клик не дошёл до document и не закрыл меню сразу
    toggleNav();
  });

  // закрывать при клике на ссылку
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // smooth scroll handled отдельно, но закрываем меню сразу
      closeNav();
    });
  });

  // закрывать при клике вне nav (document)
  document.addEventListener('click', (e) => {
    // если меню открыто и клик вне nav и вне burger => закрыть
    if (nav.classList.contains('active') && !nav.contains(e.target) && !burger.contains(e.target)) {
      closeNav();
    }
  });

  // закрывать меню при изменении размера (например повернули телефон)
  window.addEventListener('resize', () => {
    // на больших экранах nav всегда видно; если ширина > 768, убедимся, что меню показано стандартно и класс удаления не ломает стили
    if (window.innerWidth > 768) {
      nav.classList.remove('active');
      burger.classList.remove('active');
      burger.setAttribute('aria-expanded', 'false');
    }
  });

  /* ---------- SMOOTH SCROLL with offset ---------- */
  // вычисление высоты header (динамически)
  function getHeaderHeight() {
    return header ? header.offsetHeight : 0;
  }

  // делегируем все якорные ссылки
  document.addEventListener('click', (e) => {
    const target = e.target.closest('a[href^="#"]');
    if (!target) return;
    const href = target.getAttribute('href');
    if (!href || href === '#') return;
    const elem = document.querySelector(href);
    if (!elem) return;

    e.preventDefault();
    closeNav(); // закрываем меню (на случай мобильного)
    const top = elem.getBoundingClientRect().top + window.pageYOffset - getHeaderHeight() - 8;
    window.scrollTo({ top, behavior: 'smooth' });
  });

  /* ---------- SCROLL TO TOP BUTTON ---------- */
  // show always but with visibility behaviour
  scrollTopBtn.style.display = 'flex'; // гарантируем, что кнопка присутствует в DOM и показывается
  function updateScrollTopVisibility() {
    const show = window.scrollY > 120;
    scrollTopBtn.classList.toggle('visible', show);
  }
  window.addEventListener('scroll', updateScrollTopVisibility);
  updateScrollTopVisibility();

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    closeNav(); // если кто-то случайно открыл меню — закрыть
  });

  /* ---------- prevent double-tap selection on mobile (UX nicety) ---------- */
  document.addEventListener('touchstart', () => {}, { passive: true });

})();
