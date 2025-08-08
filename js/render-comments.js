import { renderPack } from './utils/dom.js';

const COUNT_STEP = 5;
let currentCount = 0;
let currentComments = [];

const socialCommentsNode = document.querySelector('.social__comments');
const socialCommentsTemplate = document.querySelector('.social__comment');
const commentsShownCountNode = document.querySelector('.social__comment-shown-count');
const commentsTotalCountNode = document.querySelector('.social__comment-total-count');
const commentsLoaderNode = document.querySelector('.social__comments-loader');

const createComment = (comment) => {
  const commentElement = socialCommentsTemplate.cloneNode(true);
  commentElement.querySelector('.social__picture').src = comment.avatar;
  commentElement.querySelector('.social__picture').alt = comment.name;
  commentElement.querySelector('.social__text').textContent = comment.message;
  return commentElement;
};

const renderCommentsPortion = () => {
  const portion = currentComments.slice(currentCount, currentCount + COUNT_STEP);

  renderPack(portion, createComment, socialCommentsNode);

  currentCount = Math.min(currentCount + COUNT_STEP, currentComments.length);

  // Обновляем счётчики
  commentsShownCountNode.textContent = currentCount;
  commentsTotalCountNode.textContent = currentComments.length;

  // Скрываем кнопку если все загружено
  commentsLoaderNode.classList.toggle('hidden', currentCount >= currentComments.length);
};

const clearComments = () => {
  currentCount = 0;
  socialCommentsNode.innerHTML = '';
  commentsLoaderNode.classList.remove('hidden');
  commentsShownCountNode.textContent = '0';
  commentsTotalCountNode.textContent = '0';
};

const initComments = (comments) => {
  // Удаляем старый обработчик, если был
  commentsLoaderNode.removeEventListener('click', renderCommentsPortion);

  currentComments = comments;
  clearComments();

  // Устанавливаем общее количество
  commentsTotalCountNode.textContent = currentComments.length;

  renderCommentsPortion();

  // Добавляем новый обработчик
  commentsLoaderNode.addEventListener('click', renderCommentsPortion);
};

export { initComments, clearComments };
