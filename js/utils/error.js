const showTostError = (errMessage) => {
  const dataErrorTemplate = document.querySelector('#data-error');
  const dataErrorElement = dataErrorTemplate.content.cloneNode(true);
  const errorElement = dataErrorElement.querySelector('.data-error');

  if (errMessage) {
    dataErrorElement.querySelector('.data-error__title').textContent = errMessage;
  }

  document.body.appendChild(dataErrorElement);

  setTimeout(() => {
    errorElement.remove();
  }, 5000);
};

const showDataError = () => {
  showTostError();
};


export { showDataError, showTostError };
