const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const ErrorText = {
  GET: 'Не удалось загрузить данные',
  POST: 'Не удалось отправить данные',
  NETWORK: 'Произошла сетевая ошибка',
};

/**
 * Базовый запрос к серверу
 * @param {string} url - URL для запроса
 * @param {string} method - HTTP метод (GET/POST)
 * @param {object} [body] - Тело запроса для POST
 * @returns {Promise<object>} - Промис с ответом сервера
 */
const request = (url, method = Method.GET, body = null) => {
  const options = { method };

  if (body) {
    options.body = body;
  }

  return fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error(ErrorText[method] || `HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
        throw new Error(ErrorText.NETWORK);
      }
      throw error;
    });
};

/**
 * Загружает фотографии с сервера
 * @returns {Promise<Array>} - Промис с массивом фотографий
 */
const loadPhotos = () => request(`${BASE_URL}${Route.GET_DATA}`, Method.GET);

/**
 * Отправляет фотографию на сервер
 * @param {FormData} formData - Данные формы для отправки
 * @returns {Promise<object>} - Промис с ответом сервера
 */
const uploadPhoto = (formData) => request(`${BASE_URL}${Route.SEND_DATA}`, Method.POST, formData);

export { loadPhotos, uploadPhoto };
