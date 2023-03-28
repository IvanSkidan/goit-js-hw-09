// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
// Бібліотека для відображення повідомлень
import Notiflix from 'notiflix';

const pickerDatetime = document.querySelector('input#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const day = document.querySelector('[data-days]');
const hour = document.querySelector('[data-hours]');
const minute = document.querySelector('[data-minutes]');
const second = document.querySelector('[data-seconds]');

const INTERVAL_DELAY = 1000;
let intervalId = null;
let selectedDate = null;
let currentDate = null;

startBtn.disabled = true;
startBtn.addEventListener('click', onClickTimerStart);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);
    onSelectDate(selectedDates);
  },
};

flatpickr(pickerDatetime, options);

Notiflix.Report.info('Привіт 🙂', 'Раді бачити Вас на нашому сайті!', 'Ок');

function onSelectDate(selectedDates) {
  selectedDate = selectedDates[0].getTime();
  currentDate = new Date().getTime();
  
  if (selectedDate < currentDate) {
    startBtn.disabled = true;
    Notiflix.Report.failure('Помилка ❌', 'Виберіть дату в майбутньому!', 'Ок');
  } else {
    startBtn.disabled = false;
    Notiflix.Report.success('Чудово ✅', 'Натисніть кнопку старт!', 'Ок');
  };
}

function onClickTimerStart() {
  intervalId = setInterval(() => {
    currentDate = new Date().getTime();
    const deltaTime = selectedDate - currentDate;
    updateTimer(convertMs(deltaTime));
    startBtn.disabled = true;
    
    if (selectedDate - currentDate < 1000) {
      clearInterval(intervalId);
      Notiflix.Report.info('Вітаю 🙂. Таймер зупинився!',
        'Для того, щоб запустити таймер знову виберіть дату', 'Ок');
      startBtn.disabled = false;
    };
  }, INTERVAL_DELAY);
}

function updateTimer({ days, hours, minutes, seconds }) {
  day.textContent = `${days}`;
  hour.textContent = `${hours}`;
  minute.textContent = `${minutes}`;
  second.textContent = `${seconds}`;
}

// Для підрахунку значень використовуй готову функцію convertMs, де ms - різниця 
// між кінцевою і поточною датою в мілісекундах
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

// Функція перед рендерингом інтерфейсу форматує значення з 5 в 05 
// (додає 0, якщо в числі менше двох символів)
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
