'use strict';

(() => {

  const buttonOpen = document.querySelector('.button__regestration');
  const buttonClose = document.querySelector('.modal-close');
  const popup = document.querySelector('.modal');
  const form = document.querySelector('.form');
  const passwordCheck = document.querySelectorAll('.form__marker');

  popup.classList.remove('modal-show');

  const onPopupEscPress = (evt) => {
    window.util.escEvent(evt, closePopup);
  };

  const openPopup = () => {
    popup.classList.add('modal-show');
    document.addEventListener('keydown', onPopupEscPress);
  };

  window.closePopup = () => {
    popup.classList.remove('modal-show');
    document.removeEventListener('keydown', onPopupEscPress);
    passwordCheck.forEach(function (elem) {
      elem.className = '';
      elem.classList.add('form__marker--neutral');
    });
    form.reset();
  };

  buttonOpen.addEventListener('click', () => {
    openPopup();
  });

  buttonOpen.addEventListener('keydown', (evt) => {
    window.util.enterEvent(evt, openPopup);
  });

  buttonClose.addEventListener('click', () => {
    closePopup();
  });

  buttonClose.addEventListener('keydown', (evt) => {
    window.util.enterEvent(evt, closePopup);
  });

})();
