import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const datetimePicker = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data- seconds]');

let countdownIntervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate < new Date()) {
      window.alert("Please choose a date in the future");
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
  },
};

flatpickr(datetimePicker, options);

startBtn.addEventListener('click', onStartBtnClick);

function onStartBtnClick() {
  const selectedDate = flatpickr.parseDate(datetimePicker.value);
  const currentDate = new Date();
  const timeDifference = selectedDate - currentDate;

  if (timeDifference <= 0) {
    window.alert("Please choose a date in the future");
    return;
  }

  startBtn.disabled = true;
  countdownIntervalId = setInterval(updateCountdown, 1000, timeDifference);
}

function updateCountdown(timeDifference) {
  const { days, hours, minutes, seconds } = convertMs(timeDifference);

  daysValue.textContent = formatTimeValue(days);
  hoursValue.textContent = formatTimeValue(hours);
  minutesValue.textContent = formatTimeValue(minutes);
  secondsValue.textContent = formatTimeValue(seconds);

  timeDifference -= 1000;

  if (timeDifference < 0) {
    clearInterval(countdownIntervalId);
    startBtn.disabled = false;
  }
}

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

function formatTimeValue(value) {
  return String(value).padStart(2, '0');
}