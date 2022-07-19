function timer() {
  //TIMER

  const deadLine = "2022-09-22";

  const parseDate = (endDate) => {
    const t = Date.parse(endDate) - Date.parse(new Date()),
      days = Math.floor(t / (1000 * 60 * 60 * 24)),
      hours = Math.floor((t / (1000 * 60 * 60)) % 24),
      minutes = Math.floor((t / (1000 * 60)) % 60),
      seconds = Math.floor((t / 1000) % 60);

    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  };

  const getZero = (num) => {
    if (num >= 0 && num < 10) {
      return "0" + num;
    } else {
      return num;
    }
  };

  const setDeadlineToHTML = (selector, dateValue) => {
    const dateDiv = document.querySelector(selector),
      days = dateDiv.querySelector("#days"),
      hours = dateDiv.querySelector("#hours"),
      minutes = dateDiv.querySelector("#minutes"),
      seconds = dateDiv.querySelector("#seconds"),
      timeInt = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const t = parseDate(dateValue);
      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInt);
      }
    }
  };

  setDeadlineToHTML(".timer", deadLine);
}

export default timer;
