// v12 - card fix: Film/Series, no 1080p, ★ Top
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

// TELEGRAM MINI APP
const tg = window.Telegram?.WebApp;
const isTgMiniApp = !!tg?.initData;
if (isTgMiniApp) {
    tg.expand();
    tg.ready();
    document.documentElement.style.setProperty('--bg', tg.backgroundColor || '#0f0f13');
    document.documentElement.style.setProperty('--accent', tg.themeParams?.button_color || '#f97316');
    let _tgScrollTimer;
    window.addEventListener('scroll', () => {
        clearTimeout(_tgScrollTimer);
        _tgScrollTimer = setTimeout(() => { document.activeElement?.blur(); }, 500);
    }, { passive: true });
}

// i18n
const I18N = {
    id: {
        nav_home: 'Home', nav_movies: 'Film', nav_tv: 'Serial', nav_genre: 'Genre', nav_country: 'Negara', nav_tahun: 'Tahun', nav_favorit: 'Favorit', nav_leaderboard: 'Peringkat',
        search: 'Cari film atau serial...', search_movies: 'Cari film...', search_tv: 'Cari serial...', search_btn: 'Cari',
        trending: 'Trending Hari Ini', top_rated: 'Rating Tertinggi', now_playing: 'Tayang Sekarang', indo_movies: 'Film Indonesia', indo_series: 'Serial Indonesia', drakor: 'Drakor',
        watch_btn: 'Tonton', watch_now: 'Tonton Sekarang', trailer_btn: 'Trailer', close_trailer: 'Tutup Trailer', fav_add: 'Tambah ke Favorit', fav_active: 'Favorit',
        cast_title: 'Pemain', seasons_title: 'Musim', recommend_title: 'Rekomendasi', episode_title: 'Episode',
        loading: 'Memuat...', load_fail: 'Gagal memuat detail. Coba lagi.', no_desc: 'Tidak ada deskripsi tersedia.', id_not_found: 'ID tidak ditemukan',
        trailer_unavailable: 'Trailer tidak tersedia', subtitle_unavailable: 'Subtitel belum tersedia.',
        removed_fav: 'Dihapus dari favorit', added_fav: 'Ditambahkan ke favorit',
        watchlist_title: 'Favorit', watchlist_empty: 'Belum ada film favorit',
        search_result: 'Hasil Pencarian', no_result: 'Film tidak ditemukan untuk', sort_rating: 'Rating Tertinggi',
        all_genre: 'Semua Genre', all_year: 'Semua Tahun', all_country: 'Semua Negara', all_network: 'Semua Jaringan',
        explore_genre: 'Jelajahi Genre', back_btn: '← Kembali',
        genre_movies: 'Film', genre_tv: 'Serial',
        popular_movies: 'Film Populer', popular_tv: 'Serial Populer', see_all: 'Lihat Semua →',
        best_movies: 'Film Terbaik', best_tv: 'Serial Terbaik',
        filter_all: 'Semua', filter_movies: 'Film', filter_tv: 'Serial',
        sort_popular: 'Populer',
        footer_tagline: 'BerMovie — Streaming Film & Serial Sub Indo',
        footer_disclaimer: 'Kami tidak menyimpan file video di server kami. Semua konten disediakan oleh pihak ketiga.',
        leaderboard_title: 'Peringkat', leaderboard_desc: 'Film dan serial terbaik berdasarkan rating dan popularitas',
        lang_label: 'Bahasa', lang_id: 'Indonesia', lang_en: 'Inggris'
    },
    en: {
        nav_home: 'Home', nav_movies: 'Movies', nav_tv: 'TV Shows', nav_genre: 'Genre', nav_country: 'Country', nav_tahun: 'Year', nav_favorit: 'Favorites', nav_leaderboard: 'Rankings',
        search: 'Search movies or series...', search_movies: 'Search movies...', search_tv: 'Search series...', search_btn: 'Search',
        trending: 'Trending Today', top_rated: 'Top Rated', now_playing: 'Now Playing', indo_movies: 'Indonesian Movies', indo_series: 'Indonesian Series', drakor: 'K-Drama',
        watch_btn: 'Watch', watch_now: 'Watch Now', trailer_btn: 'Trailer', close_trailer: 'Close Trailer', fav_add: 'Add to Favorites', fav_active: 'Favorited',
        cast_title: 'Cast', seasons_title: 'Seasons', recommend_title: 'Recommended', episode_title: 'Episodes',
        loading: 'Loading...', load_fail: 'Failed to load details. Try again.', no_desc: 'No description available.', id_not_found: 'ID not found',
        trailer_unavailable: 'Trailer not available', subtitle_unavailable: 'Subtitles not available yet.',
        removed_fav: 'Removed from favorites', added_fav: 'Added to favorites',
        watchlist_title: 'Favorites', watchlist_empty: 'No favorites yet',
        search_result: 'Search Results', no_result: 'No movies found for', sort_rating: 'Top Rated',
        all_genre: 'All Genres', all_year: 'All Years', all_country: 'All Countries', all_network: 'All Networks',
        explore_genre: 'Explore Genres', back_btn: '← Back',
        genre_movies: 'Movies', genre_tv: 'TV Shows',
        popular_movies: 'Popular Movies', popular_tv: 'Popular TV', see_all: 'See All →',
        best_movies: 'Best Movies', best_tv: 'Best TV',
        filter_all: 'All', filter_movies: 'Movies', filter_tv: 'TV Series',
        sort_popular: 'Popular',
        footer_tagline: 'BerMovie — Stream Movies & Series with Subtitles',
        footer_disclaimer: 'We do not host any video files on our servers. All content is provided by third parties.',
        leaderboard_title: 'Rankings', leaderboard_desc: 'Best movies and series by rating and popularity',
        lang_label: 'Language', lang_id: 'Indonesian', lang_en: 'English'
    }
};
let _lang = localStorage.getItem('bermovie_lang') || 'id';
function t(key) { return (I18N[_lang] && I18N[_lang][key]) || (I18N.id[key]) || key; }
function applyLang() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const val = t(key);
        if (el.tagName === 'INPUT') el.placeholder = val;
        else if (el.classList.contains('nav-dropdown-trigger')) {
            // Preserve SVG chevron icon — only update text node
            const svg = el.querySelector('svg');
            el.textContent = val;
            if (svg) el.appendChild(svg);
        }
        else el.textContent = val;
    });
    document.documentElement.lang = _lang;
    // Update toggle labels
    const toggleBtns = document.querySelectorAll('#langToggle, #langToggleMobile');
    toggleBtns.forEach(btn => btn.textContent = _lang === 'id' ? 'ID' : 'EN');
}
function toggleLanguage() {
    _lang = _lang === 'id' ? 'en' : 'id';
    localStorage.setItem('bermovie_lang', _lang);
    location.reload();
}
const VIDSRV_VESY = 'https://streamsrcs.2embed.cc/vesy';
const VIDSRV_VNEST = 'https://streamsrcs.2embed.cc/vnest';
const VIDEASY = 'https://player.videasy.to';
const VIDNEST = 'https://vidnest.fun';
const VIDSRCSU = 'https://vidsrc.su/embed';

// Subtitle state
let subCues = [];
let subIdx = 0;
let currentImdbId = '';
let currentTmdbId = 0;

// GENRES
const MOVIE_GENRES = [
    {id:28,name:"Action",id_name:"Aksi"},{id:12,name:"Adventure",id_name:"Petualangan"},{id:16,name:"Animation",id_name:"Animasi"},{id:35,name:"Comedy",id_name:"Komedi"},
    {id:80,name:"Crime",id_name:"Kejahatan"},{id:99,name:"Documentary",id_name:"Dokumenter"},{id:18,name:"Drama",id_name:"Drama"},{id:10751,name:"Family",id_name:"Keluarga"},
    {id:14,name:"Fantasy",id_name:"Fantasi"},{id:36,name:"History",id_name:"Sejarah"},{id:27,name:"Horror",id_name:"Horor"},{id:10402,name:"Music",id_name:"Musikal"},
    {id:9648,name:"Mystery",id_name:"Misteri"},{id:10749,name:"Romance",id_name:"Romansa"},{id:878,name:"Sci-Fi",id_name:"Sci-Fi"},{id:10770,name:"TV Movie",id_name:"Film TV"},
    {id:53,name:"Thriller",id_name:"Thriller"},{id:10752,name:"War",id_name:"Perang"},{id:37,name:"Western",id_name:"Barat"}
];
const TV_GENRES = [
    {id:10759,name:"Action & Adventure",id_name:"Aksi & Petualangan"},{id:16,name:"Animation",id_name:"Animasi"},{id:35,name:"Comedy",id_name:"Komedi"},
    {id:80,name:"Crime",id_name:"Kejahatan"},{id:99,name:"Documentary",id_name:"Dokumenter"},{id:18,name:"Drama",id_name:"Drama"},{id:10751,name:"Family",id_name:"Keluarga"},
    {id:10762,name:"Kids",id_name:"Anak"},{id:9648,name:"Mystery",id_name:"Misteri"},{id:10763,name:"News",id_name:"Berita"},{id:10764,name:"Reality",id_name:"Reality"},
    {id:10764,name:"Reality",id_name:"Reality"},{id:10765,name:"Sci-Fi & Fantasy",id_name:"Sci-Fi & Fantasi"},{id:10766,name:"Soap",id_name:"Sinetron"},{id:10767,name:"Talk",id_name:"Talk Show"},
    {id:10768,name:"War & Politics",id_name:"Perang & Politik"},{id:37,name:"Western",id_name:"Barat"}
];
function genreName(g) { return _lang === 'id' ? (g.id_name || g.name) : g.name; }

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
let currentServer = (() => { try { return localStorage.getItem('bermovie_server') || 'vesy'; } catch { return 'vesy'; } })();
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

// API CACHE (sessionStorage, 15min TTL)
const _apiCache = new Map();
const CACHE_TTL = 15 * 60 * 1000;

async function tmdb(path, params = {}) {
    const url = new URL(`${TMDB}${path}`);
    url.searchParams.set('api_key', TMDB_KEY);
    url.searchParams.set('language', 'en-US');
    Object.entries(params).forEach(([k, v]) => { if(v) url.searchParams.set(k, v); });
    const key = url.toString();

    // Memory cache
    if (_apiCache.has(key)) {
        const c = _apiCache.get(key);
        if (Date.now() - c.t < CACHE_TTL) return c.d;
    }
    // SessionStorage cache
    try {
        const raw = sessionStorage.getItem('bc_' + key);
        if (raw) {
            const c = JSON.parse(raw);
            if (Date.now() - c.t < CACHE_TTL) { _apiCache.set(key, c); return c.d; }
        }
    } catch {}

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    try {
        const res = await fetch(url, { signal: controller.signal });
        clearTimeout(timer);
        if (!res.ok) throw new Error(res.status);
        const data = await res.json();
        const entry = { d: data, t: Date.now() };
        _apiCache.set(key, entry);
        try { sessionStorage.setItem('bc_' + key, JSON.stringify(entry)); } catch {}
        return data;
    } catch (e) { console.error('TMDB error:', e); return null; }
}

// COUNTRIES
async function loadCountries(selectEl, selectedValue) {
    const data = await tmdb('/configuration/countries');
    if (!data) return;
    selectEl.innerHTML = '<option value="">' + t('all_country') + '</option>';
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
    const div = document.createElement('a');
    div.className = 'card';
    div.href = `detail.html?id=${item.id}&type=${mediaType}`;
    // Store current page as referrer before navigating to detail
    div.addEventListener('click', () => {
        sessionStorage.setItem('bermovie_referrer', location.href);
    });
    div.innerHTML = `
        <img class="card-poster" src="${posterUrl(item.poster_path)}" alt="${title}" loading="lazy" decoding="async" onerror="this.src='${NO_POSTER}'">
        <div class="card-badges">
            <span class="card-type ${isTv ? 'type-tv' : 'type-movie'}">${isTv ? 'TV' : 'MOVIE'}</span>
            ${item.vote_average >= 8 ? '<span class="card-badge">TOP</span>' : ''}
        </div>
        <div class="card-info">
            <div class="card-title" title="${title}">${title}</div>
            <div class="card-meta">
                <span>${year(date)}</span>
                ${item.vote_average ? `<span class="card-rating">★ ${rating(item.vote_average)}</span>` : ''}
            </div>
        </div>
    `;

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
        showToast(t('removed_fav'));
    } else {
        list.push({
            id: item.id, type: type || 'movie',
            title: displayTitle(item),
            poster: item.poster_path,
            year: (item.release_date || item.first_air_date || '').substring(0,4),
            rating: item.vote_average
        });
        showToast(t('added_fav'));
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
    const genres = detail.genres?.map(g => { const gg = (type==='movie'?MOVIE_GENRES:TV_GENRES).find(x=>x.id===g.id); return gg ? genreName(gg) : g.name; }).join(', ') || '';

    el('#modalHero').style.backgroundImage = `url(${backdropUrl(detail.backdrop_path)})`;
    el('#modalTitle').textContent = title;
    el('#modalMeta').innerHTML = `
        <span class="rating">★ ${rating(detail.vote_average)}</span>
        <span>${year(date)}</span>
        ${runtime ? `<span>${runtime} min</span>` : ''}
        <span>${type === 'movie' ? t('nav_movies') : t('nav_tv')}</span>
        ${detail.number_of_seasons ? `<span>${detail.number_of_seasons} ${t('seasons_title')}</span>` : ''}
        ${genres ? `<span>${genres}</span>` : ''}
    `;
    el('#modalOverview').textContent = detail.overview || t('no_desc');

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
            trailerBtn.querySelector('.t-txt').textContent = t('close_trailer');
            trailerBtn.querySelector('.t-ir').style.opacity = '0';
            trailerBtn.onclick = closeAllModals;
        } else alert(t('trailer_unavailable'));
    };

    const seasonsSection = el('#seasonsSection');
    if (type==='tv' && detail.seasons?.length && seasonsSection) {
        seasonsSection.classList.remove('hidden');
        const list = el('#seasonsList');
        list.innerHTML = '';
        detail.seasons.filter(s=>s.season_number>0).forEach(s => {
            const card = document.createElement('div');
            card.className = 'season-card';
            card.innerHTML = `${s.poster_path?`<img src="${IMG_POSTER}${s.poster_path}" alt="">`:''}<div class="info"><strong>${t('seasons_title')} ${s.season_number}</strong><small>${s.episode_count} ${t('episode_title')}</small></div>`;
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
    } else if (currentServer === 'vesy') {
        if (type === 'tv') rawUrl = `${VIDSRV_VESY}?tmdb=${id}`;
        else rawUrl = `${VIDSRV_VESY}?tmdb=${id}`;
    } else if (currentServer === 'vixsrc') {
        if (type === 'tv') rawUrl = `${VIDSRV5_TV}/${id}/${season}/${episode}`;
        else rawUrl = `${VIDSRV5}/${id}`;
    } else if (currentServer === 'apiplayer') {
        if (type === 'tv') rawUrl = `${APIPLAYER}/tv/${id}/${season}/${episode}`;
        else rawUrl = `${APIPLAYER}/movie/${id}`;
    } else if (currentServer === 'videasy') {
        if (type === 'tv') rawUrl = `${VIDEASY}/tv/${id}/${season}-${episode}`;
        else rawUrl = `${VIDEASY}/movie/${id}`;
    } else if (currentServer === 'vidnest') {
        if (type === 'tv') rawUrl = `${VIDNEST}/tv/${id}/${season}-${episode}`;
        else rawUrl = `${VIDNEST}/movie/${id}`;
    } else if (currentServer === 'vidsrcsu') {
        if (type === 'tv') rawUrl = `${VIDSRCSU}/tv/${id}/${season}/${episode}`;
        else rawUrl = `${VIDSRCSU}/movie/${id}`;
    } else if (currentServer === 'vnest') {
        if (type === 'tv') rawUrl = `${VIDSRV_VNEST}?tmdb=${id}`;
        else rawUrl = `${VIDSRV_VNEST}?tmdb=${id}`;
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
            opt.textContent = t('seasons_title') + ' ' + s.season_number;
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
        btn.title = ep.name||`${t('episode_title')} ${ep.episode_number}`;
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
    status.textContent = t('subtitle_unavailable');
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

// Fullscreen button
el('#playerFsBtn') && (el('#playerFsBtn').onclick = () => {
    const iframe = el('#playerFrame');
    const container = el('.iframe-container');
    if (!iframe) return;
    if (document.fullscreenElement || document.webkitFullscreenElement) {
        (document.exitFullscreen || document.webkitExitFullscreen).call(document);
    } else {
        // Try iframe first, then container, then webkit fallback
        const fs = iframe.requestFullscreen?.() || iframe.webkitRequestFullscreen?.() 
                   || container?.requestFullscreen?.() || container?.webkitRequestFullscreen?.();
    }
});

// Mobile touch: tap iframe area to toggle controls
document.addEventListener('DOMContentLoaded', () => {
    const container = el('.iframe-container');
    if (!container) return;
    container.addEventListener('click', (e) => {
        // Don't toggle if tapping server buttons
        if (e.target.closest('.player-servers') || e.target.closest('.svr-btn')) return;
        const top = el('.player-top');
        const ctrl = el('.player-controls');
        const isShowing = ctrl?.classList.contains('show');
        if (isShowing) {
            if(top) top.classList.remove('show');
            if(ctrl) ctrl.classList.remove('show');
        } else {
            if(top) top.classList.add('show');
            if(ctrl) ctrl.classList.add('show');
            clearTimeout(window._playerHideTimer);
            window._playerHideTimer = setTimeout(() => {
                if(top) top.classList.remove('show');
                if(ctrl) ctrl.classList.remove('show');
            }, 4000);
        }
    });
});

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
el('#subText') && (el('#subText').onclick = () => {
    if (subIdx < subCues.length - 1) showSub(++subIdx);
});

// PAGINATION
function renderPagination(containerId, total, current, callback) {
    const container = el(`#${containerId}`);
    if (!container) return;
    container.innerHTML = '';
    const maxShow = 5;
    let start = Math.max(1, current - Math.floor(maxShow/2));
    let end = Math.min(total, start + maxShow - 1);
    if(end - start < maxShow - 1) start = Math.max(1, end - maxShow + 1);

    if (current > 1) {
        const prev = document.createElement('button');
        prev.textContent = '←';
        prev.onclick = () => callback(current - 1);
        container.appendChild(prev);
    }
    for (let i = start; i <= end; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        if (i === current) btn.classList.add('active');
        btn.onclick = () => callback(i);
        container.appendChild(btn);
    }
    if (current < total) {
        const next = document.createElement('button');
        next.textContent = '→';
        next.onclick = () => callback(current + 1);
        container.appendChild(next);
    }
}

// HERO CAROUSEL
let heroTimer = null;
let heroIdx = 0;
let heroItems = [];

function renderHeroSlide(idx) {
    const item = heroItems[idx];
    if (!item) return;
    const type = item.media_type||'movie';
    // Set all slides
    for (let i = 0; i < 5; i++) {
        const slide = el('#heroSlide' + i);
        if (!slide) continue;
        slide.classList.toggle('active', i === idx);
        slide.style.backgroundImage = i === idx ? `url(${backdropUrl(item.backdrop_path)})` : '';
    }
    if (el('#heroTitle')) el('#heroTitle').textContent = displayTitle(item);
    if (el('#heroOverview')) el('#heroOverview').textContent = truncate(item.overview, 200);
        // Hero genre tags
    const gnames = item.genre_ids?.slice(0,3).map(id => {
        const list = type==='movie' ? MOVIE_GENRES : TV_GENRES;
        const g = list.find(g=>g.id===id);
        return g ? genreName(g) : null;
    }).filter(Boolean) || [];
    let genreHtml = gnames.length ? `<div class="hero-genres">${gnames.map(n => `<span class="hero-genre">${n}</span>`).join('')}</div>` : '';
    if (el('#heroMeta')) el('#heroMeta').innerHTML = genreHtml + `<span class="rating-badge">★ ${rating(item.vote_average)}</span><span>${year(item.release_date||item.first_air_date)}</span><span>${type==='movie'?t('nav_movies'):t('nav_tv')}</span>`;
    if (el('#heroBtn')) el('#heroBtn').onclick = () => { sessionStorage.setItem('bermovie_referrer', location.href); window.location.href = `detail.html?id=${item.id}&type=${type}`; };
    // Update dots
    document.querySelectorAll('.hero-dot').forEach((d, i) => d.classList.toggle('active', i === idx));
}

function goHero(i) {
    heroIdx = (i + heroItems.length) % heroItems.length;
    renderHeroSlide(heroIdx);
    resetHeroTimer();
}

function resetHeroTimer() {
    clearInterval(heroTimer);
    heroTimer = setInterval(() => goHero(heroIdx + 1), 5000);
}

async function loadHero() {
    const data = await tmdb('/trending/all/day');
    if (!data?.results?.length) return;
    heroItems = data.results.filter(i=>i.backdrop_path).slice(0,5);
    // Preload first hero image
    if (heroItems[0]?.backdrop_path) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = backdropUrl(heroItems[0].backdrop_path);
        document.head.appendChild(link);
    }
    // Create dots
    const dots = el('#heroDots');
    if (dots) {
        dots.innerHTML = '';
        heroItems.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.className = 'hero-dot' + (i === 0 ? ' active' : '');
            dot.onclick = () => goHero(i);
            dots.appendChild(dot);
        });
    }
    // Arrow buttons
    const prev = el('#heroPrev');
    const next = el('#heroNext');
    if (prev) prev.onclick = () => goHero(heroIdx - 1);
    if (next) next.onclick = () => goHero(heroIdx + 1);
    // Hero drag swipe (mouse + touch)
    const hero = el('#hero');
    let heroDragX = 0, heroDragStart = 0, heroDragged = false;
    if (hero) {
        hero.addEventListener('mousedown', (e) => {
            heroDragStart = e.pageX; heroDragged = false;
            hero.style.cursor = 'grabbing';
        });
        hero.addEventListener('mousemove', (e) => {
            if (!heroDragStart) return;
            const dx = e.pageX - heroDragStart;
            if (Math.abs(dx) > 20) heroDragged = true;
        });
        hero.addEventListener('mouseup', (e) => {
            hero.style.cursor = '';
            if (heroDragged) {
                const dx = e.pageX - heroDragStart;
                if (Math.abs(dx) > 50) goHero(heroIdx + (dx < 0 ? 1 : -1));
            }
            heroDragStart = 0; heroDragged = false;
        });
        hero.addEventListener('mouseleave', () => {
            hero.style.cursor = '';
            heroDragStart = 0;
        });
        hero.addEventListener('touchstart', (e) => {
            heroDragStart = e.touches[0].clientX; heroDragged = false;
        }, { passive: true });
        hero.addEventListener('touchmove', (e) => {
            const dx = e.touches[0].clientX - heroDragStart;
            if (Math.abs(dx) > 20) heroDragged = true;
        }, { passive: true });
        hero.addEventListener('touchend', (e) => {
            if (!heroDragged) return;
            const dx = e.changedTouches[0].clientX - heroDragStart;
            if (Math.abs(dx) > 50) goHero(heroIdx + (dx < 0 ? 1 : -1));
            heroDragStart = 0;
        }, { passive: true });
    }
    // Render first
    heroIdx = 0;
    renderHeroSlide(0);
    resetHeroTimer();
}

async function loadHomeCarousel(path, containerId, type) {
    const data = await tmdb(path);
    const c = el(`#${containerId}`);
    if (!c||!data?.results) return;
    c.innerHTML = '';
    data.results.forEach(i => c.appendChild(createCard(i, type)));
    addCarouselArrows(c);
}

// TRENDING WITH RANK
let trendingFilter = 'all';
// SKELETON LOADER
function showSkeleton(container, count) {
    if (!container) return;
    var html = '';
    for (var i = 0; i < count; i++) {
        html += '<div class="skeleton-card"><div class="skeleton-poster"></div><div class="skeleton-text"></div><div class="skeleton-text short"></div></div>';
    }
    container.innerHTML = html;
}

async function loadTrending(filter) {
    trendingFilter = filter || 'all';
    const list = el('#trendingList');
    if (!list) return;
    const data = await tmdb('/trending/all/day');
    if (!data?.results) return;
    let items = data.results.filter(i=>i.poster_path);
    if (filter === 'movie') items = items.filter(i=>i.media_type==='movie');
    else if (filter === 'tv') items = items.filter(i=>i.media_type==='tv');
    items = items.slice(0,10);
    list.innerHTML = '';
    items.forEach((item, i) => {
        const t = displayTitle(item);
        const d = item.release_date||item.first_air_date||'';
        const y = d ? d.substring(0,4) : '';
        const rate = rating(item.vote_average);
        const mt = item.media_type||'movie';
        const card = document.createElement('a');
        card.className = 'trending-card';
        card.href = 'detail.html?id='+item.id+'&type='+mt;
        card.addEventListener('click', () => sessionStorage.setItem('bermovie_referrer', location.href));
        card.innerHTML = '<span class="trending-rank">'+(i+1)+'</span><img src="'+posterUrl(item.poster_path)+'" alt="'+t+'" loading="lazy"><div class="trending-info"><div class="title">'+t+'</div><div class="meta">'+y+' ~ '+rate+'</div></div>';

        list.appendChild(card);
    });
    // Update filter buttons
    document.querySelectorAll('.trending-filter').forEach(b => {
        b.classList.toggle('active', b.dataset.filter === (filter||'all'));
    });
}

function addCarouselArrows(carousel) {
    if (carousel.dataset.arrows) return;
    carousel.dataset.arrows = '1';
    
    // Mouse drag scrolling with momentum (IDLIX-style)
    let isDown = false, hasDragged = false, startX, scrollLeft, lastX, lastTime, velX = 0;
    let rafId = null;
    
    carousel.addEventListener('mousedown', (e) => {
        if (e.button !== 0) return;
        isDown = true;
        hasDragged = false;
        startX = lastX = e.pageX;
        scrollLeft = carousel.scrollLeft;
        lastTime = Date.now();
        velX = 0;
        if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
        carousel.style.scrollBehavior = 'auto';
        carousel.style.cursor = 'grabbing';
    });
    
    document.addEventListener('mouseup', () => {
        if (!isDown) return;
        isDown = false;
        carousel.style.cursor = 'grab';
        // Apply momentum
        if (hasDragged && Math.abs(velX) > 0.5) {
            let vel = velX;
            const decel = 0.95;
            const step = () => {
                vel *= decel;
                carousel.scrollLeft -= vel;
                if (Math.abs(vel) > 0.5) {
                    rafId = requestAnimationFrame(step);
                }
            };
            rafId = requestAnimationFrame(step);
        }
        if (hasDragged) {
            setTimeout(() => { hasDragged = false; }, 100);
        }
    });
    
    carousel.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX;
        const walk = x - startX;
        if (Math.abs(walk) > 3) hasDragged = true;
        carousel.scrollLeft = scrollLeft - walk;
        // Track velocity
        const now = Date.now();
        const dt = now - lastTime;
        if (dt > 0) {
            velX = (x - lastX) / dt * 16; // normalize to ~60fps
        }
        lastX = x;
        lastTime = now;
    });
    
    // Prevent card clicks when dragging
    carousel.addEventListener('click', (e) => {
        if (hasDragged) {
            e.stopPropagation();
            e.preventDefault();
        }
    }, true);
    
    carousel.addEventListener('dragstart', (e) => e.preventDefault());
    
    carousel.style.cursor = 'grab';
    
    const wrap = carousel.parentElement;
    if (!wrap || wrap.classList.contains('carousel-wrap')) return;
    const section = wrap.closest('.section');
    if (!section) return;
    const header = section.querySelector('.section-header');
    if (!header) return;
    const nav = document.createElement('div');
    nav.className = 'carousel-nav';
    nav.innerHTML = `<button class="carousel-btn carousel-prev">‹</button><button class="carousel-btn carousel-next">›</button>`;
    header.appendChild(nav);
    const prev = nav.querySelector('.carousel-prev');
    const next = nav.querySelector('.carousel-next');
    const scroll = (dir) => {
        const w = carousel.children[0]?.offsetWidth || 200;
        carousel.scrollBy({ left: dir * (w + 14) * 3, behavior: 'smooth' });
    };
    prev.onclick = () => scroll(-1);
    next.onclick = () => scroll(1);
    // Hide prev/next at edges
    carousel.addEventListener('scroll', () => {
        const atStart = carousel.scrollLeft < 10;
        const atEnd = carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 10;
        prev.style.opacity = atStart ? '0' : '1';
        prev.style.pointerEvents = atStart ? 'none' : 'auto';
        next.style.opacity = atEnd ? '0' : '1';
        next.style.pointerEvents = atEnd ? 'none' : 'auto';
    });
    // Initial check
    setTimeout(() => carousel.dispatchEvent(new Event('scroll')), 100);
}

function initHomePage() {
    // Show skeleton loaders
    showSkeleton(el('#trendingList'), 10);
    showSkeleton(el('#moviesCarousel'), 10);
    showSkeleton(el('#tvCarousel'), 10);
    showSkeleton(el('#topRatedCarousel'), 10);
    showSkeleton(el('#nowPlayingCarousel'), 10);
    showSkeleton(el('#indoMoviesCarousel'), 10);
    showSkeleton(el('#indoSeriesCarousel'), 10);
    showSkeleton(el('#drakorCarousel'), 10);
    loadHero();
    loadTrending('all');
    loadHomeCarousel('/movie/popular', 'moviesCarousel', 'movie');
    loadHomeCarousel('/tv/popular', 'tvCarousel', 'tv');
    loadHomeCarousel('/movie/top_rated', 'topRatedCarousel', 'movie');
    loadHomeCarousel('/movie/now_playing', 'nowPlayingCarousel', 'movie');
    // Indonesian content
    loadHomeCarousel('/discover/movie?with_origin_country=ID', 'indoMoviesCarousel', 'movie');
    loadHomeCarousel('/discover/tv?with_origin_country=ID', 'indoSeriesCarousel', 'tv');
    // Korean Drama (Drakor)
    loadHomeCarousel('/discover/tv?with_origin_country=KR&sort_by=popularity.desc', 'drakorCarousel', 'tv');
    // Check for watchlist
    if (window.location.search.includes('watchlist')) {
        renderWatchlist();
        document.querySelectorAll('.nav-fav').forEach(el => el.classList.add('active'));
    }
}

// MOVIES PAGE
let movieLoadId = 0;
async function loadMovies(page = 1) {
    const grid = el('#movieGrid');
    const loading = el('#loading');
    if (!grid) return;
    const loadId = ++movieLoadId;
    loading?.classList.remove('hidden');
    showSkeleton(grid, 21);

    const params = { page, sort_by: currentSort };
    if (currentGenreId) params.with_genres = currentGenreId;
    if (currentYear) {
        params['primary_release_date.gte'] = `${currentYear}-01-01`;
        params['primary_release_date.lte'] = `${currentYear}-12-31`;
    }
    if (currentCountry) params.with_origin_country = currentCountry;

    const data = await tmdb('/discover/movie', {...params, page: (currentPage - 1) * 2 + 1});
    if (loadId !== movieLoadId) return;
    loading?.classList.add('hidden');
    if (!data?.results) return;
    const data2 = data.total_pages > 1 ? await tmdb('/discover/movie', {...params, page: (currentPage - 1) * 2 + 2}) : {results:[]};
    if (loadId !== movieLoadId) return;
    grid.innerHTML = '';
    [...(data.results||[]), ...(data2?.results||[])]
        .filter((item, i, arr) => arr.findIndex(x => x.id === item.id) === i)
        .slice(0,21).forEach(i => grid.appendChild(createCard(i, 'movie')));
    const totalPages = Math.ceil(Math.min(data.total_pages, 500) / 2);
    renderPagination('moviePagination', totalPages, page, p => {
        currentPage = p;
        loadMovies(p);
        window.scrollTo({top: 0, behavior: 'smooth'});
    });
}

// INFINITE SCROLL
function initInfiniteScroll(gridId, loadFn) {
    const grid = el(gridId);
    if (!grid) return;
    const sentinel = document.createElement('div');
    sentinel.className = 'scroll-sentinel';
    sentinel.style.cssText = 'height:1px;width:100%';
    grid.parentElement.appendChild(sentinel);
    let loading = false;
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !loading) {
            loading = true;
            loadFn().then(() => { loading = false; });
        }
    }, { rootMargin: '400px' });
    observer.observe(sentinel);
}

function initMoviesPage() {
    const genreSel = el('#genreFilter');
    const yearSel = el('#yearFilter');
    const sortSel = el('#sortFilter');
    const countrySel = el('#countryFilter');

    // Check URL params
    const urlParams = new URLSearchParams(window.location.search);
    const urlCountry = urlParams.get('country');
    const urlGenre = urlParams.get('genre');
    const urlYear = urlParams.get('year');
    const urlSort = urlParams.get('sort');

    if (genreSel) {
        genreSel.innerHTML = '<option value="">' + t('all_genre') + '</option>';
        MOVIE_GENRES.forEach(g => {
            genreSel.innerHTML += `<option value="${g.id}">${genreName(g)}</option>`;
        });
        if (urlGenre) { genreSel.value = urlGenre; currentGenreId = urlGenre; }
        genreSel.onchange = () => { currentGenreId = genreSel.value||null; currentPage=1; loadMovies(); updateURL(); };
    }
    if (yearSel) {
        const now = new Date().getFullYear();
        yearSel.innerHTML = '<option value="">' + t('all_year') + '</option>';
        for (let y = now; y >= 1950; y--) yearSel.innerHTML += `<option value="${y}">${y}</option>`;
        if (urlYear) { yearSel.value = urlYear; currentYear = urlYear; }
        yearSel.onchange = () => { currentYear = yearSel.value; currentPage=1; loadMovies(); updateURL(); };
    }
    if (sortSel) {
        if (urlSort) { sortSel.value = urlSort; currentSort = urlSort; }
        sortSel.onchange = () => { currentSort = sortSel.value; currentPage=1; loadMovies(); updateURL(); };
    }
    if (countrySel) {
        if (urlCountry) currentCountry = urlCountry;
        countrySel.onchange = () => { currentCountry = countrySel.value; currentPage=1; loadMovies(); updateURL(); };
        loadCountries(countrySel, urlCountry).then(() => { if (urlCountry) currentCountry = countrySel.value; });
        loadMovies();
    } else {
        loadMovies();
    }
}

// TV PAGE
// TV PAGE
let tvLoadId = 0;
async function loadTvShows(page = 1) {
    const grid = el('#tvGrid');
    const loading = el('#loading');
    if (!grid) return;
    const loadId = ++tvLoadId;
    loading?.classList.remove('hidden');
    showSkeleton(grid, 21);

    const params = { page, sort_by: currentSort };
    if (currentGenreId) params.with_genres = currentGenreId;
    if (currentYear) {
        params['first_air_date.gte'] = `${currentYear}-01-01`;
        params['first_air_date.lte'] = `${currentYear}-12-31`;
    }
    if (currentCountry) params.with_origin_country = currentCountry;
    if (currentNetwork) params.with_networks = currentNetwork;

    const data = await tmdb('/discover/tv', {...params, page: (currentPage - 1) * 2 + 1});
    if (loadId !== tvLoadId) return;
    loading?.classList.add('hidden');
    if (!data?.results) return;
    const data2 = data.total_pages > 1 ? await tmdb('/discover/tv', {...params, page: (currentPage - 1) * 2 + 2}) : {results:[]};
    if (loadId !== tvLoadId) return;
    grid.innerHTML = '';
    [...(data.results||[]), ...(data2?.results||[])]
        .filter((item, i, arr) => arr.findIndex(x => x.id === item.id) === i)
        .slice(0,21).forEach(i => grid.appendChild(createCard(i, 'tv')));
    const totalPages = Math.ceil(Math.min(data.total_pages, 500) / 2);
    renderPagination('tvPagination', totalPages, page, p => {
        currentPage = p;
        loadTvShows(p);
        window.scrollTo({top: 0, behavior: 'smooth'});
    });
}

function initTvPage() {
    const genreSel = el('#genreFilter');
    const yearSel = el('#yearFilter');
    const sortSel = el('#sortFilter');
    const countrySel = el('#countryFilter');
    const networkSel = el('#networkFilter');

    const urlParams = new URLSearchParams(window.location.search);
    const urlCountry = urlParams.get('country');
    const urlGenre = urlParams.get('genre');
    const urlYear = urlParams.get('year');
    const urlSort = urlParams.get('sort');
    const urlNetwork = urlParams.get('network');

    // Sync filters (semua synchronous)
    if (genreSel) {
        genreSel.innerHTML = '<option value="">' + t('all_genre') + '</option>';
        TV_GENRES.forEach(g => {
            genreSel.innerHTML += `<option value="${g.id}">${genreName(g)}</option>`;
        });
        if (urlGenre) { genreSel.value = urlGenre; currentGenreId = urlGenre; }
        genreSel.onchange = () => { currentGenreId = genreSel.value||null; currentPage=1; loadTvShows(); updateURL(); };
    }
    if (yearSel) {
        const now = new Date().getFullYear();
        yearSel.innerHTML = '<option value="">' + t('all_year') + '</option>';
        for (let y = now; y >= 1950; y--) yearSel.innerHTML += `<option value="${y}">${y}</option>`;
        if (urlYear) { yearSel.value = urlYear; currentYear = urlYear; }
        yearSel.onchange = () => { currentYear = yearSel.value; currentPage=1; loadTvShows(); updateURL(); };
    }
    if (sortSel) {
        if (urlSort) { sortSel.value = urlSort; currentSort = urlSort; }
        sortSel.onchange = () => { currentSort = sortSel.value; currentPage=1; loadTvShows(); updateURL(); };
    }
    if (networkSel) {
        networkSel.innerHTML = '<option value="">' + t('all_network') + '</option>';
        NETWORKS.forEach(n => { networkSel.innerHTML += `<option value="${n.id}">${n.name}</option>`; });
        if (urlNetwork) { networkSel.value = urlNetwork; currentNetwork = urlNetwork; }
        networkSel.onchange = () => { currentNetwork = networkSel.value; currentPage=1; loadTvShows(); updateURL(); };
    }
    if (countrySel) {
        if (urlCountry) currentCountry = urlCountry;
        countrySel.onchange = () => { currentCountry = countrySel.value; currentPage=1; loadTvShows(); updateURL(); };
        loadCountries(countrySel, urlCountry).then(() => { if (urlCountry) currentCountry = countrySel.value; });
        loadTvShows();
    } else {
        loadTvShows();
    }
}

// GENRE PAGE
function initGenrePage() {
    const grid = el('#genreGrid');
    if (!grid) return;

    let activeType = 'movie';
    let activeGenre = null;

    function renderGenreCards(type) {
        grid.innerHTML = '';
        const genres = type === 'movie' ? MOVIE_GENRES : TV_GENRES;
        genres.forEach((g, i) => {
            const card = document.createElement('div');
            card.className = 'genre-card';
            card.style.background = '';
            card.innerHTML = `<span class="genre-name">${genreName(g)}</span>`;
            card.onclick = () => {
                const base = type === 'tv' ? 'tv.html' : 'movies.html';
                window.location.href = `${base}?genre=${g.id}`;
            };
            grid.appendChild(card);
        });
    }

    all('.genre-type-btn').forEach(btn => {
        btn.onclick = () => {
            activeType = btn.dataset.type;
            all('.genre-type-btn').forEach(b=>b.classList.remove('active'));
            btn.classList.add('active');
            el('#genreResults')?.classList.add('hidden');
            if (el('#genreResults')) el('#genreResults').style.display = 'none';
            el('#genreGrid')?.classList.remove('hidden');
            currentGenreId = null;
            currentGenreName = '';
            updateURL();
            renderGenreCards(activeType);
        };
    });

    // Populate year filter
    const yearSel = el('#yearFilter');
    if (yearSel) {
        const now = new Date().getFullYear();
        for (let y = now; y >= 1950; y--) yearSel.innerHTML += `<option value="${y}">${y}</option>`;
        yearSel.onchange = () => {
            currentYear = yearSel.value;
            if(activeGenre) loadGenreResults(activeType, activeGenre.id, genreName(activeGenre), 1);
            updateURL();
        };
    }

    const sortSel = el('#sortFilter');
    if (sortSel) {
        sortSel.onchange = () => {
            currentSort = sortSel.value;
            if(activeGenre) loadGenreResults(activeType, activeGenre.id, genreName(activeGenre), 1);
            updateURL();
        };
    }

    renderGenreCards('movie');

    // Auto-load genre from URL params
    const urlP = getURLParams();
    if (urlP.genre) {
        let g = MOVIE_GENRES.find(x => x.id == urlP.genre);
        let mediaType = 'movie';
        if (!g) {
            g = TV_GENRES.find(x => x.id == urlP.genre);
            if (g) mediaType = 'tv';
        }
        if (g) {
            activeGenre = g;
            activeType = mediaType;
            currentGenreId = g.id;
            currentGenreName = genreName(g);
            currentSort = urlP.sort;
            currentYear = urlP.year;
            const yearSel = el('#yearFilter');
            if (yearSel && urlP.year) yearSel.value = urlP.year;
            const sortSel = el('#sortFilter');
            if (sortSel && urlP.sort) sortSel.value = urlP.sort;
            // Set active toggle
            all('.genre-type-btn').forEach(b => b.classList.remove('active'));
            const activeBtn = el(`.genre-type-btn[data-type="${mediaType}"]`);
            if (activeBtn) activeBtn.classList.add('active');
            loadGenreResults(mediaType, g.id, genreName(g), urlP.page);
        }
    }
}

async function loadGenreResults(type, genreId, genreName, page=1) {
    const section = el('#genreResults');
    const grid = el('#resultsGrid');
    const loading = el('#loading');
    if (!section||!grid) return;

    section.classList.remove('hidden');
    section.style.display = '';
    loading?.classList.remove('hidden');
    grid.innerHTML = '';
    if (el('#genreResultsTitle')) el('#genreResultsTitle').textContent = genreName;
    el('#genreGrid')?.classList.add('hidden');
    currentGenreId = genreId;
    currentGenreName = genreName;

    // Back to genre grid on back button click or tapping empty header
    const backBtn = el('#backToGenresBtn');
    if (backBtn) {
        backBtn.onclick = () => {
            section.classList.add('hidden');
            section.style.display = 'none';
            el('#genreGrid')?.classList.remove('hidden');
            el('#genreGrid')?.scrollIntoView({behavior:'smooth', block:'start'});
            currentGenreId = null;
            currentGenreName = '';
            updateURL();
        };
    }

    const yearSel = el('#yearFilter');
    const sortSel = el('#sortFilter');
    const params = { page, sort_by: sortSel?.value||'popularity.desc', with_genres: genreId };
    const yv = yearSel?.value;
    if (yv) {
        if(type==='movie') {
            params['primary_release_date.gte'] = `${yv}-01-01`;
            params['primary_release_date.lte'] = `${yv}-12-31`;
        } else {
            params['first_air_date.gte'] = `${yv}-01-01`;
            params['first_air_date.lte'] = `${yv}-12-31`;
        }
    }

    const data = await tmdb(`/discover/${type}`, params);
    loading?.classList.add('hidden');
    if (!data?.results) return;

    data.results.forEach(i => grid.appendChild(createCard(i, type)));
        fillGrid(grid);
    renderPagination('resultsPagination', Math.min(data.total_pages, 500), page, p => {
        loadGenreResults(type, genreId, genreName, p);
        window.scrollTo({top: section.offsetTop - 80, behavior: 'smooth'});
    });
}



// SEARCH
async function doSearch(query, page=1) {
    const data = await tmdb('/search/multi', { query, page });
    if (!data) return;

    // On home page: hide sections, show search
    const homeSections = ['trending','popularMovies','popularTv','topRated','nowPlaying','hero','indoMovies','indoSeries','genrePills'];
    homeSections.forEach(id => {
        const sec = el(`#${id}`);
        if (sec) sec.classList.add('hidden');
    });
    // On movies/tv pages: hide filters and grid (not page-content — search results inside it)
    document.querySelectorAll('#movieGrid, #tvGrid, #moviePagination, #tvPagination, .filters, .page-title').forEach(s => {
        if (s) s.classList.add('hidden');
    });

    let section = el('#searchResults');
    if (!section) {
        const base = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
        window.location.href = `${base}?q=${encodeURIComponent(query)}`;
        return;
    }
    section.classList.remove('hidden');
    if (el('#searchTitle')) el('#searchTitle').textContent = t('search_result') + ': "' + query + '" (' + data.total_results + ')';
    // Update section title with count
    const st = el('.page-title');
    if (st && data.total_results > 0) {
        let c = st.querySelector('.count-badge');
        if (!c) { c = document.createElement('span'); c.className = 'count-badge'; st.appendChild(c); }
        c.textContent = data.total_results > 999 ? '999+' : data.total_results;
    }
    // Update URL so search persists on refresh
    const url = new URL(window.location);
    url.searchParams.set('q', query);
    window.history.replaceState(null, '', url);
    const grid = el('#searchGrid');
    grid.innerHTML = '';
    const data2 = data.total_pages > 1 ? await tmdb('/search/multi', { query, page: page+1 }) : {results:[]};
    const items = [...data.results, ...data2.results]
        .filter((item, i, arr) => arr.findIndex(x => x.id === item.id) === i)
        .filter(i => ['movie','tv'].includes(i.media_type))
        .slice(0,21);
    
    if (items.length === 0) {
        grid.innerHTML = '<div class="empty-state"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg><p>' + t('no_result') + ' "${query}"</p></div>';
    } else {
        items.forEach(i => grid.appendChild(createCard(i, i.media_type)));
    }
    renderPagination('searchPagination', Math.ceil(Math.min(data.total_pages, 20) / 2), page, p => doSearch(query, p));
}

// RENDER WATCHLIST
function renderWatchlist() {
    const section = el('#watchlistSection');
    if (!section) return;
    // Hide homepage sections
    ['hero','trending','popularMovies','popularTv','topRated','nowPlaying','indoMovies','indoSeries','genrePills'].forEach(id => {
        const sec = el(`#${id}`);
        if (sec) sec.classList.add('hidden');
    });
    section.classList.remove('hidden');
    const grid = el('#watchlistGrid');
    const empty = el('#watchlistEmpty');
    const list = getWatchlist();
    if (list.length === 0) {
        grid.innerHTML = '';
        empty.style.display = '';
        return;
    }
    empty.style.display = 'none';
    grid.innerHTML = '';
    list.forEach(item => {
        // Create card from saved data (use TMDB image URL)
        const div = document.createElement('a');
        div.className = 'card';
        div.href = `detail.html?id=${item.id}&type=${item.type}`;
        div.addEventListener('click', () => sessionStorage.setItem('bermovie_referrer', location.href));
        div.innerHTML = `<img class="card-poster" src="https://image.tmdb.org/t/p/w500${item.poster}" alt="${item.title}" loading="lazy" onerror="this.src='${NO_POSTER}'">
            <div class="card-info"><div class="card-title">${item.title}</div><div class="card-meta"><span>${item.year}</span><span class="card-rating">★ ${rating(item.rating)}</span></div></div>
        `;

        // Heart to remove
        const heart = document.createElement('div');
        heart.className = 'card-heart active';
        heart.onclick = (e) => {
            e.stopPropagation();
            toggleWatchlist(item, item.type);
            renderWatchlist();
        };
        div.appendChild(heart);
        grid.appendChild(div);
    });
}

function hideSearch() {
    ['trending','popularMovies','popularTv','topRated','nowPlaying','hero','indoMovies','indoSeries','genrePills'].forEach(id => {
        const sec = el(`#${id}`);
        if (sec) sec.classList.remove('hidden');
    });
    document.querySelectorAll('#movieGrid, #tvGrid, #moviePagination, #tvPagination, .filters, .page-title').forEach(s => {
        if (s) s.classList.remove('hidden');
    });
    el('#searchResults')?.classList.add('hidden');
    // Clear search param from URL
    const url = new URL(window.location);
    url.searchParams.delete('q');
    window.history.replaceState(null, '', url);
}

// NAV DROPDOWNS
function initNavDropdowns() {
    const genreDD = el('#genreDropdown');
    const countryDD = el('#countryDropdown');
    const yearDD = el('#yearDropdown');
    if (genreDD) {
        let html = '<a href="movies.html">' + t('all_genre') + '</a>';
        MOVIE_GENRES.forEach(g => { html += '<a href="movies.html?genre='+g.id+'">'+genreName(g)+'</a>'; });
        genreDD.innerHTML = html;
    }
    if (countryDD) {
        const countries = ['SA','AU','NL','BR','CN','DK','PH','FI','HK','IN','ID','GB','IT','JP','DE','CA','KR','MY','MX','NO','FR','RU','SG','ES','SE','TH','TR','AE','US'];
        const names = (_lang === 'id') ? {'ID':'Indonesia','US':'Amerika Serikat','GB':'Inggris','JP':'Jepang','KR':'Korea','IN':'India','FR':'Perancis','DE':'Jerman','CN':'China','HK':'Hong Kong','MY':'Malaysia','SG':'Singapura','TH':'Thailand','PH':'Filipina','AU':'Australia','CA':'Kanada','MX':'Meksiko','BR':'Brazil','RU':'Rusia','ES':'Spanyol','IT':'Italia','NL':'Belanda','SE':'Swedia','NO':'Norwegia','DK':'Denmark','FI':'Finlandia','TR':'Turki','AE':'UEA','SA':'Arab Saudi'} : {'ID':'Indonesia','US':'United States','GB':'United Kingdom','JP':'Japan','KR':'Korea','IN':'India','FR':'France','DE':'Germany','CN':'China','HK':'Hong Kong','MY':'Malaysia','SG':'Singapore','TH':'Thailand','PH':'Philippines','AU':'Australia','CA':'Canada','MX':'Mexico','BR':'Brazil','RU':'Russia','ES':'Spain','IT':'Italy','NL':'Netherlands','SE':'Sweden','NO':'Norway','DK':'Denmark','FI':'Finland','TR':'Turkey','AE':'UAE','SA':'Saudi Arabia'};
        let h = '<a href="movies.html">' + t('all_country') + '</a>';
        countries.forEach(c => { h += '<a href="movies.html?country='+c+'">'+(names[c]||c)+'</a>'; });
        countryDD.innerHTML = h;
    }
    if (yearDD) {
        const now = new Date().getFullYear();
        let h = '<a href="movies.html">' + t('all_year') + '</a>';
        for (let y = now; y >= 1950; y--) h += '<a href="movies.html?year='+y+'">'+y+'</a>';
        yearDD.innerHTML = h;
    }
    // Dropdown toggle (click for all sizes)
    document.querySelectorAll('.nav-dropdown-trigger').forEach(trigger => {
        trigger.onclick = (e) => {
            e.preventDefault();
            const dd = trigger.parentElement.querySelector('.dropdown-menu');
            if (!dd) return;
            const isOpen = dd.classList.contains('show');
            document.querySelectorAll('.dropdown-menu').forEach(m => m.classList.remove('show'));
            if (!isOpen) dd.classList.add('show');
        };
    });
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-dropdown')) {
            document.querySelectorAll('.dropdown-menu').forEach(m => m.classList.remove('show'));
        }
    });
    // Close dropdown when clicking any link inside it
    document.querySelectorAll('.dropdown-menu a').forEach(a => {
        a.addEventListener('click', () => {
            a.closest('.dropdown-menu').classList.remove('show');
        });
    });
    // Trending filter clicks
    document.querySelectorAll('.trending-filter').forEach(btn => {
        btn.onclick = () => loadTrending(btn.dataset.filter);
    });
    // Init genre pills
    initGenrePills();
}

// GENRE PILLS
function initGenrePills() {
    const pills = el('#genrePills');
    if (!pills) return;
    const genres = ['Action','Comedy','Drama','Horror','Sci-Fi','Romance','Crime','Thriller','Animation','Documentary'];
    pills.innerHTML = genres.map(g => {
        const mg = MOVIE_GENRES.find(x => x.name === g);
        const label = mg ? genreName(mg) : g;
        return `<span class="pill" data-genre="${g}">${label}</span>`;
    }).join('');
    pills.querySelectorAll('.pill').forEach(p => {
        p.onclick = () => { window.location.href = `movies.html?genre=${MOVIE_GENRES.find(x=>x.name===p.dataset.genre)?.id||''}`; };
    });
}

// SCROLL EVENTS (back to top + progress)
function initScrollEvents() {
    const btn = el('#backTop');
    const prog = el('#scrollProgress');
    if (!btn && !prog) return;
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scroll = window.scrollY;
                const max = document.documentElement.scrollHeight - window.innerHeight;
                if (prog) prog.style.width = `${(scroll / max) * 100}%`;
                if (btn) btn.classList.toggle('show', scroll > 300);
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
    btn?.addEventListener('click', () => window.scrollTo({top:0,behavior:'smooth'}));
}

// KEYBOARD SHORTCUTS
function initKeyboard() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Close all modals
            document.querySelectorAll('.modal, .player-modal').forEach(m => {
                if (!m.classList.contains('hidden')) {
                    m.classList.add('hidden');
                    document.body.style.overflow = '';
                }
            });
            // Close trailer if active via click (triggers close handler)
            const hero = document.getElementById('detailHero');
            if (hero && hero.classList.contains('trailer-active')) {
                document.getElementById('detailTrailerBtn')?.click();
            }
            const mt = document.getElementById('modalTrailerBtn');
            if (mt) { mt.querySelector('.t-il').textContent = ''; mt.querySelector('.t-il').style.opacity = '0'; mt.querySelector('.t-txt').textContent = t('trailer_btn'); mt.querySelector('.t-ir').style.opacity = '1'; mt.onclick = null; }
            // Close episode sheet
            const epSheet = document.getElementById('episodeSheet');
            if (epSheet && !epSheet.classList.contains('hidden')) {
                epSheet.classList.add('hidden');
                e.preventDefault();
                return;
            }
            // Show back button
            const backBtn = document.getElementById('detailBackBtn');
            if (backBtn) backBtn.style.display = '';
        }
    });
}

// GLOBAL EVENTS
function initGlobalEvents() {
    initNavDropdowns();
    initScrollEvents();
    initKeyboard();
    // Set active nav link based on current page (use data-nav to avoid false matches)
    const curPage = window.location.pathname.split('/').pop() || 'index.html';
    const hasWatchlist = window.location.search.includes('watchlist');
    const navMap = {
        'index.html': 'home', '': 'home',
        'movies.html': 'movies',
        'tv.html': 'tv',
        'genre.html': 'genre',
        'leaderboard.html': 'leaderboard'
    };
    const activeNav = hasWatchlist ? 'watchlist' : (navMap[curPage] || '');
    document.querySelectorAll('.nav-links a[data-nav], .mobile-menu a[data-nav]').forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('data-nav') === activeNav) a.classList.add('active');
    });
    // Search
    const searchInput = el('#searchInput');
    const searchBtn = el('#searchBtn');
    if (searchBtn) searchBtn.onclick = () => { const q=searchInput?.value.trim(); if(q) doSearch(q); };
    if (searchInput) { searchInput.onkeydown = e => { if(e.key==='Enter'){const q=searchInput.value.trim();if(q)doSearch(q);} }; searchInput.oninput = () => debounceSearch(searchInput.value.trim()); }

    // Mobile menu
    const menuBtn = el('#mobileMenuBtn');
    const mobileMenu = el('#mobileMenu');
    if (menuBtn && mobileMenu) {
        function toggleMenu(force) {
            const open = force !== undefined ? force : !mobileMenu.classList.contains('open');
            mobileMenu.classList.toggle('open', open);
        }
        menuBtn.onclick = (e) => { e.stopPropagation(); toggleMenu(); };
        // Mobile expandable dropdowns - init once
        function makeExpandable(link, html) {
            if (!link || link._expanded) return;
            link._expanded = true;
            link.removeAttribute('href');
            link.style.cursor = 'pointer';
            // Add arrow indicator
            const arrow = document.createElement('span');
            arrow.textContent = '▾';
            arrow.style.cssText = 'margin-left:auto;font-size:.7rem;opacity:.5;transition:transform .2s';
            link.appendChild(arrow);
            // Create sub-grid
            const grid = document.createElement('div');
            grid.className = 'mob-sub-grid';
            grid.innerHTML = html;
            link.after(grid);
            link.onclick = (e) => {
                e.stopPropagation();
                const isOpen = grid.classList.toggle('show');
                arrow.style.transform = isOpen ? 'rotate(180deg)' : '';
            };
            grid.querySelectorAll('a').forEach(a => { a.onclick = () => toggleMenu(false); });
        }
        // Tahun expandable
        const mobTahun = mobileMenu.querySelector('[data-nav="tahun"]');
        if (mobTahun) {
            const now = new Date().getFullYear();
            let yh = '';
            for (let y = now; y >= 1980; y--) yh += `<a href="movies.html?year=${y}">${y}</a>`;
            makeExpandable(mobTahun, yh);
        }
        // Country expandable
        const mobCountry = mobileMenu.querySelector('[data-nav="country"]');
        if (mobCountry) {
            const cc = ['SA','AU','NL','BR','CN','DK','PH','FI','HK','IN','ID','GB','IT','JP','DE','CA','KR','MY','MX','NO','FR','RU','SG','ES','SE','TH','TR','AE','US'];
            const nm = (_lang === 'id') ? {'ID':'Indonesia','US':'Amerika','GB':'Inggris','JP':'Jepang','KR':'Korea','IN':'India','FR':'Perancis','DE':'Jerman','CN':'China','HK':'Hong Kong','MY':'Malaysia','SG':'Singapura','TH':'Thailand','PH':'Filipina','AU':'Australia','CA':'Kanada','MX':'Meksiko','BR':'Brazil','RU':'Rusia','ES':'Spanyol','IT':'Italia','NL':'Belanda','SE':'Swedia','NO':'Norwegia','DK':'Denmark','FI':'Finlandia','TR':'Turki','AE':'UEA','SA':'Arab Saudi'} : {'ID':'Indonesia','US':'United States','GB':'United Kingdom','JP':'Japan','KR':'Korea','IN':'India','FR':'France','DE':'Germany','CN':'China','HK':'Hong Kong','MY':'Malaysia','SG':'Singapore','TH':'Thailand','PH':'Philippines','AU':'Australia','CA':'Canada','MX':'Mexico','BR':'Brazil','RU':'Russia','ES':'Spain','IT':'Italy','NL':'Netherlands','SE':'Sweden','NO':'Norway','DK':'Denmark','FI':'Finland','TR':'Turkey','AE':'UAE','SA':'Saudi Arabia'};
            let ch = '';
            cc.forEach(c => { ch += `<a href="movies.html?country=${c}">${nm[c]||c}</a>`; });
            makeExpandable(mobCountry, ch);
        }
        // Genre expandable
        const mobGenre = mobileMenu.querySelector('[data-nav="genre"]');
        if (mobGenre && !mobGenre._expanded) {
            mobGenre._expanded = true;
            mobGenre.removeAttribute('href');
            mobGenre.style.cursor = 'pointer';
            const arrow = document.createElement('span');
            arrow.textContent = '▾';
            arrow.style.cssText = 'margin-left:auto;font-size:.7rem;opacity:.5';
            mobGenre.appendChild(arrow);
            const grid = document.createElement('div');
            grid.className = 'mob-sub-grid';
            const genreMap = {28:'Action',35:'Comedy',18:'Drama',27:'Horror',878:'Sci-Fi',10749:'Romance',80:'Crime',53:'Thriller',16:'Animation',99:'Documentary'};
            let gh = '';
            for (const [id, name] of Object.entries(genreMap)) gh += `<a href="movies.html?genre=${id}">${name}</a>`;
            grid.innerHTML = gh;
            mobGenre.after(grid);
            mobGenre.onclick = (e) => {
                e.stopPropagation();
                grid.classList.toggle('show');
                arrow.style.transform = grid.classList.contains('show') ? 'rotate(180deg)' : '';
            };
            grid.querySelectorAll('a').forEach(a => { a.onclick = () => toggleMenu(false); });
        }
        // Close menu on non-expandable links
        mobileMenu.querySelectorAll('a[data-nav]').forEach(a => {
            const nav = a.getAttribute('data-nav');
            if (nav !== 'tahun' && nav !== 'country' && nav !== 'genre') {
                a.onclick = () => toggleMenu(false);
            }
        });
    }

    // Mobile search
    const mobSearchBtn = el('#mobileSearchBtn');
    const mobSearchInput = el('#mobileSearchInput');
    const doMobSearch = () => { const q = mobSearchInput?.value.trim(); if (q) { mobileMenu?.classList.remove('open'); doSearch(q); } };
    if (mobSearchBtn) mobSearchBtn.onclick = doMobSearch;
    if (mobSearchInput) { mobSearchInput.onkeydown = e => { if (e.key === 'Enter') doMobSearch(); }; mobSearchInput.oninput = () => debounceSearch(mobSearchInput.value.trim()); }

    // Close modals
    document.querySelectorAll('.modal-close, .modal-backdrop').forEach(el => {
        el.onclick = closeAllModals;
    });
    document.querySelectorAll('.player-close, .player-backdrop').forEach(el => {
        el.onclick = closeAllModals;
    });
    document.onkeydown = e => { if(e.key==='Escape') closeAllModals(); };
}

// DETAIL PAGE (for detail.html)
async function loadDetailPage(id, type) {
    const loading = document.getElementById('detailLoading');
    const page = document.getElementById('detailPage');
    if (!page) return;

    // Back button handler - direct navigation (history.back unreliable on mobile WebView after iframe)
    const backBtn = document.getElementById('detailBackBtn');
    // Capture referrer: try document.referrer, then sessionStorage, then fallback
    let goBack = '';
    if (document.referrer && document.referrer.indexOf(location.origin) === 0) {
        goBack = document.referrer;
        sessionStorage.setItem('bermovie_referrer', goBack);
    } else {
        goBack = sessionStorage.getItem('bermovie_referrer') || '';
    }
    if (!goBack) {
        const fromParam = new URLSearchParams(location.search).get('from');
        goBack = (fromParam && fromParam.indexOf(location.origin) === 0) ? fromParam : './';
    }
    // Telegram Mini App: use native BackButton
    if (isTgMiniApp && tg.BackButton) {
        tg.BackButton.show();
        tg.BackButton.onClick(() => {
            // If player is open, close it first
            const playerModal = document.getElementById('playerModal');
            if (playerModal && !playerModal.classList.contains('hidden')) {
                closeAllModals();
                return;
            }
            location.href = goBack;
        });
    }
    // Always set up custom back button as fallback
    if (backBtn && !backBtn._hasHandler) {
        backBtn._hasHandler = true;
        backBtn.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            // If player is open, close it first
            const playerModal = document.getElementById('playerModal');
            if (playerModal && !playerModal.classList.contains('hidden')) {
                closeAllModals();
                return;
            }
            location.href = goBack;
        };
    }

    const [detail, credits, similar, videosData] = await Promise.all([
        tmdb(`/${type}/${id}`),
        tmdb(`/${type}/${id}/credits`),
        tmdb(`/${type}/${id}/similar`),
        tmdb(`/${type}/${id}/videos`)
    ]);

    if (!detail) {
        loading.textContent = t('load_fail');
        return;
    }

    loading?.classList.add('hidden');
    page.classList.remove('hidden');

    const title = displayTitle(detail);
    const date = detail.release_date || detail.first_air_date;
    const runtime = detail.runtime || (detail.episode_run_time?.[0]) || 0;
    const genres = detail.genres?.map(g => { const gg = (type==='movie'?MOVIE_GENRES:TV_GENRES).find(x=>x.id===g.id); return gg ? genreName(gg) : g.name; }).join(', ') || '';

    document.title = `${title} - BerMovie`;

    // Store for subtitle search
    currentImdbId = detail.imdb_id || '';
    currentTmdbId = id;

    document.getElementById('detailHero').style.backgroundImage = `url(${backdropUrl(detail.backdrop_path)})`;
    document.getElementById('detailTitle').textContent = title;
    document.getElementById('detailMeta').innerHTML = `
        <span class="detail-rating">★ ${rating(detail.vote_average)}</span>
        <span>${year(date)}</span>
        <span>${type === 'movie' ? t('nav_movies') : t('nav_tv')}</span>
        ${detail.number_of_seasons ? `<span>${detail.number_of_seasons} ${t('seasons_title')}</span>` : ''}
        ${detail.runtime ? `<span>${detail.runtime} min</span>` : detail.episode_run_time?.[0] ? `<span>${detail.episode_run_time[0]} min</span>` : ''}
        ${detail.genres?.map(g => { const gg = (type==='movie'?MOVIE_GENRES:TV_GENRES).find(x=>x.id===g.id); return gg ? genreName(gg) : g.name; }).join(', ')}
    `;
    document.getElementById('detailOverview').textContent = detail.overview || t('no_desc');

    const castEl = document.getElementById('detailCast');
    castEl.innerHTML = '';
    credits?.cast?.slice(0, 10).forEach(c => {
        castEl.innerHTML += `<div class="detail-cast-item"><img src="${c.profile_path ? IMG_CAST + c.profile_path : NO_POSTER}" alt="${c.name}" onerror="this.src='${NO_POSTER}'"><p>${c.name}</p></div>`;
    });

    document.getElementById('detailWatchBtn').onclick = () => openPlayer(id, type, title);
    // Favorite button
    const favBtn = document.getElementById('detailFavBtn');
    if (favBtn) {
        const setActive = () => {
            const active = isInWatchlist(id, type);
            favBtn.classList.toggle('active', active);
            favBtn.querySelector('.fav-txt').textContent = active ? t('fav_active') : t('fav_add');
        };
        setActive();
        favBtn.onclick = () => {
            toggleWatchlist(detail, type);
            setActive();
        };
    }
    // Pre-create trailer elements so YouTube starts loading immediately
    const trailerWrap = document.createElement('div');
    trailerWrap.id = 'trailerWrap';
    trailerWrap.style.cssText = 'position:fixed;top:-9999px;left:-9999px;z-index:5;display:block;visibility:hidden;will-change:transform';
    document.body.appendChild(trailerWrap); // off-screen initially
    const tr = videosData?.results?.find(v => v.type==='Trailer'&&v.site=='YouTube');
    if (tr) {
        const iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube.com/embed/${tr.key}?autoplay=1&rel=0&mute=1`;
        iframe.setAttribute('allow', 'autoplay; fullscreen');
        iframe.setAttribute('allowfullscreen', 'true');
        iframe.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;border:none';
        trailerWrap.appendChild(iframe);
    }
    const openTrailer = () => {
        if (!tr) { alert(t('trailer_unavailable')); return; }
        const hero = document.getElementById('detailHero');
        trailerWrap.style.cssText = 'position:absolute;inset:0;z-index:5;display:block;visibility:visible;will-change:transform';
        hero.appendChild(trailerWrap);
        hero.classList.add('trailer-active');
        const dtb = document.getElementById('detailTrailerBtn');
        dtb.querySelector('.t-il').textContent = '◉';
        dtb.querySelector('.t-il').style.opacity = '1';
        dtb.querySelector('.t-txt').textContent = t('close_trailer');
        dtb.querySelector('.t-ir').style.opacity = '0';
        dtb.onclick = () => {
            trailerWrap.style.cssText = 'position:fixed;top:-9999px;left:-9999px;z-index:5;display:block;visibility:hidden;will-change:transform';
            document.body.appendChild(trailerWrap); // remove from hero DOM
            hero.classList.remove('trailer-active');
            dtb.querySelector('.t-il').textContent = '';
            dtb.querySelector('.t-il').style.opacity = '0';
            dtb.querySelector('.t-txt').textContent = t('trailer_btn');
            dtb.querySelector('.t-ir').style.opacity = '1';
            dtb.onclick = openTrailer;
            // Show back button
            const backBtn = document.getElementById('detailBackBtn');
            if (backBtn) backBtn.style.display = '';
        };
        // Hide back button
        const backBtn = document.getElementById('detailBackBtn');
        if (backBtn) backBtn.style.display = 'none';
    };
    if (tr) document.getElementById('detailTrailerBtn').onclick = openTrailer;

    // Seasons (TV)
    const seasonsSection = document.getElementById('detailSeasons');
    if (type === 'tv' && detail.seasons?.length) {
        seasonsSection.classList.remove('hidden');
        const list = document.getElementById('detailSeasonsList');
        list.innerHTML = '';
        detail.seasons.filter(s => s.season_number > 0).forEach(s => {
            const card = document.createElement('div');
            card.className = 'season-card';
            card.innerHTML = `${s.poster_path ? `<img src="${IMG_POSTER}${s.poster_path}" alt="">` : ''}<div class="info"><strong>${t('seasons_title')} ${s.season_number}</strong><small>${s.episode_count} ${t('episode_title')}</small></div>`;
            card.onclick = () => openPlayer(id, type, title, s.season_number, 1);
            list.appendChild(card);
        });
    } else {
        seasonsSection?.classList.add('hidden');
    }

    // Similar
    const sim = document.getElementById('detailSimilar');
    sim.innerHTML = '';
    similar?.results?.slice(0, 10).forEach(i => {
        const c = createCard(i, type);
        // Card click already navigates via createCard's onclick
        sim.appendChild(c);
    });



    // Trailer section (inline embed below synopsis)
    const trailerSection = document.getElementById('trailerSection');
    const trailerIframe = document.getElementById('trailerIframe');
    if (trailerSection && trailerIframe) {
        const tr = videosData?.results?.find(v => v.type==='Trailer'&&v.site=='YouTube');
        if (tr) {
            trailerIframe.src = `https://www.youtube.com/embed/${tr.key}?rel=0&enablejsapi=1`;
            trailerSection.classList.remove('hidden');
            document.getElementById('detailTrailerBtn').onclick = () => {
                trailerSection.classList.toggle('hidden');
                trailerIframe.src = `https://www.youtube.com/embed/${tr.key}?autoplay=1&rel=0`;
            };
        }
    }
}

// === FUTURISTIC JS ENHANCEMENTS ===

// 1. Navbar compact on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (!nav) return;
    nav.classList.toggle('compact', window.scrollY > 80);
}, { passive: true });

// 2. Card 3D tilt (desktop only - kills mobile perf)
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            card.style.setProperty('--mx', `${(e.clientX - rect.left) / rect.width * 100}%`);
            card.style.setProperty('--my', `${(e.clientY - rect.top) / rect.height * 100}%`);
            card.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-6px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) translateY(0px)';
        });
    });
}

// 3. Scroll animations (IntersectionObserver)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

function observeScroll() {
    document.querySelectorAll('.section, .genre-grid, .trending-list, .grid, .genre-card, .trending-card').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Run observer after initial load
if (document.readyState === 'complete') {
    observeScroll();
} else {
    window.addEventListener('load', observeScroll);
}

// 4. Detail page hero reveal
function initDetailHeroReveal() {
    const hero = document.querySelector('.detail-hero');
    if (hero) setTimeout(() => hero.classList.add('reveal'), 100);
}
document.addEventListener('DOMContentLoaded', initDetailHeroReveal);


document.addEventListener('DOMContentLoaded', () => {
    applyLang();
    initGlobalEvents();
    initAutocomplete();

    const path = window.location.pathname;

    // Check for search query in URL
    const urlParams = new URLSearchParams(window.location.search);
    const searchQ = urlParams.get('q');
    if (searchQ && el('#searchInput')) {
        el('#searchInput').value = searchQ;
        // Will init home page, then trigger search
    }

    // Telegram: hide back button on non-detail pages
    if (isTgMiniApp && tg.BackButton) tg.BackButton.hide();

    if (path.includes('detail.html')) {
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');
        const type = params.get('type') || 'movie';
        if (id) loadDetailPage(parseInt(id), type);
    } else if (path.includes('movies.html')) {
        if (window._moviesInit) return; window._moviesInit = 1;
        initMoviesPage();
    } else if (path.includes('tv.html')) {
        if (window._tvInit) return; window._tvInit = 1;
        initTvPage();
    } else if (path.includes('genre.html')) {
        initGenrePage();
    } else {
        initHomePage();
        if (searchQ) doSearch(searchQ);
    }
});

// Direct init fallback (if DOMContentLoaded already fired)
const p = window.location.pathname;
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    if (p.includes('movies.html') && !window._moviesInit) { window._moviesInit = 1; initMoviesPage(); }
    else if (p.includes('tv.html') && !window._tvInit) { window._tvInit = 1; initTvPage(); }
    else if (p.includes('genre.html') && !window._genreInit) { window._genreInit = 1; initGenrePage(); }
    else if (p.includes('detail.html') && !window._detailInit) {
        window._detailInit = 1;
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');
        const type = params.get('type') || 'movie';
        if (id) loadDetailPage(parseInt(id), type);
    } else if (!p.includes('detail.html') && !window._homeInit) { window._homeInit = 1; initHomePage(); }
}
// Ultimate fallback
setTimeout(() => {
    if (p.includes('movies.html') && !window._moviesInit) { window._moviesInit = 1; initMoviesPage(); }
    else if (p.includes('tv.html') && !window._tvInit) { window._tvInit = 1; initTvPage(); }
    else if (p.includes('genre.html') && !window._genreInit) { window._genreInit = 1; initGenrePage(); }
    else if (p.includes('detail.html') && !window._detailInit) {
        window._detailInit = 1;
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');
        const type = params.get('type') || 'movie';
        if (id) loadDetailPage(parseInt(id), type);
    } else if (!p.includes('detail.html') && !window._homeInit && document.getElementById('hero')?.children.length === 0) { window._homeInit = 1; initHomePage(); }
}, 100);
