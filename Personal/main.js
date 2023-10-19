import gsap from "gsap";

// .content is individual contents
const contentContainers = document.querySelectorAll(".content");
// #content-container is all contents together
const contentContainer = document.getElementById("content-container");
const heroContainer = document.getElementById("hero");
const navLinks = document.querySelectorAll("p");

gsap.registerPlugin(CustomEase);

function titleAnimateIn() {
    gsap.fromTo(
        ".title-animation",
        { y: 150 },
        {
            delay: 0.3,
            y: 0,
            duration: 1.2,
            ease: CustomEase.create(
                "custom",
                "M0,0 C0.054,0.376 0.034,0.293 0.121,0.527 0.153,0.614 0.187,0.724 0.297,0.815 0.492,0.906 0.881,1 1,1 "
            ),
        }
    );

    gsap.fromTo(
        "#title",
        { y: -100 },
        {
            delay: 0.3,
            y: 0,
            duration: 1.2,
            ease: CustomEase.create(
                "custom",
                "M0,0 C0.054,0.376 0.034,0.293 0.121,0.527 0.153,0.614 0.187,0.724 0.297,0.815 0.492,0.906 0.881,1 1,1 "
            ),
        }
    );
}

function linksAnimateIn() {
    // STILL NEED TO ADD ANIMATE OF OUTER DIV IN OPPOSITE DIRECTION
    gsap.fromTo(
        [".button-animation", ".button-animation-delay"],
        { y: 50 },
        {
            stagger: 0.1,
            delay: 0.6,
            y: 0,
            duration: 1.2,
            ease: CustomEase.create(
                "custom",
                "M0,0 C0.054,0.376 0.034,0.293 0.121,0.527 0.153,0.614 0.187,0.724 0.297,0.815 0.492,0.906 0.881,1 1,1 "
            ),
        }
    );

    // gsap.fromTo(
    //     ".button-animation-delay",
    //     { y: 50 },
    //     {
    //         stagger: 0.1,
    //         delay: 1,
    //         y: 0,
    //         duration: 1.2,
    //         ease: CustomEase.create(
    //             "custom",
    //             "M0,0 C0.054,0.376 0.034,0.293 0.121,0.527 0.153,0.614 0.187,0.724 0.297,0.815 0.492,0.906 0.881,1 1,1 "
    //         ),
    //     }
    // );
}

function showContent(id) {
    // make every content container (about, projects, etc.) display none
    contentContainers.forEach((content) => {
        content.style.display = "none";
    });

    // make last page hide

    console.log("ID: " + id);

    // STILL NEED TO DIFFERENTIATE WITHIN EACH PAGE SO PAGES LIKE ABOUT DO NOT SCROLL (OVERFLOW)
    if (id === "home") {
        heroContainer.style.display = "flex";
        contentContainer.style.display = "none";
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";

        titleAnimateIn();
        linksAnimateIn();
    } else {
        // hide hero
        heroContainer.style.display = "none";
        // show content and ensure scroll
        contentContainer.style.display = "block";

        // animation in for BACK BUTTON
        gsap.fromTo(
            ".button-animation",
            { y: 30 },
            {
                stagger: 0.1,
                delay: 0,
                y: 0,
                duration: 1.2,
                ease: CustomEase.create(
                    "custom",
                    "M0,0 C0.054,0.376 0.034,0.293 0.121,0.527 0.153,0.614 0.187,0.724 0.297,0.815 0.492,0.906 0.881,1 1,1 "
                ),
            }
        );

        //check which page, play animations depending on page
        // use if statement below
        if (id === "projects") {
            // allow scroll for projects
            document.body.style.overflow = "visible";
            document.documentElement.style.overflow = "visible";

            // gsap.fromTo(
            //     ".project-box",
            //     { x: 1300 },
            //     {
            //         stagger: 0.1,
            //         delay: 0.3,
            //         x: 0,
            //         duration: 3,
            //         ease: "ease.out",
            //     }
            // );
            gsap.fromTo(
                ".project-box",
                { opacity: 0, marginRight: 5 },
                {
                    opacity: 1,
                    stagger: 0.02,
                    delay: 0.3,
                    duration: 0.8,
                    ease: "power2.out",
                }
            );

            // gsap.fromTo(
            //     ".project-main",
            //     { scaleX: 0.5 },
            //     {
            //         margin
            //         scaleX: 1,
            //         // stagger: 0.1,
            //         delay: 0,
            //         duration: 0.8,
            //         ease: "ease.out",
            //     }
            // );
        }
    }

    // // show content
    const content = document.getElementById(id + "-content");
    if (content) {
        content.style.display = "block";
    }
}

// Handle navigation link clicks
navLinks.forEach((navLink) => {
    const id = navLink.id.replace(/-button$/, "");
    console.log(id);

    navLink.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent the default link behavior (full page refresh)

        if (id == "home") {
            // exit animation -------------------------------- to home ----------
            // BACK BUTTON ANIMATION

            // CHECK IF PROJECTS IS VISIBLE, THEN MAKE IT ANIMATE AWAY
            // ELSE, SKIP TO SAVE TIME
            gsap.fromTo(
                ".project-box",
                { opacity: 1, marginRight: 5 },
                {
                    marginRight: 20,
                    opacity: 0,
                    stagger: 0,
                    delay: 0,
                    duration: 0.5,
                    ease: "power2.out",
                }
            );
            gsap.fromTo(
                [".button-animation"],
                { y: 0 },
                {
                    stagger: 0,
                    delay: 0,
                    y: -30,
                    duration: 1.2,
                    ease: CustomEase.create(
                        "custom",
                        "M0,0 C0.054,0.376 0.034,0.293 0.121,0.527 0.153,0.614 0.187,0.724 0.297,0.815 0.492,0.906 0.881,1 1,1 "
                    ),
                    onComplete: () => {
                        showContent(id);
                        history.pushState({ page: id }, "", `/`);
                    },
                }
            );
        } else {
            // exit animation -------------------------------- to other page ----------
            //animation out for title
            gsap.fromTo(
                ".title-animation",
                { y: 0 },
                {
                    delay: 0,
                    y: -150,
                    duration: 1.2,
                    ease: CustomEase.create(
                        "custom",
                        "M0,0 C0.054,0.376 0.034,0.293 0.121,0.527 0.153,0.614 0.187,0.724 0.297,0.815 0.492,0.906 0.881,1 1,1 "
                    ),
                }
            );
            gsap.fromTo(
                "#title",
                { y: 0 },
                {
                    delay: 0,
                    y: 100,
                    duration: 1.2,
                    ease: CustomEase.create(
                        "custom",
                        "M0,0 C0.054,0.376 0.034,0.293 0.121,0.527 0.153,0.614 0.187,0.724 0.297,0.815 0.492,0.906 0.881,1 1,1 "
                    ),
                }
            );

            // animation out for links/buttons on right side

            // animation out for links/buttons to other pages
            gsap.fromTo(
                [".button-animation", ".button-animation-delay"],
                { y: 0 },
                {
                    stagger: 0,
                    delay: 0,
                    y: -30,
                    duration: 1.2,
                    ease: CustomEase.create(
                        "custom",
                        "M0,0 C0.054,0.376 0.034,0.293 0.121,0.527 0.153,0.614 0.187,0.724 0.297,0.815 0.492,0.906 0.881,1 1,1 "
                    ),
                    onComplete: () => {
                        // const id = event.target.getAttribute('href').substring(1); // Get the link's target ID
                        showContent(id);

                        // Update the URL using the History API
                        history.pushState({ page: id }, "", `/${id}`);
                    },
                }
            );
        }
    });
});

// Handle the popstate event to update content when back/forward buttons are used
window.addEventListener("popstate", (event) => {
    const state = event.state;
    if (state && state.page) {
        // PLAY EXIT ANIMATIONS HERE
        showContent(state.page);
    }
});

// Check the URL on initial page load and display the corresponding content
window.addEventListener("DOMContentLoaded", () => {
    const path = window.location.pathname.substring(1); // Remove the leading slash
    if (path) {
        showContent(path);
    }
});
