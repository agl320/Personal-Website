import gsap from "gsap";

gsap.to(".title-animation", {
    y: 0,
    stagger: 0,
    delay: 0.3,
    duration: 1.2,
    ease: CustomEase.create(
        "custom",
        "M0,0 C0.054,0.376 0.034,0.293 0.121,0.527 0.153,0.614 0.187,0.724 0.297,0.815 0.492,0.906 0.881,1 1,1 "
    ),
});

gsap.to("#title", {
    y: 0,
    stagger: 0,
    delay: 0.3,
    duration: 1.2,
    ease: CustomEase.create(
        "custom",
        "M0,0 C0.054,0.376 0.034,0.293 0.121,0.527 0.153,0.614 0.187,0.724 0.297,0.815 0.492,0.906 0.881,1 1,1 "
    ),
});

gsap.to([".button-animation", ".button-animation-delay"], {
    y: 0,
    stagger: 0.1,
    delay: 0.6,
    duration: 1.2,
    ease: CustomEase.create(
        "custom",
        "M0,0 C0.054,0.376 0.034,0.293 0.121,0.527 0.153,0.614 0.187,0.724 0.297,0.815 0.492,0.906 0.881,1 1,1 "
    ),
});

// gsap.to(".button-animation-delay", {
//     y: 0,
//     stagger: 0.1,
//     delay: 1,
//     duration: 1.2,
//     ease: CustomEase.create(
//         "custom",
//         "M0,0 C0.054,0.376 0.034,0.293 0.121,0.527 0.153,0.614 0.187,0.724 0.297,0.815 0.492,0.906 0.881,1 1,1 "
//     ),
// });
