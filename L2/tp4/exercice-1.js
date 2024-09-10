// Fonctions

/**
 * Appelle la fonction callback n fois, en passant le numéro de l'appel en paramètre
 *
 * @param {number} n - Nombre de fois que la fonction doit être appelée
 * @param {function} callback - Fonction à appeler
 *
 * @example
 * count(3, (i) => {
 *  console.log(i);
 * });
 */
export function count(n, callback) {
  // A compléter
  if(n > 0){
    callback(n)
    count(n-1, callback)
  }
  
}

/**
 * Retourne un compteur
 * Un compteur est un objet qui possède deux fonctions:
 * - increment: incrémente la valeur du compteur de 1
 * - get: retourne la valeur du compteur
 * La valeur du compteur est stockée dans une closure
 *
 * @example
 * const counter = createCounter();
 * counter.get(); // 0
 * counter.increment();
 * counter.get(); // 1
 *
 * @returns {{ increment: function, get: function }}
 */

export function createCounter() {
  // A compléter
  let valeur = 0;
  let compteur = {
      increment : () => {
        valeur += 1;
      },
      get : () => {
        return valeur;
      }
  }
  return compteur;
}

/**
 * Retourne une fonction qui prend un paramètre x, et qui retourne f(x) si predicate(x) est vrai, et g(x) sinon
 * @param {*} predicate
 * @param {*} f
 * @param {*} g
 */
export function condition(predicate, f, g) {
  // A compléter
  return (x) => {
    if (predicate(x)) {
      return f(x);
    } 
    else{
      return g(x);
    }
  }
}

/**
 * Compose deux fonctions en une seule, de tel sorte que pipe(f, g)(x) soit équivalent à g(f(x))
 *
 * @example
 * const addOne = (x) => x + 1;
 * const multiplyByTwo = (y) => y * 2;
 * const addOneAndMultiplyByTwo = pipe(addOne, multiplyByTwo);
 * addOneAndMultiplyByTwo(2); // 6
 *
 * @param {function} f
 * @param {function} g
 */
export function pipe(f, g) {
  // A compléter
  return (x) =>
  {
    return g(f(x))
  }
}
