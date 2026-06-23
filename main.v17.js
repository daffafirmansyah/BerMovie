// CONFIG
const TMDB_KEY = '245f8c4922de78b5017c149fbfa89ab5';
const TMDB = 'https://api.themoviedb.org/3';
const IMG = 'https://image.tmdb.org/t/p';
const IMG_POSTER = `${IMG}/w500`;
const IMG_BACKDROP = `${IMG}/original`;
const IMG_CAST = `${IMG}/w185`;
const NO_POSTER = 'https://placehold.co/200x300/1a1a2e/666?text=';
const VIDSRV = 'https://vidsrcme.ru/embed';
const VIDSRV2 = 'https://vidsrc.pm/embed';
const VIDSRV4 = 'https://www.2embed.cc/embed';
const VIDSRV5 = 'https://vixsrc.to/movie';
const VIDSRV5_TV = 'https://vixsrc.to/tv';
const APIPLAYER = 'https://apiplayer.ru/embed';

// Subtitle state
let subCues = [];
let subIdx = 0;
let currentImdbId = '';
let currentTmdbId = 0;

// GENRES
const MOVIE_GENRES = [
    {id:28,name:"Action"},{id:12,name:"Adventure"},{id:16,name:"Animation"},{id:35,name:"Comedy"},
    {id:80,name:"Crime"},{id:99,name:"Documentary"},{id:18,name:"Drama"},{id:10751,name:"Family"},
    {id:14,name:"Fantasy"},{id:36,name:"History"},{id:27,name:"Horror"},{id:10402,name:"Music"},
    {id:9648,name:"Mystery"},{id:10749,name:"Romance"},{id:878,name:"Sci-Fi"},{id:10770,name:"TV Movie"},
    {id:53,name:"Thriller"},{id:10752,name:"War"},{id:37,name:"Western"}
];
const TV_GENRES = [
    {id:10759,name:"Action & Adventure"},{id:16,name:"Animation"},{id:35,name:"Comedy"},
    {id:80,name:"Crime"},{id:99,name:"Documentary"},{id:18,name:"Drama"},{id:10751,name:"Family"},
    {id:10762,name:"Kids"},{id:9648,name:"Mystery"},{id:10763,name:"News"},{id:10764,name:"Reality"},
    {id:10765,name:"Sci-Fi & Fantasy"},{id:10766,name:"Soap"},{id:10767,name:"Talk"},
    {id:10768,name:"War & Politics"},{id:37,name:"Western"}
];

// NETWORKS (for TV filter)
const NETWORKS = [
  {id:213,name:'Netflix'},{id:49,name:'HBO'},{id:453,name:'Hulu'},{id:1024,name:'Amazon Prime'},
  {id:335984,name:'Disney+'},{id:2552,name:'Apple TV+'},{id:4330,name:'Paramount+'},
  {id:335977,name:'Peacock'},{id:19,name:'FOX'},{id:16,name:'CBS'},{id:35,name:'NBC'},
  {id:6,name:'ABC'},{id:174,name:'AMC'},{id:67,name:'Showtime'},{id:110,name:'BBC One'},
  {id:332,name:'BBC Two'},{id:2739,name:'Globoplay'},{id:25,name:'MTV'},{id:30,name:'Syfy'},
  {id:99,name:'VH1'},{id:170,name:'Star TV'},{id:190,name:'TNT'},{id:226,name:'TBS'},
  {id:331,name:'PBS'},{id:343,name:'History Channel'},{id:390,name:'National Geographic'},
  {id:473,name:'FX'},{id:541,name:'Comedy Central'},{id:573,name:'ESPN'},
  {id:1286,name:'Nickelodeon'},{id:1288,name:'Cartoon Network'}
];

// URL STATE
function updateURL() {
    const params = new URLSearchParams();
    if (currentGenreId) params.set('genre', currentGenreId);
    if (currentYear) params.set('year', currentYear);
    if (currentCountry) params.set('country', currentCountry);
    if (currentNetwork) params.set('network', currentNetwork);
    if (currentSort !== 'popularity.desc') params.set('sort', currentSort);
    if (currentPage > 1) params.set('page', currentPage);
    const qs = params.toString();
    const url = window.location.pathname + (qs ? '?' + qs : '');
    window.history.replaceState(null, '', url);
}

function getURLParams() {
    const p = new URLSearchParams(window.location.search);
    return {
        genre: p.get('genre') || null,
        year: p.get('year') || '',
        country: p.get('country') || '',
        network: p.get('network') || '',
        sort: p.get('sort') || 'popularity.desc',
        page: parseInt(p.get('page') || '1')
    };
}
let currentServer = 'apiplayer';
let currentPage = 1;
let currentMediaType = 'movie';
let currentGenreId = null;
let currentGenreName = '';
let currentSort = 'popularity.desc';
let currentYear = '';
let currentCountry = '';
let currentNetwork = '';

// UTILS
const el = s => document.querySelector(s);
const all = s => document.querySelectorAll(s);
const posterUrl = p => p ? `${IMG_POSTER}${p}` : NO_POSTER;
const backdropUrl = p => p ? `${IMG_BACKDROP}${p}` : '';
const year = d => d ? d.substring(0, 4) : 'N/A';
const rating = r => r ? r.toFixed(1) : '0.0';
const truncate = (s, n) => s && s.length > n ? s.slice(0, n) + '...' : s;
const displayTitle = item => {
    const t = item.title || item.name || 'Untitled';
    return item.original_language === 'id' ? (item.original_title || t) : t;
};

// API
async function tmdb(path, params = {}) {
    const url = new URL(`${TMDB}${path}`);
    url.searchParams.set('api_key', TMDB_KEY);
    url.searchParams.set('language', 'en-US');
    Object.entries(params).forEach(([k, v]) => { if(v) url.searchParams.set(k, v); });
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    try {
        const res = await fetch(url, { signal: controller.signal });
        clearTimeout(timer);
        if (!res.ok) throw new Error(res.status);
        return await res.json();
    } catch (e) { console.error('TMDB error:', e); return null; }
}

// COUNTRIES
async function loadCountries(selectEl, selectedValue) {
    const data = await tmdb('/configuration/countries');
    if (!data) return;
    selectEl.innerHTML = '<option value="">Semua Negara</option>';
    data.sort((a,b) => a.native_name.localeCompare(b.native_name));
    data.forEach(c => {
        selectEl.innerHTML += `<option value="${c.iso_3166_1}">${c.native_name}</option>`;
    });
    if (selectedValue) selectEl.value = selectedValue;
}

// CARD
function createCard(item, type) {
    const mediaType = type || item.media_type || 'movie';
    const title = displayTitle(item);
    const date = item.release_date || item.first_air_date;
    const isTv = mediaType === 'tv';
    const div = document.createElement('div');
    div.className = 'card';
    const genreName = item.genre_ids?.[0] ? (type==='movie'?MOVIE_GENRES:TV_GENRES).find(g=>g.id===item.genre_ids[0])?.name : null;
    div.innerHTML = `
        <img class="card-poster" src="${posterUrl(item.poster_path)}" alt="${title}" loading="lazy" onerror="this.src='${NO_POSTER}'">
        <span class="card-type">${isTv ? 'TV' : 'MOVIE'}</span>
        <span class="card-quality q-hd">1080p</span>
        ${item.vote_average >= 8 ? '<span class="card-badge">Top</span>' : ''}
        <div class="card-info">
            <div class="card-title" title="${title}">${title}</div>
            <div class="card-meta">
                <span>${year(date)}</span>
                ${item.vote_average ? `<span class="card-rating">★ ${rating(item.vote_average)}</span>` : ''}
            </div>
        </div>
    `;
    div.onclick = () => { window.location.href = `detail.html?id=${item.id}&type=${mediaType}`; };
    // Watchlist heart
    const heart = document.createElement('div');
    heart.className = 'card-heart' + (isInWatchlist(item.id, mediaType) ? ' active' : '');
    heart.onclick = (e) => {
        e.stopPropagation();
        toggleWatchlist(item, mediaType);
        heart.classList.toggle('active');
    };
    div.appendChild(heart);
    return div;
}

// WATCHLIST
function getWatchlist() {
    try { return JSON.parse(localStorage.getItem('bermovie_watchlist') || '[]'); } catch { return []; }
}
function saveWatchlist(list) {
    localStorage.setItem('bermovie_watchlist', JSON.stringify(list));
}
function isInWatchlist(id, type) {
    return getWatchlist().some(i => i.id === id && i.type === type);
}
function toggleWatchlist(item, type) {
    let list = getWatchlist();
    const idx = list.findIndex(i => i.id === item.id && i.type === type);
    if (idx > -1) {
        list.splice(idx, 1);
        showToast('Dihapus dari favorit');
    } else {
        list.push({
            id: item.id, type: type || 'movie',
            title: displayTitle(item),
            poster: item.poster_path,
            year: (item.release_date || item.first_air_date || '').substring(0,4),
            rating: item.vote_average
        });
        showToast('Ditambahkan ke favorit');
    }
    saveWatchlist(list);
}

// TOAST
function showToast(msg, icon) {
    const t = el('#toast');
    if (!t) return;
    t.innerHTML = (icon||'') + msg;
    t.classList.add('show');
    clearTimeout(t._timer);
    t._timer = setTimeout(() => t.classList.remove('show'), 2000);
}

// Fill empty grid spaces
function fillGrid(grid) {
    const card = grid.children[0];
    if (!card) return;
    void grid.offsetHeight;
    const w = card.offsetWidth;
    if (!w) return;
    const gap = 16;
    const containerW = grid.clientWidth;
    const cols = Math.floor((containerW + gap) / (w + gap));
    const remaining = cols - (grid.children.length % cols || cols);
    if (remaining < cols) {
        for (let i = 0; i < remaining; i++) {
            const filler = document.createElement('div');
            filler.style.cssText = `flex:0 0 ${w}px;height:0;margin:0;padding:0;pointer-events:none`;
            grid.appendChild(filler);
        }
    }
}

// DETAIL MODAL
async function openDetail(id, type = 'movie') {
    const modal = el('#detailModal');
    if (!modal) return;
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    const [detail, credits, similar, vids] = await Promise.all([
        tmdb(`/${type}/${id}`),
        tmdb(`/${type}/${id}/credits`),
        tmdb(`/${type}/${id}/similar`),
        tmdb(`/${type}/${id}/videos`)
    ]);
    if (!detail) { modal.classList.add('hidden'); return; }

    const title = displayTitle(detail);
    const date = detail.release_date || detail.first_air_date;
    const runtime = detail.runtime || (detail.episode_run_time?.[0]) || 0;
    const genres = detail.genres?.map(g => g.name).join(', ') || '';

    el('#modalHero').style.backgroundImage = `url(${backdropUrl(detail.backdrop_path)})`;
    el('#modalTitle').textContent = title;
    el('#modalMeta').innerHTML = `
        <span class="rating">★ ${rating(detail.vote_average)}</span>
        <span>${year(date)}</span>
        ${runtime ? `<span>${runtime} min</span>` : ''}
        <span>${type === 'movie' ? 'Film' : 'Series'}</span>
        ${detail.number_of_seasons ? `<span>${detail.number_of_seasons} Season</span>` : ''}
        ${genres ? `<span>${genres}</span>` : ''}
    `;
    el('#modalOverview').textContent = detail.overview || 'No description available.';

    const castEl = el('#modalCast');
    castEl.innerHTML = '';
    credits?.cast?.slice(0, 10).forEach(c => {
        castEl.innerHTML += `<div class="cast-member"><img src="${c.profile_path ? IMG_CAST+c.profile_path : NO_POSTER}" alt="${c.name}" onerror="this.src='${NO_POSTER}'"><p>${c.name}</p></div>`;
    });

    const watchBtn = el('#modalWatchBtn');
    if (watchBtn) watchBtn.onclick = () => openPlayer(id, type, title);
    const trailerBtn = el('#modalTrailerBtn');
    if (trailerBtn) trailerBtn.onclick = () => {
        const tr = vids?.results?.find(v => v.type==='Trailer'&&v.site==='YouTube');
        if(tr) {
            const hero = el('#modalHero');
            hero.innerHTML = `<iframe src="https://www.youtube.com/embed/${tr.key}?autoplay=1&rel=0&mute=1" allow="autoplay; fullscreen" allowfullscreen style="position:absolute;inset:0;width:100%;height:100%;border:none;z-index:5"></iframe>`;
            hero.classList.add('trailer-active');
            trailerBtn.querySelector('.t-il').textContent = '◉';
            trailerBtn.querySelector('.t-il').style.opacity = '1';
            trailerBtn.querySelector('.t-txt').textContent = 'Tutup Trailer';
            trailerBtn.querySelector('.t-ir').style.opacity = '0';
            trailerBtn.onclick = closeAllModals;
        } else alert('Trailer tidak tersedia');
    };

    const seasonsSection = el('#seasonsSection');
    if (type==='tv' && detail.seasons?.length && seasonsSection) {
        seasonsSection.classList.remove('hidden');
        const list = el('#seasonsList');
        list.innerHTML = '';
        detail.seasons.filter(s=>s.season_number>0).forEach(s => {
            const card = document.createElement('div');
            card.className = 'season-card';
            card.innerHTML = `${s.poster_path?`<img src="${IMG_POSTER}${s.poster_path}" alt="">`:''}<div class="info"><strong>Season ${s.season_number}</strong><small>${s.episode_count} Episode</small></div>`;
            card.onclick = () => openPlayer(id, type, title, s.season_number, 1);
            list.appendChild(card);
        });
    } else if (seasonsSection) {
        seasonsSection.classList.add('hidden');
    }

    const sim = el('#similarCarousel');
    if (sim) { sim.innerHTML = ''; similar?.results?.slice(0,10).forEach(i => sim.appendChild(createCard(i, type))); }
}

// PLAYER
function getPlayerUrl(id, type, season, episode) {
    let rawUrl;
    if (currentServer === 'vidsrc') {
        if (type === 'tv') rawUrl = `${VIDSRV}/tv?tmdb=${id}&season=${season}&episode=${episode}`;
        else rawUrl = `${VIDSRV}/movie?tmdb=${id}`;
    } else if (currentServer === 'vidsrc2') {
        if (type === 'tv') rawUrl = `${VIDSRV2}/tv/${id}/${season}/${episode}`;
        else rawUrl = `${VIDSRV2}/movie/${id}`;
    } else if (currentServer === '2embed') {
        if (type === 'tv') rawUrl = `${VIDSRV4}/${id}`;
        else rawUrl = `${VIDSRV4}/${id}`;
    } else if (currentServer === 'vixsrc') {
        if (type === 'tv') rawUrl = `${VIDSRV5_TV}/${id}/${season}/${episode}`;
        else rawUrl = `${VIDSRV5}/${id}`;
    } else if (currentServer === 'apiplayer') {
        if (type === 'tv') rawUrl = `${APIPLAYER}/tv/${id}/${season}/${episode}`;
        else rawUrl = `${APIPLAYER}/movie/${id}`;
    } else {
        // VidLink (default)
        if (type === 'tv') rawUrl = `https://vidlink.pro/tv/${id}/${season}/${episode}`;
        else rawUrl = `https://vidlink.pro/movie/${id}`;
    }
    return rawUrl;
}

async function openPlayer(id, type, title, season=1, episode=1) {
    const modal = el('#playerModal');
    if (!modal) return;
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    el('#playerTitle').textContent = title;
    // Set iframe src ASAP before API calls
    el('#playerFrame').src = getPlayerUrl(id, type, season, episode);
    // Hide back button on detail page
    const backBtn = document.getElementById('detailBackBtn');
    if (backBtn) backBtn.style.display = 'none';

    // Show top bar + controls briefly
    const top = el('.player-top');
    const ctrl = el('.player-controls');
    if(top) top.classList.add('show');
    if(ctrl) ctrl.classList.add('show');
    setTimeout(() => { if(top) top.classList.remove('show'); if(ctrl) ctrl.classList.remove('show'); }, 3000);

    // Episode sheet for TV
    const epSheet = el('#episodeSheet');
    if (type==='tv' && epSheet) {
        el('#playerEpsBtn')?.classList.remove('hidden');
        const tvData = await tmdb(`/tv/${id}`);
        const sel = el('#seasonSelect');
        sel.innerHTML = '';
        tvData?.seasons?.filter(s=>s.season_number>0).forEach(s => {
            const opt = document.createElement('option');
            opt.value = s.season_number;
            opt.textContent = `Season ${s.season_number}`;
            if(s.season_number===season) opt.selected=true;
            sel.appendChild(opt);
        });
        sel.onchange = () => { loadEpisodes(id, parseInt(sel.value), type); };
        loadEpisodes(id, season, type, episode).catch(()=>{});
    } else if (epSheet) {
        el('#playerEpsBtn')?.classList.add('hidden');
        epSheet.classList.add('hidden');
    }

    all('.svr-btn').forEach(btn => {
        if (!btn.dataset.server) return;
        btn.classList.toggle('active', btn.dataset.server===currentServer);
        btn.onclick = () => {
            currentServer = btn.dataset.server;
            all('.svr-btn').forEach(b=>b.classList.toggle('active', b===btn));
            const s = type==='tv'?parseInt(el('#seasonSelect')?.value||1):1;
            const ae = document.querySelector('.ep-btn.active');
            const ep = ae?parseInt(ae.dataset.ep):1;
            el('#playerFrame').src = getPlayerUrl(id, type, s, ep);
        };
    });
}

async function loadEpisodes(id, season, type, activeEp=1) {
    const data = await tmdb(`/tv/${id}/season/${season}`);
    const grid = el('#episodesGrid');
    if (!grid) return;
    grid.innerHTML = '';
    data?.episodes?.forEach(ep => {
        const btn = document.createElement('button');
        btn.className = 'ep-btn'+(ep.episode_number===activeEp?' active':'');
        btn.dataset.ep = ep.episode_number;
        btn.textContent = `E${ep.episode_number}`;
        btn.title = ep.name||`Episode ${ep.episode_number}`;
        btn.onclick = () => {
            all('.ep-btn').forEach(b=>b.classList.remove('active'));
            btn.classList.add('active');
            el('#playerFrame').src = getPlayerUrl(id, type, season, ep.episode_number);
            el('#episodeSheet')?.classList.add('hidden');
        };
        grid.appendChild(btn);
    });
}

// ========== SUBTITLE FUNCTIONS ==========
async function searchAndShowSubs() {
    const sheet = el('#subSheet');
    const list = el('#subList');
    const status = el('#subSearchStatus');
    if (!sheet) return;
    sheet.classList.remove('hidden');
    list.innerHTML = '';
    status.textContent = 'Subtitle belum tersedia.';
}

async function loadSubtitle(subId) {
    el('#subSheet')?.classList.add('hidden');
}

function showSub(idx) {
    const textEl = el('#subText');
    const counter = el('#subCounter');
    if (!textEl || !counter) return;
    if (idx >= 0 && idx < subCues.length) {
        textEl.textContent = subCues[idx].text;
        counter.textContent = `${idx+1}/${subCues.length}`;
    } else {
        textEl.textContent = '';
        counter.textContent = `${idx+1}/${subCues.length}`;
    }
}

function closeSubs() {
    subCues = [];
    subIdx = 0;
    el('#subOverlay')?.classList.add('hidden');
    if (el('#subText')) el('#subText').textContent = '';
}

function closeAllModals() {
    ['detailModal','playerModal'].forEach(id => {
        const m = el(`#${id}`);
        if (m) m.classList.add('hidden');
    });
    const f = el('#playerFrame');
    if (f) f.src = '';
    document.body.style.overflow = '';
    // Hide episode sheet
    el('#episodeSheet')?.classList.add('hidden');
    // Close subtitle overlay + sheet
    closeSubs();
    el('#subSheet')?.classList.add('hidden');
    // Show back button on detail page
    const backBtn = document.getElementById('detailBackBtn');
    if (backBtn) backBtn.style.display = '';
}

// Player controls: mousemove shows top bar + controls
document.addEventListener('mousemove', () => {
    const modal = el('#playerModal');
    if (!modal || modal.classList.contains('hidden')) return;
    const top = el('.player-top');
    const ctrl = el('.player-controls');
    if(top) top.classList.add('show');
    if(ctrl) ctrl.classList.add('show');
    clearTimeout(window._playerHideTimer);
    window._playerHideTimer = setTimeout(() => {
        if(top) top.classList.remove('show');
        if(ctrl) ctrl.classList.remove('show');
    }, 2500);
});

// Player back/close buttons
el('#playerBackBtn') && (el('#playerBackBtn').onclick = closeAllModals);
el('#playerCloseBtn') && (el('#playerCloseBtn').onclick = closeAllModals);

// Episode sheet toggle
el('#playerEpsBtn') && (el('#playerEpsBtn').onclick = () => {
    const sheet = el('#episodeSheet');
    if(sheet) sheet.classList.toggle('hidden');
});
el('#epSheetClose') && (el('#epSheetClose').onclick = () => {
    el('#episodeSheet')?.classList.add('hidden');
});

// Subtitle controls
el('#subTriggerBtn') && (el('#subTriggerBtn').onclick = () => {
    if (subCues.length) {
        el('#subSheet')?.classList.toggle('hidden');
        return;
    }
    searchAndShowSubs();
});
el('#subSheetClose') && (el('#subSheetClose').onclick = () => {
    el('#subSheet')?.classList.add('hidden');
});
el('#subNextBtn') && (el('#subNextBtn').onclick = () => {
    if (subIdx < subCues.length - 1) showSub(++subIdx);
});
el('#subPrevBtn') && (el('#subPrevBtn').onclick = () => {
    if (subIdx > 0) showSub(--subIdx);
});
el('#subSyncBtn') && (el('#subSyncBtn').onclick = () => {
    subIdx = 0;
    showSub(0);
});
el('#subCloseBtn') && (el('#subCloseBtn').onclick = closeSubs);
// Click subtitle text to advance
