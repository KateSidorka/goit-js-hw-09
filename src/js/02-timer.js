import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const datetimePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');

let selectedDate;

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

startButton.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
};

flatpickr(datetimePicker, options);

startButton.addEventListener('click', () => {
  const selectedDate = flatpickr.parseDate(datetimePicker.value);
  const currentDate = new Date();
  const difference = selectedDate - currentDate;

  if (difference <= 0) {
    Notiflix.Notify.failure('Please choose a date in the future');
    return;
  }
  
  const timerInterval = setInterval(() => {
    const remainingTime = convertMs(selectedDate - new Date());

    daysValue.textContent = addLeadingZero(remainingTime.days);
    hoursValue.textContent = addLeadingZero(remainingTime.hours);
    minutesValue.textContent = addLeadingZero(remainingTime.minutes);
    secondsValue.textContent = addLeadingZero(remainingTime.seconds);
    startButton.disabled = true;
    if (remainingTime.days === 0 && remainingTime.hours === 0 && remainingTime.minutes === 0 && remainingTime.seconds === 0) {
      clearInterval(timerInterval);
      startButton.disabled = false;
      Notiflix.Notify.success('Countdown finished!');
    }
  }, 1000);
});
