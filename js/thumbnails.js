import { findTemplate, renderPack } from './utils/dom.js';
import { setPhotos } from './render-photo.js';
import { loadPhotos } from './api.js';

const template = findTemplate('picture');
const container = document.querySelector('.pictures');

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

const initThumbnails = async () => {
  try {
    const photos = await loadPhotos();
    setPhotos(photos);
    renderPack(photos, createThumbnail, container);
    return photos;
  } catch (error) {
    console.error(error.message);
    // Можно добавить fallback на моковые данные
    throw error;
  }
};

export { container, initThumbnails };
