// When the user scrolls the page, execute myFunction 
window.onscroll = function() {myFunction()};

// Get the header
var logo = document.getElementById("logo");

// Get the offset position of the navbar
var sticky = logo.offsetTop;

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset >= sticky) {
    logo.classList.add("sticky");
  } else {
    logo.classList.remove("sticky");
  }
}

console.log("script is loading")