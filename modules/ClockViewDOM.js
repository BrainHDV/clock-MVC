class ClockViewDOM {
  constructor() {
    const clockFaceDiametr = 350;
    const radius = clockFaceDiametr / 2;
    const timeFormat = 12;
    let clockModel = null; // с какой моделью работаем, но я с ней не работаю, пока
    let clockField = null; // внутри какого тега наша вёрстка

    let hourArrow = null; // часовая стрелка
    let secondArrow = null; // минутная стрелка
    let minuteArrow = null; // секундная стрелка

    this.start = function (model, field) {
      clockModel = model;
      clockField = field;

      // ищем и запоминаем нужные элементы DOM
      clockField.style.cssText = `width: ${clockFaceDiametr}px; height: ${clockFaceDiametr}px;`;
      hourArrow = clockField.querySelector(".hr");
      minuteArrow = clockField.querySelector(".mn");
      secondArrow = clockField.querySelector(".sc");

      // устанавливаем размер стрелок
      const secondArrowHeight = radius / 1.4,
        //  Высота минутной стрелки относительно радиуса
        minuteArrowHeight = radius / 1.6,
        //  Высота часовой стрелки относительно радиуса
        hourArrowHeight = radius / 2.2;

      //  Инициализация высоты стрелок.
      hourArrow.style.cssText = `height: ${hourArrowHeight}px`;
      minuteArrow.style.cssText = `height: ${minuteArrowHeight}px`;
      secondArrow.style.cssText = `height: ${secondArrowHeight}px`;

      // инициализация цифр и фона
      for (let i = 1; i <= timeFormat; i++) {
        const numberDiv = document.createElement("div");
        numberDiv.textContent = i;
        numberDiv.classList.add("clock-number");
        clockFaceDiametr < 450
          ? ((numberDiv.style.cssText = "font-size: 13px"),
            (hourArrow.style.width = 4 + "px"),
            (minuteArrow.style.width = 3 + "px"))
          : (numberDiv.style.cssText = "font-size: 16px");
        clockField.appendChild(numberDiv);
      }

      const numbers = document.querySelectorAll(".clock-number"),
        // Высчитываем центр циферблата
        clockCenterX = clockFaceDiametr / 2,
        clockCenterY = clockFaceDiametr / 2,
        // Здесь я подбирал размер кружков за цифрами для того чтобы он подходил при изменении диаметра
        numberBgWidth = clockCenterX / 5,
        numberBgHeight = clockCenterY / 5,
        // Расстояние от центра до кружка с цифрой
        radiusFromCenter = clockFaceDiametr / 2 / 1.2;

      let angle = (parseFloat(30) / 180) * Math.PI;
      let step = (Math.PI * 2) / timeFormat;

      for (let num = 0; num < numbers.length; num++) {
        let number = numbers[num];
        const numberDivX = clockCenterX + radiusFromCenter * Math.sin(angle);
        const numberDivY = clockCenterY - radiusFromCenter * Math.cos(angle);

        number.style.width = numberBgWidth + "px";
        number.style.height = numberBgHeight + "px";
        number.style.left =
          Math.round(numberDivX - number.offsetWidth / 2) + "px";
        number.style.top =
          Math.round(numberDivY - number.offsetHeight / 2) + "px";
        angle += step;
      }
    };

    this.update = function () {
      const secDeg = 6;
      const hourDeg = 30;
      const timeFormat = 12;
      const currentDate = clockModel.timeZoneCalc(),
        seconds = currentDate.getSeconds() * secDeg,
        minutes = currentDate.getMinutes() * secDeg,
        hours = currentDate.getHours() * hourDeg;
      hourArrow.style.transform = `rotate(${hours + minutes / timeFormat}deg)`;
      minuteArrow.style.transform = `rotate(${minutes}deg)`;
      secondArrow.style.transform = `rotate(${seconds}deg)`;
      setTimeout(this.update, 1020 - currentDate.getMilliseconds());
    };
  }
}
