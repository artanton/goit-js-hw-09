function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

document.body.classList.add('custom-background');

const body = document.querySelector('.custom-background');

startBtn.addEventListener('click', onStart);
stopBtn.addEventListener('click', onStop);

startBtn.style.position = 'absolute';
startBtn.style.top = '50%';
startBtn.style.left = '50%';
startBtn.style.transform = 'translate(-100%, -50%)';

stopBtn.style.position = 'absolute';
stopBtn.style.top = '50%';
stopBtn.style.left = '50%';
stopBtn.style.transform = 'translate(100%, -50%)';

function onStart() {
  const intervalId = setInterval(() => {
    const color = getRandomHexColor();

    body.style.backgroundColor = color;
  }, 1000);

  startBtn.disabled = true;
  stopBtn.disabled = false;
}

function onStop() {
  clearTimeout(intervalId);

  startBtn.disabled = false;
  stopBtn.disabled = true;
}
