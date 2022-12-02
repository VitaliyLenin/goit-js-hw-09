import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  daysValue: document.querySelector('span[data-days]'),
  hoursValue: document.querySelector('span[data-hours]'),
  minutesValue: document.querySelector('span[data-minutes]'),
  secondsValue: document.querySelector('span[data-seconds]'),
};

refs.startBtn.addEventListener('click', handleStartClick);
refs.startBtn.setAttribute('disabled', true);

let ms = 0;
let dateNow = 0;
let userDate = 0;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userDate = selectedDates[0];
    dateNow = Date.now();
    if (userDate < dateNow) {
      Notiflix.Notify.warning('Будь ласка, оберіть дату з майбутнього');
      refs.startBtn.setAttribute('disabled', true);
      return;
    }

    refs.startBtn.removeAttribute('disabled');
    Notiflix.Notify.info('Натисніть "start" для початку відліку');
    console.log(selectedDates[0]);
  },
};

flatpickr('input[id=datetime-picker]', options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function onStartCounter(ms) {
  dateNow = Date.now();
  ms = userDate - dateNow;

  let currentValue = convertMs(ms);

  refs.daysValue.textContent = currentValue.days;
  refs.hoursValue.textContent = currentValue.hours;
  refs.minutesValue.textContent = currentValue.minutes;
  refs.secondsValue.textContent = currentValue.seconds;

  if (ms < 1000) {
    clearInterval(timerId);
  }
}

function handleStartClick() {
  timerId = setInterval(onStartCounter, 1000);
  Notiflix.Notify.success('Відлік розпочато');
  refs.startBtn.setAttribute('disabled', true);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
