import { onReady } from "@xatom/core";
import { helloWorldRoutes } from "./routes";
import "./animations";

onReady(() => {
  helloWorldRoutes();
});

// Webflow-Typen deklarieren
declare global {
  interface Window {
    Webflow: any;
  }
}

// Import der Video-Galerie
import videoGalleryEmbed from "./components/VideoGalleryEmbed";
import "./components/ReadMore.js";
import { initFAQ } from "./components/FAQ";
import { initMovingBanner } from "./components/MovingBanner";
import { initVideoEmbed } from "./components/VideoEmbed";

// Hauptfunktion für die FinanzFit-Integration
class FinanzFit {
  constructor() {
    this.init();
  }

  init() {
    // Initialisiere Video-Galerie
    const galleryContainer = document.querySelector(".w-embed.w-script");
    if (galleryContainer) {
      galleryContainer.innerHTML = videoGalleryEmbed;
    }

    // Initialisiere FAQ
    initFAQ();

    // Initialisiere Moving Banner
    initMovingBanner();

    // Initialisiere Video Embed
    initVideoEmbed();
  }
}

// Initialisierung
new FinanzFit();
