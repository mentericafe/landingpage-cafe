const CACHE_NAME = 'menteri-cafe-v2';
const CORE_ASSETS = [
  './', './index.html', './style.css', './script.js', './site.webmanifest',
  './robots.txt', './sitemap.xml', './index.md', './business.json', './menu.json', './llms.txt', './llms-full.txt',
  './assets/favicon.svg', './assets/icon-192.png', './assets/icon-512.png',
  './assets/hero-art.svg', './assets/space-1.svg', './assets/space-2.svg', './assets/space-3.svg',
  './assets/og-cover.svg', './assets/og-cover.png'
];
self.addEventListener('install',(event)=>{event.waitUntil(caches.open(CACHE_NAME).then((cache)=>cache.addAll(CORE_ASSETS)));self.skipWaiting();});
self.addEventListener('activate',(event)=>{event.waitUntil(caches.keys().then((keys)=>Promise.all(keys.filter((key)=>key!==CACHE_NAME).map((key)=>caches.delete(key)))));self.clients.claim();});
self.addEventListener('fetch',(event)=>{if(event.request.method!=='GET')return;const url=new URL(event.request.url);if(url.origin!==self.location.origin)return;event.respondWith(caches.match(event.request).then((cached)=>cached||fetch(event.request).then((response)=>{if(response.ok){const copy=response.clone();caches.open(CACHE_NAME).then((cache)=>cache.put(event.request,copy));}return response;}).catch(()=>caches.match('./index.html'))));});
