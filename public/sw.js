const CACHE_NAME = 'premium-apps-v1';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json',
  '/naira.png',
  // Cache des images principales
  '/capcut.png',
  '/photoshop.png',
  '/spotify2.png',
  '/netflix.png',
  '/duolingo.png',
  '/inshot.png',
  '/wps.png',
  '/lightroom.png',
  '/filmora.png',
  '/amazon.png',
  '/shazam.png',
  '/truecaller.png',
  '/Photoroom.png',
  '/TeraBox.png',
  '/PicsArt.png',
  '/Audiomack.png',
  '/BandLab.png',
  '/BetterSleep.png',
  '/Disney.png',
  '/flipaclip.png',
  '/Hypic.png',
  '/Instabridge.png',
  '/larkplayer.png',
  '/movieshub.png',
  '/niagaraluncher.png',
  '/pdfscaner.png',
  '/PhotoLab.png',
  '/photomath.png',
  '/Pixelcut.png',
  '/PLAYit.png',
  '/Questionai.png',
  '/Reddit.png',
  '/Remini.png',
  '/ShotCut.png',
  '/SixPack.png',
  '/snaptube.png',
  '/Stickman.png',
  '/supervpn.png',
  '/telegram.png',
  '/ToonApp.png',
  '/ToonMe.png',
  '/Translate.png',
  '/twitter.png',
  '/x.png',
  '/VideoShow.png',
  '/vidmate.png',
  '/VivaVideo.png',
  '/Wallcraft.png',
  '/Workout.png',
  '/xplayer.png',
  '/xgalerie.png',
  '/VideoDownloader.png',
  '/compressvideo.png',
  '/aivideoeditor.png',
  '/aivideo.png',
  '/aichat.png',
  '/animeai.png',
  '/autoclicker.png',
  '/Background.png',
  '/downloadvideo.jpg',
  '/Height.png',
  '/flo.png',
  '/logo.png',
  '/TENADA.png',
  '/ViaBrowser.png'
];

// Installation du service worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache ouvert');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activation du service worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Suppression de l\'ancien cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Interception des requêtes
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - retourner la réponse du cache
        if (response) {
          return response;
        }

        // Cloner la requête
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then((response) => {
          // Vérifier si on a reçu une réponse valide
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Cloner la réponse
          const responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
      })
  );
});
