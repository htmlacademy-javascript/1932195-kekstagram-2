// Функция для генерации случайного числа в диапазоне
const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Функция для генерации случайного элемента из массива
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

export { getRandomInteger, getRandomArrayElement, };
