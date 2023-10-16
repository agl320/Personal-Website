const contentContainers = document.querySelectorAll('.content');
const navLinks = document.querySelectorAll('a');

function showContent(id) {
  contentContainers.forEach((content) => {
    content.style.display = 'none';
  });

  // make last page hide

  // show content
  const content = document.getElementById(id + '-content');
  if (content) {
    content.style.display = 'block';
  }
}

// Handle navigation link clicks
navLinks.forEach((navLink) => {

    const id = navLink.id.replace(/-button$/, '');
    console.log(id);

    navLink.addEventListener('click', (event) => {

        event.preventDefault(); // Prevent the default link behavior (full page refresh)

        if(id=="home"){
            showContent(id);
            history.pushState({ page: id }, '', `/`);
        }
        else{
            // const id = event.target.getAttribute('href').substring(1); // Get the link's target ID
            showContent(id);

            // Update the URL using the History API
            history.pushState({ page: id }, '', `/${id}`);
        }
    });
});

// Handle the popstate event to update content when back/forward buttons are used
window.addEventListener('popstate', (event) => {
  const state = event.state;
  if (state && state.page) {
    showContent(state.page);
  }
});

// Check the URL on initial page load and display the corresponding content
window.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname.substring(1); // Remove the leading slash
  if (path) {
    showContent(path);
  }
});

