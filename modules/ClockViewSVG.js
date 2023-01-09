class ClockViewSVG {
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

      hourArrow = clockField.querySelector(".hr");
      minuteArrow = clockField.querySelector(".mn");
      secondArrow = clockField.querySelector(".sc");

      const clockFace = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
      );
      clockFace.setAttribute("stroke", "#d3d3d3");
      clockFace.setAttribute("stroke-width", 2);
      clockFace.setAttribute("fill", "none");
      clockFace.setAttribute("cx", "50%");
      clockFace.setAttribute("cy", "50%");
      clockFace.setAttribute("r", radius);
      clockField.appendChild(clockFace);

      //  Часы получают заданные размеры. Выставляется высота стрелок.
      clockField.style.cssText = `width: ${clockFaceDiametr}px; height: ${clockFaceDiametr}px`;

      // С помощью функции buildArrows можно определить ширину и высоту стрелки

      buildArrows(hourArrow, 4, "30%");
      buildArrows(minuteArrow, 3, "20%");
      buildArrows(secondArrow, 2, "14%");

      function buildArrows(arrow, width, height) {
        arrow.setAttribute("stroke-width", width);
        arrow.setAttribute("x1", "50%");
        arrow.setAttribute("y1", "50%");
        arrow.setAttribute("x2", "50%");
        arrow.setAttribute("y2", height);
      }

      //   Циклом создаем цифры.
      //   Закрепляем результат к DOM дереву
      for (let i = 1; i <= timeFormat; i++) {
        const numberDiv = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "circle"
        );
        const text = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "text"
        );
        const group = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "g"
        );
        numberDiv.setAttribute("cx", "50%");
        numberDiv.setAttribute("cy", "50%");
        numberDiv.setAttribute("fill", "#d3d3d3");
        numberDiv.classList.add("clock-number");

        text.setAttribute("x", "50%");
        text.setAttribute("y", "50%");
        text.style.fill = "black";
        // Условие отвечает за размер шрифта и ширину стрелок, если диаметр меньше 450.
        clockFaceDiametr > 450
          ? (text.style.fontSize = 18 + "px")
          : (text.style.fontSize = 12 + "px");
        text.textContent = i;
        text.classList.add("clock-text");
        group.appendChild(numberDiv);
        group.appendChild(text);
        clockField.appendChild(group);
      }

      // Находим только что созданные цифры
      const numbers = document.querySelectorAll(".clock-number"),
        textArr = document.querySelectorAll(".clock-text"),
        // Высчитываем центр циферблата
        clockCenterX = clockFaceDiametr / 2,
        clockCenterY = clockFaceDiametr / 2,
        // Здесь я подбирал размер кружков за цифрами для того чтобы он подходил при изменении диаметра
        numberBgWidth = clockCenterX / 10,
        // Расстояние от центра до кружка с цифрой
        radiusFromCenter = radius / 1.2;

      let angle = (parseFloat(30) / 180) * Math.PI;
      let step = (Math.PI * 2) / timeFormat;

      // Снизу два цикла
      // Первым мы расставляем кружки в которых будет цифра каждого часа
      // Второй расставляем сами цифры

      for (let num = 0; num < numbers.length; num++) {
        let number = numbers[num];
        const numberBgX = clockCenterX + radiusFromCenter * Math.sin(angle);
        const numberBgY = clockCenterY - radiusFromCenter * Math.cos(angle);

        number.setAttribute("cx", numberBgX);
        number.setAttribute("cy", numberBgY);
        number.setAttribute("r", numberBgWidth);
        angle += step;
      }

      for (let num = 0; num < textArr.length; num++) {
        let text = textArr[num];
        const textX = clockCenterX + radiusFromCenter * Math.sin(angle);
        const textY = clockCenterY - radiusFromCenter * Math.cos(angle);

        text.setAttribute("x", textX);
        text.setAttribute("y", textY);
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
