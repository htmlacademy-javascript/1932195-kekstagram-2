// import { findTemplate, renderPack } from './utils/dom.js';
// import { setPhotos } from './render-photo.js';
// import { loadPhotos } from './api.js';

// const template = findTemplate('picture');
// const container = document.querySelector('.pictures');

// const createThumbnail = (photo) => {
//   const thumbnail = template.cloneNode(true);
//   thumbnail.href = `#${photo.id}`;
//   thumbnail.dataset.pictureId = photo.id;

//   const image = thumbnail.querySelector('.picture__img');
//   image.src = photo.url;
//   image.alt = photo.description;

//   thumbnail.querySelector('.picture__comments').textContent = photo.comments.length;
//   thumbnail.querySelector('.picture__likes').textContent = photo.likes;

//   return thumbnail;
// };

// const initThumbnails = async () => {
//   try {
//     const photos = await loadPhotos();
//     setPhotos(photos);
//     renderPack(photos, createThumbnail, container);
//     return photos;
//   } catch (error) {
//     showDataError(error.message); // Показываем ошибку пользователю
//     throw error; // Пробрасываем для возможной обработки в .catch()
//   }
// };

// export { container, initThumbnails };

import { findTemplate, renderPack } from './utils/dom.js';
import { setPhotos } from './render-photo.js';
import { loadPhotos } from './api.js';

const template = findTemplate('picture');
// const container = document.querySelector('.pictures');
const container = document.querySelector('.pictures'); // Только для миниатюр
const uploadContainer = document.querySelector('.img-upload'); // Контейнер формы

const clearThumbnails = () => {
  const uploadSection = container.querySelector('.img-upload');
  const title = container.querySelector('.pictures__title');

  container.innerHTML = ''; // Очищаем полностью

  if (title) {
    container.appendChild(title); // Восстанавливаем заголовок
  }

  if (uploadSection) {
    container.appendChild(uploadSection); // Восстанавливаем форму загрузки
  }
};

const createThumbnail = (photo) => {
  const thumbnail = template.cloneNode(true);
  thumbnail.href = `#${photo.id}`;
  thumbnail.dataset.pictureId = photo.id;

  const image = thumbnail.querySelector('.picture__img');
  image.src = photo.url;
  image.alt = photo.description;

  thumbnail.querySelector('.picture__comments').textContent = photo.comments.length;
  thumbnail.querySelector('.picture__likes').textContent = photo.likes;

  return thumbnail;
};

// Функция только для рендеринга (без загрузки)
const renderThumbnails = (photos) => {
  clearThumbnails();
  setPhotos(photos);
  renderPack(photos, createThumbnail, container);
};

// Функция для первоначальной загрузки
const initThumbnails = async () => {
  try {
    const photos = await loadPhotos();
    renderThumbnails(photos);
    return photos; // Возвращаем для использования в фильтрах
  } catch (error) {
    console.error('Failed to load photos:', error);
    throw error;
  }
};

export { initThumbnails, renderThumbnails, clearThumbnails, container };
