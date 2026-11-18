/**
 * CIP SISTEM — Visor Lightbox para páginas de distribuidores
 */
'use strict';

function abrirLightbox(btn) {
  var imgWrap = btn.closest('.ic-card__img-wrap');
  var img = imgWrap ? imgWrap.querySelector('img') : null;
  var lbImg = document.getElementById('lb-img');
  var lbTitle = document.getElementById('lb-title');
  var lbOverlay = document.getElementById('lb-overlay');

  if (lbImg && img) {
    lbImg.src = img.src;
    lbImg.alt = img.alt || btn.dataset.title || '';
  }
  if (lbTitle) {
    lbTitle.textContent = btn.dataset.title || '';
  }
  if (lbOverlay) {
    lbOverlay.classList.add('active');
  }
  document.body.style.overflow = 'hidden';
}

function cerrarLightbox() {
  var lbOverlay = document.getElementById('lb-overlay');
  if (lbOverlay) {
    lbOverlay.classList.remove('active');
  }
  document.body.style.overflow = '';
}

function cerrarLightboxFondo(e) {
  if (e.target === document.getElementById('lb-overlay')) {
    cerrarLightbox();
  }
}

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    cerrarLightbox();
  }
});

window.abrirLightbox = abrirLightbox;
window.cerrarLightbox = cerrarLightbox;
window.cerrarLightboxFondo = cerrarLightboxFondo;
