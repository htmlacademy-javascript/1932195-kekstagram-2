import { getRandomInteger, getRandomArrayElement, } from './utils/random.js';
import { getDataArray, } from './data.js';

// Константы для настройки генерации
const {NAMES, MESSAGES, DESCRIPTIONS,} = getDataArray();
const PHOTOS_COUNT = 25;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_COMMENTS = 0;
const MAX_COMMENTS = 30;
const MIN_AVATAR_ID = 1;
const MAX_AVATAR_ID = 6;

// Генератор уникальных ID для комментариев
const createIdGenerator = () => {
  let lastGeneratedId = 0;

  return () => {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

const generateCommentId = createIdGenerator();

// Функция для создания одного комментария
const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(MIN_AVATAR_ID, MAX_AVATAR_ID)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

// Функция для создания одного объекта фотографии
const createPhoto = (id) => ({
  id,
  url: `photos/${id}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
  comments: Array.from(
    { length: getRandomInteger(MIN_COMMENTS, MAX_COMMENTS) },
    createComment
  ),
});

// Функция для генерации массива фотографий
const generatePhotos = () => Array.from(
  { length: PHOTOS_COUNT },
  (_, index) => createPhoto(index + 1)
);

// Генерируем массив фотографий
const photos = generatePhotos();

export { photos };
