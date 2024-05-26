import "./slider.js";
import "./slick.min.js";
import "./phone.js";
import "./fotorama.js";

import modals from "./modules/modals.js";
import forms from "./modules/forms.js";
import discount from "./discount.js";
import timer from "./modules/timer.js";
import telegram from "./modules/telegram.js";

import discountMark from "./modules/discountTab.js";

import { initRatings } from "./modules/rating.js";

window.addEventListener("DOMContentLoaded", () => {
  ("use strict");
  const modalState = {
    modalChange: false,
  };

  const globalState = {
    discount: 0,
  };

  modals(modalState, globalState);
  discount(modalState, globalState);

  let deadLine = "2024-05-16";

  // forms(modalState, globalState);

  timer(".container1", deadLine);
  initRatings();
  telegram();
  // discountMark();
});
