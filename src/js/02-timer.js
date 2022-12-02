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

refs.startBtn.setAttribute('disabled', true);

let ms = 0;
let dateNow = 0;
let userDate = 0;
let timerId = 0;

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
    console.log(selectedDates[0]);
  },
};

flatpickr('input[id=datetime-picker]', options);
