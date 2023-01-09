class ClockControllerButtons {
  constructor() {
    let clockModel = null; // с какой моделью работаем
    let clockField = null; // внутри какого тега наша вёрстка

    this.start = function (model, field) {
      clockModel = model;
      clockField = field;

      // ищем и запоминаем нужные элементы DOM
      // назначаем обработчики событий
      const btnStart = clockField.querySelector(".btn--start");
      const btnStop = clockField.querySelector(".btn--stop");

      btnStart.addEventListener("click", this.startTime);
      btnStop.addEventListener("click", this.stopTime);
    };

    // контроллер вызывает только методы модели
    this.startTime = function () {
      clockModel.start();
    };

    this.stopTime = function () {
      clockModel.stop();
    };
  }
}
