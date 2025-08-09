import { findTemplate, renderPack } from './utils/dom.js';
import { setPhotos } from './render-photo.js';
import { loadPhotos } from './api.js';

const pictureTemplateElement = findTemplate('picture');
const picturesContainerElement = document.querySelector('.pictures');

const clearThumbnails = () => {
  const elements = [
    picturesContainerElement.querySelector('.img-upload'),
    picturesContainerElement.querySelector('.pictures__title')
  ].filter(Boolean);

  picturesContainerElement.innerHTML = '';
  elements.forEach((element) => picturesContainerElement.appendChild(element));
};

const createThumbnailElement = (photo) => {
  const thumbnailElement = pictureTemplateElement.cloneNode(true);
  thumbnailElement.href = `#${photo.id}`;
  thumbnailElement.dataset.pictureId = photo.id;

  const image = thumbnailElement.querySelector('.picture__img');
  image.src = photo.url;
  image.alt = photo.description;

  thumbnailElement.querySelector('.picture__comments').textContent = photo.comments.length;
  thumbnailElement.querySelector('.picture__likes').textContent = photo.likes;

  return thumbnailElement;
};

const renderThumbnails = (photos) => {
  clearThumbnails();
  setPhotos(photos);
  renderPack(photos, createThumbnailElement, picturesContainerElement);
};

const initThumbnails = async () => {
  const photos = await loadPhotos();
  renderThumbnails(photos);
  return photos;
};

export { initThumbnails, renderThumbnails, clearThumbnails, picturesContainerElement as picturesContainer };
