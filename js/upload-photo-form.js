import { isEscapeKey } from './utils/escape.js';
import { isHashtagsValid, errorMessage } from './check-hashtag-validity.js';
import { uploadPhoto } from './api.js';
import { showToastError } from './utils/error.js';

const DEFAULT_SCALE = 1;
const SCALE_STEP = 0.25;
const FILE_TYPES = ['jpg', 'jpeg', 'png', 'webp',];
const uploadForm = document.querySelector('.img-upload__form');
const pageBody = document.querySelector('body');
const uploadFileControl = uploadForm.querySelector('#upload-file');
const photoEditorForm = uploadForm.querySelector('.img-upload__overlay');
const photoEditorResetBtn = photoEditorForm.querySelector('#upload-cancel');
const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');
const smaller = uploadForm.querySelector('.scale__control--smaller');
const bigger = uploadForm.querySelector('.scale__control--bigger');
const img = uploadForm.querySelector('.img-upload__preview img');
const scaleControl = uploadForm.querySelector('.scale__control--value');
const submitButton = uploadForm.querySelector('.img-upload__submit');

let scale = 1;
let currentBlobUrl = null;

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
  classTo: 'img-upload__field-wrapper', // Родительский элемент
  errorTextParent: 'img-upload__field-wrapper', // Куда вставлять ошибку
  errorTextClass: 'pristine-error', // Класс для текста ошибки
  errorClass: 'img-upload__field-wrapper--error' // Класс для родителя
});

// Функции для работы с сообщениями
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

  const onEscKeyDown = (evt) => {
    if (isEscapeKey(evt)) {
      closeModal();
    }
  };

  const onClickOutside = (evt) => {
    const innerClass = templateId === '#success' ? '.success__inner' : '.error__inner';
    if (!evt.target.closest(innerClass)) {
      closeModal();
    }
  };

  const button = modal.querySelector(templateId === '#success' ? '.success__button' : '.error__button');
  button.addEventListener('click', closeModal);
  document.addEventListener('keydown', onEscKeyDown);
  document.addEventListener('click', onClickOutside);
};

const showSuccessMessage = () => showMessage('#success');
const showErrorMessage = () => showMessage('#error');

// Сброс формы
const resetForm = () => {
  uploadForm.reset();
  pristine.reset();

  // Сбрасываем масштаб
  scale = DEFAULT_SCALE;
  scaleControl.value = `${DEFAULT_SCALE * 100}%`;
  img.style.transform = `scale(${DEFAULT_SCALE})`;

  // Сбрасываем эффекты
  img.style.filter = 'none';
  img.className = '';
  const effectNoneInput = uploadForm.querySelector('#effect-none');
  if (effectNoneInput) {
    effectNoneInput.checked = true;
  }

  // Сбрасываем слайдер
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

  // Сбрасываем изображение предпросмотра
  const previewImg = uploadForm.querySelector('.img-upload__preview img');
  previewImg.src = 'img/upload-default-image.jpg';

  // Сбрасываем миниатюры эффектов
  const effectsPreviews = uploadForm.querySelectorAll('.effects__preview');
  effectsPreviews.forEach((preview) => {
    preview.style.backgroundImage = '';
  });

  // Очищаем поле загрузки файла
  uploadFileControl.value = '';

  // Освобождаем Blob URL если был
  if (currentBlobUrl) {
    URL.revokeObjectURL(currentBlobUrl);
    currentBlobUrl = null;
  }

  // Сбрасываем состояние кнопки
  enableButton(submitButtonText.IDLE);
};

const closeUploadModal = () => {
  photoEditorForm.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  resetForm();
};

const onPhotoEditorResetBtnClick = () => closeUploadModal();

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();

    // Проверка активных полей ввода
    if (document.activeElement === hashtagInput || document.activeElement === commentInput) {
      evt.stopPropagation();
      return;
    }

    // Проверяем, есть ли открытое сообщение об ошибке
    const errorElement = document.querySelector('.error');
    if (errorElement && !errorElement.classList.contains('hidden')) {
      // Закрываем только сообщение об ошибке
      errorElement.remove();
      return; // Прерываем выполнение, чтобы не закрывать форму
    }

    // Закрытие формы по умолчанию
    closeUploadModal();
  }
};

// Масштабирование
const onSmallerClick = () => {
  if (scale > SCALE_STEP) {
    scale -= SCALE_STEP;
    img.style.transform = `scale(${scale})`;
    scaleControl.value = `${scale * 100}%`;
  }
};

const onBiggerClick = () => {
  if (scale < 1) {
    scale += SCALE_STEP;
    img.style.transform = `scale(${scale})`;
    scaleControl.value = `${scale * 100}%`;
  }
};

// Валидация
const validateComment = (value) => value.length <= 140;

// Отправка формы
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

export const initUploadModal = () => {
// Принудительно активируем поле при инициализации
  hashtagInput.disabled = false;
  hashtagInput.readOnly = false;
  hashtagInput.removeAttribute('disabled');

  uploadFileControl.addEventListener('change', () => {
    const file = uploadFileControl.files[0];

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

    // Освобождаем предыдущий Blob URL
    if (currentBlobUrl) {
      URL.revokeObjectURL(currentBlobUrl);
    }

    // Создаём новый Blob URL
    currentBlobUrl = URL.createObjectURL(file); // Можно использовать file напрямую

    previewImg.src = currentBlobUrl;

    effectsPreviews.forEach((preview) => {
      preview.style.backgroundImage = `url(${currentBlobUrl})`;
    });

    // Показываем форму редактирования
    photoEditorForm.classList.remove('hidden');
    pageBody.classList.add('modal-open');

    // Разблокируем поле
    hashtagInput.disabled = false;
    hashtagInput.readOnly = false;

    // Сбрасываем валидацию
    pristine.reset();

    // Добавляем обработчики
    photoEditorResetBtn.addEventListener('click', onPhotoEditorResetBtnClick);
    document.addEventListener('keydown', onDocumentKeydown);
  });

  smaller.addEventListener('click', onSmallerClick);
  bigger.addEventListener('click', onBiggerClick);
  uploadForm.addEventListener('submit', onFormSubmit);

  pristine.addValidator(hashtagInput, isHashtagsValid, () => errorMessage, 2, true);
  pristine.addValidator(commentInput, validateComment, 'Длина комментария больше 140 символов');
};
