import gsap from "gsap";

import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = gsap.utils.toArray("#project-main .project-box");

let scrollTween = gsap.to(projects, {
    xPercent: -100 * 1.2 * (projects.length - 1),
    // ease: "none",
    scrollTrigger: {
        // invalidateOnRefresh: true,
        trigger: "#gsap-wrap",
        // pin so we do not over scroll
        pin: true,
        scrub: 1,
        // start: "top top",
        end: () => `+=${3000}`,
    },
});

// .content is individual contents
const contentContainers = document.querySelectorAll(".content");

// #content-container is all contents together
const contentContainer = document.getElementById("content-container");
const heroContainer = document.getElementById("hero");
const navLinks = document.querySelectorAll(".navlink");

const projectsContent = document.getElementById("projects-content");

const pArr = document.querySelectorAll(".p-wrap p");
const pWrapArr = document.querySelectorAll(".p-wrap");
const imgArr = document.querySelectorAll(".img-wrap img");

// exit animations

gsap.registerPlugin(CustomEase);

console.log("START");
let aniDone = true;
let lastPage = "projects";
let targetPage = "projects";
history.pushState({ page: "projects" }, "", `/projects`);

function animateOut(onComplete = null) {
    console.log("Animate out for gallery");

    gsap.fromTo(
        pWrapArr,
        { opacity: 1 },
        {
            duration: 0.4,
            opacity: 0,
        }
    );

    gsap.fromTo(
        imgArr,
        { opacity: 1 },
        {
            duration: 0.4,
            opacity: 0,

            onComplete: onComplete,
        }
    );
}

function animateIn(onComplete = null) {
    console.log("Animate in for gallery");

    gsap.fromTo(
        pWrapArr,
        { opacity: 0 },
        {
            duration: 0.8,
            stagger: 0.1,
            opacity: 1,
            delay: 1.5,
        }
    );

    gsap.fromTo(
        imgArr,
        { opacity: 0 },
        {
            duration: 0.8,
            stagger: 0.1,
            opacity: 1,
            delay: 1.5,

            onComplete: onComplete,
        }
    );
}

function titleAnimateIn() {
    // line height

    gsap.fromTo(
        ".title-animation",
        { y: 150 },
        {
            delay: 0.3,
            y: 0,
            duration: 1.2,
        }
    );

    gsap.fromTo(
        "#title",
        { y: -100 },
        {
            delay: 0.3,
            y: 0,
            duration: 1.2,
        }
    );
}

function titleAnimateOut() {
    gsap.fromTo(
        ".title-animation",
        { y: 0 },
        {
            delay: 0,
            y: -150,
            duration: 1.2,
        }
    );
    gsap.fromTo(
        "#title",
        { y: 0 },
        {
            delay: 0,
            y: 100,
            duration: 1.2,
        }
    );
}

function linksAnimateIn(delay = 0, onComplete = null) {
    // STILL NEED TO ADD ANIMATE OF OUTER DIV IN OPPOSITE DIRECTION
    // button-animation-delay allows for separating if needed later
    gsap.fromTo(
        [".button-animation", ".button-animation-delay"],
        { y: 50 },
        {
            stagger: 0.1,
            delay: delay,
            y: 0,
            duration: 1.2,

            onComplete: onComplete,
        }
    );
}

function linksAnimateOut(delay = 0, onComplete = null) {
    gsap.fromTo(
        [".button-animation", ".button-animation-delay"],
        { y: 0 },
        {
            stagger: 0,
            delay: delay,
            y: -30,
            duration: 1.2,

            onComplete: onComplete,
        }
    );
}

function projectsAnimateIn() {
    // ensure that interactions do not occur until after animations are complete
    const projectBOXArr = document.querySelectorAll(".project-box");

    projectBOXArr.forEach((item, index) => {
        item.style.pointerEvents = "none";
    });

    navLinks.forEach((item, index) => {
        item.style.pointerEvents = "none";
    });

    gsap.fromTo(
        ".project-box",
        { opacity: 0, marginRight: 5 },
        {
            opacity: 1,
            stagger: 0.03,
            delay: 0.3,
            duration: 0.8,

            onComplete: () => {
                projectBOXArr.forEach((item, index) => {
                    item.style.pointerEvents = "auto";
                });
                navLinks.forEach((item, index) => {
                    item.style.pointerEvents = "auto";
                });
            },
        }
    );
}

function projectsAnimateOut(onComplete = null) {
    gsap.fromTo(
        ".project-box",
        { opacity: 1, marginRight: 5 },
        {
            marginRight: 20,
            opacity: 0,
            stagger: 0,
            delay: 0,
            duration: 0.5,

            onComplete: onComplete,
        }
    );
}

function showContent(id, onComplete = null) {
    // make every content container (about, projects, etc.) display none
    contentContainers.forEach((content) => {
        content.style.display = "none";
    });

    // make last page hide

    console.log("Showing content: " + id);

    // // show content
    const content = document.getElementById(id + "-content");
    if (content) {
        content.style.display = "block";
    }

    if (id === "home") {
        console.log("Currently home.");

        heroContainer.style.display = "flex";
        contentContainer.style.display = "none";
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";

        titleAnimateIn();
        linksAnimateIn(0.6, onComplete);
    } else {
        console.log("Not home.");

        heroContainer.style.display = "none";
        contentContainer.style.display = "block";

        linksAnimateIn(0, onComplete);

        if (id === "projects") {
            scrollTween.scrollTrigger.refresh();

            projectsContent.style.display = "block";

            document.body.style.overflow = "visible";
            document.body.style.overflowX = "hidden";
            document.documentElement.style.overflow = "visible";

            projectsAnimateIn();
        } else if (id === "gallery") {
            projectsContent.style.display = "none";

            document.body.style.overflow = "visible";
            document.documentElement.style.overflow = "visible";

            animateIn();

            console.log("Done animate for gallery.");
        } else if (id === "resume" || id === "about") {
            projectsContent.style.display = "none";

            document.body.style.overflow = "visible";
            document.documentElement.style.overflow = "visible";

            animateIn();
        }
    }
}

// Handle navigation link clicks
navLinks.forEach((navLink) => {
    const id = navLink.id.replace(/-button$/, "");

    navLink.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent the default link behavior (full page refresh)

        console.log(`Nav button pressed: ${id}`);

        //     if (id == "home") {
        //         projectsAnimateOut();
        //         linksAnimateOut(0, () => {
        //             showContent(id);

        //             lastPage = "home";
        //             console.log(`New push state: ${id}`);
        //             history.pushState({ page: id }, "", `/`);
        //         });
        //     } else {
        //         titleAnimateOut();
        //         linksAnimateOut(0, () => {
        //             showContent(id);

        //             lastPage = id;
        //             console.log(`New push state: ${id}`);
        //             history.pushState({ page: id }, "", `/${id}`);
        //         });
        //     }
        // });

        // delete below
        // state.page is id

        console.log("----------------");
        console.log(
            `Navlink called: animationDone: ${aniDone}, Last complete load: ${lastPage}, New page called: ${id}, target: ${targetPage}`
        );

        if (aniDone == true) {
            console.log("Animation is done, checking for changed state");

            aniDone = false;

            console.log(`New target state: ${id}`);
            targetPage = id;

            if (id) {
                // different page called and animation done
                if (lastPage != id) {
                    console.log(`Old page: ${lastPage} ; New page: ${id}`);

                    if (id == "home") {
                        projectsAnimateOut();
                        animateOut();
                        linksAnimateOut(0, () => {
                            showContent(id, () => {
                                console.log(
                                    `Animation done. New last loaded page: ${lastPage}.`
                                );
                                aniDone = true;
                                lastPage = id;

                                console.log(`New push state: ${id}`);
                                history.pushState({ page: id }, "", `/`);
                            });
                        });
                    } else {
                        titleAnimateOut();
                        linksAnimateOut(0, () => {
                            showContent(id, () => {
                                console.log(
                                    `Animation done. New last loaded page: ${lastPage}.`
                                );
                                aniDone = true;
                                lastPage = id;

                                console.log(`New push state: ${id}`);
                                history.pushState({ page: id }, "", `/${id}`);
                            });
                        });
                    }
                } else {
                    console.log("Page not changing, no animation to wait for");
                    aniDone = true;
                }
            }
        } else {
            console.log("Animation is not done, continuing to target state");
            console.log(
                `Last loaded page: ${lastPage}, new page called: ${id}, target: ${targetPage}`
            );
            if (targetPage == "home") {
                history.pushState({ page: targetPage }, "", `/`);
            } else {
                history.pushState({ page: targetPage }, "", `/${targetPage}`);
            }
        }
    });
});

window.addEventListener("popstate", (event) => {
    console.log("----------------");
    console.log(
        `Pop called: animationDone: ${aniDone}, Last complete load: ${lastPage}, New page called: ${event.state.page}, target: ${targetPage}`
    );

    const state = event.state;
    if (aniDone == true) {
        console.log("Animation is done, checking for changed state");

        aniDone = false;

        console.log(`New target state: ${state.page}`);
        targetPage = state.page;

        if (state && state.page) {
            // different page called and animation done
            if (lastPage != state.page) {
                console.log(`Old page: ${lastPage} ; New page: ${state.page}`);

                if (state.page == "home") {
                    projectsAnimateOut();
                    animateOut();
                    linksAnimateOut(0, () => {
                        showContent(state.page, () => {
                            console.log(
                                `Animation done. New last loaded page: ${lastPage}.`
                            );
                            aniDone = true;
                            lastPage = state.page;
                        });
                    });
                } else {
                    titleAnimateOut();
                    linksAnimateOut(0, () => {
                        showContent(state.page, () => {
                            console.log(
                                `Animation done. New last loaded page: ${lastPage}.`
                            );
                            aniDone = true;
                            lastPage = state.page;
                        });
                    });
                }
            } else {
                console.log("Page not changing, no animation to wait for");
                aniDone = true;
            }
        }
    } else {
        console.log("Animation is not done, continuing to target state");
        console.log(
            `Last loaded page: ${lastPage}, new page called: ${state.page}, target: ${targetPage}`
        );
        if (targetPage == "home") {
            history.pushState({ page: targetPage }, "", `/`);
        } else {
            history.pushState({ page: targetPage }, "", `/${targetPage}`);
        }
    }
});

// Check the URL on initial page load and display the corresponding content
window.addEventListener("DOMContentLoaded", () => {
    const path = window.location.pathname.substring(1); // Remove the leading slash
    if (path) {
        // history.pushState({ page: "home" }, "", `/`);
        showContent(path);
    }
});
