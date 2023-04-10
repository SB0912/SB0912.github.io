// Smooth scrolling for internal links
var navLinks = document.querySelectorAll('nav ul li a');

for (var i = 0; i < navLinks.length; i++) {
	navLinks[i].addEventListener('click', function(event) {
		event.preventDefault();
		var targetSection = document.querySelector(this.hash);
		smoothScroll(targetSection);
	});
}

function smoothScroll(targetSection) {
	var targetSectionPosition = targetSection.offsetTop;
	var currentPosition = window.pageYOffset;
	var distance = targetSectionPosition - currentPosition;
	var duration = 1000;
	var startTime = null;

	function animation(currentTime) {
		if (startTime === null) startTime = currentTime;
		var timeElapsed = currentTime - startTime;
		var run = ease(timeElapsed, currentPosition, distance, duration);
		window.scrollTo(0, run);
		if (timeElapsed < duration) requestAnimationFrame(animation);
	}

	function ease(t, b, c, d) {
		t /= d / 2;
		if (t < 1) return c / 2 * t * t + b;
		t--;
		return -c / 2 * (t * (t - 2) - 1) + b;
	}

	requestAnimationFrame(animation);
}

const buttons = document.querySelectorAll('.social-button');

buttons.forEach(button => {
  button.addEventListener('mouseover', () => {
    button.classList.add('fa-shake');
  });
  
  button.addEventListener('mouseout', () => {
    button.classList.remove('fa-shake');
  });
});
