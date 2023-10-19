const projectIMGarr = document.querySelectorAll(".project-img");
const projectBOXarr = document.querySelectorAll(".project-box");
const projectINFOarr = document.querySelectorAll(".project-info");
const projectContainer = document.getElementById("project-main");

import gsap from "gsap";

projectBOXarr.forEach((projectBOX, index) => {
    projectBOX.setAttribute("id", `key-${index}`);

    let focus = false;
    projectBOX.addEventListener("click", (event) => {
        event.preventDefault();

        if (focus == false) {
            focus = true;
            console.log("Focusing on image now!");

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
                            scaleY: 1.2,
                            opacity: 0,
                            ease: "ease.in",
                            onComplete: () => {
                                gsap.fromTo(
                                    `#key-${index2}`,
                                    { opacity: 0, scaleY: 3, scaleX: 3 },
                                    {
                                        duration: 0.3,
                                        delay: 0.2,
                                        opacity: 1,
                                        scaleY: 3,
                                        scaleX: 3,
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
