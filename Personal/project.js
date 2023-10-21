const projectIMGarr = document.querySelectorAll(".project-img");
const projectBOXarr = document.querySelectorAll(".project-box");
const projectINFOarr = document.querySelectorAll(".project-info");
const projectContainer = document.getElementById("project-main");

const projectBACK = document.getElementsByClassName(
    "button-animation navlink project-back"
)[0];

import Baffle from "baffle";

// give all titles animations on entry
const allTitles = document.querySelectorAll(".project-title");

let b = Baffle(allTitles, {
    characters: "█▓░▒▓ !@#$%^&*()_-+=[]{}|;:,.<>?",
});

import gsap from "gsap";

projectBOXarr.forEach((projectBOX, index) => {
    projectBOX.setAttribute("id", `key-${index}`);

    let focus = false;
    projectBOX.addEventListener("click", (event) => {
        event.preventDefault();

        if (focus == false) {
            focus = true;
            console.log("Focusing on image now!");

            projectBACK.style.userSelect = "none";

            gsap.fromTo(
                projectBACK,
                { opacity: 1 },
                {
                    stagger: 0,
                    delay: 0,
                    // y: -30,
                    opacity: 0,
                    // duration: 1.2,
                    // ease: CustomEase.create(
                    //     "custom",
                    //     "M0,0 C0.054,0.376 0.034,0.293 0.121,0.527 0.153,0.614 0.187,0.724 0.297,0.815 0.492,0.906 0.881,1 1,1 "
                    // ),
                    onComplete: () => {
                        projectBACK.style.display = "none";
                    },
                }
            );

            // gsap.fromTo(`#key-${index}`, { opacity: 1 }, { opacity: 1 });

            // FOR EACH project box, if not pressed, make invisible
            // else do animation -> invisible + scale
            // ANIMATE OUT
            projectBOXarr.forEach((projectBOX, index2) => {
                if (index != index2) {
                    // make not clickable
                    // overlay div?
                    gsap.fromTo(
                        `#key-${index2}`,
                        { opacity: 1 },
                        {
                            opacity: 0,
                            onComplete: () => {
                                projectBOX.style.display = "none";
                                // project wrapper container must center
                                projectContainer.style.left = "50%";
                                projectContainer.style.top = "50%";

                                // projectContainer.style.marginLeft = "0%";
                            },
                        }
                    );
                } else {
                    // ANIMATE OUT AND THEN ANIMATE IN THE FOCUSED PROJECT
                    gsap.fromTo(
                        `#key-${index2}`,
                        { opacity: 1, scaleY: 1 },
                        {
                            scaleY: 1.1,
                            opacity: 0,
                            ease: "ease.in",
                            onComplete: () => {
                                b.start();

                                gsap.fromTo(
                                    `#key-${index2}`,
                                    { opacity: 0, scaleY: 3, scaleX: 3 },
                                    {
                                        duration: 0.3,
                                        delay: 0.2,
                                        opacity: 1,
                                        scaleY: 3,
                                        scaleX: 3,
                                        onComplete: () => {
                                            b.reveal(1000, 1000);
                                        },
                                    }
                                );

                                // display projectINFO
                                projectINFOarr[index2 - 1].style.display =
                                    "block";

                                console.log(projectINFOarr[index2 - 1]);
                            },
                        }
                    );
                }
            });

            document.body.style.overflow = "hidden";
            document.documentElement.style.overflow = "hidden";
        } else {
            focus = false;
            console.log("Unfocusing image!");

            gsap.fromTo(
                `#key-${index}`,
                { opacity: 1 },
                {
                    duration: 0.5,
                    opacity: 0,

                    onComplete: () => {
                        projectBACK.style.display = "block";
                        gsap.fromTo(
                            projectBACK,
                            { opacity: 0 },
                            {
                                duration: 0.5,
                                stagger: 0,
                                delay: 0,
                                opacity: 1,
                                // duration: 1.2,
                                // ease: CustomEase.create(
                                //     "custom",
                                //     "M0,0 C0.054,0.376 0.034,0.293 0.121,0.527 0.153,0.614 0.187,0.724 0.297,0.815 0.492,0.906 0.881,1 1,1 "
                                // ),
                                onComplete: () => {
                                    projectBACK.style.userSelect = "auto";
                                },
                            }
                        );

                        // project wrapper container must revert back to origin
                        projectContainer.style.left = "20%";
                        projectContainer.style.top = "50%";
                        // projectContainer.style.marginLeft = "0%";

                        // display each block again
                        projectBOXarr.forEach((projectBOX, index2) => {
                            // if (index != index2) {

                            // turn from none to block
                            projectBOX.style.display = "block";

                            gsap.fromTo(
                                `#key-${index2}`,
                                { opacity: 0, scaleY: 1, scaleX: 1 },
                                {
                                    opacity: 1,
                                }
                            );
                            // }
                        });

                        projectINFOarr[index - 1].style.display = "none";
                        // projectBOX.style.display = "block";
                    },
                }
            );

            document.body.style.overflow = "visible";
            document.documentElement.style.overflow = "visible";
        }
    });
});
