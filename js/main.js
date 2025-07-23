// import './thumbnails.js';
import { container } from './thumbnails.js';
// import { picturesNode } from './render-cards.js';
import { openBigPicture } from './render-photo.js';

container.addEventListener('click', (evt) => {
  const currentPictureNode = evt.target.closest('.picture');
  if (currentPictureNode) {
    evt.preventDefault();
    openBigPicture(currentPictureNode.dataset.pictureId);
  }
});

