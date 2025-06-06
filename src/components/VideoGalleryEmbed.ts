// Video Gallery Embed Code
const videoGalleryEmbed = `
<style>
.section_gallery10 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  min-height: 100vh;
  background: #fff;
  padding-top: 48px;
  padding-bottom: 64px;
}

.section_gallery10 .text-align-center {
  text-align: center;
  margin-bottom: 2.5rem;
  margin-top: 1.5rem;
}

.section_gallery10 h2 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.section_gallery10 p {
  font-size: 1.25rem;
  color: #444;
  margin-bottom: 2.5rem;
}

.mansory-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 40px 32px;
  justify-items: center;
  align-items: start;
  max-width: 1100px;
  margin: 0 auto;
  width: 100%;
  padding: 40px 16px 56px 16px;
  background: rgba(255,255,255,0.95);
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.08);
}

.cms-item-grid {
  break-inside: avoid;
  margin-top: 12px;
  margin-bottom: 24px;
  transition: transform 0.3s cubic-bezier(.4,2,.6,1), box-shadow 0.3s;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  background: #fff;
}

.cms-item-grid:first-child {
  margin-top: 0;
}

.cms-item-grid:last-child {
  margin-bottom: 0;
}

.cms-item-grid:hover {
  transform: translateY(-8px) scale(1.03);
  box-shadow: 0 8px 32px rgba(0,0,0,0.15);
}

.video-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 9/16;
  overflow: hidden;
  background-color: #000;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.10);
  transition: box-shadow 0.3s;
  min-height: 320px;
  max-height: 480px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.video-wrapper[style*="56.25%"] {
  aspect-ratio: 16/9;
  min-height: 180px;
  max-height: 320px;
}

.video-wrapper:hover {
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
}

.video-wrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}

.video-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: #000;
  transition: opacity 0.3s;
}

.video-placeholder:hover {
  opacity: 0.92;
}

.video-play-button {
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0;
  transition: transform 0.2s;
}

.video-play-button:hover svg {
  transform: scale(1.12);
}

.video-play-button svg {
  transition: transform 0.2s;
  filter: drop-shadow(0 2px 8px rgba(0,0,0,0.25));
}

@media (max-width: 900px) {
  .mansory-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 28px 16px;
    padding: 28px 8px 36px 8px;
  }
  .section_gallery10 h2 {
    font-size: 2rem;
  }
}
@media (max-width: 600px) {
  .mansory-grid {
    grid-template-columns: 1fr;
    gap: 18px;
    padding: 12px 2px 24px 2px;
  }
  .section_gallery10 h2 {
    font-size: 1.5rem;
  }
  .section_gallery10 {
    padding-top: 24px;
    padding-bottom: 32px;
  }
}
</style>

<script>
document.addEventListener("DOMContentLoaded", function() {
  var wrappers = document.querySelectorAll(".video-wrapper");
  wrappers.forEach(function(wrapper) {
    var videoOrientation = wrapper.getAttribute("data-video-orientation");
    if (videoOrientation === "Vertikal") {
      wrapper.style.paddingTop = "177.78%";
    } else {
      wrapper.style.paddingTop = "56.25%";
    }
    var playButton = wrapper.querySelector(".video-play-button");
    if (playButton) {
      playButton.addEventListener("click", function() {
        var youtubeId = wrapper.getAttribute("data-youtube-id");
        var iframe = document.createElement("iframe");
        iframe.setAttribute("src", youtubeId);
        iframe.setAttribute("title", "YouTube video player");
        iframe.setAttribute("frameborder", "0");
        iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share");
        iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
        iframe.setAttribute("allowfullscreen", "");
        var placeholder = wrapper.querySelector(".video-placeholder");
        if (placeholder) {
          wrapper.removeChild(placeholder);
        }
        wrapper.appendChild(iframe);
      });
    }
  });
  if ('IntersectionObserver' in window) {
    var lazyLoadObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var wrapper = entry.target;
          var youtubeId = wrapper.getAttribute("data-youtube-id");
          if (youtubeId) {
            var videoId = youtubeId.match(/\/embed\/([^?]+)/);
            if (videoId && videoId[1]) {
              var placeholder = wrapper.querySelector(".video-placeholder");
              if (placeholder) {
                placeholder.style.backgroundImage = "url('https://img.youtube.com/vi/" + videoId[1] + "/maxresdefault.jpg')";
                placeholder.style.backgroundSize = "cover";
                placeholder.style.backgroundPosition = "center";
              }
            }
          }
          observer.unobserve(wrapper);
        }
      });
    }, {
      rootMargin: "200px"
    });
    wrappers.forEach(function(wrapper) {
      lazyLoadObserver.observe(wrapper);
    });
  }
});
</script>
`;

export default videoGalleryEmbed;
