import { isEscapeKey } from './utils/escape.js';
import { initEffectsSlider, resetEffects } from './effects-slider.js';
import { isHashtagsValid } from './check-hashtag-validity.js';
import { uploadPhoto } from './api.js';
import { showTostError } from './utils/error.js';

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
  classTo: 'img-upload__form',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
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
  scale = 1;
  scaleControl.value = '100%';
  img.style.transform = 'scale(1)';

  // Сбрасываем изображение предпросмотра
  const previewImg = uploadForm.querySelector('.img-upload__preview img');
  previewImg.src = 'img/upload-default-image.jpg';

  // Сбрасываем миниатюры эффектов
  const effectsPreviews = uploadForm.querySelectorAll('.effects__preview');
  effectsPreviews.forEach((preview) => {
    preview.style.backgroundImage = '';
  });

  resetEffects();
  uploadFileControl.value = '';
};

// Закрытие формы
const closeUploadModal = () => {
  photoEditorForm.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  photoEditorResetBtn.removeEventListener('click', onPhotoEditorResetBtnClick);
  resetForm();
};

const onPhotoEditorResetBtnClick = () => closeUploadModal();

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (document.activeElement === hashtagInput || document.activeElement === commentInput) {
      evt.stopPropagation();
    } else {
      closeUploadModal();
    }
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
  uploadFileControl.addEventListener('change', () => {
    const file = uploadFileControl.files[0];

    if (!file) {
      return;
    }

    // Проверяем тип файла по расширению
    const fileName = file.name.toLowerCase();
    const fileExt = fileName.split('.').pop();
    const matches = FILE_TYPES.includes(fileExt);

    if (!matches) {
      showTostError('Неверный тип файла');
      return;
    }

    const previewImg = uploadForm.querySelector('.img-upload__preview img');
    const effectsPreviews = uploadForm.querySelectorAll('.effects__preview');

    const reader = new FileReader();

    reader.addEventListener('load', () => {
      // Устанавливаем загруженное изображение в src основного превью
      previewImg.src = reader.result;

      // Устанавливаем изображение для всех миниатюр эффектов
      effectsPreviews.forEach((preview) => {
        preview.style.backgroundImage = `url(${reader.result})`;
      });

      // Показываем форму редактирования
      photoEditorForm.classList.remove('hidden');
      pageBody.classList.add('modal-open');

      // Инициализируем остальные компоненты
      photoEditorResetBtn.addEventListener('click', onPhotoEditorResetBtnClick);
      document.addEventListener('keydown', onDocumentKeydown);
      initEffectsSlider();
    });

    reader.readAsDataURL(file);
  });

  smaller.addEventListener('click', onSmallerClick);
  bigger.addEventListener('click', onBiggerClick);
  uploadForm.addEventListener('submit', onFormSubmit);

  pristine.addValidator(hashtagInput, isHashtagsValid, 'Некорректный хэштег', 2, false);
  pristine.addValidator(commentInput, validateComment, 'Длина комментария больше 140 символов');
};
