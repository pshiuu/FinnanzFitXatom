import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
    // Select all elements that need to be animated
    const animatedElements = document.querySelectorAll('.fade-in, .slide-up');

    animatedElements.forEach(element => {
        ScrollTrigger.create({
            trigger: element,
            start: "top 80%", // Animation starts when the top of the element is 80% from the top of the viewport
            end: "bottom top",
            // markers: true, // Uncomment for debugging
            onEnter: () => element.classList.add('animate-visible'),
            // Optionally reverse animation when scrolling back up
            // onLeaveBack: () => element.classList.remove('animate-visible')
        });
    });
}); 