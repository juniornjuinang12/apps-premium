import React, { useMemo, useState, useEffect, lazy, Suspense } from "react";
import { Download, Sparkles, Search, X, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

/* ------------------------------------------------------------
   ✅ Règles images (IMPORTANT)
   - Place toutes les icônes dans /public (ex: /capcut.png)
   - Partie PC ➜ images UNIQUEMENT /capcut.png (comme demandé)
   - Partie Android ➜ nouvelles icônes spécifiques à chaque app
   - Coins arrondis via conteneur .rounded + overflow-hidden
   - Le voile/shine héritent du radius : style={{ borderRadius: "inherit" }}
------------------------------------------------------------- */

/* ------------------ Données ------------------ */
const apps_pc = [
 { 
  id: 1, 
  nom: "Adobe Suite", 
  desc: "Adobe Creative Cloud Suite — Photoshop, Illustrator, After Effects, Premiere Pro and Acrobat (tools and resources together).", 
  image: "/images pc/pack adobe.png" // C:\app_premium\premium_app\public\images pc\pack adobe.png
},
{ 
  id: 2, 
  nom: "Office Suite", 
  desc: "Microsoft Office Suite — Word, Excel, PowerPoint, OneNote and Outlook (complete productivity tools).", 
  image: "/images pc/pack office.png" // C:\app_premium\premium_app\public\images pc\pack office.png
},
{ 
  id: 3, 
  nom: "Adobe Photoshop", 
  desc: "Adobe Photoshop — advanced photo editing, layers, filters, export PSD/PNG/JPEG.", 
  image: "/photoshop.png"
},
{ 
  id: 4, 
  nom: "Adobe Illustrator", 
  desc: "Adobe Illustrator — vector design, logos, icons and illustrations, export SVG/PDF.", 
  image: "/images pc/illustrator.png"
},
{ 
  id: 5, 
  nom: "Adobe Acrobat Reader", 
  desc: "Adobe Acrobat Reader — read and annotate PDFs, fill forms.", 
  image: "/images pc/acrobateReader.png"
},
{ 
  id: 6, 
  nom: "Adobe Acrobat Pro", 
  desc: "Adobe Acrobat Pro — edit and convert PDFs, sign, protect and optimize.", 
  image: "/images pc/acrobatPro.png"
},
{ 
  id: 7, 
  nom: "Adobe Premiere Pro", 
  desc: "Adobe Premiere Pro — professional video editing, multi-track timeline, high-quality export.", 
  image: "/images pc/AdobePremiere.png"
},
{ 
  id: 8, 
  nom: "Adobe After Effects", 
  desc: "Adobe After Effects — motion design, visual effects and advanced compositing.", 
  image: "/images pc/AdobeAfterEffects.png"
},
{ 
  id: 9, 
  nom: "Adobe Animate CC", 
  desc: "Adobe Animate CC — 2D animations, interactive banners, HTML5/Canvas export.", 
  image: "/images pc/AdobeAnimate.png"
},
{ 
  id: 10, 
  nom: "Photoshop Course", 
  desc: "Hands-on Photoshop training — step-by-step lessons (retouching, masks, color grading, project exercises).", 
  image: "/images pc/FormationPhotoshop.png"
},
{ 
  id: 11, 
  nom: "CapCut Pro PC / Desktop", 
  desc: "CapCut — fast and creative video editing, visual effects, auto subtitles, TikTok & Reels templates.", 
  image: "/capcut.png" // C:\app_premium\premium_app\public\images pc\capcut.png
}
];



// ✅ APPS ANDROID — CONNUES (titres + descriptions prêts)
const apps_android = [
  { id: 101, nom: "CapCut Pro (Android)", desc: "Powerful mobile video editor: effects, filters, animated text.", image: "/capcut.png" },
  { id: 102, nom: "Spotify (Premium)", desc: "Unlimited music streaming, offline play, unlimited skips.", image: "/spotify2.png" },
  { id: 104, nom: "Duolingo (Premium)", desc: "Language learning without limits, offline lessons.", image: "/duolingo.png" },
  { id: 105, nom: "InShot Pro", desc: "All-in-one photo/video editor: trim, music, filters, HD export.", image: "/inshot.png" },
  { id: 106, nom: "WPS Office (Pro)", desc: "Mobile office suite: Docs, Sheets, PDF, signatures & OCR.", image: "/wps.png" },
  { id: 107, nom: "Adobe Photoshop (Mobile)", desc: "Advanced retouching, layers, AI selection & correction.", image: "/photoshop.png" },
  { id: 108, nom: "VivaCut (Pro)", desc: "Multi-track editing, keyframes, masks, chroma key.", image: "/vivacut.png" },
  { id: 109, nom: "Netflix", desc: "Movies & series streaming, multiple profiles, recommendations.", image: "/netflix.png" },
  { id: 110, nom: "Lightroom (Premium)", desc: "Photo development, presets, RAW, selective corrections.", image: "/lightroom.png" },
  { id: 111, nom: "Filmora (Premium)", desc: "Simple & fast video editing, templates, effects and music.", image: "/filmora.png" },
  { id: 103, nom: "Amazon Shopping", desc: "Online shopping, order tracking, deals and recommendations.", image: "/amazon.png" },
  { id: 112, nom: "Shazam (Premium)", desc: "Instant music recognition, history & playlists.", image: "/shazam.png" },
  { id: 113, nom: "Truecaller (Gold)", desc: "Caller ID & blocking, Gold badge, anti-spam.", image: "/truecaller.png" },
  { id: 114, nom: "PhotoRoom (Pro)", desc: "Background removal, product studio, HD export.", image: "/Photoroom.png" },
  { id: 115, nom: "TeraBox (VIP)", desc: "Massive cloud storage, auto backups & sharing.", image: "/TeraBox.png" },
  { id: 116, nom: "PicsArt (Premium)", desc: "Photo/video editing, artistic effects, collages, stickers.", image: "/PicsArt.png" },
  { id: 117, nom: "Audiomack (Premium)", desc: "Stream & download music and mixtapes offline.", image: "/Audiomack.png" },
  { id: 118, nom: "BandLab", desc: "Free audio studio: recording, mixing & cloud mastering.", image: "/BandLab.png" },
  { id: 119, nom: "BetterSleep (Premium)", desc: "Relaxing sounds, stories & programs for better sleep.", image: "/BetterSleep.png" },
  { id: 120, nom: "Disney+", desc: "Disney classics, Marvel, Star Wars, Pixar & exclusive content.", image: "/Disney.png" },
  { id: 121, nom: "Flipaclip (Premium)", desc: "2D layer-based animation, onion skin, video export.", image: "/flipaclip.png" },
  { id: 122, nom: "Hypic (Pro)", desc: "Quick photo retouching, filters, beauty, studio effect.", image: "/Hypic.png" },
  { id: 123, nom: "Instabridge", desc: "Share & discover Wi‑Fi hotspots, maps & auto-connect.", image: "/Instabridge.png" },
  { id: 124, nom: "Lark Player", desc: "Offline music player, equalizer & floating lyrics.", image: "/larkplayer.png" },
  { id: 125, nom: "Movies Hub", desc: "Movies/series catalog & aggregator (info & trailers).", image: "/movieshub.png" },
  { id: 126, nom: "Niagara Launcher (Pro)", desc: "Minimal launcher, gestures, smart app list.", image: "/niagaraluncher.png" },
  { id: 127, nom: "PDF Scanner (Pro)", desc: "Scan documents to PDF, OCR, perspective correction.", image: "/pdfscaner.png" },
  { id: 128, nom: "PhotoLab (Pro)", desc: "AI effects, montages & high-quality artistic filters.", image: "/PhotoLab.png" },
  { id: 129, nom: "Photomath (Plus)", desc: "Solve exercises via camera, step-by-step solutions.", image: "/photomath.png" },
  { id: 130, nom: "Pixelcut (Pro)", desc: "AI cutouts, e‑commerce mockups, auto resize.", image: "/Pixelcut.png" },
  { id: 131, nom: "PLAYit (Pro)", desc: "Universal video/audio player, subtitles & pop‑up.", image: "/PLAYit.png" },
  { id: 132, nom: "Question.AI (Premium)", desc: "AI homework help, step-by-step across subjects.", image: "/Questionai.png" },
  { id: 133, nom: "Reddit", desc: "Communities, threads, trends & AMAs.", image: "/Reddit.png" },
  { id: 134, nom: "Remini (Pro)", desc: "AI photo enhancement: sharpness, portraits & old‑to‑HD.", image: "/Remini.png" },
  { id: 135, nom: "ShotCut (Mobile)", desc: "Simple video editing: cut, music, text, quick export.", image: "/ShotCut.png" },
  { id: 136, nom: "Six Pack in 30 Days (Pro)", desc: "Guided abs programs, tracking & reminders.", image: "/SixPack.png" },
  { id: 137, nom: "SnapTube", desc: "Manage online videos (per terms & rights).", image: "/snaptube.png" },
  { id: 138, nom: "Stickman (Games)", desc: "Stickman action games — levels, challenges & leaderboards.", image: "/Stickman.png" },
  { id: 139, nom: "SuperVPN (Premium)", desc: "Encrypted connection, multiple servers, split tunneling.", image: "/supervpn.png" },
  { id: 140, nom: "Telegram", desc: "Fast messaging, channels & unlimited cloud.", image: "/telegram.png" },
  { id: 141, nom: "TeraBox (VIP)", desc: "Large-capacity cloud storage, auto backups.", image: "/TeraBox.png" }, // duplicate on purpose if you separate offers
  { id: 142, nom: "ToonApp (Pro)", desc: "Cartoon selfies, outlines & stylized backgrounds.", image: "/ToonApp.png" },
  { id: 143, nom: "ToonMe (Pro)", desc: "AI cartoon portraits, various styles.", image: "/ToonMe.png" },
  { id: 144, nom: "Hi Translate", desc: "Text/voice/camera translation, offline & transcription.", image: "/Translate.png" },
  { id: 145, nom: "Twitter (X)", desc: "Live news, audio Spaces, communities & DMs.", image: "/twitter.png" },
  { id: 146, nom: "X (client)", desc: "X client — posts, videos, trends.", image: "/x.png" },
  { id: 147, nom: "VideoShow (Pro)", desc: "Video editor with themes, stickers & HD export.", image: "/VideoShow.png" },
  { id: 148, nom: "VidMate", desc: "Manage online media (per terms & rights).", image: "/vidmate.png" },
  { id: 149, nom: "VivaVideo (Pro)", desc: "Video editor with themes, FX & simple multi-tracks.", image: "/VivaVideo.png" },
  { id: 150, nom: "Wallcraft (Premium)", desc: "4K wallpapers, auto-fit & daily collections.", image: "/Wallcraft.png" },
  { id: 151, nom: "Workout (Pro)", desc: "Home fitness programs, progress tracking & voice coach.", image: "/Workout.png" },
  { id: 152, nom: "XPlayer (Pro)", desc: "4K/HD video player, private vault & cast.", image: "/xplayer.png" },
  { id: 153, nom: "XGallery (Pro)", desc: "Fast photo gallery, hidden folders & smart sorting.", image: "/xgalerie.png" },
  { id: 154, nom: "PLAYit (Pro)", desc: "All‑in‑one media player (audio/video).", image: "/PLAYit.png" },
  { id: 155, nom: "Video Downloader (Manager)", desc: "Manage and organize authorized video downloads.", image: "/VideoDownloader.png" },
  { id: 156, nom: "Compress Video (Pro)", desc: "Video compression with minimal quality loss, resize & bitrate.", image: "/compressvideo.png" },
  { id: 157, nom: "Avi Video Editor (AI)", desc: "AI-assisted editor: templates, auto‑cut, smart beat.", image: "/aivideoeditor.png" },
  { id: 158, nom: "AI Video (Effects)", desc: "AI effects, stylization & video upscaling.", image: "/aivideo.png" },
  { id: 159, nom: "AI Chat (Assistant)", desc: "AI chat assistant with multi‑tools & prompts.", image: "/aichat.png" },
  { id: 160, nom: "Anime AI", desc: "Transform portraits into anime/manga style.", image: "/animeai.png" },
  { id: 161, nom: "PLAYit (Pro)", desc: "Smooth media player with pop‑up & subtitles.", image: "/PLAYit.png" },
  { id: 201, nom: "Auto Clicker", image: "/autoclicker.png", desc: "To clarify: auto‑tap/auto‑swipe? scenarios?" },
  { id: 202, nom: "Background Eraser", image: "/Background.png", desc: "AI background removal: auto cutout, edge refine, transparent PNG export, batch processing and manual tools for product photos/e‑commerce." },
  { id: 203, nom: "Download Video", image: "/downloadvideo.jpg", desc: "To clarify: general manager? targeted sites?" },
  { id: 204, nom: "Height Increase", image: "/Height.png", desc: "Measure height via camera, growth tracking, tips/exercises to improve posture." },
  { id: 205, nom: "Flo", image: "/flo.png", desc: "Menstrual cycle and women’s health tracking: periods, ovulation, symptoms and reminders." },
  { id: 206, nom: "Logo Maker", image: "/logo.png", desc: "Simple, fast logo creator — ready‑made templates, icons & fonts, PNG/SVG export and customization options (colors, shadows, badges) for your PWAs and marketing visuals." },
  { id: 209, nom: "TENADA", image: "/TENADA.png", desc: "To clarify: which app is it exactly? (spelling?)" },
  { id: 300, nom: "Via Browser", image: "/ViaBrowser.png", desc: "Lightweight, private mobile browser — fast navigation, ad blocker, download manager and night mode." },
  { id: 101, nom: "Avast Antivirus", desc: "Antivirus protection, scans and web shield.", image: "/imageapp2/avast.png" },
  { id: 102, nom: "BitTorrent", desc: "Fast and lightweight torrent client.", image: "/imageapp2/bitorrent.png" },
  { id: 103, nom: "CCleaner", desc: "System cleaning, remove temporary files and caches.", image: "/imageapp2/CCleaner.png" },
  { id: 104, nom: "Clone App", desc: "Clone apps and manage multiple accounts on one phone.", image: "/imageapp2/clone App.png" },
  { id: 105, nom: "Copilot", desc: "Microsoft AI assistant (chat, images, writing help).", image: "/imageapp2/copilot.png" },
  { id: 106, nom: "Microsoft Designer", desc: "AI-assisted graphic creation, modern templates.", image: "/imageapp2/Microsoft Designer.png" },
  { id: 107, nom: "PDF Editor", desc: "Edit and annotate PDFs (fill, sign).", image: "/imageapp2/pdf editor.png" },
  { id: 108, nom: "Torrent Downloader", desc: "All‑in‑one torrent download manager.", image: "/imageapp2/TorrentDownloade.png" },
  { id: 109, nom: "uTorrent", desc: "Compact, fast and efficient BitTorrent client.", image: "/imageapp2/utorrent.jpg" },
  { id: 110, nom: "Video Compressor", desc: "Fast video compression, reduce file sizes.", image: "/imageapp2/videoCompresor.png" },
  { id: 111, nom: "Videolaps", desc: "Simple editing, quick effects (timelapse, cuts).", image: "/imageapp2/videolaps.jpg" },
  { id: 112, nom: "Adobe Scan", desc: "Scan documents to PDF via camera.", image: "/imageapp2/adobe scan.jpg" },
  { id: 113, nom: "Adobe Acrobat", desc: "Read, fill and sign PDFs.", image: "/imageapp2/adobeAcroba.png" },
  { id: 114, nom: "Adobe Express", desc: "Easy design for posts, logos and mini‑edits.", image: "/imageapp2/AdobeExpress.png" },
  { id: 115, nom: "Adobe Premiere Rush", desc: "Simple and fast multi‑track video editing.", image: "/imageapp2/AdobePremiereRush.png" },
  { id: 116, nom: "AutoSMS", desc: "Automate SMS sending and scheduled replies.", image: "/imageapp2/autoSMS.png" },
];

const VIA = 300;
const ANDROID_CAPCUT_ID    = 101;
const ANDROID_SPOTIFY_ID  = 102;
const ANDROID_DUOLINGO_ID = 104;
const ANDROID_INSHOT_ID   = 105;
const ANDROID_AIVIDEO_ID  = 158; // AI Video → (AI Video / AI Video Generator)
const ANDROID_AUDIOMACK_ID= 117;
const ANDROID_AUTOCLICKER_ID = 201;
const ANDROID_BANDLAB_ID  = 118;
const ANDROID_BETTERSLEEP_ID = 119;
const ANDROID_CHATSMITH_ID = 159; // Chat / assistant -> map to AI Chat id
const ANDROID_COPILOT_ID  = 159;  // also AI Chat-like
const ANDROID_FEMALE_ID   = 205;  // fallback generic (Image)
const ANDROID_FLIPACLIP_ID= 121;
const ANDROID_FLO_ID      = 205;  // fallback generic
const ANDROID_HEIGHT_ID   = 204;
const ANDROID_HITRANSLATE_ID = 144;
const ANDROID_HOTSTAR_ID  = 120; // map Hotstar -> Disney+ Hotstar -> Disney+ id
const ANDROID_HYPIC_ID    = 122;
const ANDROID_INSTABRIDGE_ID = 123;
const ANDROID_INSTABRIDGE2_ID = 123;
const ANDROID_LARKPLAYER_ID = 124;
const ANDROID_LOGOMAKER_ID = 206;
const ANDROID_MOVIESHUB_ID = 125;
const ANDROID_NETFLIX_ID  = 109;
const ANDROID_NIAGARA_ID  = 126;
const ANDROID_PHOTOLAB_ID = 128;
const ANDROID_PHOTOMATH_ID = 129;
const ANDROID_PHOTOROOM_ID = 114;
const ANDROID_PIXEL_ID    = 130; // Pixel / Pixelcut
const ANDROID_PIXELCUT_ID = 130;
const ANDROID_PLAYIT_ID   = 131;
const ANDROID_PRIMEVIDEO_ID = 203; // fallback -> Download Video / aggregator
const ANDROID_REDDIT_ID   = 133;
const ANDROID_REMINI_ID   = 134;
const ANDROID_SHAZAM_ID   = 112;
const ANDROID_SHOTCUT_ID  = 135;
const ANDROID_SIXPACK_ID  = 136;
const ANDROID_SNAPTUBE_ID = 137;
const ANDROID_SPOTIFY_PREMIUM_1 = 102; // map to same Spotify id
const ANDROID_TAPSCANNER_ID = 127; // PDF scanner mapping
const ANDROID_TELEGRAM_ID = 140;
const ANDROID_TENADA_ID   = 209;
const ANDROID_TERABOX_ID  = 115;
const ANDROID_TOONAPP_ID  = 142;
const ANDROID_TOONME_ID   = 143;
const ANDROID_TRUECALLER_ID = 113;
const ANDROID_TWITTER_ID  = 145;
const ANDROID_VIDEO_COMPRESS_ID = 156;
const ANDROID_VIDEO_DOWNLOADER_ID = 155;
const ANDROID_VIDEOSHOW_ID = 147;
const ANDROID_VIDMA_ID    = 148;
const ANDROID_VIDMATE_ID  = 148;
const ANDROID_VIVAVIDEO_ID = 149;
const ANDROID_VPNSUPER_ID = 139;
const ANDROID_VSCO_ID     = 116; // VSCO approximate -> PicsArt slot (closest)
const ANDROID_WALLCRAFT_ID = 150;
const ANDROID_XPLAYER_ID  = 152;
const ANDROID_AHATIK_ID   = 155; // map downloader to Video Downloader
const ANDROID_AUTOREMAIN = 999; // fallback id for anything else

const DOWNLOADS = {
  // ===== Map direct par ID pour les apps PC (hors Pack) =====
  [3]: {
  url: "https://www.mediafire.com/file/83qjwkwt7w21b25/Adobe.Photoshop.Lightroom.Classic.v9.2.0.10.exe/file",
  filename: "Adobe.Photoshop.Lightroom.Classic.v9.2.0.10.exe",
},
[4]: { // Adobe Illustrator (PC)
  url: "https://www.mediafire.com/file/0tvodr1466i496c/Adobe_Illustrator_2021_25.0.0.60.rar/file",
  filename: "Adobe_Illustrator_2021_25.0.0.60.rar",
},
[5]: { // Acrobat Reader (PC)
  url: "https://www.mediafire.com/file/68sztic7jdxb71k/Adobe_Acrobat_Reader_DC_2020.012.20048.rar/file",
  filename: "Adobe_Acrobat_Reader_DC_2020.012.20048.rar",
},
[6]: { // Acrobat Pro (PC)
  url: "https://www.mediafire.com/file/2pd690r3v7y4wjq/Adobe_Acrobat_Pro_DC_2020.012.20048.rar/file",
  filename: "Adobe_Acrobat_Pro_DC_2020.012.20048.rar",
},
[7]: { // Premiere Pro (PC)
  url: "https://www.mediafire.com/file/ysyrgbjvb7sxobq/Adobe.Premiere.Pro.2020.v14.0.3.1_%25282%2529.exe/file",
  filename: "Premiere.Pro.2020.v14.0.3.1_(2).exe",
},
[8]: { // After Effects (PC)
  url: "https://www.mediafire.com/file/6qdus3sd3154lio/Adobe_After_Effects_2020_17.5.0.40.rar/file",
  filename: "Adobe_After_Effects_2020_17.5.0.40.rar",
},
[9]: { // Animate CC (PC)
  url: "https://www.mediafire.com/file/9w65sd0icqo57ol/Adobe.Animate.2020.v20.0.2.22168.exe/file",
  filename: "Adobe.Animate.2020.v20.0.2.22168.exe",
},
// [3] = Photoshop (PC) -> pas de lien fourni, tu pourras l’ajouter ici si tu en as un
[11]: { // CapCut PC / Desktop
  url: "https://www.mediafire.com/file/iccxh948zmo5ql7/CapCut+Pro+Windows+v13.7.0.rar/file",
  filename: "CapCut_Pro_Windows_v13.7.0.rar",
},

  // ===== ANDROID (remplacements par liens MediaFire) =====

  // nouveau
  [300]: {
    url: "https://www.mediafire.com/file/9tmd6voilbx1ow8/Via_Browser_v6.6.1_Modded_by_%2540Getmodpcs.apk/file",
    filename: "Via_Browser_v6.6.1_Modded.apk",
  },

  [106]: {
    url: "https://www.mediafire.com/file/vrkc4ewc4wjoe0y/WPS_office.apk/file",
    filename: "WPS_office.apk",
  },

  [107]: { // Adobe Photoshop (mobile)
    url: "https://www.mediafire.com/file/ygjib1ck6uwjoph/Adobe_Photoshop.apk/file",
    filename: "Adobe_Photoshop.apk",
  },

  [108]: { // VivaCut (Pro)
    url: "https://www.mediafire.com/file/dtubvyc55jkaajb/VivaCut_Pro.apk/file",
    filename: "VivaCut_Pro.apk",
  },

  [110]: { // Lightroom (Premium)
    url: "https://www.mediafire.com/file/7q3uhxrb519x9cy/Lightroom_Premium.apk/file",
    filename: "Lightroom_Premium.apk",
  },

  [111]: { // Filmora (Premium)
    url: "https://www.mediafire.com/file/0t4cnhd3p3toizt/Filmora_Premium.apk/file",
    filename: "Filmora_Premium.apk",
  },

  [103]: { // Prime Video
    url: "https://www.mediafire.com/file/qi01b3k19qcwxsv/Prime_Video_Premium_v3.0.985.1730_Modded_by_Getmodpc.apk/file",
    filename: "Prime_Video_Premium_v3.0.985.1730.apk",
  },

  [116]: { // PicsArt (Premium)
    url: "https://www.mediafire.com/file/p30qes38drn48ri/Picsart_Premium_Gold_v29.3.9_Modded_by_%2540Getmodpcs.apk/file",
    filename: "Picsart_Premium_Gold_v29.3.9.apk",
  },

  [132]: { // Question.AI (Premium)
    url: "https://www.mediafire.com/file/sja7y26xpapeeuq/Question_AI_Premium_v3.4.15_Modded_by_%2540Getmodpcs.apk/file",
    filename: "Question_AI_Premium_v3.4.15.apk",
  },

  [138]: { // Stickman Draw animation
    url: "https://www.mediafire.com/file/hxw19by1pbko4r6/Stickman_Draw_animation_v7.0.3s_Modded_by_%2540Getmodpcs.apk/file",
    filename: "Stickman_Draw_animation_v7.0.3s.apk",
  },

  [146]: { // X / Twitter (client)
    url: "https://www.mediafire.com/file/zykl651mg2sawbc/X_Twitter_Premium_v11.28.0_Modded_by_%2540Getmodpcs.apk/file",
    filename: "X_Twitter_Premium_v11.28.0.apk",
  },

  [151]: { // Workout (Female)
    url: "https://www.mediafire.com/file/4kqtqzt2ckxvzw5/Female.apk/file",
    filename: "Female.apk",
  },

  [153]: { // XGallery (Pro)
    url: "https://www.mediafire.com/file/8rxy99mzd5xnkxj/XGallery_Premium_v1.10.9_Modded_by_%2540Getmodpcs.apk/file",
    filename: "XGallery_Premium_v1.10.9.apk",
  },

  [131]: { // PLAYit (VIP)
    url: "https://www.mediafire.com/file/lbk58beglaq34r1/PLAYit_VIP_v2.8.75.29_Modded_by_%2540Getmodpcs.apk/file",
    filename: "PLAYit_VIP_v2.8.75.29.apk",
  },

  [157]: { // Vidma (Avi Video Editor)
    url: "https://www.mediafire.com/file/dlkegehrw37l0e3/Vidma_Premium_v2.40.8_Modded_by_%2540Getmodpcs.apk/file",
    filename: "Vidma_Premium_v2.40.8.apk",
  },

  [160]: { // ToonTap Pro (Anime AI)
    url: "https://www.mediafire.com/file/2mogrgllokw9hyp/ToonTap_Pro_v1.519.84_Modded_by_%2540Getmodpcs.apk/file",
    filename: "ToonTap_Pro_v1.519.84.apk",
  },

  // ====== IDs symboliques déjà présents dans ton code (mis à jour avec MediaFire) ======
  [ANDROID_AIVIDEO_ID]: {
    url: "https://www.mediafire.com/file/9cwhe56bia8vnue/AI_Video_Generator_Pro_v1.1.5_Modded_by_%2540Getmodpcs.apk/file",
    filename: "AI_Video_Generator_Pro_v1.1.5.apk",
  },
  [ANDROID_INSHOT_ID]: {
    url: "https://www.mediafire.com/file/4clnk39edctkwcg/InShot.apk/file",
    filename: "InShot.apk",
  },
  [ANDROID_AUDIOMACK_ID]: {
    url: "https://www.mediafire.com/file/zt3v4qk8veglm2o/Audiomack.apk/file",
    filename: "Audiomack.apk",
  },
  [ANDROID_AUTOCLICKER_ID]: {
    url: "https://www.mediafire.com/file/tw82tgtwmbcxkk9/Auto_Clicker_Pro_v2.6.1_Modded_by_%2540Getmodpcs.apk/file",
    filename: "Auto_Clicker_Pro_v2.6.1.apk",
  },
  [ANDROID_BANDLAB_ID]: {
    url: "https://www.mediafire.com/file/375gjnbj0o61dmd/BandLab_Premium_v11.8.3_Modded_by_%2540Getmodpcs.apk/file",
    filename: "BandLab_Premium_v11.8.3.apk",
  },
  [ANDROID_BETTERSLEEP_ID]: {
    url: "https://www.mediafire.com/file/suodqov8by4faf1/BetterSleep_Premium_v25.29_Modded_by_%2540Getmodpcs.apk/file",
    filename: "BetterSleep_Premium_v25.29.apk", // (si BetterSleep a un lien séparé, remplace ici)
  },
  [ANDROID_CAPCUT_ID]: {
    url: "https://www.mediafire.com/file/nsk79eoysehgpxp/capcut.apk/file",
    filename: "CapCut.apk",
  },
  [ANDROID_CHATSMITH_ID]: {
    url: "https://www.mediafire.com/file/flzu47skuatdu28/Chat_Smith_Premium_v8.251128.5_Modded_by_%2540Getmodpcs.apk/file",
    filename: "Chat_Smith_Premium_v8.251128.5.apk",
  },
  [ANDROID_COPILOT_ID]: {
    url: "https://www.mediafire.com/file/q7wumzni1dye644/Copilot_Premium_v30.0.490926850_Modded_by_%2540Getmodpcs.apk/file",
    filename: "Copilot_Premium_v30.0.490926850.apk",
  },
  [ANDROID_DUOLINGO_ID]: {
    url: "https://www.mediafire.com/file/qnsl0cgm6bn6pmm/Duolingo_Premium_v6.56.0_Modded_by_%2540Getmodpcs.apk/file",
    filename: "Duolingo_Premium_v6.56.0.apk",
  },
  [ANDROID_FLIPACLIP_ID]: {
    url: "https://www.mediafire.com/file/q68pv0n4wjj5c4u/FlipaClip.apk/file",
    filename: "FlipaClip.apk",
  },
  [ANDROID_FLO_ID]: {
    url: "https://www.mediafire.com/file/p3jd42mn2mcilr8/Flo.apk/file",
    filename: "Flo.apk",
  },
  [ANDROID_HEIGHT_ID]: {
    url: "https://www.mediafire.com/file/a5iin2a0p85izy5/Height.apk/file",
    filename: "Height.apk",
  },
  [ANDROID_HITRANSLATE_ID]: {
    url: "https://www.mediafire.com/file/n47v76a9iu0i1i7/Hi_Translate_Premium_v5.2.7.108_Modded_by_%2540Getmodpcs.apk/file",
    filename: "Hi_Translate_Premium_v5.2.7.108.apk",
  },
  [ANDROID_HOTSTAR_ID]: {
    url: "https://www.mediafire.com/file/mspz2pv7u44rbj5/Hotstar_v24.11.10.2_Modded_by_Getmodpc.apk/file",
    filename: "Hotstar_v24.11.10.2.apk",
  },
  [ANDROID_HYPIC_ID]: {
    url: "https://www.mediafire.com/file/x46z6whzftedw2o/Hypic_Pro_v7.4.0_Modded_by_%2540Getmodpcs.apk/file",
    filename: "Hypic_Pro_v7.4.0.apk",
  },
  [ANDROID_INSTABRIDGE_ID]: {
    url: "https://www.mediafire.com/file/0eyvd6r620vemju/Instabridge.apk/file",
    filename: "Instabridge.apk",
  },
  [ANDROID_INSTABRIDGE2_ID]: {
    url: "https://www.mediafire.com/file/klfjf84nwj12ssz/Instabridge2.apk/file",
    filename: "Instabridge2.apk",
  },
  [ANDROID_LARKPLAYER_ID]: {
    url: "https://www.mediafire.com/file/jyurw25l96zq49o/Lark_Player_Premium_v6.34.18_Modded_by_%2540Getmodpcs.apk/file",
    filename: "Lark_Player_Premium_v6.34.18.apk",
  },
  [ANDROID_LOGOMAKER_ID]: {
    url: "https://www.mediafire.com/file/95fvk09zyn4dgqd/LogoMaker.apk/file",
    filename: "LogoMaker.apk",
  },
  [ANDROID_MOVIESHUB_ID]: {
    url: "https://www.mediafire.com/file/6mbtju2fmoe2c5g/MOVIES_HUB_PREMIUM_v2.3.8d_Modded_by_%2540Getmodpcs.apk/file",
    filename: "MOVIES_HUB_PREMIUM_v2.3.8d.apk",
  },
  [ANDROID_NETFLIX_ID]: {
    url: "https://www.mediafire.com/file/pop0kfn0kfcdqdd/Netflix_Premium_v9.45.0_Modded_by_%2540Getmodpcs.apk/file",
    filename: "Netflix_Premium_v9.45.0.apk",
  },
  [ANDROID_NIAGARA_ID]: {
    url: "https://www.mediafire.com/file/o5yu4m965z43e6g/Niagara_Launcher_Pro_v1.19.8_Modded_by_%2540Getmodpcs.apk/file",
    filename: "Niagara_Launcher_Pro_v1.19.8.apk",
  },
  [ANDROID_PHOTOLAB_ID]: {
    url: "https://www.mediafire.com/file/bx8ebd183vwwd63/Photo_Lab_Pro_v3.52.68_Modded_by_%2540Getmodpcs.apk/file",
    filename: "Photo_Lab_Pro_v3.52.68.apk",
  },
  [ANDROID_PHOTOMATH_ID]: {
    url: "https://www.mediafire.com/file/hq01u64rdpd2tmv/Photomath_Plus_v8.52.0_Modded_by_%2540Getmodpcs.apk/file",
    filename: "Photomath_Plus_v8.52.0.apk",
  },
  [ANDROID_PHOTOROOM_ID]: {
    url: "https://www.mediafire.com/file/nco86t2td0p8uam/PhotoRoom_Max_v2025.53.26_Modded_by_%2540Getmodpcs.apk/file",
    filename: "PhotoRoom_Max_v2025.53.26.apk",
  },
  [ANDROID_PIXEL_ID]: {
    url: "https://www.mediafire.com/file/7hzdfyab5f8o5u3/Pixel.apk/file",
    filename: "Pixel.apk",
  },
  [ANDROID_PIXELCUT_ID]: {
    url: "https://www.mediafire.com/file/giy1gi2p6kli765/Pixelcut_Pro_v2.1.9_Modded_by_%2540Getmodpcs.apk/file",
    filename: "Pixelcut_Pro_v2.1.9.apk",
  },
  [ANDROID_PLAYIT_ID]: {
    url: "https://www.mediafire.com/file/gyowe3drhet9e11/PLAYit.apk/file",
    filename: "PLAYit.apk",
  },
  [ANDROID_PRIMEVIDEO_ID]: {
    url: "https://www.mediafire.com/file/qi01b3k19qcwxsv/Prime_Video_Premium_v3.0.985.1730_Modded_by_Getmodpc.apk/file",
    filename: "Prime_Video_Premium_v3.0.985.1730.apk",
  },
  [ANDROID_REDDIT_ID]: {
    url: "https://www.mediafire.com/file/odccmf3k1jcm054/Reddit_Premium_v2025.39.0_Modded_by_%2540Getmodpcs.apk/file",
    filename: "Reddit_Premium_v2025.39.0.apk",
  },
  [ANDROID_REMINI_ID]: {
    url: "https://www.mediafire.com/file/6ilsx2awhy9ej2q/Remini_Premium_v3.7.3532.202516935_Modded_by_%2540Getmodpcs.apk/file",
    filename: "Remini_Premium_v3.7.3532.apk",
  },
  [ANDROID_SHAZAM_ID]: {
    url: "https://www.mediafire.com/file/3dh53xm67e5z0d1/Shazam_Premium_v18.3.0-251029_Modded_by_%2540Getmodpcs.apk/file",
    filename: "Shazam_Premium_v18.3.0-251029.apk",
  },
  [ANDROID_SHOTCUT_ID]: {
    url: "https://www.mediafire.com/file/xj7rsxffpzqmuy3/ShotCut.apk/file",
    filename: "ShotCut.apk",
  },
  [ANDROID_SIXPACK_ID]: {
    url: "https://www.mediafire.com/file/tls5hood9664qku/Six_Pack_in_30_Days_Pro_v1.6.3_Modded_by_%2540Getmodpcs.apk/file",
    filename: "Six_Pack_in_30_Days_Pro_v1.6.3.apk",
  },
  [ANDROID_SNAPTUBE_ID]: {
    url: "https://www.mediafire.com/file/g62qpeaui3djd8t/Snaptube_VIP_v7.57.1.75690850_Modded_by_%2540Getmodpcs.apk/file",
    filename: "Snaptube_VIP_v7.57.1.75690850.apk",
  },
  [ANDROID_SPOTIFY_ID]: {
    url: "https://www.mediafire.com/file/kmbk1fku9ownuyo/Spotify.apk/file",
    filename: "Spotify.apk",
  },
  "SPOTIFY_PREMIUM_9087": {
    url: "https://www.mediafire.com/file/0z8m7l1n6wajcte/Spotify_Premium_v9.0.87.1520_Modded_by_%2540Getmodpcs.apk/file",
    filename: "Spotify_Premium_v9.0.87.1520.apk",
  },
  "SPOTIFY_PREMIUM_9089": {
    url: "https://www.mediafire.com/file/lrqeobgiero474s/Spotify_Premium_v9.0.89.1450_Modded_by_%2540Getmodpcs.apk/file",
    filename: "Spotify_Premium_v9.0.89.1450.apk",
  },
  [ANDROID_TAPSCANNER_ID]: {
    url: "https://www.mediafire.com/file/rl0eb8o2yb46ebb/TapScanner_Premium_v3.2.65_Modded_by_%2540Getmodpcs.apk/file",
    filename: "TapScanner_Premium_v3.2.65.apk",
  },
  [ANDROID_TELEGRAM_ID]: {
    url: "https://www.mediafire.com/file/37qf63938oglhp2/Telegram.apk/file",
    filename: "Telegram.apk",
  },
  [ANDROID_TENADA_ID]: {
    url: "https://www.mediafire.com/file/6o888gq8e4sgu88/TENADA.apk/file",
    filename: "TENADA.apk",
  },
  [ANDROID_TERABOX_ID]: {
    url: "https://www.mediafire.com/file/osp6gmeribiq568/TeraBox_Premium_v4.6.1_Modded_by_%2540Getmodpcs.apk/file",
    filename: "TeraBox_Premium_v4.6.1.apk",
  },
  [ANDROID_TOONAPP_ID]: {
    url: "https://www.mediafire.com/file/vobmmmea9r7hyv4/ToonApp_Pro_v3.5.18_Modded_by_%2540Getmodpcs.apk/file",
    filename: "ToonApp_Pro_v3.5.18.apk",
  },
  [ANDROID_TOONME_ID]: {
    url: "https://www.mediafire.com/file/pw4lk0di11589oy/ToonMe.apk/file",
    filename: "ToonMe.apk",
  },
  [ANDROID_TRUECALLER_ID]: {
    url: "https://www.mediafire.com/file/0mpy0alzrzjuukv/Truecaller_Premium_Gold_v15.43.6_Modded_by_%2540Getmodpcs.apk/file",
    filename: "Truecaller_Premium_Gold_v15.43.6.apk",
  },
  [ANDROID_TWITTER_ID]: {
    url: "https://www.mediafire.com/file/tv7yajm9rrwmz09/Twitter_Premium_v11.28.0_Modded_by_%2540Getmodpcs.apk/file",
    filename: "Twitter_Premium_v11.28.0.apk",
  },
  [ANDROID_VIDEO_COMPRESS_ID]: {
    url: "https://www.mediafire.com/file/73doys7fi9ny8xe/Video_Compressor_Premium_v2.9.9_Modded_by_%2540Getmodpcs_%25281%2529.apk/file",
    filename: "Video_Compressor_Premium_v2.9.9_(1).apk",
  },
  [ANDROID_VIDEO_DOWNLOADER_ID]: {
    url: "https://www.mediafire.com/file/98fke30uahlus0b/Video_Downloader_Pro_v2.7.4_Modded_by_%2540Getmodpcs.apk/file",
    filename: "Video_Downloader_Pro_v2.7.4.apk",
  },
  [ANDROID_VIDEOSHOW_ID]: {
    url: "https://www.mediafire.com/file/rw6pgg4p6l8b76j/VideoShow_VIP_v10.7.0.4_Modded_by_Getmodpc.apk/file",
    filename: "VideoShow_VIP_v10.7.0.4.apk",
  },
  [ANDROID_VIDMATE_ID]: {
    url: "https://www.mediafire.com/file/ln07ypvph728ls6/VidMate_Premium_v5.4550_Modded_by_%2540Getmodpcs.apk/file",
    filename: "VidMate_Premium_v5.4550.apk",
  },
  [ANDROID_VIVAVIDEO_ID]: {
    url: "https://www.mediafire.com/file/fa1aoeax3z1qzod/VivaVideo.apk/file",
    filename: "VivaVideo.apk",
  },
  [ANDROID_WALLCRAFT_ID]: {
    url: "https://www.mediafire.com/file/gvu5tdso6no9o5q/Wallcraft.apk/file",
    filename: "Wallcraft.apk",
  },
  [ANDROID_VPNSUPER_ID]: {
    url: "https://www.mediafire.com/file/o8cdni88uu1nxyi/VPN_Super_Unlimited_Proxy_v3.1.4_Modded_by_%2540Getmodpcs.apk/file",
    filename: "VPN_Super_Unlimited_Proxy_v3.1.4.apk",
  },
  [ANDROID_XPLAYER_ID]: {
    url: "https://www.mediafire.com/file/vm3t8p9g1o3esgd/XPlayer_Premium_v2.6.1.8_Modded_by_%2540Getmodpcs.apk/file",
    filename: "XPlayer_Premium_v2.6.1.8.apk",
  },
  [ANDROID_AHATIK_ID]: {
    url: "https://www.mediafire.com/file/x6m4jyyoca57rrc/AhaTik_Downloader_Premium_v1.52.3_Modded_by_%2540Getmodpcs.apk/file",
    filename: "AhaTik_Downloader_Premium_v1.52.3.apk",
  },

  // (fallback éventuel si tu en utilises un)
  [ANDROID_AUTOREMAIN]: { url: "/downloads/android/", filename: "" },
};



// ❗ Remarque: j’ai volontairement formulé les descriptions de façon neutre (features officielles).
//     Si tu veux des mentions “Premium / Gold / VIP” visibles dans le nom, on peut les garder comme ci-dessus.


/* ------------------ Utils ------------------ */
const normalize = (s) =>
  (s || "")
    .toString()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();

/* ------------------ Composant ------------------ */
export default function Home() {
  const [activeTab, setActiveTab] = useState("pc");
  const [query, setQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();
 const [modalOpen, setModalOpen] = useState(false);
 const [modalApp, setModalApp] = useState(null);

 useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [activeTab]);
// Verrouille le scroll quand la modal est ouverte
useEffect(() => {
  document.body.style.overflow = modalOpen ? "hidden" : "auto";
  return () => { document.body.style.overflow = "auto"; };
}, [modalOpen]);

// Fermer avec la touche Échap
useEffect(() => {
  const onKey = (e) => { if (e.key === "Escape") setModalOpen(false); };
  window.addEventListener("keydown", onKey);
  return () => window.removeEventListener("keydown", onKey);
}, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  const dataActif = activeTab === "pc" ? apps_pc : apps_android;

  const filtered = useMemo(() => {
    const q = normalize(query);
    if (!q) return dataActif;
    return dataActif.filter(
      (app) => normalize(app.nom).includes(q) || normalize(app.desc).includes(q)
    );
}, [query, dataActif, activeTab]);  // ✅ ajoute activeTab

// Active les animations seulement pour les éléments visibles (après la dispo de `filtered`)
useEffect(() => {
  const elements = document.querySelectorAll('[data-observe="card"]');
  if (!elements.length) return;
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("inview");
        }
      });
    },
    { root: null, rootMargin: "0px", threshold: 0.1 }
  );
  
  elements.forEach((el) => observer.observe(el));
  
  return () => {
    observer.disconnect();
    // Nettoyer les classes pour éviter les conflits
    elements.forEach((el) => el.classList.remove("inview"));
  };
}, [activeTab, filtered.length]);

const handleDownload = (app) => { 
  // priorité : mapping direct par id

  // Interception des cartes 2 et 10 en onglet PC uniquement
if (activeTab === "pc" && (app.id === 2 || app.id === 10)) {
  setModalApp({ id: app.id, nom: app.nom });
  setModalOpen(true);
  return;
}

  const d = DOWNLOADS[app.id];

  if (app.id == 1) {
    // redirection vers la page Adobe
    window.location.href = "/adobe";
    return;
  }

  if (d && d.url && d.url !== "/downloads/android/") {
    const a = document.createElement("a");
    a.href = d.url;
    a.download = d.filename || "";
    document.body.appendChild(a);
    a.click();
    a.remove();
    return;
  }

  // si entrée spécifique Spotify Premium file keys (ex: plusieurs versions)
  if (app.id === ANDROID_SPOTIFY_ID) {
    // essaye d'abord le fichier générique
    const s = DOWNLOADS[ANDROID_SPOTIFY_ID];
    if (s && s.url) {
      const a = document.createElement("a");
      a.href = s.url;
      a.download = s.filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      return;
    }
    // sinon, tente les versions premium si présentes
    const s1 = DOWNLOADS["SPOTIFY_PREMIUM_9087"];
    if (s1) { const a = document.createElement("a"); a.href = s1.url; a.download = s1.filename; document.body.appendChild(a); a.click(); a.remove(); return; }
    const s2 = DOWNLOADS["SPOTIFY_PREMIUM_9089"];
    if (s2) { const a = document.createElement("a"); a.href = s2.url; a.download = s2.filename; document.body.appendChild(a); a.click(); a.remove(); return; }
  }

  // fallback par nom d'image : cherche une mapping dont l'URL se termine par le nom d'image
  const imageKey = (app.image || "").split("/").pop()?.toLowerCase();
  if (imageKey) {
    const byImage = Object.values(DOWNLOADS).find(m => m.url.toLowerCase().endsWith(imageKey));
    if (byImage) {
      const a = document.createElement("a");
      a.href = byImage.url;
      a.download = byImage.filename || "";
      document.body.appendChild(a);
      a.click();
      a.remove();
      return;
    }
  }

  // dernier recours : construit automatiquement un slug et tente le fichier
  const slug = (app.nom || "")
    .toString()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  const autoUrl = `/downloads/android/${slug}.apk`;
  const a = document.createElement("a");
  a.href = autoUrl;
  a.download = `${slug}.apk`;
  document.body.appendChild(a);
  a.click();
  a.remove();

  console.warn("Aucun mapping explicite trouvé pour", app.id, app.nom, app.image);
};



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob gfx-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 gfx-blob"></div>
        <div className="absolute bottom-20 left-40 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000 gfx-blob"></div>
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-slate-900/70 border-b border-purple-500/20 shadow-lg shadow-purple-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-center gap-3">
            <Sparkles className="w-6 h-6 text-purple-400 animate-pulse" />
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 text-transparent bg-clip-text animate-gradient">
              Premium Applications
            </h1>
            <Sparkles className="w-6 h-6 text-pink-400 animate-pulse" style={{ animationDelay: "0.5s" }} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Tabs */}
          <nav className="flex gap-4 mb-8 justify-center">
            <button
              onClick={() => { setActiveTab("pc"); setQuery(""); }}
              className={`group relative px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === "pc"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50 scale-105"
                  : "bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 backdrop-blur-sm"
              }`}
            >
              <span className="relative z-10 flex items-center gap-2">💻 For PC</span>
              {activeTab === "pc" && (
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 opacity-50 blur-lg animate-pulse"></div>
              )}
            </button>
            <button
              onClick={() => { setActiveTab("android"); setQuery(""); }}
              className={`group relative px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === "android"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50 scale-105"
                  : "bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 backdrop-blur-sm"
              }`}
            >
              <span className="relative z-10 flex items-center gap-2">📱 For Android</span>
              {activeTab === "android" && (
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 opacity-50 blur-lg animate-pulse"></div>
              )}
            </button>
          </nav>

          {/* Search Bar */}
          <div className="mb-8 max-w-2xl mx-auto">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="relative bg-slate-800/70 backdrop-blur-xl rounded-2xl border border-purple-500/30 overflow-hidden shadow-xl">
                <div className="flex items-center px-4 py-3">
                  <Search className="w-5 h-5 text-purple-400" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={`Search an app ${activeTab === "pc" ? "PC" : "Android"}...`}
                    className="flex-1 bg-transparent border-none outline-none px-4 text-white placeholder-slate-400"
                  />
                  {query && (
                    <button onClick={() => setQuery("")} className="p-1 hover:bg-slate-700 rounded-lg transition-colors">
                      <X className="w-5 h-5 text-slate-400" />
                    </button>
                  )}
                </div>
              </div>
            </div>
            <p className="text-center mt-3 text-slate-400 text-sm">
              {filtered.length} result{filtered.length > 1 ? "s" : ""}
            </p>
          </div>

          {/* Apps Grid — 🔁 4 colonnes dès lg */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6" style={{ contain: "layout paint style" }}>
              {filtered.map((app, index) => (
                <div
                  key={`${activeTab}-${app.id}-${app.nom}`}   // ✅ clé unique même si id dupliqué ailleurs
                  className="group relative animate-on-visible"
                  data-observe="card"
                  style={{ "--d": `${index * 50}ms` }}
                >
                  {/* Card glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-all duration-500"></div>

                  {/* Card */}
                  <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-purple-500/20 overflow-hidden transition-all duration-500 group-hover:border-purple-500/50 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-purple-500/20">
                    {/* Image Block (coins arrondis garantis) */}
                    <div className="relative h-48 p-2">
                      <div className="relative h-full w-full rounded-[16px] overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800">
                        {/* Voile gradient AU-DESSOUS de l'icône, radius hérité */}
                        <div
                          className="absolute inset-0 opacity-60"
                          style={{
                            borderRadius: "inherit",
                            background: "linear-gradient(to top, rgba(2,6,23,0.9), transparent 40%)",
                            zIndex: 0
                          }}
                        />

                        {/* Image centrée et contenue */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "100%",
                            width: "100%",
                            overflow: "hidden",
                            borderRadius: 15,
                            position: "relative",
                            zIndex: 1
                          }}
                        >
                          <img
                            src={app.image}
                            alt={app.nom}
                            style={{
                              borderRadius: "inherit",
                              transform: "translateZ(0)",
                              maxHeight: "90%",
                              width: "auto",
                              height: "auto",
                              objectFit: "contain",
                              display: "block"
                            }}
                            loading="lazy"
                            decoding="async"
                            fetchPriority={index < 8 ? "high" : "low"}
                          />
                        </div>

                        {/* Shine subtil au survol, radius hérité */}
                        <div
                          className="pointer-events-none absolute inset-0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"
                          style={{
                            borderRadius: "inherit",
                            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)",
                            willChange: "transform, opacity"
                          }}
                        />
                      </div>

                      {/* Premium Badge (au-dessus) */}
                      <div className="absolute top-3 right-3 z-20 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
                        PRO
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 space-y-3">
                      <h3 className="text-lg font-bold text-white line-clamp-1 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">
                        {app.nom}
                      </h3>
                      <p className="text-sm text-slate-400 line-clamp-2">{app.desc}</p>

                      {/* Download Button */}
                      <button
                        onClick={() => handleDownload(app)}
                        className="w-full relative group/btn overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 p-[2px] transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50"
                      >
                        <div className="relative bg-slate-900 rounded-[12px] px-4 py-2.5 transition-all duration-300 group-hover/btn:bg-transparent">
                          <span className="relative z-10 flex items-center justify-center gap-2 text-sm font-semibold text-white">
                            <Download className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-y-1" />
                            Download
                          </span>
                        </div>
                      </button>
                    </div>

                    {/* Shine effect autour de la carte */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ willChange: "opacity" }}>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="inline-block p-6 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-purple-500/20">
                <p className="text-slate-300 text-lg">❌ No application matches "{query}"</p>
              </div>
            </div>
          )}
        </div>

{modalOpen && (
  <div className="fixed inset-0 z-[999]">
    {/* Overlay */}
    <div
      className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
      onClick={() => setModalOpen(false)}
      aria-hidden="true"
    />

    {/* Card */}
    <div className="absolute inset-0 flex items-center justify-center p-4">
      <div
        className="
          relative w-full max-w-md
          rounded-2xl border border-purple-500/30
          bg-gradient-to-b from-slate-900/90 to-slate-900/60
          shadow-2xl shadow-purple-500/20
          overflow-hidden
          animate-[fadeInUp_0.35s_ease-out_forwards]
          scale-95
        "
        role="dialog"
        aria-modal="true"
        aria-labelledby="maj-title"
      >
        {/* Lueur décorative */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-purple-600/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-pink-600/20 blur-3xl" />

        {/* En-tête */}
        <div className="flex items-center gap-3 px-6 pt-6">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-pink-600">
            <Clock className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 id="maj-title" className="text-lg font-bold text-white">
              Update in progress
            </h3>
            <p className="text-xs text-slate-400">
              {modalApp?.nom ? modalApp.nom : "This item"}
            </p>
          </div>
        </div>

        {/* Corps */}
        <div className="px-6 pt-4 pb-2">
          <div className="rounded-xl bg-slate-800/50 border border-purple-500/20 p-4">
            <p className="text-slate-200 leading-relaxed">
              This item will be <span className="font-semibold text-white">available in 5 days</span>.
              <br />
              It is currently being updated to ensure the best experience.
            </p>
          </div>

          {/* Info bar / delay */}
          <div className="mt-3 text-sm text-slate-400">
            ⏳ Estimated time: <span className="text-slate-200">5 days</span>
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 pb-6 pt-2 flex items-center justify-end gap-3">
          <button
            onClick={() => setModalOpen(false)}
            className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => setModalOpen(false)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold shadow-lg shadow-purple-500/30 hover:brightness-110 transition"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  </div>
)}


      </main>

      {/* Footer */}
      <footer className="relative py-8 text-center text-slate-400 border-t border-purple-500/20 backdrop-blur-sm">
        <p>© {new Date().getFullYear()} · Premium Apps · All rights reserved</p>
      </footer>

      {/* Styles utilitaires */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animate-gradient { background-size: 200% auto; animation: gradient 3s linear infinite; }
        .line-clamp-1 { display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

        /* Performance helpers */
        .gfx-blob { will-change: transform, opacity; contain: paint; }
        .animate-on-visible { 
          opacity: 0; 
          transform: translateY(30px);
          contain: layout paint style; 
          will-change: transform, opacity; 
        }
        .animate-on-visible.inview { 
          opacity: 1; 
          transform: translateY(0);
          animation: fadeInUp 0.6s ease-out forwards; 
          animation-delay: var(--d, 0ms); 
        }
      `}</style>
    </div>
  );
}
