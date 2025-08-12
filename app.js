// Mobile nav
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    const opened = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', opened ? 'true' : 'false');
  });
}

// Theme toggle
const root = document.documentElement;
const themeBtn = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') root.classList.add('light');
if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    root.classList.toggle('light');
    localStorage.setItem('theme', root.classList.contains('light') ? 'light' : 'dark');
  });
}

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
},{threshold:0.08});
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth', block:'start'});
      navMenu?.classList.remove('open');
    }
  });
});

// Gallery filter
const filterButtons = document.querySelectorAll('.chip');
const items = document.querySelectorAll('.gallery .item');
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    items.forEach(it => {
      it.style.display = (f === 'all' || it.dataset.cat === f) ? '' : 'none';
    });
  });
});

// Lightbox
const lightbox = document.getElementById('lightbox');
const lbImg = document.querySelector('.lb-img');
const lbCap = document.querySelector('.lb-cap');
const lbClose = document.querySelector('.lb-close');
document.querySelectorAll('.gallery .item').forEach(fig => {
  fig.addEventListener('click', () => {
    const img = fig.querySelector('img');
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lbCap.textContent = fig.querySelector('figcaption')?.textContent || '';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden','false');
  });
});
lbClose?.addEventListener('click', () => {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden','true');
});
lightbox?.addEventListener('click', (e) => {
  if (e.target === lightbox) lbClose.click();
});

// Contact form (frontend only)
const form = document.getElementById('contactForm');
const statusEl = document.getElementById('formStatus');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const agree = document.getElementById('agree').checked;
  let ok = true;
  const emailRe = /.+@.+\..+/;
  const setErr = (id, msg) => {
    const fld = form.querySelector('#' + id);
    const err = fld?.closest('.field')?.querySelector('.error');
    if (err) err.textContent = msg || '';
  };
  setErr('name',''); setErr('email',''); statusEl.textContent = '';
  if (!name) { setErr('name','Укажите имя'); ok = false; }
  if (!emailRe.test(email)) { setErr('email','Неверный email'); ok = false; }
  if (!agree) { statusEl.textContent = 'Нужно согласиться с обработкой данных.'; ok = false; }
  if (!ok) return;
  statusEl.textContent = 'Спасибо! Заявка отправлена (демо-режим).';
  form.reset();
});

// Year
document.getElementById('year').textContent = new Date().getFullYear();
