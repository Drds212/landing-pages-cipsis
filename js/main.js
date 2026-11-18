/**
 * CIP FLUID — Funcionalidades Principales
 * Manejo de video, lazy loading, navbar, menú móvil, lightbox accesible y correo.
 */
'use strict';

document.addEventListener('DOMContentLoaded', function () {

  /* ---- 1. Video en segundo plano diferido ---- */
  (function initHeroVideo() {
    var video = document.getElementById('heroVideo');
    if (!video) return;

    function startVideo() {
      video.setAttribute('preload', 'auto');
      video.load();
      video.play().catch(function () {});
    }

    if ('requestIdleCallback' in window) {
      requestIdleCallback(startVideo, { timeout: 2000 });
    } else {
      setTimeout(startVideo, 200);
    }
  })();


  /* ---- 2. Carga diferida de imágenes (Lazy loading) ---- */
  (function initLazyImages() {
    var lazyImgs = document.querySelectorAll('img.lazy-img');
    if (!lazyImgs.length) return;

    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var img = entry.target;
          var src = img.getAttribute('data-src');
          if (!src) return;

          img.src = src;
          img.onload = function () {
            img.classList.add('img-loaded');
          };
          img.removeAttribute('data-src');
          observer.unobserve(img);
        });
      }, {
        rootMargin: '200px 0px',
        threshold: 0
      });

      lazyImgs.forEach(function (img) { io.observe(img); });
    } else {
      lazyImgs.forEach(function (img) {
        var src = img.getAttribute('data-src');
        if (src) {
          img.src = src;
          img.classList.add('img-loaded');
        }
      });
    }
  })();


  /* ---- 3. Animaciones al scroll (.reveal) ---- */
  (function initScrollReveal() {
    var reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    var revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    reveals.forEach(function (el) { revealIO.observe(el); });
  })();


  /* ---- 4. Estado de la barra de navegación al scroll ---- */
  (function initNavbar() {
    var navbar = document.getElementById('navbar');
    if (!navbar) return;
    var ticking = false;

    function updateNav() {
      if (window.scrollY > 60) {
        navbar.classList.remove('transparent');
        navbar.classList.add('solid');
      } else {
        navbar.classList.remove('solid');
        navbar.classList.add('transparent');
      }
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(updateNav);
        ticking = true;
      }
    }, { passive: true });

    updateNav();
  })();


  /* ---- 5. Menú móvil ---- */
  var burgerBtn   = document.getElementById('burgerBtn');
  var mobileMenu  = document.getElementById('mobileMenu');
  var mobileClose = document.getElementById('mobileClose');

  function openMobileMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.add('open');
    if (burgerBtn) burgerBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.remove('open');
    if (burgerBtn) burgerBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (burgerBtn)   burgerBtn.addEventListener('click', openMobileMenu);
  if (mobileClose) mobileClose.addEventListener('click', closeMobileMenu);
  window.closeMobileMenu = closeMobileMenu;


  /* ---- 6. Lightbox de productos con soporte táctil y teclado ---- */
  (function initLightbox() {
    var lightbox        = document.getElementById('lightbox');
    var lightboxImg     = document.getElementById('lightboxImg');
    var lightboxName    = document.getElementById('lightboxName');
    var lightboxMat     = document.getElementById('lightboxMaterial');
    var lightboxClose   = document.getElementById('lightboxClose');
    var lightboxBack    = document.getElementById('lightboxBackdrop');
    var lightboxPrev    = document.getElementById('lightboxPrev');
    var lightboxNext    = document.getElementById('lightboxNext');

    if (!lightbox) return;

    var prodCards = Array.from(document.querySelectorAll('.prod-card[data-img]'));
    var currentIdx = 0;

    function openLightbox(idx) {
      currentIdx = idx;
      var card = prodCards[idx];
      if (!card) return;

      var src  = card.dataset.img || '';
      var name = card.dataset.name || '';
      var mat  = card.dataset.material || '';

      if (lightboxImg) {
        lightboxImg.style.opacity = '0';
        lightboxImg.src = src;
        lightboxImg.alt = name;
        lightboxImg.onload = function () {
          lightboxImg.style.transition = 'opacity 0.3s ease';
          lightboxImg.style.opacity = '1';
        };
      }

      if (lightboxName) lightboxName.textContent = name;
      if (lightboxMat)  lightboxMat.innerHTML   = mat;

      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
      if (lightboxClose) lightboxClose.focus();
    }

    function closeLightbox() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
      if (lightboxImg) {
        setTimeout(function () { lightboxImg.src = ''; }, 300);
      }
    }

    function showPrev() {
      if (prodCards.length) openLightbox((currentIdx - 1 + prodCards.length) % prodCards.length);
    }

    function showNext() {
      if (prodCards.length) openLightbox((currentIdx + 1) % prodCards.length);
    }

    prodCards.forEach(function (card, idx) {
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', 'Ver imagen de ' + (card.dataset.name || 'producto'));
      card.addEventListener('click', function () { openLightbox(idx); });
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(idx);
        }
      });
    });

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxBack)  lightboxBack.addEventListener('click',  closeLightbox);
    if (lightboxPrev)  lightboxPrev.addEventListener('click',  showPrev);
    if (lightboxNext)  lightboxNext.addEventListener('click',  showNext);

    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape')     closeLightbox();
      if (e.key === 'ArrowLeft')  showPrev();
      if (e.key === 'ArrowRight') showNext();
    });

    var touchStartX = 0;
    lightbox.addEventListener('touchstart', function (e) {
      touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });

    lightbox.addEventListener('touchend', function (e) {
      var dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 50) {
        dx < 0 ? showNext() : showPrev();
      }
    }, { passive: true });
  })();

});

/* ---- 7. Redirección y plantilla de correo ---- */
function abrirCorreo(e, to) {
  if (e) e.preventDefault();
  var email   = to || 'ventas@cipfluid.com';
  var subject = encodeURIComponent('Solicitud de Cotización - CIP FLUID');
  var body    = encodeURIComponent(
    'Estimado equipo de CIP FLUID,\n\nMe gustaría solicitar una cotización para:\n\n- Producto/servicio:\n- Cantidad:\n- Detalles:\n\nDatos de contacto:\nNombre:\nTeléfono:\nCorreo:\n\nSaludos cordiales,'
  );
  var isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  if (isMobile) {
    window.location.href = 'mailto:' + email + '?subject=' + subject + '&body=' + body;
  } else {
    window.open('https://mail.google.com/mail/?view=cm&fs=1&to=' + email + '&su=' + subject + '&body=' + body, '_blank');
  }
}
window.abrirCorreo = abrirCorreo;
