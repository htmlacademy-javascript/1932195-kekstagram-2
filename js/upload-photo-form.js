import { isEscapeKey } from './utils/escape.js';
import { checkHashtagsValidity, errorMessage } from './check-hashtag-validity.js';
import { uploadPhoto } from './api.js';
import { showToastError } from './utils/error.js';
import { initPhotoScale } from './photo-scale.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png', 'webp'];
const uploadForm = document.querySelector('.img-upload__form');
const bodyElement = document.querySelector('body');
const uploadFileInput = uploadForm.querySelector('#upload-file');
const photoEditorForm = uploadForm.querySelector('.img-upload__overlay');
const photoEditorResetButton = photoEditorForm.querySelector('#upload-cancel');
const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');
const previewImage = uploadForm.querySelector('.img-upload__preview img');
const submitButton = uploadForm.querySelector('.img-upload__submit');
const scaleControlInput = uploadForm.querySelector('.scale__control--value');
const scaleSmallerButton = uploadForm.querySelector('.scale__control--smaller');
const scaleBiggerButton = uploadForm.querySelector('.scale__control--bigger');

let currentBlobUrl = null;
let scaleController;

const submitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Сохраняю...',
};

const disableButton = (text) => {
  submitButton.disabled = true;
  submitButton.textContent = text;
};

const enableButton = (text) => {
  submitButton.disabled = false;
  submitButton.textContent = text;
};

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'pristine-error',
  errorClass: 'img-upload__field-wrapper--error'
});

const showMessage = (templateId, closeCallback) => {
  const template = document.querySelector(templateId);
  const message = template.content.cloneNode(true);
  const modal = message.querySelector(templateId === '#success' ? '.success' : '.error');

  document.body.appendChild(message);

  const closeModal = () => {
    modal.remove();
    document.removeEventListener('keydown', onEscKeyDown);
    document.removeEventListener('click', onClickOutside);
    if (closeCallback) {
      closeCallback();
    }
  };

  function onEscKeyDown(evt) {
    if (isEscapeKey(evt)) {
      closeModal();
    }
  }

  function onClickOutside(evt) {
    const innerClass = templateId === '#success' ? '.success__inner' : '.error__inner';
    if (!evt.target.closest(innerClass)) {
      closeModal();
    }
  }

  const button = modal.querySelector(templateId === '#success' ? '.success__button' : '.error__button');
  button.addEventListener('click', closeModal);
  document.addEventListener('keydown', onEscKeyDown);
  document.addEventListener('click', onClickOutside);
};

const showSuccessMessage = () => showMessage('#success');
const showErrorMessage = () => showMessage('#error');

const resetForm = () => {
  uploadForm.reset();
  pristine.reset();

  scaleController.resetScale();

  previewImage.style.filter = 'none';
  previewImage.className = '';
  const effectNoneInput = uploadForm.querySelector('#effect-none');
  if (effectNoneInput) {
    effectNoneInput.checked = true;
  }

  const effectLevelSlider = uploadForm.querySelector('.effect-level__slider');
  const effectLevelValue = uploadForm.querySelector('.effect-level__value');
  const sliderContainer = uploadForm.querySelector('.img-upload__effect-level');

  if (effectLevelSlider) {
    effectLevelSlider.noUiSlider.reset();
    sliderContainer.style.display = 'none';
  }

  if (effectLevelValue) {
    effectLevelValue.value = '';
  }

  previewImage.src = 'img/upload-default-image.jpg';

  const effectsPreviews = uploadForm.querySelectorAll('.effects__preview');
  effectsPreviews.forEach((preview) => {
    preview.style.backgroundImage = '';
  });

  uploadFileInput.value = '';

  if (currentBlobUrl) {
    URL.revokeObjectURL(currentBlobUrl);
    currentBlobUrl = null;
  }

  enableButton(submitButtonText.IDLE);
};

const closeUploadModal = () => {
  photoEditorForm.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  resetForm();
};

const onPhotoEditorResetButtonClick = () => closeUploadModal();

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();

    if (document.activeElement === hashtagInput || document.activeElement === commentInput) {
      evt.stopPropagation();
      return;
    }

    const errorElement = document.querySelector('.error');
    if (errorElement && !errorElement.classList.contains('hidden')) {
      errorElement.remove();
      return;
    }

    closeUploadModal();
  }
}

const validateComment = (value) => value.length <= 140;

const onFormSubmit = (evt) => {
  evt.preventDefault();

  if (pristine.validate()) {
    submitButton.disabled = true;
    hashtagInput.value = hashtagInput.value.trim().replaceAll(/\s+/g, ' ');
    disableButton(submitButtonText.SENDING);
    uploadPhoto(new FormData(uploadForm))
      .then(() => {
        showSuccessMessage();
        closeUploadModal();
      })
      .catch(() => {
        showErrorMessage();
      })
      .finally(() => {
        enableButton(submitButtonText.IDLE);
        submitButton.disabled = false;
      });
  }
};

const initUploadModal = () => {
  hashtagInput.disabled = false;
  hashtagInput.readOnly = false;
  hashtagInput.removeAttribute('disabled');

  scaleController = initPhotoScale({
    scaleControlInput,
    previewImage,
    scaleSmallerButton,
    scaleBiggerButton
  });

  uploadFileInput.addEventListener('change', () => {
    const file = uploadFileInput.files[0];

    if (!file) {
      return;
    }

    const fileName = file.name.toLowerCase();
    const fileExt = fileName.split('.').pop();
    const matches = FILE_TYPES.includes(fileExt);

    if (!matches) {
      showToastError('Неверный тип файла');
      return;
    }

    const previewImg = uploadForm.querySelector('.img-upload__preview img');
    const effectsPreviews = uploadForm.querySelectorAll('.effects__preview');

    if (currentBlobUrl) {
      URL.revokeObjectURL(currentBlobUrl);
    }

    currentBlobUrl = URL.createObjectURL(file);
    previewImg.src = currentBlobUrl;

    effectsPreviews.forEach((preview) => {
      preview.style.backgroundImage = `url(${currentBlobUrl})`;
    });

    photoEditorForm.classList.remove('hidden');
    bodyElement.classList.add('modal-open');
    hashtagInput.disabled = false;
    hashtagInput.readOnly = false;
    pristine.reset();

    photoEditorResetButton.addEventListener('click', onPhotoEditorResetButtonClick);
    document.addEventListener('keydown', onDocumentKeydown);
  });

  uploadForm.addEventListener('submit', onFormSubmit);

  pristine.addValidator(hashtagInput, checkHashtagsValidity, () => errorMessage, 2, true);
  pristine.addValidator(commentInput, validateComment, 'Длина комментария больше 140 символов');
};

export { initUploadModal };
