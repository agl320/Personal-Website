import gsap from "gsap";

import Lenis from "@studio-freight/lenis";

const lenis = new Lenis({ duration: 1 });

// lenis.on("scroll", (e) => {
//     console.log(e);
// });

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// entry animations
// div moves up
// img also moves up, faster rate

// const pArr = document.querySelectorAll(".p-wrap p");
// const pWrapArr = document.querySelectorAll(".p-wrap");
// const imgArr = document.querySelectorAll(".img-wrap img");

// function animateOut(onComplete = {}) {
//     console.log("Animate out for gallery");

//     console.log(pArr);
//     console.log(pWrapArr);

//     pArr.forEach((item, index) => {
//         // start visible, just below

//         gsap.fromTo(
//             pWrapArr[index],
//             { opacity: 1 },
//             {
//                 duration: 0.8,
//                 stagger: 0.1,
//                 opacity: 0,

//                 ease: "ease.out",
//             }
//         );

//         gsap.fromTo(
//             imgArr,
//             { opacity: 1 },
//             {
//                 duration: 0.8,
//                 stagger: 0.1,
//                 opacity: 0,
//                 ease: "ease.out",
//                 onComplete: onComplete,
//             }
//         );
//     });
// }

// function animateIn(onComplete = {}) {
//     console.log("Animate in for gallery");

//     pArr.forEach((item, index) => {
//         // start visible, just below

//         gsap.fromTo(
//             pWrapArr[index],
//             { opacity: 0 },
//             {
//                 duration: 0.8,
//                 stagger: 0.1,
//                 opacity: 1,
//                 delay: 1.5,
//                 ease: "ease.out",
//             }
//         );

//         gsap.fromTo(
//             imgArr,
//             { opacity: 0 },
//             {
//                 duration: 0.8,
//                 stagger: 0.1,
//                 opacity: 1,
//                 delay: 1.5,
//                 ease: "ease.out",
//                 onComplete: onComplete,
//             }
//         );
//     });
// }
