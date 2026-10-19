const CACHE='arcade-v1';
const FILES=["./", "./apple-touch-icon.png", "./brick.html", "./bungee-latin-400-normal.woff2", "./chakra-petch-latin-400-normal.woff2", "./chakra-petch-latin-600-normal.woff2", "./chakra-petch-latin-700-normal.woff2", "./fonts.css", "./fredoka-latin-400-normal.woff2", "./fredoka-latin-500-normal.woff2", "./fredoka-latin-600-normal.woff2", "./fredoka-latin-700-normal.woff2", "./icon-192.png", "./icon-512-maskable.png", "./icon-512.png", "./index.html", "./kart.html", "./manifest.webmanifest", "./merge.html", "./mines.html", "./press-start-2p-latin-400-normal.woff2", "./rubik-latin-400-normal.woff2", "./rubik-latin-600-normal.woff2", "./rubik-latin-800-normal.woff2", "./silkscreen-latin-400-normal.woff2", "./silkscreen-latin-700-normal.woff2", "./snake.html", "./three.r128.min.js", "./thumb-brick.jpg", "./thumb-kart.jpg", "./thumb-merge.jpg", "./thumb-mines.jpg", "./thumb-snake.jpg", "./thumb-vault.jpg", "./vault.html", "./vt323-latin-400-normal.woff2"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request).then(res=>{
    if(res.ok&&new URL(e.request.url).origin===location.origin){const cp=res.clone();caches.open(CACHE).then(c=>c.put(e.request,cp))}
    return res;
  }).catch(()=>caches.match('./index.html'))));
});
