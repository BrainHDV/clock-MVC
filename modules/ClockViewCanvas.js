class ClockViewCanvas {
  constructor() {
    const clockFaceDiametr = 350;
    const radius = clockFaceDiametr / 2;
    const timeFormat = 12;
    let clockModel = null; // с какой моделью работаем, но я с ней не работаю, пока
    let clockField = null; // внутри какого тега наша вёрстка

    const numberBgDiametr = radius / 10;
    const radiusNumbers = radius / 1.2;

    const canvas = document.createElement("canvas");

    const c = canvas.getContext("2d");

    this.start = function (model, field) {
      clockModel = model;
      clockField = field;

      clockField.appendChild(canvas);
      canvas.width = clockFaceDiametr + 5;
      canvas.height = clockFaceDiametr + 5;
    };

    this.update = function () {
      c.resetTransform();
      c.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      c.save();
      c.beginPath();
      c.strokeStyle = "#d3d3d3";
      c.arc(centerX, centerY, radius, 0, Math.PI * 2);
      c.lineWidth = 2;
      c.stroke();

      // В этой части кода мы высчитываем угол поворота цифр каждого часа
      // Если формат 12-часовой, то часовая стрелка каждый час будет двигаться на 30 градусов

      let angle = (parseFloat(30) / 180) * Math.PI;
      let step = (Math.PI * 2) / timeFormat;

      for (let i = 0; i < timeFormat; i++) {
        const numberBgX = centerX + radiusNumbers * Math.sin(angle);
        const numberBgY = centerY - radiusNumbers * Math.cos(angle);
        c.beginPath();
        c.fillStyle = "#d3d3d3";
        c.arc(numberBgX, numberBgY, numberBgDiametr, 0, Math.PI * 2);
        c.fill();

        angle += step;
      }

      for (let i = 1; i < timeFormat + 1; i++) {
        const numberX = centerX + radiusNumbers * Math.sin(angle);
        const numberY = centerY - radiusNumbers * Math.cos(angle);

        c.save();
        c.beginPath();
        c.textAlign = "center";
        c.textBaseline = "middle";
        c.fillStyle = "black";
        c.fon;
        if (clockFaceDiametr < 350) {
          c.font = "12px Montserrat";
        } else {
          c.font = "16px Montserrat";
        }
        c.fillText(`${i}`, numberX, numberY);
        c.restore();

        angle += step;
      }

      const currentDate = clockModel.timeZoneCalc();
      const hours = currentDate.getHours();
      const minutes = currentDate.getMinutes();
      const seconds = currentDate.getSeconds();

      let hoursArrowDeg = (Math.PI / 6) * hours;
      const minutesArrowDeg = (Math.PI / 30) * minutes;
      const secondsArrowDeg = (seconds * Math.PI) / 30;

      // Длинная каждой из стрелок относительно радиуса
      const hourArrow = radius / 3;
      const minuteArrow = radius / 2;
      const secondArrow = radius / 1.5;

      createArrow(centerX, centerY, 5, hoursArrowDeg, "#d3d3d3", hourArrow);
      createArrow(centerX, centerY, 4, minutesArrowDeg, "#d3d3d3", minuteArrow);
      createArrow(centerX, centerY, 2, secondsArrowDeg, "red", secondArrow);

      function createArrow(x, y, lineWidth, rotate, strokeStyle, arrowLength) {
        c.save();
        c.beginPath();
        c.translate(x, y);
        c.rotate(rotate);
        c.translate(-x, -y);
        c.moveTo(x, y);
        c.lineWidth = lineWidth;
        c.strokeStyle = strokeStyle;
        c.lineCap = "round";
        c.lineTo(x, y - arrowLength);
        c.stroke();
        c.restore();
      }

      c.save();
      c.beginPath();
      c.arc(centerX, centerY, 5, 0, Math.PI * 2);
      c.fillStyle = "red";
      c.fill();
      c.restore();
      setTimeout(this.update, 1020 - currentDate.getMilliseconds());
    };
  }
}
