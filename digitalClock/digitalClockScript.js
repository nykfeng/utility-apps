const day = document.querySelector("[data-day]");
const hour = document.querySelector("[data-hour]");
const minute = document.querySelector("[data-minute]");
const second = document.querySelector("[data-second]");

class DigitalClock {
  constructor(day, hour, minute, second) {
    this.day = day;
    this.hour = hour;
    this.minute = minute;
    this.second = second;
  }

  start() {
    this.updateTime();
    setInterval(() => {
      this.updateTime();
    }, 500);
  }

  updateTime() {
    const timeData = this.getTime();
    let formattedDay;
    switch (timeData.day) {
      case 0:
        formattedDay = "SU";
        break;
      case 1:
        formattedDay = "MO";
        break;
      case 2:
        formattedDay = "TU";
        break;
      case 3:
        formattedDay = "WE";
        break;
      case 4:
        formattedDay = "TH";
        break;
      case 5:
        formattedDay = "FR";
        break;
      case 6:
        formattedDay = "SA";
        break;
      default:
        formattedDay = "SU";
    }
    const formattedHour = timeData.hour.toString().padStart(2, "0");
    const formattedMinute = timeData.minute.toString().padStart(2, "0");
    const formattedSecond = timeData.second.toString().padStart(2, "0");

    this.day.textContent = formattedDay;
    this.hour.textContent = formattedHour;
    this.minute.textContent = formattedMinute;
    this.second.textContent = formattedSecond;
  }

  getTime() {
    let now = new Date();
    return {
      day: now.getDay(),
      hour: now.getHours(),
      minute: now.getMinutes(),
      second: now.getSeconds(),
    };
  }
}

const clock = new DigitalClock(day, hour, minute, second);
clock.start();
