// .content is individual contents
const contentContainers = document.querySelectorAll(".content");
// #content-container is all contents together
const contentContainer = document.getElementById("content-container");
const heroContainer = document.getElementById("hero");
const navLinks = document.querySelectorAll("p");

function showContent(id) {
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
    } else {
        heroContainer.style.display = "none";
        contentContainer.style.display = "block";
        document.body.style.overflow = "visible";
        document.documentElement.style.overflow = "visible";
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
            showContent(id);
            history.pushState({ page: id }, "", `/`);
        } else {
            // const id = event.target.getAttribute('href').substring(1); // Get the link's target ID
            showContent(id);

            // Update the URL using the History API
            history.pushState({ page: id }, "", `/${id}`);
        }
    });
});

// Handle the popstate event to update content when back/forward buttons are used
window.addEventListener("popstate", (event) => {
    const state = event.state;
    if (state && state.page) {
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
