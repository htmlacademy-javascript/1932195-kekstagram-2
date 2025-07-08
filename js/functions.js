// function checksLength (string, maxSymbols) {
// }

const checksLength = (string = '', maxSymbols = 20) => string.length <= maxSymbols;

checksLength();

/**
 * Проверяет, является ли строка палиндромом
 * @param {*} string
 * @returns {boolean}
 */
const isPalindrome = (string = '') => {
  const normalizedString = string.replace(/\s+/g, '').toLowerCase();

  return normalizedString === [...normalizedString].reverse().join('');
};

isPalindrome();

// или
const isPalindrome1 = (string = '') => {

  string = string.replaceAll(' ', '').toLowerCase();

  let revers = '';

  for (let i = string.length - 1; i >= 0; i--) {
    revers += string[i];
  }

  return string === revers;
};

isPalindrome1();

/**
 * Принимает строку и извлекает содержащиеся в ней цифры
 * @param {*} string - строка
 * @returns {number|NaN}
 */
const extractNumbers = (string = '') => Math.abs(parseInt(string.replace(/\D+/g, ''), 10));

extractNumbers();

// или
// function stringToNumber(str) {
//   return Number(
//     [...str].filter((item) => !isNaN(parseInt(item, 10))).join('') || NaN
//   );
// }

// stringToNumber();
