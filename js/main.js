import { container, initThumbnails } from './thumbnails.js';
import { openBigPicture } from './render-photo.js';
import { initUploadModal } from './upload-photo-form.js';

/**
 * Показывает сообщение об ошибке загрузки данных
 */
const showDataError = () => {
  const dataErrorTemplate = document.querySelector('#data-error');
  const dataErrorElement = dataErrorTemplate.content.cloneNode(true);
  const errorElement = dataErrorElement.querySelector('.data-error');

  document.body.appendChild(dataErrorElement);

  setTimeout(() => {
    errorElement.remove();
  }, 5000);
};

const initApp = () => {
  initThumbnails()
    .then(() => {
      initUploadModal();

      container.addEventListener('click', (evt) => {
        const currentPictureNode = evt.target.closest('.picture');
        if (currentPictureNode) {
          evt.preventDefault();
          openBigPicture(currentPictureNode.dataset.pictureId);
        }
      });
    })
    .catch((error) => {
      console.error('Ошибка инициализации приложения:', error);
      showDataError();
    });
};

document.addEventListener('DOMContentLoaded', initApp);
