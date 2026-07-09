(function () {
  'use strict';

  function init() {
    createToastContainer();
    setupForm();
    setupCopyButtons();
    setupScrollAnimations();
    handleBrokenImages();
    startTypingEffect();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

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

  function setupForm() {
    var form = document.getElementById('login-form');
    if (!form) return;
    var username = document.getElementById('login-username');
    var password = document.getElementById('login-password');
    var submitBtn = document.getElementById('login-btn');
    var chapId = document.querySelector('input[name="chap-id"]');
    var chapChallenge = document.querySelector('input[name="chap-challenge"]');

    form.addEventListener('submit', function (e) {
      var u = username ? username.value.trim() : '';
      var p = password ? password.value : '';

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

      if (chapId && chapChallenge && chapId.value && chapChallenge.value) {
        password.value = hexMD5(chapId.value + p + chapChallenge.value);
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

  function hexMD5(s) {
    function md5cycle(x, k) {
      var a = x[0], b = x[1], c = x[2], d = x[3];
      a = ff(a, b, c, d, k[0], 7, -680876936); d = ff(d, a, b, c, k[1], 12, -389564586); c = ff(c, d, a, b, k[2], 17, 606105819); b = ff(b, c, d, a, k[3], 22, -1044525330);
      a = ff(a, b, c, d, k[4], 7, -176418897); d = ff(d, a, b, c, k[5], 12, 1200080426); c = ff(c, d, a, b, k[6], 17, -1473231341); b = ff(b, c, d, a, k[7], 22, -45705983);
      a = ff(a, b, c, d, k[8], 7, 1770035416); d = ff(d, a, b, c, k[9], 12, -1958414417); c = ff(c, d, a, b, k[10], 17, -42063); b = ff(b, c, d, a, k[11], 22, -1990404162);
      a = ff(a, b, c, d, k[12], 7, 1804603682); d = ff(d, a, b, c, k[13], 12, -40341101); c = ff(c, d, a, b, k[14], 17, -1502002290); b = ff(b, c, d, a, k[15], 22, 1236535329);
      a = gg(a, b, c, d, k[1], 5, -165796510); d = gg(d, a, b, c, k[6], 9, -1069501632); c = gg(c, d, a, b, k[11], 14, 643717713); b = gg(b, c, d, a, k[0], 20, -373897302);
      a = gg(a, b, c, d, k[5], 5, -701558691); d = gg(d, a, b, c, k[10], 9, 38016083); c = gg(c, d, a, b, k[15], 14, -660478335); b = gg(b, c, d, a, k[4], 20, -405537848);
      a = gg(a, b, c, d, k[9], 5, 568446438); d = gg(d, a, b, c, k[14], 9, -1019803690); c = gg(c, d, a, b, k[3], 14, -187363961); b = gg(b, c, d, a, k[8], 20, 1163531501);
      a = gg(a, b, c, d, k[13], 5, -1444681467); d = gg(d, a, b, c, k[2], 9, -51403784); c = gg(c, d, a, b, k[7], 14, 1735328473); b = gg(b, c, d, a, k[12], 20, -1926607734);
      a = hh(a, b, c, d, k[5], 4, -378558); d = hh(d, a, b, c, k[8], 11, -2022574463); c = hh(c, d, a, b, k[11], 16, 1839030562); b = hh(b, c, d, a, k[14], 23, -35309556);
      a = hh(a, b, c, d, k[1], 4, -1530992060); d = hh(d, a, b, c, k[4], 11, 1272893353); c = hh(c, d, a, b, k[7], 16, -155497632); b = hh(b, c, d, a, k[10], 23, -1094730640);
      a = hh(a, b, c, d, k[13], 4, 681279174); d = hh(d, a, b, c, k[0], 11, -358537222); c = hh(c, d, a, b, k[3], 16, -722521979); b = hh(b, c, d, a, k[6], 23, 76029189);
      a = hh(a, b, c, d, k[9], 4, -640364487); d = hh(d, a, b, c, k[12], 11, -421815835); c = hh(c, d, a, b, k[15], 16, 530742520); b = hh(b, c, d, a, k[2], 23, -995338651);
      a = ii(a, b, c, d, k[0], 6, -198630844); d = ii(d, a, b, c, k[7], 10, 1126891415); c = ii(c, d, a, b, k[14], 15, -1416354905); b = ii(b, c, d, a, k[5], 21, -57434055);
      a = ii(a, b, c, d, k[12], 6, 1700485571); d = ii(d, a, b, c, k[3], 10, -1894986606); c = ii(c, d, a, b, k[10], 15, -1051523); b = ii(b, c, d, a, k[1], 21, -2054922799);
      a = ii(a, b, c, d, k[8], 6, 1873313359); d = ii(d, a, b, c, k[15], 10, -30611744); c = ii(c, d, a, b, k[6], 15, -1560198380); b = ii(b, c, d, a, k[13], 21, 1309151649);
      a = ii(a, b, c, d, k[4], 6, -145523070); d = ii(d, a, b, c, k[11], 10, -1120210379); c = ii(c, d, a, b, k[2], 15, 718787259); b = ii(b, c, d, a, k[9], 21, -343485551);
      x[0] = add32(a, x[0]); x[1] = add32(b, x[1]); x[2] = add32(c, x[2]); x[3] = add32(d, x[3]);
    }
    function cmn(q, a, b, x, s, t) { return add32(bitRol(add32(add32(a, q), add32(x, t)), s), b); }
    function ff(a, b, c, d, x, s, t) { return cmn((b & c) | ((~b) & d), a, b, x, s, t); }
    function gg(a, b, c, d, x, s, t) { return cmn((b & d) | (c & (~d)), a, b, x, s, t); }
    function hh(a, b, c, d, x, s, t) { return cmn(b ^ c ^ d, a, b, x, s, t); }
    function ii(a, b, c, d, x, s, t) { return cmn(c ^ (b | (~d)), a, b, x, s, t); }
    function add32(a, b) { return (a + b) & 0xFFFFFFFF; }
    function bitRol(n, c) { return (n << c) | (n >>> (32 - c)); }

    function str2binl(str) {
      var bin = [], ch, i;
      for (i = 0; i < str.length * 8; i += 8) {
        ch = str.charCodeAt(i / 8);
        bin[i >> 5] |= (ch & 255) << (i % 32);
      }
      return bin;
    }

    function binl2hex(bin) {
      var hex = '0123456789abcdef', str = '', i;
      for (i = 0; i < bin.length * 4; i++) {
        str += hex.charAt((bin[i >> 2] >> ((i % 4) * 8 + 4)) & 15) + hex.charAt((bin[i >> 2] >> ((i % 4) * 8)) & 15);
      }
      return str;
    }

    var x = str2binl(s);
    var len = s.length * 8;
    x[len >> 5] |= 128 << (len % 32);
    x[(((len + 64) >>> 9) << 4) + 14] = len;
    md5cycle(x.slice(), [1732584193, -271733879, -1732584194, 271733878]);
    return binl2hex(x);
  }

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

  function startTypingEffect() {
    var el = document.getElementById('hero-typing');
    if (!el) return;
    var phrases = [
      'أهلاً بكم في سوبر ماركت صيام',
      'نسعد بخدمتكم وتوفير جميع احتياجاتكم',
      'تسوق بثقة وجودة عالية',
      'مواد غذائية طازجة يومياً'
    ];
    var phraseIndex = 0, charIndex = 0, isDeleting = false, speed = 60;
    function type() {
      var current = phrases[phraseIndex];
      if (!isDeleting) {
        el.textContent = current.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === current.length) { isDeleting = true; speed = 2000; }
        else { speed = 40 + Math.random() * 40; }
      } else {
        el.textContent = current.substring(0, charIndex);
        charIndex--;
        if (charIndex < 0) { isDeleting = false; charIndex = 0; phraseIndex = (phraseIndex + 1) % phrases.length; speed = 500; }
        else { speed = 20; }
      }
      setTimeout(type, speed);
    }
    setTimeout(type, 1500);
  }

  window.showToast = showToast;
})();
