// Get all the buttons with class 'github-btn' in the about.html file
const buttons = document.querySelectorAll('.github-btn');

// Loop through the buttons and add a click event handler to each one
buttons.forEach(button => {
  button.addEventListener('click', () => {
    // take the URL from the button's data-url attribute
    const url = button.getAttribute('data-url');
    // Navigate to the URL linked
    window.location.href = url;
  });
});
