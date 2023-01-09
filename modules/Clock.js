class Clock {
  constructor(timeZone) {
    let clockView = null;

    this.timeZone = timeZone;

    // timezone input function (GMT)
    this.timeValidate = function () {
      // преобразуем введенное значение в число
      // предварительно "обрубая" до нужных нам значений
      // цифра 3 - потому что используем GMT либо UTC
      let result = parseInt(this.timeZone.slice(3));

      if (!isNaN(result)) {
        // Если получаем на выходе число, то его же и возвращаем
        return result;
      }
      return 0;
    };

    // считаем конкретный часовой пояс,
    // используя полученный выше результат
    this.timeZoneCalc = function () {
      let date = new Date();
      // переменная timeZone содержит число,
      // которое мы получили выше
      const timeZone = this.timeValidate();

      // получаем время по Гринвичу
      let utcOffset = date.getTimezoneOffset();
      // устанавливаем время по Гринвичу, т.е. от нашего
      // часового пояса отнимаются 180 минут (GTM+3 = 3 часа)
      date.setMinutes(date.getMinutes() + utcOffset);

      // date - в данный момент содержит время по Гринвичу
      // соотв. мы используя перем timeZone считаем нужный нам пояс
      // если timeZone = 3, то 3*60 = 180 (т.е. наш GMT+3) прибавляем
      // к текущему моменту времени (Гринвичу)
      // если timeZone = -5, то -5*60 = -300 (т.е. GMT-5)
      let timeOffset = timeZone * 60;
      date.setMinutes(date.getMinutes() + timeOffset);

      return date;
    };

    let time = 0;

    this.init = function (view) {
      clockView = view;
    };

    this.updateView = function () {
      if (clockView) clockView.update();
    };

    this.start = function () {
      if (time) {
        clearInterval(time);
        time = 0;
      }
      this.updateView();
      time = setInterval(() => {
        clockView.update();
      }, 1000);
    };

    this.stop = function () {
      clearInterval(time);
      time = 0;
    };
  }
}
