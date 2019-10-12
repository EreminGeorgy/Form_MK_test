'use strict';

(function() {

  var buttonOpen = document.querySelector('.button__regestration');
  var buttonClose = document.querySelector('.modal-close');
  var popup = document.querySelector('.modal');
  var form = document.querySelector('.form');
  var passwordCheck = document.querySelectorAll('li');

  var isStorageSupport = true;
  var storage = '';

  popup.classList.remove('modal-show');

  var onPopupEscPress = function(evt) {
    window.util.escEvent(evt, closePopup);
  };

  var openPopup = function() {
    popup.classList.add('modal-show');
    document.addEventListener('keydown', onPopupEscPress);
  };

  window.closePopup = function() {
    popup.classList.remove('modal-show');
    document.removeEventListener('keydown', onPopupEscPress);
    console.log(passwordCheck);
    passwordCheck.forEach(function (elem) {
      elem.className = '';
      elem.classList.add('form__field-status--neutral');
    });
    form.reset();
  };

  buttonOpen.addEventListener('click', function() {
    openPopup();
  });

  buttonOpen.addEventListener('keydown', function(evt) {
    window.util.enterEvent(evt, openPopup);
  });

  buttonClose.addEventListener('click', function() {
    closePopup();
  });

  buttonClose.addEventListener('keydown', function(evt) {
    window.util.enterEvent(evt, closePopup);
  });

})();
