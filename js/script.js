document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const menuButton = document.querySelector('.mobile-menu-button');
  const navLinks = document.querySelector('.nav-links');

  menuButton.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Fade in sections on scroll
  const faders = document.querySelectorAll('.fade-in');

  const appearOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px"
  };

  const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      appearOnScroll.unobserve(entry.target);
    });
  }, appearOptions);

  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });
});

// Testimonials data
const testimonials = [
  {
    text: "Slater Bernstein Consulting transformed our litigation strategy with expert data analysis.",
    client: "Jane Smith, General Counsel"
  },
  {
    text: "Their insights were invaluable during our labor dispute case. Highly recommended!",
    client: "Mark Johnson, HR Director"
  },
  {
    text: "Professional, reliable, and deeply knowledgeable in forensic data validation.",
    client: "Emily Davis, CEO"
  },
  {
    text: "The team’s attention to detail helped us avoid costly legal risks.",
    client: "Robert Lee, Operations Manager"
  }
];

let currentTestimonial = 0;

const testimonialText = document.getElementById('testimonial-text');
const testimonialClient = document.getElementById('testimonial-client');
const prevBtn = document.getElementById('prev-testimonial');
const nextBtn = document.getElementById('next-testimonial');

function showTestimonial(index) {
  // Wrap index
  if(index < 0) index = testimonials.length -1;
  if(index >= testimonials.length) index = 0;
  currentTestimonial = index;

  // Fade out
  testimonialText.style.opacity = 0;
  testimonialClient.style.opacity = 0;

  setTimeout(() => {
    testimonialText.textContent = `"${testimonials[currentTestimonial].text}"`;
    testimonialClient.textContent = `- ${testimonials[currentTestimonial].client}`;
    
    // Fade in
    testimonialText.style.opacity = 1;
    testimonialClient.style.opacity = 1;
  }, 300);
}

prevBtn.addEventListener('click', () => {
  showTestimonial(currentTestimonial - 1);
  resetInterval();
});

nextBtn.addEventListener('click', () => {
  showTestimonial(currentTestimonial + 1);
  resetInterval();
});

// Auto cycle every 15 seconds
let testimonialInterval = setInterval(() => {
  showTestimonial(currentTestimonial + 1);
}, 15000);

function resetInterval() {
  clearInterval(testimonialInterval);
  testimonialInterval = setInterval(() => {
    showTestimonial(currentTestimonial + 1);
  }, 5000);
}

// Initialize first testimonial
showTestimonial(0);
