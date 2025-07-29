import { renderPack } from './utils/dom.js';

const COUNT_STEP = 5;
let currentCount = 0;
let currentComments = [];

const socialCommentsNode = document.querySelector('.social__comments');
const socialCommentsTemplate = document.querySelector('.social__comment');
const commentsCountNode = document.querySelector('.social__comment-count');
const commentsLoaderNode = document.querySelector('.social__comments-loader');

// Функция создания одного комментария
const createComment = (comment) => {
  const commentElement = socialCommentsTemplate.cloneNode(true);
  commentElement.querySelector('.social__picture').src = comment.avatar;
  commentElement.querySelector('.social__picture').alt = comment.name;
  commentElement.querySelector('.social__text').textContent = comment.message;
  return commentElement;
};

// Рендер порции комментариев с использованием renderPack
const renderCommentsPortion = () => {
  const portion = currentComments.slice(currentCount, currentCount + COUNT_STEP);

  renderPack(
    portion,
    createComment,
    socialCommentsNode
  );

  currentCount += portion.length;

  // Обновляем счетчик
  commentsCountNode.innerHTML = `${currentCount} из <span class="comments-count">${currentComments.length}</span>`;

  // Скрываем кнопку если все загружено
  if (currentCount >= currentComments.length) {
    commentsLoaderNode.classList.add('hidden');
  }
};

// Очистка комментариев
const clearComments = () => {
  currentCount = 0;
  socialCommentsNode.innerHTML = '';
  commentsLoaderNode.classList.remove('hidden');
  commentsLoaderNode.removeEventListener('click', renderCommentsPortion);
};

// Инициализация комментариев
const initComments = (comments) => {
  currentComments = comments;
  clearComments();
  renderCommentsPortion();
  commentsLoaderNode.addEventListener('click', renderCommentsPortion);
};

export { initComments, clearComments };
