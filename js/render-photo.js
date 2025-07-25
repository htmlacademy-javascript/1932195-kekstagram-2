import { photos } from './data-generation.js';
import { initComments, clearComments } from './render-comments.js';

const bigPictureNode = document.querySelector('.big-picture');
const bigPictureImgNode = bigPictureNode.querySelector('.big-picture__img img');
const likesCountNode = bigPictureNode.querySelector('.likes-count');
const commentsCaptionNode = bigPictureNode.querySelector('.social__caption');
const bigPictureCancelNode = bigPictureNode.querySelector('.big-picture__cancel');

// Обработчики закрытия модального окна
const onBigPictureCancelClick = (evt) => {
  evt.preventDefault();
  closeBigPicture();
};

const onEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
};

// const onOutsideClick = (evt) => {
//   if (evt.target === bigPictureNode) {
//     closeBigPicture();
//   }
// };

// Функция закрытия модального окна
const closeBigPicture = () => {
  bigPictureNode.classList.add('hidden');
  document.body.classList.remove('modal-open');

  // Удаляем все обработчики
  bigPictureCancelNode.removeEventListener('click', onBigPictureCancelClick);
  document.removeEventListener('keydown', onEscKeydown);
  // bigPictureNode.removeEventListener('click', onOutsideClick);

  // Очищаем комментарии
  clearComments();
};

// Функция открытия модального окна
const openBigPicture = (pictureId) => {
  // Находим фото по ID
  const currentPhoto = photos.find((photo) => photo.id === Number(pictureId));

  // if (!currentPhoto) {
  //   console.error(`Photo with ID ${pictureId} not found`);
  //   return;
  // }

  // Заполняем данные фото
  bigPictureImgNode.src = currentPhoto.url;
  bigPictureImgNode.alt = currentPhoto.description;
  likesCountNode.textContent = currentPhoto.likes;
  commentsCaptionNode.textContent = currentPhoto.description;

  // Инициализируем комментарии с порционной загрузкой
  initComments(currentPhoto.comments);

  // Показываем модальное окно
  bigPictureNode.classList.remove('hidden');
  document.body.classList.add('modal-open');

  // Добавляем обработчики
  bigPictureCancelNode.addEventListener('click', onBigPictureCancelClick);
  document.addEventListener('keydown', onEscKeydown);
  // bigPictureNode.addEventListener('click', onOutsideClick);
};

export { openBigPicture };
