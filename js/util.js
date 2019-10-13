'use strict';

(() => {
  const ESC_KEYCODE = 27;
  const ENTER_KEYCODE = 13;

  window.util = {
    escEvent: (evt, action) => {
      if ((evt.keyCode === ESC_KEYCODE) && (document.activeElement !== window.userNameInput)) {
        action();
      }
    },
    enterEvent: (evt, action) => {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },
    getRandomInt: (min, max) => {
      return Math.floor(Math.random() * (max - min)) + min;
    }
  };
})();
