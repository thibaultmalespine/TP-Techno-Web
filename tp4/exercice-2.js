// Tableau

/**
 * Multiplie par 2 chaque élément d'un tableau
 *
 * @param {number[]} arr
 * @returns {number[]}
 *
 * @example
 * multiplyBy2([1, 2, 3]) // [2, 4, 6]
 */
export function multiplyBy2(arr) {
  // A compléter
  return arr.map(value => 2*value)
}

/**
 * Compte le nombre d'éléments pairs dans un tableau
 *
 * @param {number[]} arr
 * @returns {number}
 *
 * @example
 * countEvenNumbers([1, 2, 3]) // 1
 */
export function countEvenNumbers(arr) {
  // A compléter
  let nbPair = arr.filter(value => value%2 === 0)
  return nbPair.length
  return arr.reduce((acc, value) => {
    if(value%2 === 0){
      return acc+1;
    }
  },0)
}

/**
 * Retourne le premier élément supérieur à 10
 *
 * @param {number[]} arr
 * @returns {number}
 *
 * @example
 * findFirstGreaterThan10([1, 8, 12, 3, 29]) // 12
 */
export function findFirstGreaterThan10(arr) {
  // A compléter
  return arr.find( value => value>10 )
}

/**
 * Trie les élèves par groupe
 *
 * @param { { name: string, groupe: number }[] } students
 * @returns { { name: string, groupe: number }[] }
 *
 * @example
 * sortStudentsByGroup([ { name: 'Alice', groupe: 1 }, { name: 'Bob', groupe: 2 }, { name: 'Charlie', groupe: 1 } ])
 * // [ { name: 'Alice', groupe: 1 }, { name: 'Charlie', groupe: 1 }, { name: 'Bob', groupe: 2 } ]
 */
export function sortStudentsByGroup(students) {
  // A compléter
  return students.sort((student1, student2) => student1.groupe - student2.groupe )
}

/**
 * Zip deux tableaux en un seul
 *
 * @param {T[]} arr1
 * @param {U[]} arr2
 * @returns {[T,U][]}
 *
 * @example
 * zipArrays([1, 2, 3], [4, 5, 6]) // [[1, 4], [2, 5], [3, 6]]
 * zipArrays(['a', 'b', 'c'], [1, 2]) // [['a', 1], ['b', 2], ['c', undefined]]
 * zipArrays([1], [1, 2]) // [[1, 1], [undefined, 2]]
 *
 */
export function zipArrays(arr1, arr2) {
  // A compléter (on pourra utiliser le second paramètre passé au callback de array.map)
  if (arr1.length > arr2.length) {
    return arr1.map((value, i) => [value, arr2[i]])
  }
  else{
    return arr2.map((value, i) => [arr1[i], value])
  }
}

/**
 * Compose un tableau de fonctions en une seule fonction
 * de tel sorte que pipeAll([f, g, h])(x) soit équivalent à h(g(f(x)))
 *
 * @param {function[]} fns
 * @example
 * const addOne = (x) => x + 1;
 * const multiplyByTwo = (y) => y * 2;
 * const addOneAndMultiplyByTwo = pipeAll([addOne, multiplyByTwo]);
 * addOneAndMultiplyByTwo(2); // 6
 */

export function pipeAll(fns) {
  // A compléter (on pourra utiliser Array.reduce)
  return (x)=>{
    return fns.reduce((acc, fonction) => {
      return fonction(acc);
    },x)
  }
}