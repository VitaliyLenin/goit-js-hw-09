const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};

refs.startBtn.addEventListener('click', handleStartClick);
refs.stopBtn.addEventListener('click', handleStopClick);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onChangeBodyColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}

let timerId = null;

function handleStartClick() {
  timerId = setInterval(onChangeBodyColor, 1000);
  refs.startBtn.setAttribute('disabled', true);
}

function handleStopClick() {
  clearInterval(timerId);
  if (handleStopClick) {
    refs.startBtn.removeAttribute('disabled');
  }
}
