const selectors = {
  form: "[data-js-form]",
  field: "[data-js-form-field]",
  input: "[data-js-form-input]",
  error: "[data-js-form-error]",
};

const regExp = {
  email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
};

const isInputValid = (inputElement) => {
  const validationType = inputElement.getAttribute("data-js-form-input");
  const validationRegExp = regExp[validationType];
  const { value } = inputElement;
  const fieldElement = inputElement.closest(selectors.field);
  const errorElement = fieldElement.querySelector(selectors.error);

  const isValid = validationRegExp ? regExp[validationType].test(value) : value.length > 0;

  errorElement.hidden = isValid;

  return isValid;
};

const isFormValid = (formElement) => {
  const inputElements = formElement.querySelectorAll(selectors.input);
  let validInputsCount = 0;

  inputElements.forEach((inputElement) => {
    const isValid = isInputValid(inputElement);

    if (isValid) {
      validInputsCount++;
    }
  });

  return inputElements.length === validInputsCount;
};

const onSubmit = (event) => {
  const { target } = event;

  if (target.matches(selectors.form)) {
    const isValid = isFormValid(target);
    console.debug("isValid:", isValid);

    if (!isValid) {
      event.preventDefault();
    } else {
      event.preventDefault(); // Если убрать, страница будет перезагружена, строка добавлена лишь с учебной целью
      alert("Форма отправлена!");
    }
  }
};

document.addEventListener("submit", onSubmit);
