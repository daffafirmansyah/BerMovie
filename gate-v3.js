(function(){
  var CODE='BERMOVIE2026',WAIT=3000,ADMIN='Daffa14';
  if(sessionStorage.getItem('bm_ok')==='1')return;

  // Hide everything immediately with inline style
  var s=document.createElement('style');
  s.textContent='#bmSplash,#bmGate{position:fixed;inset:0;z-index:99999;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#0a0a0f}#bmGate{z-index:99998;display:none}.bm-logo{font-family:Righteous,sans-serif;font-size:clamp(2.2rem,9vw,3.8rem);letter-spacing:2px;background:linear-gradient(135deg,#f97316,#fb923c,#fbbf24);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}.bm-tag{font-size:clamp(.7rem,2.5vw,.85rem);color:rgba(255,255,255,.4);letter-spacing:1.5px;text-transform:uppercase;margin-top:10px}.bm-line{width:40px;height:2px;background:linear-gradient(90deg,transparent,#f97316,transparent);margin:20px auto 0}.bm-dots{display:flex;gap:6px;margin-top:32px}.bm-dot{width:6px;height:6px;border-radius:50%;background:rgba(255,255,255,.15);animation:bp 1.4s ease-in-out infinite}.bm-dot:nth-child(2){animation-delay:.15s}.bm-dot:nth-child(3){animation-delay:.3s}@keyframes bp{0%,80%,100%{background:rgba(255,255,255,.15);transform:scale(1)}40%{background:#f97316;transform:scale(1.3)}}.bm-lock{width:52px;height:52px;margin-bottom:24px;opacity:.7}.bm-gt{font-family:Righteous,sans-serif;font-size:clamp(1.3rem,5vw,1.7rem);color:#fff;margin-bottom:12px}.bm-gd{font-size:clamp(.78rem,3vw,.88rem);color:rgba(255,255,255,.45);text-align:center;max-width:300px;line-height:1.6;margin-bottom:32px}.bm-form{display:flex;flex-direction:column;width:min(300px,82vw);gap:10px}.bm-inp{width:100%;height:48px;padding:0 18px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);border-radius:12px;color:#fff;font-size:.9rem;text-align:center;letter-spacing:1.2px;outline:none;font-family:Poppins,sans-serif}.bm-inp::placeholder{color:rgba(255,255,255,.25)}.bm-inp:focus{border-color:rgba(249,115,22,.4)}.bm-inp.shk{animation:sk .4s ease}@keyframes sk{25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}.bm-btn{width:100%;height:48px;border-radius:12px;background:#f97316;color:#fff;font-weight:600;font-size:.9rem;border:none;cursor:pointer;font-family:Poppins,sans-serif}.bm-btn:active{transform:scale(.97)}.bm-err{color:rgba(239,68,68,.8);font-size:.78rem;margin-top:6px;min-height:18px;text-align:center}.bm-ft{margin-top:32px;font-size:.78rem;color:rgba(255,255,255,.3)}.bm-ft a{color:#f97316;text-decoration:none}';
  document.head.appendChild(s);

  // Build splash
  var splash=document.createElement('div');
  splash.id='bmSplash';
  splash.innerHTML='<div style="text-align:center"><div class="bm-logo">BerMovie</div><div class="bm-tag">Streaming Film &amp; Series Sub Indo</div><div class="bm-line"></div></div><div class="bm-dots"><div class="bm-dot"></div><div class="bm-dot"></div><div class="bm-dot"></div></div>';
  splash.style.opacity='0';
  splash.style.transition='opacity .8s ease';

  // Build gate
  var gate=document.createElement('div');
  gate.id='bmGate';
  gate.innerHTML='<div class="bm-lock"><svg viewBox="0 0 64 64" fill="none"><rect x="14" y="28" width="36" height="28" rx="6" fill="url(#gL)"/><path d="M22 28V20a10 10 0 0 1 20 0v8" stroke="#9ca3af" stroke-width="3.5" fill="none" stroke-linecap="round"/><circle cx="32" cy="42" r="4.5" fill="#0a0a0f"/><rect x="30.5" y="45" width="3" height="5" rx="1.5" fill="#0a0a0f"/><defs><linearGradient id="gL" x1="14" y1="28" x2="50" y2="56"><stop stop-color="#e5b800"/><stop offset="1" stop-color="#b8860b"/></linearGradient></defs></svg></div><div class="bm-gt">Akses Terbatas</div><div class="bm-gd">BerMovie lagi mode undangan.<br>Masukin kode akses dari admin buat mulai nonton.</div><div class="bm-form"><input class="bm-inp" id="bmInp" type="text" placeholder="Kode akses" autocomplete="off" spellcheck="false"><button class="bm-btn" id="bmBtn">Masuk</button></div><div class="bm-err" id="bmErr"></div><div class="bm-ft">Belum punya kode? Chat admin <a href="https://t.me/'+ADMIN+'" target="_blank">@'+ADMIN+'</a> →</div>';

  document.body.appendChild(splash);
  document.body.appendChild(gate);

  // Show splash with fade in
  requestAnimationFrame(function(){splash.style.opacity='1'});

  // Splash → gate
  setTimeout(function(){
    splash.style.opacity='0';
    setTimeout(function(){
      splash.remove();
      gate.style.display='flex';
      var inp=document.getElementById('bmInp');
      if(inp)inp.focus();
    },800);
  },WAIT);

  // Gate logic
  function go(){
    var inp=document.getElementById('bmInp');
    var err=document.getElementById('bmErr');
    var v=inp.value.trim().toUpperCase();
    if(!v){inp.classList.add('shk');err.textContent='Masukin kode dulu';setTimeout(function(){inp.classList.remove('shk')},400);return}
    if(v===CODE){
      sessionStorage.setItem('bm_ok','1');
      gate.style.opacity='0';
      gate.style.transition='opacity .6s ease';
      setTimeout(function(){gate.remove()},600);
    }else{
      inp.classList.add('shk');err.textContent='Kode salah, coba lagi';inp.value='';
      setTimeout(function(){inp.classList.remove('shk')},400);
    }
  }
  document.addEventListener('click',function(e){if(e.target.id==='bmBtn')go()});
  document.addEventListener('keydown',function(e){if(e.key==='Enter'&&document.activeElement.id==='bmInp')go()});
})();
