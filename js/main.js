import { picturesContainer, initThumbnails } from './thumbnails.js';
import { openBigPicture } from './render-photo.js';
import { initUploadModal } from './upload-photo-form.js';
import { configFilter } from './filter.js';
import { showDataError } from './utils/error.js';
import { initEffectRadios } from './effects-slider.js';

const initApp = () => {
  // Инициализация формы загрузки (в своём контейнере)
  initUploadModal();

  initThumbnails()
    .then((photos) => {
      configFilter(photos);

      picturesContainer.addEventListener('click', (evt) => {
        const currentPictureNode = evt.target.closest('.picture');
        if (currentPictureNode) {
          evt.preventDefault();
          openBigPicture(currentPictureNode.dataset.pictureId);
        }
      });
    })
    .catch(showDataError);

  initEffectRadios();
};

document.addEventListener('DOMContentLoaded', initApp);

