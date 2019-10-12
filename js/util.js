'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  window.util = {
    escEvent: function (evt, action) {
      if ((evt.keyCode === ESC_KEYCODE) && (document.activeElement !== window.userNameInput)) {
        action();
      }
    },
    enterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },
    getRandomInt: function (min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }
  };
})();
