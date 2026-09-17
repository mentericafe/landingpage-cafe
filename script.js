(() => {
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('#site-nav');
  const year = document.querySelector('#year');
  const installButton = document.querySelector('#install-app');
  const offlineBadge = document.querySelector('#offline-badge');
  const todayStatus = document.querySelector('#today-status');
  const todayHours = document.querySelector('#today-hours');
  const openDot = document.querySelector('#open-dot');

  if (year) year.textContent = new Date().getFullYear();

  navToggle?.addEventListener('click', () => {
    const open = nav?.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(Boolean(open)));
  });

  nav?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      navToggle?.setAttribute('aria-expanded', 'false');
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.06 });
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

  document.querySelectorAll('.filter').forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter || 'all';
      document.querySelectorAll('.filter').forEach((b) => {
        const selected = b === button;
        b.classList.toggle('active', selected);
        b.setAttribute('aria-selected', String(selected));
      });
      document.querySelectorAll('.menu-card').forEach((card) => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('hidden', !match);
      });
    });
  });

  // Jam operasional untuk status hari ini (zona waktu browser / pengunjung).
  const correctedHours = {
    0: ['09:00', '23:00'],
    1: null,
    2: ['16:00', '23:00'],
    3: ['16:00', '23:00'],
    4: ['16:00', '23:00'],
    5: ['16:00', '23:00'],
    6: ['09:00', '23:00']
  };

  const updateTodayStatus = () => {
    if (!todayStatus || !todayHours) return;
    const now = new Date();
    const day = now.getDay();
    const schedule = correctedHours[day];
    const dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const today = dayNames[day];

    document.querySelectorAll('.hours-row').forEach((row) => {
      row.classList.toggle('today', row.dataset.day === ({0:'Sunday',1:'Monday',2:'Tuesday',3:'Wednesday',4:'Thursday',5:'Friday',6:'Saturday'})[day]);
    });

    if (!schedule) {
      todayStatus.textContent = `${today} • Tutup hari ini`;
      todayHours.textContent = 'Buka kembali sesuai jadwal operasional.';
      openDot?.classList.remove('is-open');
      return;
    }

    const [open, close] = schedule;
    const nowMinutes = now.getHours() * 60 + now.getMinutes();
    const [oh, om] = open.split(':').map(Number);
    const [ch, cm] = close.split(':').map(Number);
    const isOpen = nowMinutes >= (oh * 60 + om) && nowMinutes < (ch * 60 + cm);

    todayStatus.textContent = isOpen ? `${today} • Sedang buka` : `${today} • Di luar jam buka`;
    todayHours.textContent = `${open.replace(':','.') }–${close.replace(':','.')}`;
    openDot?.classList.toggle('is-open', isOpen);
  };
  updateTodayStatus();
  window.setInterval(updateTodayStatus, 60000);

  let deferredPrompt = null;
  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredPrompt = event;
    if (installButton) installButton.hidden = false;
  });

  installButton?.addEventListener('click', async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
    installButton.hidden = true;
  });

  window.addEventListener('appinstalled', () => {
    if (installButton) installButton.hidden = true;
  });

  const updateOfflineState = () => {
    if (!offlineBadge) return;
    offlineBadge.hidden = navigator.onLine;
  };
  window.addEventListener('online', updateOfflineState);
  window.addEventListener('offline', updateOfflineState);
  updateOfflineState();

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').catch(() => {});
    });
  }
})();
