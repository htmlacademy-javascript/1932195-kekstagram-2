// import { photos } from './data-generation.js';
// import { initComments, clearComments } from './render-comments.js';
// import { isEscapeKey } from './utils/escape.js';

// const bigPictureNode = document.querySelector('.big-picture');
// const bigPictureImgNode = bigPictureNode.querySelector('.big-picture__img img');
// const likesCountNode = bigPictureNode.querySelector('.likes-count');
// const commentsCaptionNode = bigPictureNode.querySelector('.social__caption');
// const bigPictureCancelNode = bigPictureNode.querySelector('.big-picture__cancel');

// // Обработчики закрытия модального окна
// const onBigPictureCancelClick = (evt) => {
//   evt.preventDefault();
//   closeBigPicture();
// };

// const onEscKeydown = (evt) => {
//   if (isEscapeKey(evt)) {
//     evt.preventDefault();
//     closeBigPicture();
//   }
// };

// // Функция закрытия модального окна
// const closeBigPicture = () => {
//   bigPictureNode.classList.add('hidden');
//   document.body.classList.remove('modal-open');

//   // Удаляем все обработчики
//   bigPictureCancelNode.removeEventListener('click', onBigPictureCancelClick);
//   document.removeEventListener('keydown', onEscKeydown);
//   // bigPictureNode.removeEventListener('click', onOutsideClick);

//   // Очищаем комментарии
//   clearComments();
// };

// // Функция открытия модального окна
// const openBigPicture = (pictureId) => {
//   // Находим фото по ID
//   const currentPhoto = photos.find((photo) => photo.id === Number(pictureId));

//   // Заполняем данные фото
//   bigPictureImgNode.src = currentPhoto.url;
//   bigPictureImgNode.alt = currentPhoto.description;
//   likesCountNode.textContent = currentPhoto.likes;
//   commentsCaptionNode.textContent = currentPhoto.description;

//   // Инициализируем комментарии с порционной загрузкой
//   initComments(currentPhoto.comments);

//   // Показываем модальное окно
//   bigPictureNode.classList.remove('hidden');
//   document.body.classList.add('modal-open');

//   // Добавляем обработчики
//   bigPictureCancelNode.addEventListener('click', onBigPictureCancelClick);
//   document.addEventListener('keydown', onEscKeydown);
//   // bigPictureNode.addEventListener('click', onOutsideClick);
// };

// export { openBigPicture };

import { initComments, clearComments } from './render-comments.js';
import { isEscapeKey } from './utils/escape.js';

const bigPictureNode = document.querySelector('.big-picture');
const bigPictureImgNode = bigPictureNode.querySelector('.big-picture__img img');
const likesCountNode = bigPictureNode.querySelector('.likes-count');
const commentsCaptionNode = bigPictureNode.querySelector('.social__caption');
const bigPictureCancelNode = bigPictureNode.querySelector('.big-picture__cancel');

let photos = []; // Будем хранить загруженные фото здесь

// Функция для установки фото (будет вызываться из thumbnails.js)
const setPhotos = (loadedPhotos) => {
  photos = loadedPhotos;
};

// Обработчики закрытия модального окна
const onBigPictureCancelClick = (evt) => {
  evt.preventDefault();
  closeBigPicture();
};

const onEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const closeBigPicture = () => {
  bigPictureNode.classList.add('hidden');
  document.body.classList.remove('modal-open');
  bigPictureCancelNode.removeEventListener('click', onBigPictureCancelClick);
  document.removeEventListener('keydown', onEscKeydown);
  clearComments();
};

const openBigPicture = (pictureId) => {
  // Находим фото по ID (теперь работаем с реальными данными)
  const currentPhoto = photos.find((photo) => photo.id === Number(pictureId));

  if (!currentPhoto) {
    console.error('Photo not found');
    return;
  }

  bigPictureImgNode.src = currentPhoto.url;
  bigPictureImgNode.alt = currentPhoto.description;
  likesCountNode.textContent = currentPhoto.likes;
  commentsCaptionNode.textContent = currentPhoto.description;

  initComments(currentPhoto.comments);
  bigPictureNode.classList.remove('hidden');
  document.body.classList.add('modal-open');

  bigPictureCancelNode.addEventListener('click', onBigPictureCancelClick);
  document.addEventListener('keydown', onEscKeydown);
};

export { openBigPicture, setPhotos };
