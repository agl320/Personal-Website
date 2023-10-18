import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = gsap.utils.toArray("#project-main .project-box");

let scrollTween = gsap.to(projects, {
    xPercent: -100 * (projects.length - 1),
    ease: "none",
    scrollTrigger: {
        // invalidateOnRefresh: true,
        trigger: "#content-container",
        // pin so we do not over scroll
        pin: true,
        scrub: 1,
        // start: "top top",
        end: () => `+=${8000}`,
    },
});
