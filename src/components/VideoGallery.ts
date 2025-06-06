interface VideoGalleryConfig {
  youtubeId: string;
  orientation: "Vertikal" | "Horizontal";
}

class VideoGallery {
  private wrappers: NodeListOf<Element>;

  constructor() {
    this.wrappers = document.querySelectorAll(".video-wrapper");
    this.init();
  }

  private init(): void {
    this.setupAspectRatios();
    this.setupPlayButtons();
    this.setupLazyLoading();
  }

  private setupAspectRatios(): void {
    this.wrappers.forEach((wrapper) => {
      const orientation = wrapper.getAttribute("data-video-orientation");
      if (orientation === "Vertikal") {
        wrapper.setAttribute("style", "padding-top: 177.78%"); // 9:16 für vertikal
      } else {
        wrapper.setAttribute("style", "padding-top: 56.25%"); // 16:9 für horizontal
      }
    });
  }

  private setupPlayButtons(): void {
    this.wrappers.forEach((wrapper) => {
      const playButton = wrapper.querySelector(".video-play-button");
      if (playButton) {
        playButton.addEventListener("click", () => {
          const youtubeId = wrapper.getAttribute("data-youtube-id");
          if (youtubeId) {
            this.createIframe(wrapper, youtubeId);
          }
        });
      }
    });
  }

  private createIframe(wrapper: Element, youtubeId: string): void {
    const iframe = document.createElement("iframe");
    iframe.setAttribute("src", youtubeId);
    iframe.setAttribute("title", "YouTube video player");
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute(
      "allow",
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    );
    iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
    iframe.setAttribute("allowfullscreen", "");

    const placeholder = wrapper.querySelector(".video-placeholder");
    if (placeholder) {
      wrapper.removeChild(placeholder);
    }

    wrapper.appendChild(iframe);
  }

  private setupLazyLoading(): void {
    if ("IntersectionObserver" in window) {
      const lazyLoadObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const wrapper = entry.target as Element;
              const youtubeId = wrapper.getAttribute("data-youtube-id");
              if (youtubeId) {
                const videoId = youtubeId.match(/\/embed\/([^?]+)/);
                if (videoId && videoId[1]) {
                  const placeholder =
                    wrapper.querySelector(".video-placeholder");
                  if (placeholder) {
                    placeholder.setAttribute(
                      "style",
                      `background-image: url('https://img.youtube.com/vi/${videoId[1]}/maxresdefault.jpg');
                     background-size: cover;
                     background-position: center;`
                    );
                  }
                }
              }
              lazyLoadObserver.unobserve(wrapper);
            }
          });
        },
        {
          rootMargin: "200px",
        }
      );

      this.wrappers.forEach((wrapper) => {
        lazyLoadObserver.observe(wrapper);
      });
    }
  }
}

// Initialisierung
document.addEventListener("DOMContentLoaded", () => {
  new VideoGallery();
});
