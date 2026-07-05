/* === BerMovie Splash Screen === */
(function(){
  const SPLASH_MS=2800;

  // Inject splash CSS
  const link=document.createElement('link');
  link.rel='stylesheet';link.href='gate.css?v=2';
  document.head.appendChild(link);

  // Build splash HTML
  const splash=document.createElement('div');
  splash.className='splash-overlay';
  splash.id='splashOverlay';
  splash.innerHTML=`
    <div class="neon-sign">
      <div class="neon-burst"><svg viewBox="0 0 28 28" fill="none"><path d="M14 2l3 8 8 3-8 3-3 8-3-8-8-3 8-3z" fill="#a5b4fc" opacity=".7"/><path d="M14 6l1.5 4 4 1.5-4 1.5L14 17l-1.5-4-4-1.5 4-1.5z" fill="#e0e7ff"/></svg></div>
      <div class="neon-title"><span class="ber">Ber</span><span class="movie">Movie</span></div>
      <div class="neon-sub">Nonton film & series subtitle Indonesia</div>
    </div>
    <div class="splash-spinner"></div>
  `;

  document.body.prepend(splash);

  // Splash → site
  setTimeout(()=>{
    splash.classList.add('fade-out');
    setTimeout(()=>splash.remove(),800);
  },SPLASH_MS);
})();
