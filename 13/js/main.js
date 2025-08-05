import { container, initThumbnails } from './thumbnails.js';
import { openBigPicture } from './render-photo.js';
import { initUploadModal } from './upload-photo-form.js';
import { configFilter } from './filter.js';

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

// const initApp = () => {
//   initUploadModal(); // Инициализируем ДО загрузки фото

//   initThumbnails()
//     .then((photos) => { // Получаем загруженные фото из initThumbnails()
//       configFilter(photos); // Инициализация фильтров с загруженными фото

//       container.addEventListener('click', (evt) => {
//         const currentPictureNode = evt.target.closest('.picture');
//         if (currentPictureNode) {
//           evt.preventDefault();
//           openBigPicture(currentPictureNode.dataset.pictureId);
//         }
//       });
//     })
//     .catch(showDataError);
// };

const initApp = () => {
  // Инициализация формы загрузки (в своём контейнере)
  initUploadModal();

  initThumbnails()
    .then((photos) => {
      configFilter(photos);

      container.addEventListener('click', (evt) => {
        const currentPictureNode = evt.target.closest('.picture');
        if (currentPictureNode) {
          evt.preventDefault();
          openBigPicture(currentPictureNode.dataset.pictureId);
        }
      });
    })
    .catch(showDataError);
};
// const initApp = () => {
//   initThumbnails()
//     .then((photos) => {
//       configFilter(photos);
//       // ... остальная инициализация
//     })
//     .catch((error) => {
//       console.error('Initialization failed:', error);
//       showDataError();
//     });
// };

document.addEventListener('DOMContentLoaded', initApp);
