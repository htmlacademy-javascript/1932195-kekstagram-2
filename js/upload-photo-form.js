import { isEscapeKey } from './utils/escape.js';
// import { onEffectChange } from './effects-slider.js';
import { error, isHashtagsValid } from './check-hashtag-validity.js';

const SCALE_STEP = 0.25;

const uploadForm = document.querySelector('.img-upload__form');
const pageBody = document.querySelector('body');

const uploadFileControl = uploadForm.querySelector('#upload-file');
const photoEditorForm = uploadForm.querySelector('.img-upload__overlay');
const photoEditorResetBtn = photoEditorForm.querySelector('#upload-cancel');

const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');

// const imgUploadCancel = imgUploadForm.querySelector('.img-upload__cancel');
const smaller = uploadForm.querySelector('.scale__control--smaller');
const bigger = uploadForm.querySelector('.scale__control--bigger');
const img = uploadForm.querySelector('.img-upload__preview');
const scaleControl = uploadForm.querySelector('.scale__control--value');
const effectLevel = uploadForm.querySelector('.img-upload__effect-level');
const effectList = uploadForm.querySelector('.effects__list');

const scale = 1;

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

function closePhotoEditor () {
  photoEditorForm.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  photoEditorResetBtn.removeEventListener('click', onPhotoEditorResetBtnClick);
  uploadFileControl.value = '';
}

const onSmallerClick = () => {
  if (scale > SCALE_STEP) {
    img.style.transform = `scale(${scale -= SCALE_STEP})`;
    scaleControl.value = `${scale * 100}%`;
  }
};

const onBiggerclick = () => {
  if (scale < 1) {
    img.style.transform = `scale(${scale += SCALE_STEP})`;
    scaleControl.value = `${scale * 100}%`;
  }
};

const onHashtagInput = () => {
  isHashtagsValid(hashtagInput.value);
};

const onFormSubmit = (evt) => {
  evt.preventDefault();

  if (pristine.validate()) {
    hashtagInput.value = hashtagInput.value.trim().replaceAll(/\s+/g, '');
    uploadForm.submit();
  }
};

export const initUploadModal = () => {
  uploadFileControl.addEventListener('change', () => {
    photoEditorForm.classList.remove('hidden');
    pageBody.classList.add('modal-open');
    photoEditorResetBtn.addEventListener('click', onPhotoEditorResetBtnClick);
    document.addEventListener('keydown', onDocumentKeydown);
  });
};

pristine.addValidator(hashtagInput, isHashtagsValid, error, 2, false);

smaller.addEventListener('click', onSmallerClick);

bigger.addEventListener('click', onBiggerclick);

// effectList.addEventListener('change', onEffectChange);

hashtagInput.addEventListener('input', onHashtagInput);

uploadForm.addEventListener('submit', onFormSubmit);

// const pristine = new Pristine(uploadForm, {
//   classTo: 'img-upload__field-wrapper',
//   errorClass: 'img-upload__field-wrapper--error',
//   errorTextParent: 'img-upload__field-wrapper',
// });
// pristine.addValidator(hashtagInput, (value) => {
//   const hasNumber = /\d/.test(value);
//   return !hasNumber;
// }, 'Ошибка');
// pristine.addValidator(commentInput, (value) => {
//   const isValid = value.length <= 140;
//   return isValid;
// }, 'Ошибка');


