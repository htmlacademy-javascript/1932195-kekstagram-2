const showToastError = (errMessage) => {
  const dataErrorTemplate = document.querySelector('#data-error');

  if (!dataErrorTemplate) {
    return;
  }

  const dataErrorElement = dataErrorTemplate.content.cloneNode(true);
  const errorElement = dataErrorElement.querySelector('.data-error');

  if (errMessage) {
    const titleElement = dataErrorElement.querySelector('.data-error__title');
    if (titleElement) {
      titleElement.textContent = errMessage;
    }
  }

  document.body.appendChild(dataErrorElement);

  setTimeout(() => {
    errorElement?.remove();
  }, 5000);
};

const showDataError = (message = 'Произошла ошибка') => {
  showToastError(message);
};

export { showDataError, showToastError };
