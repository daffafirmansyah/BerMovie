/* === BerMovie Splash + Access Gate (self-contained) === */
(function(){
  const ACCESS_CODE='BERMOVIE2026';
  const SPLASH_MS=3000;
  const ADMIN_HANDLE='Daffa14';

  if(sessionStorage.getItem('bermovie_auth')==='1') return;

  // === INLINE CSS (no external dependency) ===
  const style=document.createElement('style');
  style.textContent=`
body.gate-active>*:not(.splash-overlay):not(.gate-overlay){visibility:hidden!important}
.splash-overlay{position:fixed;inset:0;z-index:99999;background:#0a0a0f;display:flex;flex-direction:column;align-items:center;justify-content:center;transition:opacity .8s ease}
.splash-overlay.fade-out{opacity:0;pointer-events:none}
.splash-brand{text-align:center}
.splash-logo{font-family:'Righteous',sans-serif;font-size:clamp(2.2rem,9vw,3.8rem);letter-spacing:2px;line-height:1;background:linear-gradient(135deg,#f97316 0%,#fb923c 40%,#fbbf24 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;opacity:0;transform:translateY(12px);animation:gFU .7s .2s ease forwards}
.splash-tagline{font-size:clamp(.7rem,2.5vw,.85rem);color:rgba(255,255,255,.4);letter-spacing:1.5px;text-transform:uppercase;margin-top:10px;font-weight:400;opacity:0;transform:translateY(8px);animation:gFU .6s .5s ease forwards}
.splash-line{width:40px;height:2px;background:linear-gradient(90deg,transparent,#f97316,transparent);margin:20px auto 0;border-radius:2px;opacity:0;animation:gFI .5s .7s ease forwards}
.splash-loader{margin-top:32px;opacity:0;animation:gFI .5s .9s ease forwards}
.splash-dots{display:flex;gap:6px;align-items:center;justify-content:center}
.splash-dot{width:6px;height:6px;border-radius:50%;background:rgba(255,255,255,.15);animation:dP 1.4s ease-in-out infinite}
.splash-dot:nth-child(2){animation-delay:.15s}
.splash-dot:nth-child(3){animation-delay:.3s}
@keyframes gFU{to{opacity:1;transform:translateY(0)}}
@keyframes gFI{to{opacity:1}}
@keyframes dP{0%,80%,100%{background:rgba(255,255,255,.15);transform:scale(1)}40%{background:#f97316;transform:scale(1.3)}}
.gate-overlay{position:fixed;inset:0;z-index:99998;background:#0a0a0f;display:none;flex-direction:column;align-items:center;justify-content:center;padding:24px 20px}
.gate-overlay.active{display:flex}
.gate-overlay.fade-out{opacity:0;pointer-events:none;transition:opacity .6s ease}
.gate-padlock{width:52px;height:52px;margin-bottom:24px;opacity:.7}
.gate-padlock svg{width:100%;height:100%}
.gate-title{font-family:'Righteous',sans-serif;font-size:clamp(1.3rem,5vw,1.7rem);color:#fff;margin-bottom:12px;letter-spacing:.3px}
.gate-desc{font-size:clamp(.78rem,3vw,.88rem);color:rgba(255,255,255,.45);text-align:center;max-width:300px;line-height:1.6;margin-bottom:32px}
.gate-form{display:flex;flex-direction:column;align-items:center;width:min(300px,82vw);gap:10px}
.gate-input{width:100%;height:48px;padding:0 18px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);border-radius:12px;color:#fff;font-size:.9rem;font-family:'Poppins',sans-serif;text-align:center;letter-spacing:1.2px;transition:border-color .25s,box-shadow .25s;outline:none}
.gate-input::placeholder{color:rgba(255,255,255,.25);letter-spacing:.5px;font-size:.82rem}
.gate-input:focus{border-color:rgba(249,115,22,.4);box-shadow:0 0 0 3px rgba(249,115,22,.08);background:rgba(255,255,255,.07)}
.gate-input.error{border-color:rgba(239,68,68,.6);animation:shk .4s ease}
@keyframes shk{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}
.gate-btn{width:100%;height:48px;border-radius:12px;background:#f97316;color:#fff;font-weight:600;font-size:.9rem;font-family:'Poppins',sans-serif;cursor:pointer;transition:transform .15s,background .2s;letter-spacing:.3px;border:none}
.gate-btn:hover{background:#ea580c}
.gate-btn:active{transform:scale(.97)}
.gate-error-msg{color:rgba(239,68,68,.8);font-size:.78rem;margin-top:6px;min-height:18px}
.gate-footer{margin-top:32px;font-size:.78rem;color:rgba(255,255,255,.3)}
.gate-footer a{color:#f97316;text-decoration:none}
.gate-footer a:hover{text-decoration:underline}
  `;
  document.head.appendChild(style);

  // Hide content immediately
  document.body.classList.add('gate-active');

  // === SPLASH ===
  const splash=document.createElement('div');
  splash.className='splash-overlay';
  splash.innerHTML=`<div class="splash-brand"><div class="splash-logo">BerMovie</div><div class="splash-tagline">Streaming Film & Series Sub Indo</div><div class="splash-line"></div></div><div class="splash-loader"><div class="splash-dots"><div class="splash-dot"></div><div class="splash-dot"></div><div class="splash-dot"></div></div></div>`;

  // === GATE ===
  const gate=document.createElement('div');
  gate.className='gate-overlay';
  gate.innerHTML=`<div class="gate-padlock"><svg viewBox="0 0 64 64" fill="none"><rect x="14" y="28" width="36" height="28" rx="6" fill="url(#gLB)"/><rect x="14" y="28" width="36" height="28" rx="6" fill="url(#gLS)" opacity=".3"/><path d="M22 28V20a10 10 0 0 1 20 0v8" stroke="#9ca3af" stroke-width="3.5" fill="none" stroke-linecap="round"/><circle cx="32" cy="42" r="4.5" fill="#0a0a0f"/><rect x="30.5" y="45" width="3" height="5" rx="1.5" fill="#0a0a0f"/><defs><linearGradient id="gLB" x1="14" y1="28" x2="50" y2="56"><stop stop-color="#e5b800"/><stop offset="1" stop-color="#b8860b"/></linearGradient><linearGradient id="gLS" x1="14" y1="28" x2="50" y2="56"><stop stop-color="#fff" stop-opacity=".4"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/></linearGradient></defs></svg></div><div class="gate-title">Akses Terbatas</div><div class="gate-desc">BerMovie lagi mode undangan.<br>Masukin kode akses dari admin buat mulai nonton.</div><div class="gate-form"><input class="gate-input" id="gateInput" type="text" placeholder="Kode akses" autocomplete="off" spellcheck="false"><button class="gate-btn" id="gateBtn">Masuk</button></div><div class="gate-error-msg" id="gateError"></div><div class="gate-footer">Belum punya kode? Chat admin <a href="https://t.me/${ADMIN_HANDLE}" target="_blank">@${ADMIN_HANDLE}</a> →</div>`;

  document.body.prepend(gate);
  document.body.prepend(splash);

  // === TRANSITIONS ===
  setTimeout(()=>{
    splash.classList.add('fade-out');
    setTimeout(()=>{
      splash.remove();
      gate.classList.add('active');
    },800);
  },SPLASH_MS);

  // === GATE LOGIC ===
  function tryCode(){
    var input=document.getElementById('gateInput');
    var err=document.getElementById('gateError');
    var code=input.value.trim().toUpperCase();
    if(!code){input.classList.add('error');err.textContent='Masukin kode dulu';setTimeout(function(){input.classList.remove('error')},400);return}
    if(code===ACCESS_CODE){
      sessionStorage.setItem('bermovie_auth','1');
      gate.classList.add('fade-out');
      setTimeout(function(){gate.remove();document.body.classList.remove('gate-active')},600);
    }else{
      input.classList.add('error');err.textContent='Kode salah, coba lagi';input.value='';
      setTimeout(function(){input.classList.remove('error')},400);
    }
  }

  document.addEventListener('click',function(e){if(e.target.id==='gateBtn')tryCode()});
  document.addEventListener('keydown',function(e){if(e.key==='Enter'&&document.activeElement.id==='gateInput')tryCode()});
})();
