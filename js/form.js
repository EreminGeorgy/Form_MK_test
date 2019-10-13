'use strict';

(() => {

  // Запись DOM элементов в переменные

  const buttonOpen = document.querySelector('.button__regestration');
  const buttonClose = document.querySelector('.modal-close');
  const popup = document.querySelector('.modal');
  const form = document.querySelector('.form');
  const mailInput = document.querySelector('#e-mail');
  const mailError = document.querySelector('.form__error--email');
  const nicknameInput = document.querySelector('#nickname');
  const nicknameError = document.querySelector('.form__error--nickname');
  const passwordInput = document.querySelector('#password');
  const passwordError = document.querySelector('.form__error--password');
  const passwordRepeatInput = document.querySelector('#password-repeat');
  const passwordRepeatError = document.querySelector('.form__error--password-repeat')
  const passwordCheckSymbolNumber = document.querySelector('#symbolNumber');
  const passwordCheckDigit = document.querySelector('#digit');
  const passwordCheckLetters = document.querySelector('#letters');
  const forward = document.querySelector('.form__forward');
  const flag = document.querySelector('#agreement');
  const firstStep = document.querySelector('.form__first-step');
  const secondStep = document.querySelector('.form__second-step');

  // Инициализация

  const MIN_PASSWORD_LENGTH = 6;

  let mailErrorMessage = '';
  let passwordErrorMessage = '';
  let nicknameErrorMessage = '';
  window.passwordState = false;


  // Описание необходимых функций

  const textLengthCheck = (userInput) => {
    if ((userInput.validity.tooShort) || (userInput.validity.tooLong)) {
      return 'Длина поля должна быть не менее ' + userInput.minLength + ' и не более ' + userInput.maxLength + ' символов';
    } else if (userInput.validity.valueMissing) {
      return 'Поле не может быть пустым';
    } else {
      return '';
    }
  };

  const equilityCheck = () => {
    if ((passwordInput.value === nicknameInput.value) && (passwordInput.value)) {
      passwordError.textContent = 'Пароль не должен совпадать с ником';
    } else if ((passwordInput.value === mailInput.value) && (passwordInput.value)) {
      passwordError.textContent = 'Пароль не должен совпадать с почтовым адресом';
    } else passwordError.textContent = passwordErrorMessage;
  };

  const passwordEquilityCheck = () => {
    (passwordInput.value !== passwordRepeatInput.value) && (passwordRepeatInput.value) ? passwordRepeatError.textContent = 'Введённые пароли не совпадают' : passwordRepeatError.textContent = '';
  };

  const switchForms = () => {
    firstStep.classList.add('visually-hidden');
    secondStep.classList.remove('visually-hidden');

    forward.removeEventListener('click', switchForms);
    forward.removeEventListener('keydown', switchForms);
  }

  const enableButton = () => {
    window.passwordState && !passwordError.textContent && !nicknameError.textContent && !passwordRepeatError.textContent && !mailError.textContent && !flag.validity.valueMissing ? forward.disabled = false : forward.disabled = true;
  };

  const fillErrorMarker = (state, checkMessage) => {
    if (state) {
      checkMessage.className = '';
      checkMessage.classList.add('form__marker--correct');
    } else if (checkMessage.className === 'form__marker--correct') {
      checkMessage.className = '';
      checkMessage.classList.add('form__marker--wrong');
    }
  };

  const createErrorMessage = (errorMessage, errorField) => {
    if (errorMessage) {
      errorField.textContent = errorMessage;
    }
  }


  // Валидация поля электронной почты

  mailInput.addEventListener('input', () => {
    if (mailInput.validity.typeMismatch) {
      mailErrorMessage = 'Введите правильный адрес электронной почты';
    } else if (mailInput.validity.valueMissing) {
      mailErrorMessage = 'Поле не может быть пустым';
    } else {
      mailErrorMessage = '';
      mailError.textContent = '';
    }
  });

  mailInput.addEventListener('blur',() => {
    createErrorMessage(mailErrorMessage, mailError);
    equilityCheck();
    enableButton();
  });

  // Валидация поля никнейма

  nicknameInput.addEventListener('input', () => {
    const re = /^[a-zA-Z]/;

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

  nicknameInput.addEventListener('blur', () => {
    createErrorMessage(nicknameErrorMessage, nicknameError);
    equilityCheck();
    enableButton();
  });

  // Валидация поля пароля

  passwordInput.addEventListener('input', () => {

    const reLetterSmall = /[a-zа-я]/;
    const reLetterCapital = /[A-ZА-ЯёЁ]/;
    const reDigit = /[0-9]/;

    const letterState = reLetterSmall.test(passwordInput.value) && reLetterCapital.test(passwordInput.value);
    const digitState = reDigit.test(passwordInput.value);
    const valueState = passwordInput.value.length >= MIN_PASSWORD_LENGTH;


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

  passwordInput.addEventListener('blur', () => {
    createErrorMessage(passwordErrorMessage, passwordError);
    equilityCheck();
    enableButton();
  });

  // Валидация поля проверки пароля

  passwordRepeatInput.addEventListener('input', () => {
    if (passwordInput.value === passwordRepeatInput.value) {
      passwordRepeatError.textContent = '';
    }
  });

  passwordRepeatInput.addEventListener('blur', () => {
    passwordEquilityCheck();
    enableButton();
  });

  // Проверка установки флажка

  flag.addEventListener('click', () => {
    enableButton();
    flag.validity.valueMissing ? flag.setCustomValidity('Вы должны согласиться с пользовательским соглашением') : flag.setCustomValidity('');
  });

  // Обработка нажатия на кнопку 'далее'

  forward.addEventListener('click', switchForms);

  // Отправка формы

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (window.passwordState && !passwordError.textContent && !nicknameError.textContent && !passwordRepeatError.textContent && !mailError.textContent) {
      const inputs =  document.querySelectorAll('input:not([type=checkbox])');
      const selects =  document.querySelectorAll('select');
      const textarea = document.querySelector('.form__textarea');
      const checkboxes = secondStep.querySelectorAll('input:checked');
      const data = {};

      for (let i = 0; i < inputs.length; i++)  {
        data[inputs[i].name] = inputs[i].value;
      }

      inputs.forEach((elem) => {
        data[elem.name] = elem.value;
      })

      selects.forEach((elem) => {
        data[elem.name.slice(0 , -1)] = elem.options[elem.selectedIndex].text;
      })

      data[textarea.name] = textarea.value;

      let checks = [];

      checkboxes.forEach((elem, index) => {
        checks[index] = elem.name;
      })

      data['subscribe'] = checks;

      console.log(JSON.stringify(data));
      window.closePopup();
      buttonOpen.disabled = true;
      buttonOpen.style.background = 'rgba(0, 255, 0, 0.8)';
    }
  });

})();
