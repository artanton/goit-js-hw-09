import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

refs = {
  datePicker: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start'),

  daysEL: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes]'),
  secondEl: document.querySelector('[data-seconds]'),

  timerEl: document.querySelector('.timer'),
  labelEl: document.querySelectorAll('.label'),
  valueEl: document.querySelectorAll('.value'),
  fieldEl: document.querySelectorAll('.field'),
};

refs.timerEl.style.display = 'flex';
refs.timerEl.style.justifyContent = 'center';
refs.timerEl.style.alignItems = 'center';
refs.timerEl.style.gap = '30px';

refs.fieldEl.forEach(field => {
  field.style.display = 'flex';
  field.style.flexDirection = 'column';

  const labelEl = field.querySelector('.label');
  const valueEl = field.querySelector('.value');
  labelEl.style.fontSize = '1em';
  valueEl.style.fontSize = '3em';

  labelEl.style.textAlign = 'center';
  valueEl.style.textAlign = 'center';
});

let targetDate = 0;
let currentDate = new Date();
let timeRest = 0;
refs.startBtn.disabled = true;

const dataNormalize = volume => String(volume).padStart(2, '0');

function timerNormalize(days, hours, minutes, seconds) {
  refs.daysEL.textContent = dataNormalize(days);
  refs.hoursEl.textContent = dataNormalize(hours);
  refs.minutesEl.textContent = dataNormalize(minutes);
  refs.secondEl.textContent = dataNormalize(seconds);
}

function onCloseCallback(selectedDates) {
  targetDate = new Date(selectedDates);

  if (currentDate >= targetDate) {
    refs.startBtn.disabled = true;
    Notiflix.Notify.failure('Please choose a date in the future');
  } else {
    refs.startBtn.disabled = false;
  }
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: onCloseCallback,
};

const fp = flatpickr('#datetime-picker', options);

refs.startBtn.addEventListener('click', onClick);

function onClick(e) {
  const id = setInterval(() => {
    currentDate = new Date();

    if (currentDate >= targetDate) {
      refs.startBtn.disabled = true;

      Notiflix.Notify.failure('Please choose a date in the future');
    }

    timeRest = targetDate - currentDate;
    let value = convertMs(timeRest);

    timerNormalize(value.days, value.hours, value.minutes, value.seconds);

    if (
      value.days <= 0 &&
      value.hours <= 0 &&
      value.minutes <= 0 &&
      value.seconds <= 0
    ) {
      clearInterval(id);
    }
  }, 1000);

  refs.startBtn.disabled = true;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
