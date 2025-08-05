// import { initThumbnails, clearThumbnails } from './thumbnails';
// import { debounce } from './utils/debounce';

// let currentFilter = 'filter-default';
// let pictures = [];
// const filterElement = document.querySelector('.img-filters');
// const ACTIVE_BUTTON_CLASS = 'img-filters__button--active';

// const debounceRender = debounce(initThumbnails);

// function onFilterCange(evt) {
//   const targetButton = evt.target;
//   const activeButton = document.querySelector(`.${ACTIVE_BUTTON_CLASS}`);
//   if (!targetButton.matches('button')) {
//     return;
//   }

//   if (activeButton === targetButton) {
//     return;
//   }
//   activeButton.classList.toggle(ACTIVE_BUTTON_CLASS);
//   targetButton.classList.toggle(ACTIVE_BUTTON_CLASS);
//   currentFilter = targetButton.getAttribute('id');

//   applyFilter();
// }

// function applyFilter() {
//   let filteredPictures = [];
//   if (currentFilter === 'filter-default') {
//     filteredPictures = pictures;
//   }
//   if (currentFilter === 'filter-random') {
//     filteredPictures = pictures.toSorted(() => 0.5 - Math.random()).slice(0, 10);
//   }
//   if (currentFilter === 'filter-discussed') {
//     filteredPictures = pictures.toSorted((a, b) => b.comments.length - a.comments.length);
//   }
//   debounceRender(filteredPictures);
// }

// function configFilter(picturesData) {
//   filterElement.classList.remove('img-filters--inactive');
//   filterElement.addEventListener('click', onFilterCange);
//   pictures = picturesData;
// }

// export { configFilter };

import { renderThumbnails } from './thumbnails';
import { debounce } from './utils/debounce';

let currentFilter = 'filter-default';
let pictures = [];
const filterElement = document.querySelector('.img-filters');
const ACTIVE_BUTTON_CLASS = 'img-filters__button--active';

// Уменьшаем задержку для отзывчивости
const debounceRender = debounce(renderThumbnails, 300);

function onFilterChange(evt) {
  const targetButton = evt.target.closest('button');
  if (!targetButton) {
    return;
  }

  const activeButton = filterElement.querySelector(`.${ACTIVE_BUTTON_CLASS}`);
  if (activeButton === targetButton) {
    return;
  }

  activeButton?.classList.remove(ACTIVE_BUTTON_CLASS);
  targetButton.classList.add(ACTIVE_BUTTON_CLASS);
  currentFilter = targetButton.id;

  applyFilter();
}

function applyFilter() {
  let filteredPictures = [...pictures];

  switch (currentFilter) {
    case 'filter-random':
      filteredPictures = [...pictures]
        .sort(() => 0.5 - Math.random())
        .slice(0, 10);
      break;
    case 'filter-discussed':
      filteredPictures = [...pictures]
        .sort((a, b) => b.comments.length - a.comments.length);
      break;
  }

  debounceRender(filteredPictures);
}

function configFilter(picturesData) {
  if (!picturesData?.length) {
    console.warn('No pictures data received');
    return;
  }

  pictures = picturesData;
  filterElement.classList.remove('img-filters--inactive');
  filterElement.addEventListener('click', (evt) => {
    if (evt.target.closest('button')) {
      onFilterChange(evt);
    }
  });
}

export { configFilter };
