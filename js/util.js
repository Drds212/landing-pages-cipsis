/* Script para ScrollReveal con los nuevos selectores */
    ScrollReveal().reveal('.nosotros-texto',       { origin:'right',  distance:'50px', duration:900, delay:100, opacity:0, reset:true });
    ScrollReveal().reveal('.nosotros-imagen-wrap', { origin:'left',   distance:'50px', duration:900, delay:100, opacity:0, reset:true });
    ScrollReveal().reveal('.stat',                 { origin:'bottom', distance:'30px', duration:700, delay:200, opacity:0, reset:true, interval:100 });
    ScrollReveal().reveal('.carousel-container',   { origin:'bottom', distance:'40px', duration:700, opacity:0, reset:true });
    ScrollReveal().reveal('.proveedor-grid a',     { origin:'bottom', distance:'20px', duration:500, opacity:0, reset:true, interval:80 });
    ScrollReveal().reveal('.cip-fluid-left',       { origin:'left',   distance:'50px', duration:900, opacity:0, reset:true });
    ScrollReveal().reveal('.cip-fluid-right',      { origin:'right',  distance:'50px', duration:900, delay:150, opacity:0, reset:true });
    ScrollReveal().reveal('.politica-banner',      { origin:'bottom', distance:'30px', duration:700, opacity:0, reset:true });

    /* ---- Correo ---- */
    function abrirCorreo(e) {
      e.preventDefault();
      var asunto = encodeURIComponent("Solicitud de Cotización - CIP SISTEM");
      var cuerpo = encodeURIComponent("Estimado equipo de CIP SISTEM,\n\nMe gustaría solicitar una cotización para los siguientes productos/servicios:\n\n- [Especificar producto o servicio]\n- [Cantidad]\n- [Detalles adicionales]\n\nDatos de contacto:\nNombre:\nTeléfono:\nCorreo:\n\nSaludos cordiales,\n[nombre]");
      if (/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        window.location.href = "mailto:ventas@cipsistem.com?subject=" + asunto + "&body=" + cuerpo;
      } else {
        window.open("https://mail.google.com/mail/?view=cm&fs=1&to=ventas@cipsistem.com&su=" + asunto + "&body=" + cuerpo, "_blank");
      }
    }

    /* ---- Navbar scroll ---- */
    let navbar = document.getElementById('navbar');
    let scrollTopBtn = document.getElementById('scrollTopBtn');

    if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

    window.addEventListener('scroll', function() {
      if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
        if (scrollTopBtn) scrollTopBtn.style.display = 'flex';
      } else {
        navbar.classList.remove('scrolled');
        if (scrollTopBtn) scrollTopBtn.style.display = 'none';
      }
    }, { passive: true });

    /* ---- Menú hamburguesa ---- */
    var hamburgerBtn = document.getElementById('hamburgerBtn');
    var mobileMenu   = document.getElementById('mobileMenu');

    function closeMobileMenu() {
      hamburgerBtn.classList.remove('open');
      mobileMenu.classList.remove('open');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    hamburgerBtn.addEventListener('click', function() {
      var isOpen = mobileMenu.classList.toggle('open');
      hamburgerBtn.classList.toggle('open', isOpen);
      hamburgerBtn.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    /* Mapa carga diferida */
    (function() {
      var mapLoaded = false;
      function tryLoad() {
        var el = document.getElementById("map-placeholder");
        if (!el || mapLoaded) return;
        if (el.getBoundingClientRect().top < window.innerHeight + 300) {
          el.innerHTML = '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3926.401282990832!2d-67.54638748991643!3d10.229183689846026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e8023a2cafd9b9f%3A0xdb695f1c0b4b05fc!2sCip%20Sistem%2C%20C.A.!5e0!3m2!1ses-419!2sve!4v1754862349270!5m2!1ses-419!2sve" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" title="Ubicación CIP SISTEM"></iframe>';
          mapLoaded = true;
        }
      }
      window.addEventListener("scroll", tryLoad, { passive: true });
      setTimeout(tryLoad, 600);
    })();


    /* Función para cargar el video de YouTube solo al hacer clic */
    function loadVideo(element, videoId) {
      const iframe = document.createElement("iframe");
      // Usamos los mismos atributos que tenías en tu código original
      iframe.setAttribute("src", `https://www.youtube.com/embed/${videoId}?autoplay=1`);
      iframe.setAttribute("title", "CIP SISTEM Video");
      iframe.setAttribute("allowfullscreen", "true");
      iframe.setAttribute("allow", "autoplay; encrypted-media");
      
      // Forzamos a que el iframe use el 100% del contenedor .video-wrap
      iframe.style.width = "100%";
      iframe.style.height = "100%"; 
      iframe.style.display = "block";
      iframe.style.border = "none";
      
      element.parentNode.replaceChild(iframe, element);
    }