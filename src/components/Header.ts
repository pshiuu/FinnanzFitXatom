import $ from "jquery";

export class Header {
  constructor() {
    this.init();
  }

  private init() {
    $(document).ready(() => {
      this.checkSection();
      this.toggleMenu();

      // Run checkSection on scroll
      $(window).on("scroll", () => {
        this.checkSection();
      });

      // Re-run toggleMenu when window is resized
      $(window).resize(() => {
        this.toggleMenu();
      });
    });
  }

  private checkSection() {
    const scrollPosition =
      $(window).scrollTop() + $(".section_navbar").outerHeight();

    $(".section-white, .section-black").each(function () {
      const sectionOffset = $(this).offset().top;
      const sectionHeight = $(this).outerHeight();

      if (
        scrollPosition >= sectionOffset &&
        scrollPosition < sectionOffset + sectionHeight
      ) {
        if ($(this).hasClass("section-black")) {
          // Change for black section
          $(".nav-links-wrap a").css("color", "#001932");
          $(".header-dropdown-link a").css("color", "#001932");
          $(".header-dropdown-toggle .w-icon-dropdown-toggle").css(
            "color",
            "#001932"
          );
          $(".dropdown-text").css("color", "#001932");
          $(".button-header").css({
            "border-color": "#001932",
            color: "#001932",
          });
          $(".button-header .text-button").css("color", "#001932");
          $(".logo-finanzfit-white").hide();
          $(".logo-finanzfit-blue").show();
        } else if ($(this).hasClass("section-white")) {
          // Change for white section
          $(".nav-links-wrap a").css("color", "white");
          $(".header-dropdown-link a").css("color", "white");
          $(".header-dropdown-toggle .w-icon-dropdown-toggle").css(
            "color",
            "white"
          );
          $(".dropdown-text").css("color", "white");
          $(".button-header").css({
            "border-color": "white",
            color: "white",
          });
          $(".button-header .text-button").css("color", "white");
          $(".logo-finanzfit-blue").hide();
          $(".logo-finanzfit-white").show();
        }
      }
    });
  }

  private toggleMenu() {
    if ($(window).width() <= 991) {
      // Initial state
      $(".nav-links-wrap").hide();

      // Toggle menu on burger-wrap click
      $(".burger-wrap")
        .off("click")
        .on("click", () => {
          if ($(".nav-links-wrap").is(":visible")) {
            $(".nav-links-wrap").fadeOut("slow");
            $("body").removeClass("no-scroll");
          } else {
            $(".nav-links-wrap").fadeIn("slow").css("display", "flex");
            $("body").addClass("no-scroll");
          }
        });

      // Close menu on link click and reverse burger checkbox
      $(".nav-links-wrap a")
        .off("click")
        .on("click", () => {
          $(".nav-links-wrap").fadeOut("slow");
          $("#burger-checkbox").prop("checked", false);
          $("body").removeClass("no-scroll");
        });
    } else {
      // Ensure the menu is shown and scroll is enabled if screen width > 991px
      $(".nav-links-wrap").css("display", "");
      $("body").removeClass("no-scroll");
    }
  }
}
