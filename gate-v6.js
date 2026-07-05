(function(){
  var CODE='BERMOVIE2026',WAIT=3000,ADMIN='Daffa14';
  if(sessionStorage.getItem('bm_ok')==='1')return;

  var s=document.createElement('style');
  s.textContent='#bmSplash,#bmGate{position:fixed;inset:0;z-index:99999;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#0a0a0f;transition:opacity .6s ease}#bmGate{z-index:99998;opacity:0;pointer-events:none}.bm-logo{font-family:Righteous,sans-serif;font-size:clamp(2.2rem,9vw,3.8rem);letter-spacing:2px;background:linear-gradient(135deg,#f97316,#fb923c,#fbbf24);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}.bm-tag{font-size:clamp(.7rem,2.5vw,.85rem);color:rgba(255,255,255,.4);letter-spacing:1.5px;text-transform:uppercase;margin-top:10px}.bm-line{width:40px;height:2px;background:linear-gradient(90deg,transparent,#f97316,transparent);margin:20px auto 0}.bm-lock{width:52px;height:52px;margin-bottom:24px;opacity:.7}.bm-gt{font-family:Righteous,sans-serif;font-size:clamp(1.3rem,5vw,1.7rem);color:#fff;margin-bottom:12px}.bm-gd{font-size:clamp(.78rem,3vw,.88rem);color:rgba(255,255,255,.45);text-align:center;max-width:300px;line-height:1.6;margin-bottom:32px}.bm-form{display:flex;flex-direction:column;width:min(300px,82vw);gap:10px}.bm-inp{width:100%;height:48px;padding:0 18px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);border-radius:12px;color:#fff;font-size:.9rem;text-align:center;letter-spacing:1.2px;outline:none;font-family:Poppins,sans-serif}.bm-inp::-webkit-input-placeholder{color:rgba(255,255,255,.25)}.bm-inp::placeholder{color:rgba(255,255,255,.25)}.bm-inp:focus{border-color:rgba(249,115,22,.4)}.bm-btn{width:100%;height:48px;border-radius:12px;background:#f97316;color:#fff;font-weight:600;font-size:.9rem;border:none;cursor:pointer;font-family:Poppins,sans-serif}.bm-btn:active{transform:scale(.97)}.bm-err{color:rgba(239,68,68,.8);font-size:.78rem;margin-top:6px;min-height:18px;text-align:center}.bm-ft{margin-top:32px;font-size:.78rem;color:rgba(255,255,255,.3)}.bm-ft a{color:#f97316;text-decoration:none}';
  document.head.appendChild(s);

  var splash=document.createElement('div');
  splash.id='bmSplash';
  splash.innerHTML='<div style="text-align:center"><div class="bm-logo">BerMovie</div><div class="bm-tag">Streaming Film &amp; Series Sub Indo</div><div class="bm-line"></div></div><div id="bmSpinWrap" style="margin-top:32px;width:28px;height:28px;position:relative"><canvas id="bmCanvas" width="28" height="28"></canvas></div><div style="margin-top:24px;width:120px;height:2px;background:rgba(255,255,255,.06);border-radius:2px;overflow:hidden"><div id="bmBar" style="height:100%;width:0;background:linear-gradient(90deg,#f97316,#fbbf24);border-radius:2px"></div></div>';

  var gate=document.createElement('div');
  gate.id='bmGate';
  gate.innerHTML='<div class="bm-lock"><svg viewBox="0 0 64 64" fill="none"><rect x="14" y="28" width="36" height="28" rx="6" fill="url(#gL)"/><path d="M22 28V20a10 10 0 0 1 20 0v8" stroke="#9ca3af" stroke-width="3.5" fill="none" stroke-linecap="round"/><circle cx="32" cy="42" r="4.5" fill="#0a0a0f"/><rect x="30.5" y="45" width="3" height="5" rx="1.5" fill="#0a0a0f"/><defs><linearGradient id="gL" x1="14" y1="28" x2="50" y2="56"><stop stop-color="#e5b800"/><stop offset="1" stop-color="#b8860b"/></linearGradient></defs></svg></div><div class="bm-gt">Akses Terbatas</div><div class="bm-gd">BerMovie lagi mode undangan.<br>Masukin kode akses dari admin buat mulai nonton.</div><div class="bm-form"><input class="bm-inp" id="bmInp" type="text" placeholder="Kode akses" autocomplete="off" spellcheck="false"><button class="bm-btn" id="bmBtn">Masuk</button></div><div class="bm-err" id="bmErr"></div><div class="bm-ft">Belum punya kode? Chat admin <a href="https://t.me/'+ADMIN+'" target="_blank">@'+ADMIN+'</a> →</div>';

  document.body.appendChild(splash);
  document.body.appendChild(gate);

  // === JS-DRIVEN SPINNER (canvas, works everywhere) ===
  var canvas=document.getElementById('bmCanvas');
  var ctx=canvas.getContext('2d');
  var angle=0;
  var spinTimer=setInterval(function(){
    ctx.clearRect(0,0,28,28);
    ctx.lineWidth=2.5;
    ctx.lineCap='round';
    // background ring
    ctx.strokeStyle='rgba(255,255,255,0.1)';
    ctx.beginPath();
    ctx.arc(14,14,11,0,Math.PI*2);
    ctx.stroke();
    // orange arc
    ctx.strokeStyle='#f97316';
    ctx.beginPath();
    ctx.arc(14,14,11,angle,angle+Math.PI*0.6);
    ctx.stroke();
    angle+=0.15;
  },16);

  // === JS-DRIVEN PROGRESS BAR ===
  var bar=document.getElementById('bmBar');
  var progress=0;
  var barTimer=setInterval(function(){
    progress+=100/(WAIT/30);
    if(progress>100)progress=100;
    bar.style.width=progress+'%';
  },30);

  // Splash → gate
  setTimeout(function(){
    clearInterval(spinTimer);
    clearInterval(barTimer);
    splash.style.opacity='0';
    gate.style.opacity='1';
    gate.style.pointerEvents='auto';
    setTimeout(function(){splash.remove()},600);
  },WAIT);

  // Gate logic
  function go(){
    var inp=document.getElementById('bmInp');
    var err=document.getElementById('bmErr');
    var v=inp.value.trim().toUpperCase();
    if(!v){err.textContent='Masukin kode dulu';inp.style.borderColor='rgba(239,68,68,.6)';setTimeout(function(){inp.style.borderColor='rgba(255,255,255,.08)'},600);return}
    if(v===CODE){
      sessionStorage.setItem('bm_ok','1');
      gate.style.opacity='0';
      setTimeout(function(){gate.remove()},600);
    }else{
      err.textContent='Kode salah, coba lagi';inp.value='';inp.style.borderColor='rgba(239,68,68,.6)';
      setTimeout(function(){inp.style.borderColor='rgba(255,255,255,.08)'},600);
    }
  }
  document.addEventListener('click',function(e){if(e.target.id==='bmBtn')go()});
  document.addEventListener('keydown',function(e){if(e.key==='Enter'&&document.activeElement.id==='bmInp')go()});
})();
