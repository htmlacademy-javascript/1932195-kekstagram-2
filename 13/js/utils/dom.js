/**
 * Should contain only one child
 * @param {string} id
 */
const findTemplate = (id) => {
  const template = document.getElementById(id);

  if (!template) {
    throw new Error(`Template not found: #${id}`);
  }

  if (!(template instanceof HTMLTemplateElement)) {
    throw new Error(`Element is not a template: #${id}`);
  }

  return template.content.firstElementChild;
};

/**
 * @template Item
 * @param {Item[]} items
 * @param {(item: Item) => HTMLElement} makeElement
 * @param {HTMLElement} container
 * Функцию можно будет использовать для комментариев:
 */
const renderPack = (items, makeElement, container) => {
  const fragment = document.createDocumentFragment();
  items.forEach((item) => fragment.appendChild(makeElement(item)));
  container.appendChild(fragment);
};

export { findTemplate, renderPack, };
