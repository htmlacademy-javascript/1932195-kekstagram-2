// import { isEscapeKey } from './utils/escape.js';
// import { onEffectChange } from './effects-slider.js';
// import { error, isHashtagsValid } from './check-hashtag-validity.js';

// const SCALE_STEP = 0.25;

// const uploadForm = document.querySelector('.img-upload__form');
// const pageBody = document.querySelector('body');

// const uploadFileControl = uploadForm.querySelector('#upload-file');
// const photoEditorForm = uploadForm.querySelector('.img-upload__overlay');
// const photoEditorResetBtn = photoEditorForm.querySelector('#upload-cancel');

// const hashtagInput = uploadForm.querySelector('.text__hashtags');
// const commentInput = uploadForm.querySelector('.text__description');

// // const imgUploadCancel = imgUploadForm.querySelector('.img-upload__cancel');
// const smaller = uploadForm.querySelector('.scale__control--smaller');
// const bigger = uploadForm.querySelector('.scale__control--bigger');
// const img = uploadForm.querySelector('.img-upload__preview img');
// const scaleControl = uploadForm.querySelector('.scale__control--value');
// // const effectLevel = uploadForm.querySelector('.img-upload__effect-level');
// const effectList = uploadForm.querySelector('.effects__list');

// let scale = 1;

// const pristine = new Pristine(uploadForm, {
//   classTo: 'img-upload__form',
//   errorTextParent: 'img-upload__field-wrapper',
//   errorTextClass: 'img-upload__field-wrapper--error',
// });


// const onPhotoEditorResetBtnClick = () => closePhotoEditor();

// const onDocumentKeydown = (evt) => {
//   if (isEscapeKey(evt)) {
//     evt.preventDefault();
//     if(document.activeElement === hashtagInput || document.activeElement === commentInput) {
//       evt.stopPropagation();
//     } else {
//       uploadForm.reset();
//       closePhotoEditor();
//     }
//   }
// };

// function closePhotoEditor () {
//   photoEditorForm.classList.add('hidden');
//   pageBody.classList.remove('modal-open');
//   document.removeEventListener('keydown', onDocumentKeydown);
//   photoEditorResetBtn.removeEventListener('click', onPhotoEditorResetBtnClick);
//   uploadFileControl.value = '';
// }

// const onSmallerClick = () => {
//   if (scale > SCALE_STEP) {
//     scale -= SCALE_STEP;
//     img.style.transform = `scale(${scale})`;
//     scaleControl.value = `${scale * 100}%`;
//   }
// };

// const onBiggerClick = () => {
//   if (scale < 1) {
//     scale += SCALE_STEP;
//     img.style.transform = `scale(${scale})`;
//     scaleControl.value = `${scale * 100}%`;
//   }
// };

// const onHashtagInput = () => {
//   isHashtagsValid(hashtagInput.value);
// };

// const onFormSubmit = (evt) => {
//   evt.preventDefault();

//   if (pristine.validate()) {
//     hashtagInput.value = hashtagInput.value.trim().replaceAll(/\s+/g, '');
//     uploadForm.submit();
//   }
// };

// export const initUploadModal = () => {
//   uploadFileControl.addEventListener('change', () => {
//     photoEditorForm.classList.remove('hidden');
//     pageBody.classList.add('modal-open');
//     photoEditorResetBtn.addEventListener('click', onPhotoEditorResetBtnClick);
//     document.addEventListener('keydown', onDocumentKeydown);
//   });
// };

// pristine.addValidator(hashtagInput, isHashtagsValid, error, 2, false);

// smaller.addEventListener('click', onSmallerClick);

// bigger.addEventListener('click', onBiggerClick);

// effectList.addEventListener('change', onEffectChange);

// hashtagInput.addEventListener('input', onHashtagInput);

// uploadForm.addEventListener('submit', onFormSubmit);

import { isEscapeKey } from './utils/escape.js';
import { initEffectsSlider } from './effects-slider.js';
import { error, isHashtagsValid } from './check-hashtag-validity.js';

const SCALE_STEP = 0.25;
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

let scale = 1;

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__form',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const onPhotoEditorResetBtnClick = () => closePhotoEditor();

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if(document.activeElement === hashtagInput || document.activeElement === commentInput) {
      evt.stopPropagation();
    } else {
      uploadForm.reset();
      closePhotoEditor();
    }
  }
};

function closePhotoEditor() {
  photoEditorForm.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  photoEditorResetBtn.removeEventListener('click', onPhotoEditorResetBtnClick);
  uploadFileControl.value = '';
  img.style.transform = 'scale(1)';
  scale = 1;
  scaleControl.value = '100%';
}

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

const onHashtagInput = () => {
  isHashtagsValid(hashtagInput.value);
};

const validateComment = (value) => value.length <= 140;

const onFormSubmit = (evt) => {
  evt.preventDefault();

  if (pristine.validate()) {
    hashtagInput.value = hashtagInput.value.trim().replaceAll(/\s+/g, ' ');
    uploadForm.submit();
  }
};

export const initUploadModal = () => {
  uploadFileControl.addEventListener('change', () => {
    photoEditorForm.classList.remove('hidden');
    pageBody.classList.add('modal-open');
    photoEditorResetBtn.addEventListener('click', onPhotoEditorResetBtnClick);
    document.addEventListener('keydown', onDocumentKeydown);

    // Инициализация слайдера эффектов
    initEffectsSlider();
  });

  // Остальные обработчики
  smaller.addEventListener('click', onSmallerClick);
  bigger.addEventListener('click', onBiggerClick);
  hashtagInput.addEventListener('input', onHashtagInput);
  uploadForm.addEventListener('submit', onFormSubmit);

  // Инициализация Pristine
  pristine.addValidator(hashtagInput, isHashtagsValid, error, 2, false);
  pristine.addValidator(commentInput, validateComment, 'Длина комментария больше 140 символов');
};
