const NAMES = [
  'Елфимко',
  'Пелогеица',
  'Омелка',
  'Осташка',
  'Баженко',
  'Онашка',
];
const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const DESCRIPTIONS = [
  'Отличный день!',
  'Момент, который стоит запомнить.',
  'Как же тут красиво!',
  'Лучший кадр за весь отпуск.',
  'Невероятные цвета.',
  'Этот момент я никогда не забуду.',
  'Природа прекрасна.',
  'Фото на память.',
  'Случайный кадр, который получился лучше запланированных.',
  'Удачное фото!'
];
const PHOTOS_COUNT = 25;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_COMMENTS = 0;
const MAX_COMMENTS = 30;
const MIN_AVATAR_ID = 1;
const MAX_AVATAR_ID = 6;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

// Генератор уникальных ID для комментариев
const createIdGenerator = () => {
  let lastGeneratedId = 0;

  return () => {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

const generateCommentId = createIdGenerator();

// Функция для одного комментария
const comment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(MIN_AVATAR_ID, MAX_AVATAR_ID)}.svg`,
  message: getRandomArrayElement(COMMENTS),
  name: getRandomArrayElement(NAMES),
});

// Функция для одного объекта фотографии
const photo = (id) => ({
  id,
  url: `photos/${id}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
  comments: Array.from({ length: getRandomInteger(MIN_COMMENTS, MAX_COMMENTS) }, comment),
});

// Функция для генерации массива фотографий
const generatePhotos = () => Array.from(
  { length: PHOTOS_COUNT },
  (_, index) => photo(index + 1)
);

// Генерируем массив фотографий
const photos = generatePhotos();

console.log(photos);
