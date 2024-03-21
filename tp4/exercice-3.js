// Manipulation du DOM

/**
 * Crée un élément HTML et lui ajoute du texte
 *
 * @param {string} tag - Le type de l'élément HTML (div, span, p, etc.)
 * @param {string} text - Le texte contenu dans l'élément
 * @returns {HTMLElement} - L'élément HTML créé
 *
 * @example
 * const element = createElement('p', 'Hello world');
 * document.body.appendChild(element);
 */
export function createElement(tag, text) {
  // A compléter
  let element = document.createElement(tag);
  element.innerText = text;
  return element
}

/**
 * Ajoute une classe à un tableau d'éléments
 *
 * @param {HTMLElement[]} elements - Un tableau d'éléments HTML
 * @param {string} className - La classe à ajouter
 * @example
 * const elements = Array.from(document.querySelectorAll('.emoji-card'));
 * addClass(elements, 'hidden'); // Ajoute la classe 'hidden' à tous les éléments '.emoji-card'
 */
export function addClass(elements, className) {
  // A compléter
  elements.forEach( element => element.className += className)
}

/**
 * Trie les éléments d'un tableau selon leur attribut data-*
 *
 * @param {HTMLElement[]} elements - Un tableau d'éléments HTML
 * @param {string} dataAttribute - L'attribut data-* à utiliser pour le tri
 * @returns {HTMLElement[]} - Le tableau d'éléments trié
 *
 * @example
 * <ul class="todo-list">
 *  <li data-priority="3">Faire les courses</li>
 *  <li data-priority="1">Appeler le plombier</li>
 *  <li data-priority="2">Acheter des fleurs</li>
 * </ul>
 * sortElements(Array.from(document.querySelectorAll('.todo-list > li')), 'data-priority');
 * // Retourne les li triés par priorité
 *
 **/
export function sortElements(elements, dataAttribute) {
  // A compléter
  return elements.sort((element1, element2) => {
    return element1.dataset[dataAttribute] - element2.dataset[dataAttribute];
  })

  // A noter, on peut accéder à un attribut data-* d'un élément avec la propriété `dataset`
  // Par exemple, si on ajoute l'attribut data-priority à un élément, on peut y accéder avec `element.dataset.priority`
}

/**
 * Retourne une fonction qui, lorsqu'elle est appelée, ajoute ou enlève une classe à un élément
 *
 * @param {HTMLElement} element - L'élément HTML à modifier
 * @param {string} className - La classe à ajouter ou enlever
 * @returns {function} - La fonction qui ajoute ou enlève la classe à l'élément lorsqu'elle est appelée
 *
 * @example
 * const togleHidden = createToggleCallback(document.querySelector('.emoji-card'), 'hidden');
 * togleHidden(); // Ajoute la classe 'hidden' à l'élément
 * togleHidden(); // Enlève la classe 'hidden' de l'élément
 */
export function createToggleCallback(element, className) {
  // A compléter
  // On pourra utiliser la méthode `classList.toggle` pour ajouter ou enlever la classe
  return () => element.classList.toggle(className);
}
