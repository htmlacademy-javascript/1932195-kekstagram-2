import { renderThumbnails } from './thumbnails';
import { debounce } from './utils/debounce';

const SORT_FUNCTIONS = {
  random: () => 0.5 - Math.random(),
  discussed: (a, b) => b.comments.length - a.comments.length,
};

const MAX_PICTURE_COUNT = 10;

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
        .sort(SORT_FUNCTIONS.random)
        .slice(0, MAX_PICTURE_COUNT);
      break;
    case 'filter-discussed':
      filteredPictures = [...pictures]
        .sort(SORT_FUNCTIONS.discussed);
      break;
  }

  debounceRender(filteredPictures);
}

function configFilter(picturesData) {
  if (!picturesData?.length) {
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
