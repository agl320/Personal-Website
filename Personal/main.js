import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

var hasTouchScreen = false;

if ("maxTouchPoints" in navigator) {
    hasTouchScreen = navigator.maxTouchPoints > 0;
} else if ("msMaxTouchPoints" in navigator) {
    hasTouchScreen = navigator.msMaxTouchPoints > 0;
} else {
    var mQ = window.matchMedia && matchMedia("(pointer:coarse)");
    if (mQ && mQ.media === "(pointer:coarse)") {
        hasTouchScreen = !!mQ.matches;
    } else if ("orientation" in window) {
        hasTouchScreen = true; // deprecated, but good fallback
    } else {
        // Only as a last resort, fall back to user agent sniffing
        var UA = navigator.userAgent;
        hasTouchScreen =
            /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
            /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA);
    }
}

if (hasTouchScreen) {
    const heroContainer = document.getElementById("hero");
    const contentContainer = document.getElementById("content-container");
    const altViewContainer = document.getElementById("alt-view");

    heroContainer.style.display = "none";
    contentContainer.style.display = "none";
    altViewContainer.style.display = "block";
} else {
    const lenis = new Lenis({ duration: 1 });

    // lenis.on("scroll", (e) => {
    //     console.log(e);
    // });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    gsap.registerPlugin(ScrollTrigger);

    // RESUME TEXT FLICKER

    let flickerFast = null;
    let flickerSlow = null;

    function fastFlicker() {
        flickerFast = document.querySelectorAll(".flicker-fast");

        const flickerOn = (index) => {
            if (flickerFast) {
                flickerFast[index].style.opacity = 1;
                setTimeout(
                    () => flickerOff(index),
                    Math.floor(Math.random() * 1000)
                );
            }
        };

        const flickerOff = (index) => {
            if (flickerFast) {
                flickerFast[index].style.opacity = 0.2;
                setTimeout(
                    () => flickerOn(index),
                    Math.floor(Math.random() * 500)
                );
            }
        };

        flickerFast.forEach((item, index) => {
            flickerOn(index);
        });
    }

    function slowFlicker() {
        flickerSlow = document.querySelectorAll(".flicker-slow");

        const flickerOn = (index) => {
            if (flickerSlow) {
                flickerSlow[index].style.opacity = 1;
                setTimeout(
                    () => flickerOff(index),
                    Math.floor(Math.random() * 10000)
                );
            }
        };

        const flickerOff = (index) => {
            if (flickerSlow) {
                flickerSlow[index].style.opacity = 0.2;
                setTimeout(
                    () => flickerOn(index),
                    Math.floor(Math.random() * 500)
                );
            }
        };

        flickerSlow.forEach((item, index) => {
            flickerOn(index);
        });
    }

    function stopFlicker() {
        flickerFast = null;
        flickerSlow = null;
    }

    // RESUME TEXT BOX

    const rowLength = 25;
    const colLength = 20;

    const blankRow = ".".repeat(rowLength * colLength);
    let blankChars = blankRow.split("");

    const text =
        "I must not fear. Fear is the mind-killer. Fear is the little-death that brings total obliteration. I will face my fear. I will permit it to pass over me and through me.";

    const text2 = "serpere deinceps, noli haesitare, ut scolopendra";

    const text3 =
        "Even if it didn't end well, all the good times made it a little better";

    const text4 =
        "And God, please let the deer on the highway get some kind of heaven. Something with tall soft grass and sweet reunion. Let the moths in porch lights go some place with a thousand suns, that taste like sugar and get swallowed whole. May the mice in oil and glue have forever dry, warm fur and full bellies. If I am killed for simply living, let death be kinder than man.";

    const text5 =
        "I love you because it’s been so good for so long that if I didn’t love you I’d have to be born again and that is not a theological statement, I am pitiful in my love for you";

    const text6 =
        "You don’t know the value of a moment, until it becomes a memory.";

    // randomly pick starting text
    const textArr = [text, text2, text3, text4, text5, text6];

    function pickRandomText() {
        const randomIndex = Math.floor(Math.random() * textArr.length);
        let targetText = textArr[randomIndex];
        return targetText;
    }

    function replaceText(text) {
        const resumeCenter = document.getElementById("resume-center");
        resumeCenter.innerHTML = "";

        const textChars = text.split("");
        const textWords = text.split(" ");
        const textLengthNoSpace = textWords.join("").length;

        // //console.log(`Blank row length: ${blankRow.length}`);
        // //console.log(`Text length: ${text.length}`);
        // //console.log(`Text length no space: ${textLengthNoSpace}`);

        const blankSpace = blankRow.length - textLengthNoSpace;
        const spaceBetween = Math.floor(blankSpace / (textWords.length - 1));

        // //console.log(`Total space: ${blankSpace}`);
        // //console.log(`Words: ${text.split(" ").length}`);
        // //console.log(`Space between words: ${spaceBetween}`);

        // index for textChars
        let j = 0;
        let spaceCount = 0;
        let wordComplete = false;
        for (let i = 0; i < blankRow.length; i++) {
            if (wordComplete == false) {
                // //console.log("[>] Word not completed");
                if (j >= textChars.length || textChars[j] == " ") {
                    // //console.log("\tSpace found; word done");

                    blankChars[i] = ".";
                    wordComplete = true;
                    spaceCount += 1;
                } else {
                    // //console.log("\tNo space found");
                    // //console.log(`\tReplacing with ${textChars[j]}`);

                    blankChars[i] = textChars[j];
                    j += 1;
                }
            } else {
                // //console.log("[>] Word completed");

                blankChars[i] = ".";
                // //console.log(`Difference in index: ${i - j + 1}`);
                if (spaceCount + 1 >= spaceBetween) {
                    // //console.log("\tSpace completely filled");
                    spaceCount = 0;
                    wordComplete = false;
                    j += 1;
                } else {
                    spaceCount += 1;
                    // //console.log("\tMore space to fill");
                }
            }
        }

        let finalArr = [];

        let start = 0;
        for (let i = 0; i < blankChars.length + 1; i++) {
            if (i - start >= colLength) {
                finalArr.push(blankChars.slice(start, i));
                start = i;
            }
        }

        // const resumeCenter = document.getElementById("resume-center");
        finalArr.forEach((item, index) => {
            const resumeRow = document.createElement("div");
            resumeRow.className = "resume-row";

            const p = document.createElement("p");
            p.textContent = item.join("");

            resumeRow.append(p);
            resumeCenter.append(resumeRow);
        });
    }

    function iterateToPeriods(text) {
        let textTmp = text;

        function replaceCharacter() {
            if (
                document.getElementById("resume-content").style.display !=
                "none"
            ) {
                // Check if all periods are present
                if (!allPeriods(textTmp)) {
                    const randomIndex = Math.floor(
                        Math.random() * textTmp.length
                    );
                    textTmp =
                        textTmp.substring(0, randomIndex) +
                        "." +
                        textTmp.substring(randomIndex + 1);

                    replaceText(textTmp);

                    // Set a 2-second timeout before the next character replacement
                    setTimeout(replaceCharacter, 50);
                } else {
                    setTimeout(iterateToString(pickRandomText()), 50);
                }
            }
        }
        replaceCharacter();
    }

    function allPeriods(text) {
        for (let i = 0; i < text.length; i++) {
            if (text.charAt(i) != ".") {
                return false;
            }
        }
        return true;
    }

    function containsPeriod(text) {
        for (let i = 0; i < text.length; i++) {
            if (text.charAt(i) == ".") {
                return true;
            }
        }
        return false;
    }

    // iterateToPeriods(text);

    function iterateToString(text) {
        let textTmp = text;
        let periodString = ".".repeat(text.length);
        function replaceCharacter() {
            if (
                document.getElementById("resume-content").style.display !=
                "none"
            ) {
                if (containsPeriod(periodString)) {
                    const indexRandom = Math.floor(
                        Math.random() * textTmp.length
                    );
                    const randomChar = textTmp[indexRandom];

                    periodString =
                        periodString.substring(0, indexRandom) +
                        randomChar +
                        periodString.substring(indexRandom + 1);

                    replaceText(periodString);
                    setTimeout(replaceCharacter, 50);
                } else {
                    setTimeout(iterateToPeriods(text), 50);
                }
            }
        }
        replaceCharacter();
    }

    // projects and other

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

    const pWrapArr = document.querySelectorAll(".p-wrap");
    const imgArr = document.querySelectorAll(".img-wrap img");

    const resumeMainWrap = document.getElementById("resume-vert-center");

    // about container
    const aboutAnimateArr = document.querySelectorAll(".about-animate");

    const projectBOXArr = document.querySelectorAll(".project-box");

    const projectBorder = document.getElementById("projects-border-wrap");
    const galleryBorderArr = document.querySelectorAll(".gallery-border");

    // exit animations

    // gsap.registerPlugin(CustomEase);

    // initial values
    let aniDone = true;
    let lastPage = "home";
    let targetPage = "home";

    function aboutAnimateIn(onComplete = null) {
        gsap.fromTo(
            aboutAnimateArr,
            { opacity: 0 },
            { opacity: 1, delay: 0.3, stagger: -0.1, duration: 0.7 }
        );
    }

    function aboutAnimateOut(onComplete = null) {
        aboutAnimateArr.forEach((item, index) => {
            gsap.fromTo(
                item,
                { opacity: item.style.opacity },
                {
                    opacity: 0,
                    delay: 0.3,

                    duration: 0.4,
                }
            );
        });
    }

    function resumeAnimateIn(onComplete = null) {
        //console.log("[<>] RESUME");

        gsap.fromTo(
            resumeMainWrap,
            { opacity: 0 },
            {
                duration: 1,
                opacity: 1,
                onComplete: () => {
                    fastFlicker();
                    slowFlicker();
                    //console.log("[</>] RESUME");
                },
            }
        );
    }

    function resumeAnimateOut(onComplete = null) {
        //console.log("[</>] RESUME");

        gsap.fromTo(
            resumeMainWrap,
            { opacity: 1 },
            {
                duration: 0.4,
                opacity: 0,
                onComplete: () => {
                    //console.log("[ X ] RESUME");
                    if (onComplete) {
                        onComplete();
                    }
                },
            }
        );
    }

    function galleryAnimateOut(onComplete = null) {
        //console.log("[</>] GALLERY");

        gsap.fromTo(
            galleryBorderArr,
            { opacity: 1 },
            {
                duration: 0.5,
                opacity: 0,
            }
        );

        pWrapArr.forEach((item, index) => {
            gsap.fromTo(
                item,
                { opacity: item.style.opacity },
                {
                    duration: 0.5,
                    opacity: 0,
                }
            );
        });

        imgArr.forEach((item, index) => {
            gsap.fromTo(
                item,
                { opacity: item.style.opacity },
                {
                    duration: 0.5,
                    opacity: 0,
                }
            );
        });

        if (onComplete) {
            onComplete();
        }
    }

    function galleryAnimateIn(onComplete = null) {
        //console.log("[<>] GALLERY");

        // navLinks.forEach((item, index) => {
        //     item.style.pointerEvents = "none";
        // });

        gsap.fromTo(
            galleryBorderArr,
            { opacity: 0 },
            {
                delay: 0.8,
                duration: 0.8,
                opacity: 1,
            }
        );

        gsap.fromTo(
            pWrapArr,
            { opacity: 0 },
            {
                duration: 0.5,
                stagger: 0.1,
                opacity: 1,
                delay: 0.8,
                onComplete: () => {
                    // navLinks.forEach((item, index) => {
                    //     item.style.pointerEvents = "auto";
                    // });
                    //console.log("[</>] GALLERY");
                },
            }
        );

        gsap.fromTo(
            imgArr,
            { opacity: 0 },
            {
                duration: 0.4,
                stagger: 0.1,
                opacity: 1,
                delay: 0.8,

                onComplete: onComplete,
            }
        );
    }

    function titleAnimateIn(delay = 0) {
        //console.log("[<>] TITLE");

        // font titleHeight = 93 (from bottom to top of text)
        // font-size: 125px;
        // line-height: 110px; (actual line height for clipping)

        // two options
        // - calculate font height, etc. dynamically
        // - provide various preset heights

        // const titleHeight = "7.5vw";
        // const halfTitleHeight = "5vw";

        const titleHeight = "5.2vw";
        const halfTitleHeight = "2.5vw";

        gsap.fromTo(
            ".title-animation",
            { y: titleHeight },
            {
                delay: delay,
                y: 0,
                duration: 2,
                stagger: 0,
                ease: "expo.inOut",
            }
        );

        gsap.fromTo(
            "#title",
            { y: `-${halfTitleHeight}` },
            {
                delay: delay,
                y: 0,
                duration: 2,
                ease: "expo.inOut",
                onComplete: () => {
                    //console.log("[</>] TITLE");
                },
            }
        );
    }

    function titleAnimateOut() {
        //console.log("[</>] TITLE");

        // account for gap at top of font
        const titleHeight = "7vw";
        const halfTitleHeight = "2vw";

        gsap.fromTo(
            ".title-animation",
            { y: 0 },
            {
                delay: 0,
                y: `-${titleHeight}`,
                duration: 0.5,
            }
        );
        gsap.fromTo(
            "#title",
            { y: 0 },
            {
                delay: 0,
                y: halfTitleHeight,
                duration: 0.5,
                onComplete: () => {
                    //console.log("[ X ] TITLE");
                },
            }
        );
    }

    const animations = [];

    function linksAnimateIn(delay = 0, onComplete = null) {
        animations.forEach((animation) => animation.kill());

        navLinks.forEach((item, index) => {
            item.style.pointerEvents = "none";
        });

        //console.log("[<>] LINKS");

        // STILL NEED TO ADD ANIMATE OF OUTER DIV IN OPPOSITE DIRECTION
        // button-animation-delay allows for separating if needed later
        const animation = gsap.fromTo(
            [".button-animation", ".button-animation-delay"],
            { y: 16 },
            {
                stagger: 0.1,
                delay: delay,
                y: 0,
                duration: 0.7,
                ease: "power3.out",
                onComplete: () => {},
            }
        );

        //console.log("[</>] LINKS");
        navLinks.forEach((item, index) => {
            item.style.pointerEvents = "auto";
        });
        if (onComplete) {
            onComplete();
        }

        animations.push(animation);
    }

    function linksAnimateOut(delay = 0, onComplete = null) {
        //console.log("[</>] LINKS");
        gsap.fromTo(
            [".button-animation", ".button-animation-delay"],
            { y: 0 },
            {
                stagger: 0,
                delay: delay,
                y: -20,
                duration: 0.5,

                onComplete: () => {
                    //console.log("[ X ] LINKS");
                    if (onComplete) {
                        onComplete();
                    }
                },
            }
        );
    }

    function projectsAnimateIn() {
        //console.log("[<>] PROJECTS");

        // projectBOXArr.forEach((item, index) => {
        //     item.style.pointerEvents = "none";
        // });

        // navLinks.forEach((item, index) => {
        //     item.style.pointerEvents = "none";
        // });

        gsap.fromTo(
            projectBorder,
            { opacity: 0 },
            { opacity: 1, delay: 0.3, duration: 0.8 }
        );

        gsap.fromTo(
            projectBOXArr,
            { opacity: 0, marginRight: 5 },
            {
                opacity: 1,
                stagger: 0.1,
                delay: 0.3,
                duration: 0.8,
            }
        );
    }

    function projectsAnimateOut(onComplete = null) {
        //console.log("[</>] PROJECTS");

        gsap.fromTo(
            projectBorder,
            { opacity: 1 },
            { opacity: 0, duration: 0.5 }
        );

        gsap.fromTo(
            projectBOXArr,
            { opacity: 1, marginRight: 5 },
            {
                marginRight: 20,
                opacity: 0,
                stagger: 0,
                delay: 0,
                duration: 0.5,

                onComplete: () => {
                    //console.log("[ X ] PROJECTS");
                    if (onComplete) {
                        onComplete();
                    }
                },
            }
        );
    }

    function showContent(id, onComplete = null) {
        // make every content container (about, projects, etc.) display none
        contentContainers.forEach((content) => {
            content.style.display = "none";
        });

        // make last page hide

        //console.log("[URL] " + id);

        // // show content
        const content = document.getElementById(id + "-content");
        if (content) {
            content.style.display = "block";
        }

        if (id === "home") {
            // //console.log("Currently home.");

            heroContainer.style.display = "flex";
            contentContainer.style.display = "none";
            document.body.style.overflow = "hidden";
            document.documentElement.style.overflow = "hidden";

            titleAnimateIn();
            linksAnimateIn(0.7, onComplete);
        } else {
            // //console.log("Not home.");

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

                galleryAnimateIn();

                //console.log("Done animate for gallery.");
            } else if (id === "about") {
                aboutAnimateIn();

                projectsContent.style.display = "none";

                document.body.style.overflow = "visible";
                document.documentElement.style.overflow = "visible";

                // galleryAnimateIn();
            } else if (id === "resume") {
                resumeAnimateIn();
                iterateToString(pickRandomText());
                projectsContent.style.display = "none";

                document.body.style.overflow = "visible";
                document.documentElement.style.overflow = "visible";
            }
        }
    }

    // Handle navigation link clicks
    navLinks.forEach((navLink) => {
        const id = navLink.id.replace(/-button$/, "");

        navLink.addEventListener("click", (event) => {
            event.preventDefault(); // Prevent the default link behavior (full page refresh)

            // //console.log(`Nav button pressed: ${id}`);

            // //console.log("----------------");
            // //console.log(
            //     `Navlink called: animationDone: ${aniDone}, Last complete load: ${lastPage}, New page called: ${id}, target: ${targetPage}`
            // );

            if (aniDone == true) {
                // //console.log("Animation is done, checking for changed state");

                aniDone = false;

                // //console.log(`New target state: ${id}`);
                targetPage = id;

                if (id) {
                    // different page called and animation done
                    if (lastPage != id) {
                        // //console.log(`Old page: ${lastPage} ; New page: ${id}`);

                        if (id == "home") {
                            if (lastPage == "projects") {
                                projectsAnimateOut();
                            } else if (lastPage == "gallery") {
                                galleryAnimateOut();
                            } else if (lastPage == "resume") {
                                resumeAnimateOut(() => {
                                    stopFlicker();
                                });
                            } else if (lastPage == "about") {
                                aboutAnimateOut();
                            }

                            linksAnimateOut(0, () => {
                                showContent(id, () => {
                                    // //console.log(
                                    //     `Animation done. New last loaded page: ${lastPage}.`
                                    // );
                                    aniDone = true;
                                    lastPage = id;

                                    // //console.log(`New push state: ${id}`);
                                    history.pushState({ page: id }, "", `/`);
                                });
                            });
                        } else {
                            titleAnimateOut();
                            linksAnimateOut(0, () => {
                                showContent(id, () => {
                                    // //console.log(
                                    //     `Animation done. New last loaded page: ${lastPage}.`
                                    // );
                                    aniDone = true;
                                    lastPage = id;

                                    // //console.log(`New push state: ${id}`);
                                    history.pushState(
                                        { page: id },
                                        "",
                                        `/${id}`
                                    );
                                });
                            });
                        }
                    } else {
                        // //console.log("Page not changing, no animation to wait for");
                        aniDone = true;
                    }
                }
            } else {
                // //console.log("Animation is not done, continuing to target state");
                // //console.log(
                //     `Last loaded page: ${lastPage}, new page called: ${id}, target: ${targetPage}`
                // );
                if (targetPage == "home") {
                    history.pushState({ page: targetPage }, "", `/`);
                } else {
                    history.pushState(
                        { page: targetPage },
                        "",
                        `/${targetPage}`
                    );
                }
            }
        });
    });

    window.addEventListener("popstate", (event) => {
        // //console.log("----------------");
        // //console.log(
        //     `Pop called: animationDone: ${aniDone}, Last complete load: ${lastPage}, New page called: ${event.state.page}, target: ${targetPage}`
        // );

        const state = event.state;
        if (aniDone == true) {
            // //console.log("Animation is done, checking for changed state");

            aniDone = false;

            // //console.log(`New target state: ${state.page}`);
            targetPage = state.page;

            if (state && state.page) {
                // different page called and animation done
                if (lastPage != state.page) {
                    // //console.log(`Old page: ${lastPage} ; New page: ${state.page}`);

                    if (state.page == "home") {
                        if (lastPage == "projects") {
                            projectsAnimateOut();
                        } else if (lastPage == "gallery") {
                            galleryAnimateOut();
                        } else if (lastPage == "resume") {
                            resumeAnimateOut(() => {
                                stopFlicker();
                            });
                        }
                        linksAnimateOut(0, () => {
                            showContent(state.page, () => {
                                // //console.log(
                                //     `Animation done. New last loaded page: ${lastPage}.`
                                // );
                                aniDone = true;
                                lastPage = state.page;
                            });
                        });
                    } else {
                        titleAnimateOut();
                        linksAnimateOut(0, () => {
                            showContent(state.page, () => {
                                // //console.log(
                                //     `Animation done. New last loaded page: ${lastPage}.`
                                // );
                                aniDone = true;
                                lastPage = state.page;
                            });
                        });
                    }
                } else {
                    // //console.log("Page not changing, no animation to wait for");
                    aniDone = true;
                }
            }
        } else {
            // //console.log("Animation is not done, continuing to target state");
            // //console.log(
            //     `Last loaded page: ${lastPage}, new page called: ${state.page}, target: ${targetPage}`
            // );
            if (targetPage == "home") {
                history.pushState({ page: targetPage }, "", `/`);
            } else {
                history.pushState({ page: targetPage }, "", `/${targetPage}`);
            }
        }
    });

    // Check the URL on initial page load and display the corresponding content
    window.addEventListener("DOMContentLoaded", () => {
        // const path = window.location.pathname.substring(1); // Remove the leading slash

        history.pushState({ page: "home" }, "", `/`);
        showContent("home");
    });
}
