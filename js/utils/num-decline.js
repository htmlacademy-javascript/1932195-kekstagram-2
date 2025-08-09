/**
 * Функция для склонения слова в зависимости от числа
 * @param {number} num - Число
 * @param {string} nominative - Именительный падеж (1 хештег)
 * @param {string} genitiveSingular - Родительный падеж единственного числа (2 хештега)
 * @param {string} genitivePlural - Родительный падеж множественного числа (5 хештегов)
 * @returns {string} - Правильная форма слова
 */
export const declineNumber = (num, nominative, genitiveSingular, genitivePlural) => {
  // Для чисел, оканчивающихся на 0 или от 5 до 20, используем множественное число
  if (num % 10 === 0 || (num % 100 >= 5 && num % 100 <= 20)) {
    return genitivePlural;
  }

  // Для чисел, оканчивающихся на 1 (кроме 11) - именительный падеж
  if (num % 10 === 1 && num % 100 !== 11) {
    return nominative;
  }

  // Для чисел 2-4 (кроме 12-14) - родительный падеж единственного числа
  if (num % 10 >= 2 && num % 10 <= 4 && !(num % 100 >= 12 && num % 100 <= 14)) {
    return genitiveSingular;
  }

  // Во всех остальных случаях - множественное число
  return genitivePlural;
};
