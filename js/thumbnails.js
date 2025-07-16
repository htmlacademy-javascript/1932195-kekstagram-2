import { photos } from './data-generation.js';
import { findTemplate, renderPack, } from './utils/dom.js';

/** @type {HTMLAnchorElement} */
const template = findTemplate('picture');
const container = document.querySelector('.pictures');

const createThumbnail = (photo) => {
/** @type {HTMLAnchorElement} */
  const thumbnail = template.cloneNode(true);
  thumbnail.href = photo.url;
  thumbnail.dataset.id = photo.id;

  const image = thumbnail.querySelector('.picture__img');

  image.src = photo.url;
  image.alt = photo.description;

  thumbnail.querySelector('.picture__comments').textContent = photo.comments.length;
  thumbnail.querySelector('.picture__likes').textContent = photo.likes;

  return thumbnail;
};

export const renderThumbnails = (photos) => container.append(...photos.map(createThumbnail));

// renderPack(photos, createThumbnail, container);
