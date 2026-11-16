const video = document.querySelector('#rover-video');
const choices = document.querySelectorAll('[data-video]');

for (const choice of choices) {
  choice.addEventListener('click', () => {
    if (choice.getAttribute('aria-pressed') === 'true') return;

    video.pause();
    video.src = choice.dataset.video;
    video.setAttribute('aria-label', `SCAMPER rover ${choice.textContent.toLowerCase()} demo`);

    for (const option of choices) {
      option.setAttribute('aria-pressed', String(option === choice));
    }
  });
}

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
    'IntersectionObserver' in window &&
    typeof Element.prototype.animate === 'function') {
  const reveal = (element, delay = 0) => element.animate(
    [{ opacity: 0, transform: 'translateY(16px)' }, { opacity: 1, transform: 'translateY(0)' }],
    { duration: 480, delay, easing: 'cubic-bezier(.2,.65,.3,1)', fill: 'backwards' }
  );

  document.querySelectorAll('.hero > *').forEach((element, index) => reveal(element, index * 75));

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const focused = entry.target.contains(document.activeElement);
      if (!focused) reveal(entry.target);
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.12 });

  document.querySelectorAll('.feature, .projects article, .role').forEach((element) => {
    observer.observe(element);
  });
}
