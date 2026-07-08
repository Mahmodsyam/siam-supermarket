/* ========================================
   سوبر ماركت صيام - MikroTik Hotspot Portal
   script.js — ديناميكي ومثير
   ======================================== */

(function () {
  'use strict';

  var GOLD = '#C5A059';

  function init() {
    createToastContainer();
    setupForm();
    setupCopyButtons();
    setupScrollAnimations();
    handleBrokenImages();
    startTypingEffect();
    startAnimatedCounters();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  /* ===== TOAST ===== */
  function createToastContainer() {
    var el = document.getElementById('toast-container');
    if (!el) {
      el = document.createElement('div');
      el.id = 'toast-container';
      el.className = 'toast-container';
      document.body.appendChild(el);
    }
  }

  function showToast(msg, type) {
    type = type || 'info';
    var container = document.getElementById('toast-container');
    if (!container) return;
    var t = document.createElement('div');
    t.className = 'toast toast-' + type;
    t.textContent = msg;
    t.setAttribute('role', 'alert');
    container.appendChild(t);
    var timer = setTimeout(function () { dismissToast(t); }, 4000);
    t.addEventListener('click', function () {
      clearTimeout(timer);
      dismissToast(t);
    });
  }

  function dismissToast(t) {
    if (!t || !t.parentNode) return;
    t.style.opacity = '0';
    t.style.transform = 'translateY(8px)';
    t.style.transition = 'opacity .25s,transform .25s';
    setTimeout(function () {
      if (t.parentNode) t.parentNode.removeChild(t);
    }, 250);
  }

  /* ===== FORM ===== */
  function setupForm() {
    var form = document.getElementById('login-form');
    if (!form) return;
    var username = document.getElementById('login-username');
    var password = document.getElementById('login-password');
    var submitBtn = document.getElementById('login-btn');

    form.addEventListener('submit', function (e) {
      var u = username ? username.value.trim() : '';
      var p = password ? password.value.trim() : '';

      if (!u && !p) {
        e.preventDefault();
        showToast('يرجى إدخال اسم المستخدم وكلمة المرور', 'error');
        if (username) highlight(username);
        return;
      }
      if (!u) {
        e.preventDefault();
        showToast('يرجى إدخال اسم المستخدم', 'error');
        if (username) highlight(username);
        return;
      }
      if (!p) {
        e.preventDefault();
        showToast('يرجى إدخال كلمة المرور', 'error');
        if (password) highlight(password);
        return;
      }
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'جاري تسجيل الدخول...';
      }
    });
  }

  function highlight(el) {
    if (!el) return;
    el.style.borderColor = '#e74c3c';
    el.focus();
    setTimeout(function () { el.style.borderColor = ''; }, 2000);
  }

  /* ===== COPY TO CLIPBOARD ===== */
  function setupCopyButtons() {
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('.copy-btn');
      if (!btn) return;
      var text = btn.getAttribute('data-copy');
      var msg = btn.getAttribute('data-msg') || 'تم النسخ';
      if (!text) return;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () {
          showToast(msg, 'success');
        }).catch(function () {
          fallbackCopy(text, msg);
        });
      } else {
        fallbackCopy(text, msg);
      }
    });
  }

  function fallbackCopy(text, msg) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';ta.style.left = '-9999px';ta.style.top = '0';
    ta.style.opacity = '0';ta.style.height = '0';
    document.body.appendChild(ta);
    ta.focus();ta.select();
    try {
      document.execCommand('copy');
      showToast(msg, 'success');
    } catch (e) {
      showToast('تعذر النسخ، يرجى النسخ يدوياً', 'error');
    }
    document.body.removeChild(ta);
  }

  /* ===== IMAGE FALLBACK ===== */
  function handleBrokenImages() {
    var imgs = document.querySelectorAll('img[src]');
    Array.prototype.forEach.call(imgs, function (img) {
      if (img.complete && img.naturalWidth === 0) {
        hideBroken(img);
      }
      img.addEventListener('error', function () { hideBroken(this); });
    });
  }

  function hideBroken(img) {
    if (!img || !img.parentNode) return;
    img.style.display = 'none';
    var placeholder = img.parentNode.querySelector('.gallery-placeholder');
    if (placeholder) placeholder.style.display = 'flex';
  }

  /* ===== SCROLL ANIMATIONS ===== */
  function setupScrollAnimations() {
    var els = document.querySelectorAll('.animate-on-scroll');
    if (!els.length) return;
    if ('IntersectionObserver' in window) {
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            obs.unobserve(e.target);
          }
        });
      }, { threshold: 0.1 });
      Array.prototype.forEach.call(els, function (el) { obs.observe(el); });
    } else {
      Array.prototype.forEach.call(els, function (el) { el.classList.add('visible'); });
    }
  }

  /* ===== TYPING EFFECT ===== */
  function startTypingEffect() {
    var el = document.getElementById('hero-typing');
    if (!el) return;

    var phrases = [
      'أهلاً بكم في سوبر ماركت صيام',
      'نسعد بخدمتكم وتوفير جميع احتياجاتكم',
      'تسوق بثقة وجودة عالية',
      'مواد غذائية طازجة يومياً'
    ];
    var phraseIndex = 0;
    var charIndex = 0;
    var isDeleting = false;
    var speed = 60;

    function type() {
      var current = phrases[phraseIndex];
      if (!isDeleting) {
        el.textContent = current.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === current.length) {
          isDeleting = true;
          speed = 2000;
        } else {
          speed = 40 + Math.random() * 40;
        }
      } else {
        el.textContent = current.substring(0, charIndex);
        charIndex--;
        if (charIndex < 0) {
          isDeleting = false;
          charIndex = 0;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          speed = 500;
        } else {
          speed = 20;
        }
      }
      setTimeout(type, speed);
    }

    setTimeout(type, 1500);
  }

  /* ===== ANIMATED COUNTERS ===== */
  function startAnimatedCounters() {
    var counters = document.querySelectorAll('.counter-value');
    if (!counters.length) return;

    Array.prototype.forEach.call(counters, function (el) {
      var target = parseInt(el.getAttribute('data-target'), 10);
      if (isNaN(target)) return;
      var current = 0;
      var step = Math.ceil(target / 40);
      var interval = setInterval(function () {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(interval);
        }
        el.textContent = current.toLocaleString('ar-SA');
      }, 30);
    });
  }

  window.showToast = showToast;
})();
