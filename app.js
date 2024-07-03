// Smooth scrolling for internal links
var navLinks = document.querySelectorAll("nav ul li a");

for (var i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener("click", function (event) {
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
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}

const buttons = document.querySelectorAll(".social-button");

buttons.forEach((button) => {
  button.addEventListener("mouseover", () => {
    button.classList.add("fa-beat");
  });

  button.addEventListener("mouseout", () => {
    button.classList.remove("fa-beat");
  });
});

var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-60px";
  }
  prevScrollpos = currentScrollPos;
};

const video = document.getElementById('background-video');

const sources = [
  '/media/lux-dust.mp4',
  '/media/lux-embers-2.mp4',
  '/media/lux-thunder.mp4'
];

let sourceIndex = 0;

function changeVideoSource() {
  video.src = sources[sourceIndex];
  sourceIndex++;
  if (sourceIndex >= sources.length) {
    sourceIndex = 0;
  }
}

setInterval(changeVideoSource, 10 * 1000); // 30 minutes in milliseconds