import { findTemplate, renderPack } from './utils/dom.js';
import { setPhotos } from './render-photo.js';
import { loadPhotos } from './api.js';

const template = findTemplate('picture');
const container = document.querySelector('.pictures');

const clearThumbnails = () => {
  const elementsToKeep = [
    container.querySelector('.img-upload'),
    container.querySelector('.pictures__title')
  ].filter(Boolean);

  container.innerHTML = '';
  elementsToKeep.forEach((element) => container.appendChild(element));
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

const renderThumbnails = (photos) => {
  clearThumbnails();
  setPhotos(photos);
  renderPack(photos, createThumbnail, container);
};

const initThumbnails = async () => {
  const photos = await loadPhotos();
  renderThumbnails(photos);
  return photos;
};

export { initThumbnails, renderThumbnails, clearThumbnails, container };
