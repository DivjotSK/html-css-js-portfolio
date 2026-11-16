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
