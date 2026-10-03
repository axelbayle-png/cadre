(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  window.celestiarToast = (message) => {
    const toast = document.getElementById('Toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-visible');
    window.clearTimeout(toast._timer);
    toast._timer = window.setTimeout(() => toast.classList.remove('is-visible'), 3200);
  };

  function initMenu() {
    const toggle = document.querySelector('[data-menu-toggle]');
    const menu = document.querySelector('[data-mobile-menu]');
    if (!toggle || !menu) return;
    toggle.addEventListener('click', () => {
      const open = menu.hidden;
      menu.hidden = !open;
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    });
  }

  function initModals() {
    const openers = document.querySelectorAll('[data-modal-open]');
    const modals = document.querySelectorAll('.modal');
    const openModal = (id) => {
      const modal = document.getElementById(`modal-${id}`);
      if (!modal) return;
      modal.hidden = false;
      document.body.classList.add('modal-open');
      const close = modal.querySelector('[data-modal-close]');
      if (close) close.focus({ preventScroll: true });
    };
    const closeModals = () => {
      modals.forEach((modal) => { modal.hidden = true; });
      document.body.classList.remove('modal-open');
    };
    openers.forEach((button) => button.addEventListener('click', () => openModal(button.dataset.modalOpen)));
    document.querySelectorAll('[data-modal-close]').forEach((button) => button.addEventListener('click', closeModals));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeModals();
    });
    if (document.querySelector('#modal-contact .form-success')) openModal('contact');
  }

  function initReveal() {
    const items = document.querySelectorAll('.reveal');
    if (!items.length) return;
    if (reducedMotion || !('IntersectionObserver' in window)) {
      items.forEach((item) => item.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -40px 0px' });
    items.forEach((item, index) => {
      item.style.transitionDelay = item.classList.contains('reveal-delay-3') || item.classList.contains('reveal-delay-4') || item.classList.contains('reveal-delay-5')
        ? item.style.transitionDelay
        : `${Math.min(index % 3, 2) * 80}ms`;
      observer.observe(item);
    });
  }

  function initStarfields() {
    document.querySelectorAll('[data-starfield]').forEach((canvas) => {
      const ctx = canvas.getContext('2d');
      const density = Number(canvas.dataset.density || 120);
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      let width = 0;
      let height = 0;
      let stars = [];
      let meteor = null;
      let animationFrame;
      let time = 0;

      const resize = () => {
        const rect = canvas.getBoundingClientRect();
        width = Math.max(1, Math.floor(rect.width * ratio));
        height = Math.max(1, Math.floor(rect.height * ratio));
        canvas.width = width;
        canvas.height = height;
        stars = Array.from({ length: density }, () => ({
          x: Math.random() * width,
          y: Math.random() * height,
          r: (Math.random() * 1.1 + 0.3) * ratio,
          p: Math.random() * Math.PI * 2,
          s: 0.4 + Math.random() * 1.6,
          hue: Math.random() < 0.1 ? '110,231,255' : Math.random() < 0.08 ? '216,180,106' : '255,255,255',
        }));
      };

      const draw = () => {
        time += 0.016;
        ctx.clearRect(0, 0, width, height);

        stars.forEach((star) => {
          const alpha = 0.2 + 0.8 * Math.abs(Math.sin(time * star.s + star.p));
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${star.hue},${alpha})`;
          ctx.fill();
        });

        if (!meteor && Math.random() < 0.0035) {
          meteor = {
            x: Math.random() * width * 0.7 + width * 0.15,
            y: Math.random() * height * 0.3,
            vx: 7 * ratio,
            vy: 3.2 * ratio,
            life: 1,
          };
        }

        if (meteor) {
          meteor.x += meteor.vx;
          meteor.y += meteor.vy;
          meteor.life -= 0.02;
          const gradient = ctx.createLinearGradient(
            meteor.x,
            meteor.y,
            meteor.x - meteor.vx * 9,
            meteor.y - meteor.vy * 9,
          );
          gradient.addColorStop(0, `rgba(217,246,255,${Math.max(meteor.life, 0)})`);
          gradient.addColorStop(1, 'rgba(217,246,255,0)');
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1.5 * ratio;
          ctx.beginPath();
          ctx.moveTo(meteor.x, meteor.y);
          ctx.lineTo(meteor.x - meteor.vx * 9, meteor.y - meteor.vy * 9);
          ctx.stroke();
          if (meteor.life <= 0 || meteor.x > width + 100) meteor = null;
        }

        if (!reducedMotion) animationFrame = window.requestAnimationFrame(draw);
      };

      resize();
      draw();
      window.addEventListener('resize', () => {
        window.cancelAnimationFrame(animationFrame);
        resize();
        draw();
      }, { passive: true });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initMenu();
    initModals();
    initReveal();
    initStarfields();
  });
})();
