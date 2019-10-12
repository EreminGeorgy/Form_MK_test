'use strict';

(function() {

  // Запись DOM элементов в переменные

  var buttonOpen = document.querySelector('.button__regestration');
  var buttonClose = document.querySelector('.modal-close');
  var popup = document.querySelector('.modal');
  var form = document.querySelector('.form');
  var mailInput = document.querySelector('#e-mail');
  var mailError = document.querySelector('.form__error--email');
  var nicknameInput = document.querySelector('#nickname');
  var nicknameError = document.querySelector('.form__error--nickname');
  var passwordInput = document.querySelector('#password');
  var passwordError = document.querySelector('.form__error--password');
  var passwordRepeatInput = document.querySelector('#password-repeat');
  var passwordRepeatError = document.querySelector('.form__error--password-repeat')
  var passwordCheckSymbolNumber = document.querySelector('#symbolNumber');
  var passwordCheckDigit = document.querySelector('#digit');
  var passwordCheckLetters = document.querySelector('#letters');
  var submit = document.querySelector('.submit');
  var flag = document.querySelector('#agreement')

  // Инициализация

  var MIN_PASSWORD_LENGTH = 6;

  var mailErrorMessage = '';
  var passwordErrorMessage = '';
  var nicknameErrorMessage = '';
  window.passwordState = false;


  // Описание необходимых функций

  var textLengthCheck = function(userInput) {
    if ((userInput.validity.tooShort) || (userInput.validity.tooLong)) {
      return 'Длина поля должна быть не менее ' + userInput.minLength + ' и не более ' + userInput.maxLength + ' символов';
    } else if (userInput.validity.valueMissing) {
      return 'Поле не может быть пустым';
    } else {
      return '';
    }
  };

  var equilityCheck = function() {
    if ((passwordInput.value === nicknameInput.value) && (passwordInput.value)) {
      passwordError.textContent = 'Пароль не должен совпадать с ником';
    } else if ((passwordInput.value === mailInput.value) && (passwordInput.value)) {
      passwordError.textContent = 'Пароль не должен совпадать с почтовым адресом';
    } else passwordError.textContent = passwordErrorMessage;
  };

  var passwordEquilityCheck = function() {
    if ((passwordInput.value !== passwordRepeatInput.value) && (passwordRepeatInput.value)) {
      passwordRepeatError.textContent = 'Введённые пароли не совпадают';
    } else passwordRepeatError.textContent = '';
  };

  var enableButton = function() {
    if (window.passwordState && !passwordError.textContent && !nicknameError.textContent && !passwordRepeatError.textContent && !mailError.textContent && !flag.validity.valueMissing) {
      submit.disabled = false;
    } else {
      submit.disabled = true;
    }
  };

  var fillErrorMarker = function(state, checkMessage) {
    if (state) {
      checkMessage.className = '';
      checkMessage.classList.add('form__field-status--correct');
    } else if (checkMessage.className === 'form__field-status--correct') {
      checkMessage.className = '';
      checkMessage.classList.add('form__field-status--wrong');
    }
  };

  var createErrorMessage = function(errorMessage, errorField) {
    if (errorMessage) {
      errorField.textContent = errorMessage;
    }
  }


  // Валидация поля электронной почты

  mailInput.addEventListener('input', function() {
    if (mailInput.validity.typeMismatch) {
      mailErrorMessage = 'Введите правильный адрес электронной почты';
    } else if (mailInput.validity.valueMissing) {
      mailErrorMessage = 'Поле не может быть пустым';
    } else {
      mailErrorMessage = '';
      mailError.textContent = '';
    }
  });

  mailInput.addEventListener('blur', function() {
    createErrorMessage(mailErrorMessage, mailError);
    equilityCheck();
    enableButton();
  });

  // Валидация поля никнейма

  nicknameInput.addEventListener('input', function() {
    var re = /^[a-zA-Z]/;

    if (!re.test(nicknameInput.value)) {
      nicknameErrorMessage = 'Никнейм должен начинаться с буквы латинского алфавита'
    } else if (nicknameInput.validity.patternMismatch) {
      nicknameErrorMessage = 'Никнейм должен содержать только латинские буквы, цифры, символ подчёркивания (_), Символ (;)';
    } else if (textLengthCheck(nicknameInput)) {
      nicknameErrorMessage = textLengthCheck(nicknameInput);
    } else {
      nicknameError.textContent = '';
      nicknameErrorMessage = '';
    }

  });

  nicknameInput.addEventListener('blur', function() {
    createErrorMessage(nicknameErrorMessage, nicknameError);
    equilityCheck();
    enableButton();
  });

  // Валидация поля пароля

  passwordInput.addEventListener('input', function() {

    var reLetterSmall = /[a-zа-я]/;
    var reLetterCapital = /[A-ZА-ЯёЁ]/;
    var reDigit = /[0-9]/;

    var letterState = reLetterSmall.test(passwordInput.value) && reLetterCapital.test(passwordInput.value);
    var digitState = reDigit.test(passwordInput.value);
    var valueState = passwordInput.value.length >= MIN_PASSWORD_LENGTH;


    fillErrorMarker(letterState, passwordCheckLetters);
    fillErrorMarker(digitState, passwordCheckDigit);
    fillErrorMarker(valueState, passwordCheckSymbolNumber);

    textLengthCheck(passwordInput, passwordError);

    if (textLengthCheck(passwordInput)) {
      passwordErrorMessage = textLengthCheck(passwordInput);
    } else {
      passwordError.textContent = '';
      passwordErrorMessage = '';
    }

    passwordEquilityCheck();
    window.passwordState = letterState && digitState && valueState;
  });

  passwordInput.addEventListener('blur', function() {
    createErrorMessage(passwordErrorMessage, passwordError);
    equilityCheck();
    enableButton();
  });

  // Валидация поля проверки пароля

  passwordRepeatInput.addEventListener('input', function() {
    if (passwordInput.value === passwordRepeatInput.value) {
      passwordRepeatError.textContent = '';
    }
  });

  passwordRepeatInput.addEventListener('blur', function() {
    passwordEquilityCheck();
    enableButton();
  });

  // Проверка установки флажка

  flag.addEventListener('click', function() {
    enableButton();
    if (flag.validity.valueMissing) {
      flag.setCustomValidity('Вы должны согласиться с пользовательским соглашением');
    } else {
      flag.setCustomValidity('');
    }
  });

  // Отправка формы

  form.addEventListener('submit', function(evt) {
    evt.preventDefault();
    if (window.passwordState && !passwordError.textContent && !nicknameError.textContent && !passwordRepeatError.textContent && !mailError.textContent) {
      var data = (new FormData(form));
      console.log(JSON.stringify(Object.fromEntries(data)));
      window.closePopup();
      buttonOpen.disabled = true;
      buttonOpen.style.background = 'rgba(0, 255, 0, 0.8)';
    }


  });

})();
