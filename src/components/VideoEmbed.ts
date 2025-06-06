export function initVideoEmbed() {
  document.addEventListener("DOMContentLoaded", function () {
    // Use event delegation on a static parent element (like document.body or a main container)
    // This ensures clicks on dynamically added video wrappers are also caught.
    document.body.addEventListener("click", function (event) {
      // Check if the clicked element or any of its parents is a .video-play-button
      const playButton = (event.target as HTMLElement).closest(
        ".video-play-button"
      );

      if (playButton) {
        // Find the closest .video-wrapper parent
        const wrapper = playButton.closest(
          ".video-wrapper"
        ) as HTMLElement | null;

        if (!wrapper) return; // Should not happen if closest found the button inside

        // Prevent default action (like form submission if the button is inside a form)
        event.preventDefault();

        var youtubeId = wrapper.getAttribute("data-youtube-id");

        // Check if an iframe already exists to prevent adding multiple iframes
        if (wrapper.querySelector("iframe")) {
          return; // An iframe already exists, do nothing
        }

        // Create iframe only when the user clicks play
        var iframe = document.createElement("iframe");
        iframe.setAttribute("src", youtubeId + "?autoplay=1"); // Add autoplay parameter
        iframe.setAttribute("title", "YouTube video player");
        iframe.setAttribute("frameborder", "0");
        iframe.setAttribute(
          "allow",
          "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        );
        iframe.setAttribute(
          "referrerpolicy",
          "strict-origin-when-cross-origin"
        );
        iframe.setAttribute("allowfullscreen", "");

        // Remove the placeholder
        var placeholder = wrapper.querySelector(".video-placeholder");
        if (placeholder) {
          wrapper.removeChild(placeholder);
        }

        // Add the iframe
        wrapper.appendChild(iframe);

        // Set up aspect ratio based on orientation only once when the wrapper is found
        var videoOrientation = wrapper.getAttribute("data-video-orientation");
        if (videoOrientation === "Vertikal") {
          wrapper.style.paddingTop = "56.25%"; // 16:9 für horizontal
        } else {
          wrapper.style.paddingTop = "177.78%"; // 9:16 für vertikal
        }
      }
    });

    // Initial aspect ratio setup and thumbnail loading for existing wrappers on DOMContentLoaded
    var initialWrappers = document.querySelectorAll(".video-wrapper");
    initialWrappers.forEach(function (wrapper) {
      // Set up aspect ratio based on orientation
      var videoOrientation = wrapper.getAttribute("data-video-orientation");
      // Add type assertion for wrapper
      if (videoOrientation === "Vertikal") {
        (wrapper as HTMLElement).style.paddingTop = "56.25%"; // 16:9 für horizontal
      } else {
        (wrapper as HTMLElement).style.paddingTop = "177.78%"; // 9:16 für vertikal
      }
    });

    // Implement IntersectionObserver for lazy loading thumbnails
    if ("IntersectionObserver" in window) {
      var lazyLoadObserver = new IntersectionObserver(
        function (entries, observer) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              var wrapper = entry.target as HTMLElement;

              // Load YouTube thumbnail as background
              var youtubeId = wrapper.getAttribute("data-youtube-id");
              if (youtubeId) {
                // Extract video ID if the full URL is provided
                var videoId = youtubeId.match(/\/embed\/([^?]+)/);
                if (videoId && videoId[1]) {
                  var placeholder = wrapper.querySelector(
                    ".video-placeholder"
                  ) as HTMLElement;
                  if (placeholder) {
                    placeholder.style.backgroundImage =
                      "url('https://img.youtube.com/vi/" +
                      videoId[1] +
                      "/maxresdefault.jpg')";
                    placeholder.style.backgroundSize = "cover";
                    placeholder.style.backgroundPosition = "center";
                  }
                }
              }

              // Stop observing after loading
              observer.unobserve(wrapper);
            }
          });
        },
        {
          rootMargin: "200px", // Load when within 200px of viewport
        }
      );

      // Observe all video wrappers
      initialWrappers.forEach(function (wrapper) {
        lazyLoadObserver.observe(wrapper);
      });
    }
  });
}
