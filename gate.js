/* === BerMovie Splash + Access Gate === */
(function(){
  const ACCESS_CODE='BERMOVIE2026';
  const STORAGE_KEY='bermovie_access';
  const SPLASH_MS=2800;
  const ADMIN_HANDLE='daffafirmansyah';

  // Already authorized → skip everything
  if(localStorage.getItem(STORAGE_KEY)===ACCESS_CODE) return;

  // Inject gate CSS
  const link=document.createElement('link');
  link.rel='stylesheet';link.href='gate.css?v=1';
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

  // Build gate HTML
  const gate=document.createElement('div');
  gate.className='gate-overlay';
  gate.id='gateOverlay';
  gate.innerHTML=`
    <div class="gate-padlock">
      <svg viewBox="0 0 64 64" fill="none">
        <rect x="14" y="28" width="36" height="28" rx="5" fill="url(#lockBody)"/>
        <path d="M22 28V20a10 10 0 0 1 20 0v8" stroke="#a3a3b8" stroke-width="3.5" fill="none" stroke-linecap="round"/>
        <circle cx="32" cy="42" r="4" fill="#0a0a0f"/>
        <line x1="32" y1="46" x2="32" y2="50" stroke="#0a0a0f" stroke-width="2.5" stroke-linecap="round"/>
        <defs><linearGradient id="lockBody" x1="14" y1="28" x2="50" y2="56"><stop stop-color="#d4a017"/><stop offset="1" stop-color="#b8860b"/></linearGradient></defs>
      </svg>
    </div>
    <div class="gate-title">Akses Terbatas</div>
    <div class="gate-desc">BerMovie lagi mode undangan. Masukin kode akses dari admin buat mulai nonton.</div>
    <input class="gate-input" id="gateInput" type="text" placeholder="Kode akses" autocomplete="off" spellcheck="false">
    <button class="gate-btn" id="gateBtn">Masuk</button>
    <div class="gate-error-msg" id="gateError"></div>
    <div class="gate-footer">Belum punya kode? Chat admin <a href="https://t.me/${ADMIN_HANDLE}" target="_blank">@${ADMIN_HANDLE}</a> →</div>
  `;

  // Inject into page
  document.body.prepend(gate);
  document.body.prepend(splash);

  // Splash → gate transition
  setTimeout(()=>{
    splash.classList.add('fade-out');
    setTimeout(()=>{
      splash.remove();
      gate.classList.add('active');
      document.getElementById('gateInput').focus();
    },800);
  },SPLASH_MS);

  // Gate logic
  function tryCode(){
    const input=document.getElementById('gateInput');
    const err=document.getElementById('gateError');
    const code=input.value.trim().toUpperCase();
    if(!code){
      input.classList.add('error');
      err.textContent='Masukin kode dulu';
      setTimeout(()=>input.classList.remove('error'),400);
      return;
    }
    if(code===ACCESS_CODE){
      localStorage.setItem(STORAGE_KEY,code);
      gate.classList.add('fade-out');
      setTimeout(()=>gate.remove(),600);
    }else{
      input.classList.add('error');
      err.textContent='Kode salah, coba lagi';
      input.value='';
      setTimeout(()=>input.classList.remove('error'),400);
    }
  }

  document.addEventListener('click',e=>{
    if(e.target.id==='gateBtn') tryCode();
  });
  document.addEventListener('keydown',e=>{
    if(e.key==='Enter'&&document.activeElement.id==='gateInput') tryCode();
  });
})();
