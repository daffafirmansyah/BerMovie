/* === BerMovie Splash + Access Gate === */
(function(){
  const ACCESS_CODE='BERMOVIE2026';
  const SPLASH_MS=2800;
  const ADMIN_HANDLE='daffafirmansyah';

  const isAuth=sessionStorage.getItem('bermovie_auth')==='1';

  // Hide main content immediately (prevents flash)
  document.body.classList.add('gate-active');

  // Inject CSS
  const link=document.createElement('link');
  link.rel='stylesheet';link.href='gate.css?v=3';
  document.head.appendChild(link);

  // === SPLASH ===
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

  // === GATE ===
  const gate=document.createElement('div');
  gate.className='gate-overlay';
  gate.id='gateOverlay';
  gate.innerHTML=`
    <div class="gate-padlock">
      <svg viewBox="0 0 64 64" fill="none">
        <rect x="14" y="28" width="36" height="28" rx="6" fill="url(#gLB)"/>
        <rect x="14" y="28" width="36" height="28" rx="6" fill="url(#gLS)" opacity=".3"/>
        <path d="M22 28V20a10 10 0 0 1 20 0v8" stroke="#9ca3af" stroke-width="3.5" fill="none" stroke-linecap="round"/>
        <circle cx="32" cy="42" r="4.5" fill="#0a0a0f"/>
        <rect x="30.5" y="45" width="3" height="5" rx="1.5" fill="#0a0a0f"/>
        <defs>
          <linearGradient id="gLB" x1="14" y1="28" x2="50" y2="56"><stop stop-color="#e5b800"/><stop offset="1" stop-color="#b8860b"/></linearGradient>
          <linearGradient id="gLS" x1="14" y1="28" x2="50" y2="56"><stop stop-color="#fff" stop-opacity=".4"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/></linearGradient>
        </defs>
      </svg>
    </div>
    <div class="gate-title">Akses Terbatas</div>
    <div class="gate-desc">BerMovie lagi mode undangan.<br>Masukin kode akses dari admin buat mulai nonton.</div>
    <div class="gate-form">
      <input class="gate-input" id="gateInput" type="text" placeholder="Kode akses" autocomplete="off" spellcheck="false">
      <button class="gate-btn" id="gateBtn">Masuk</button>
    </div>
    <div class="gate-error-msg" id="gateError"></div>
    <div class="gate-footer">Belum punya kode? Chat admin <a href="https://t.me/${ADMIN_HANDLE}" target="_blank">@${ADMIN_HANDLE}</a> →</div>
  `;

  // Inject
  document.body.prepend(gate);
  document.body.prepend(splash);

  // === TRANSITIONS ===
  setTimeout(()=>{
    splash.classList.add('fade-out');
    setTimeout(()=>{
      splash.remove();
      if(isAuth){
        gate.remove();
        document.body.classList.remove('gate-active');
      }else{
        gate.classList.add('active');
      }
    },800);
  },SPLASH_MS);

  // === GATE LOGIC ===
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
      sessionStorage.setItem('bermovie_auth','1');
      gate.classList.add('fade-out');
      setTimeout(()=>{gate.remove();document.body.classList.remove('gate-active');},600);
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
