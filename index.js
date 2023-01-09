//------------------------------DOM-----------------------------------

// setup, initialization

// create components
const clockModelNY = new Clock("GMT-5");
const clockViewNY = new ClockViewDOM();
const clockControllerNY = new ClockControllerButtons();

// указываем компонентам, в каком DOM им работать
const clockBodyNY = document.querySelector("#clock-DOM1");

// увязываем компоненты друг с другом
clockModelNY.init(clockViewNY);
clockViewNY.start(clockModelNY, clockBodyNY);
clockControllerNY.start(clockModelNY, clockBodyNY);

// инициируем первичное отображение Model во View
clockModelNY.start();

const clockModelMinsk = new Clock("GMT+3");
const clockViewMinsk = new ClockViewDOM();
const clockControllerMinsk = new ClockControllerButtons();

const clockBodyMinsk = document.querySelector("#clock-DOM2");

clockModelMinsk.init(clockViewMinsk);
clockViewMinsk.start(clockModelMinsk, clockBodyMinsk);
clockControllerMinsk.start(clockModelMinsk, clockBodyMinsk);

clockModelMinsk.start();

//------------------------------SVG-----------------------------------

const clockModelBerlin = new Clock("GMT+1");
const clockViewBerlin = new ClockViewSVG();
const clockControllerBerlin = new ClockControllerButtons();

const clockBodyBerlin = document.querySelector("#clock-SVG1");
const clockBodyBerlin1 = document.querySelector(".time-svg1");

clockModelBerlin.init(clockViewBerlin);
clockViewBerlin.start(clockModelBerlin, clockBodyBerlin);
clockControllerBerlin.start(clockModelBerlin, clockBodyBerlin1);

clockModelBerlin.start();
const clockModelTokyo = new Clock("GMT+9");
const clockViewTokyo = new ClockViewSVG();
const clockControllerTokyo = new ClockControllerButtons();

const clockBodyTokyo = document.querySelector("#clock-SVG2");
const clockBodyTokyo1 = document.querySelector(".time-svg2");

clockModelTokyo.init(clockViewTokyo);
clockViewTokyo.start(clockModelTokyo, clockBodyTokyo);
clockControllerTokyo.start(clockModelTokyo, clockBodyTokyo1);

clockModelTokyo.start();

//------------------------------CANVAS--------------------------------

const clockModelLondon = new Clock("GMT");
const clockViewLondon = new ClockViewCanvas();
const clockControllerLondon = new ClockControllerButtons();

const clockBodyLondon = document.querySelector("#clock-CANV1");

clockModelLondon.init(clockViewLondon);
clockViewLondon.start(clockModelLondon, clockBodyLondon);
clockControllerLondon.start(clockModelLondon, clockBodyLondon);

clockModelLondon.start();

const clockModelVladivostok = new Clock("GMT+10");
const clockViewVladivostok = new ClockViewCanvas();
const clockControllerVladivostok = new ClockControllerButtons();

const clockBodyVladivostok = document.querySelector("#clock-CANV2");

clockModelVladivostok.init(clockViewVladivostok);
clockViewVladivostok.start(clockModelVladivostok, clockBodyVladivostok);
clockControllerVladivostok.start(clockModelVladivostok, clockBodyVladivostok);

clockModelVladivostok.start();
