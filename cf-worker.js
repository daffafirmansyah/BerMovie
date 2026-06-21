// Cloudflare Worker — Ad-Free Embed Proxy
// Deploy di Cloudflare Workers (gratis)
// Usage: https://your-worker.workers.dev/proxy?url=https://vidsrc.su/embed/movie/550

const AD_DOMAINS = [
  'doubleclick.net', 'googlesyndication.com', 'adservice.google.com',
  'googleads.g.doubleclick.net', 'pagead2.googlesyndication.com',
  'adnxs.com', 'adsrvr.org', 'amazon-adsystem.com', 'facebook.net',
  'analytics.tiktok.com', 'ads-twitter.com', 'moatads.com',
  'outbrain.com', 'taboola.com', 'revcontent.com', 'mgid.com',
  'popads.net', 'propellerads.com', 'exoclick.com', 'juicyads.com',
  'trafficjunky.com', 'adsterra.com', 'hilltopads.com', 'clickadu.com',
  'popcash.net', 'popmyads.com', 'adcash.com', 'bidvertiser.com',
];

const AD_SELECTORS = [
  '[class*="ad-"]', '[class*="ads"]', '[id*="ad-"]', '[id*="ads"]',
  'iframe[src*="ad"]', 'iframe[src*="doubleclick"]', 'iframe[src*="googlesyndication"]',
  '.ad-overlay', '.ad-container', '.ad-banner', '.ad-popup',
  '[data-ad]', '[data-ads]', '.sponsor', '.sponsored',
];

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': '*',
};

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS_HEADERS });
    }
    
    // Extract target URL
    const targetUrl = url.searchParams.get('url');
    if (!targetUrl) {
      return new Response(JSON.stringify({
        status: 'ok',
        message: 'Ad-Free Embed Proxy',
        usage: '?url=https://vidsrc.su/embed/movie/550'
      }), {
        headers: { 'Content-Type': 'application/json', ...CORS_HEADERS }
      });
    }
    
    // Validate URL (only allow embed domains)
    const ALLOWED_HOSTS = [
      'vidsrc.su', 'vidsrcme.ru', '2embed.cc',
      'vidsrc.in', 'multiembed.mov', 'embed.su',
    ];
    
    try {
      const target = new URL(targetUrl);
      if (!ALLOWED_HOSTS.some(h => target.hostname.includes(h))) {
        return new Response('Domain not allowed', { status: 403 });
      }
    } catch {
      return new Response('Invalid URL', { status: 400 });
    }
    
    // Fetch from embed server
    try {
      const response = await fetch(targetUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Referer': 'https://www.google.com/',
        },
      });
      
      const contentType = response.headers.get('Content-Type') || '';
      
      // If HTML, inject ad-blocker
      if (contentType.includes('text/html')) {
        let html = await response.text();
        
        // Inject ad-blocker script
        const blockerScript = `
<script>
(function() {
  // Block ad network requests
  const origFetch = window.fetch;
  window.fetch = function(...args) {
    const url = args[0]?.toString?.() || args[0] || '';
    const adDomains = ${JSON.stringify(AD_DOMAINS)};
    if (adDomains.some(d => url.includes(d))) {
      return Promise.reject(new Error('Blocked by proxy'));
    }
    return origFetch.apply(this, args);
  };
  
  const origOpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function(method, url, ...args) {
    const adDomains = ${JSON.stringify(AD_DOMAINS)};
    if (adDomains.some(d => url.includes(d))) {
      return;
    }
    return origOpen.apply(this, [method, url, ...args]);
  };
  
  // Remove existing ad elements
  function removeAds() {
    ${JSON.stringify(AD_SELECTORS)}.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => el.remove());
    });
    
    // Remove fixed/absolute positioned overlays (ads)
    document.querySelectorAll('div, iframe').forEach(el => {
      const style = getComputedStyle(el);
      if (style.position === 'fixed' && style.zIndex > 9999) {
        el.remove();
      }
    });
  }
  
  // Run periodically
  setInterval(removeAds, 500);
  removeAds();
})();
</script>
`;
        
        // Inject before closing </head> or </body>
        if (html.includes('</head>')) {
          html = html.replace('</head>', blockerScript + '</head>');
        } else if (html.includes('</body>')) {
          html = html.replace('</body>', blockerScript + '</body>');
        } else {
          html = blockerScript + html;
        }
        
        // Remove inline ad scripts
        html = html.replace(/<script[^>]*src[^>]*(?:doubleclick|googlesyndication|adnxs|adsrvr)[^>]*>[\s\S]*?<\/script>/gi, '');
        
        return new Response(html, {
          headers: {
            'Content-Type': 'text/html; charset=utf-8',
            ...CORS_HEADERS,
          },
        });
      }
      
      // Non-HTML, pass through
      return new Response(response.body, {
        status: response.status,
        headers: { ...Object.fromEntries(response.headers), ...CORS_HEADERS },
      });
      
    } catch (err) {
      return new Response(`Proxy error: ${err.message}`, { status: 502 });
    }
  }
};
