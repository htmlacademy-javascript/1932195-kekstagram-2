import { photos } from './data-generation.js';

const picturesNode = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesFragment = document.createDocumentFragment();

photos.forEach(({id, url, comments, likes}) => {
  const pictureNode = pictureTemplate.cloneNode(true);

  pictureNode.dataset.pictureId = id;
  pictureNode.querySelector('.picture__img').src = url;
  pictureNode.querySelector('.picture__comments').textContent = comments.length;
  pictureNode.querySelector('.picture__likes').textContent = likes;

  picturesFragment.appendChild(pictureNode);
});

picturesNode.appendChild(picturesFragment);

export { picturesNode };
