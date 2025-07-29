// import './thumbnails.js';
// import { picturesNode } from './render-cards.js';
import { container } from './thumbnails.js';
import { openBigPicture } from './render-photo.js';
import { initUploadModal } from './upload-photo-form.js';

// document.addEventListener('DOMContentLoaded', () => {
initUploadModal();
// });

container.addEventListener('click', (evt) => {
  const currentPictureNode = evt.target.closest('.picture');
  if (currentPictureNode) {
    evt.preventDefault();
    openBigPicture(currentPictureNode.dataset.pictureId);
  }
});

