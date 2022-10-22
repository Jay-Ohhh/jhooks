export function isFunction(obj: any): obj is Function {
  return typeof obj === 'function';
}

/**
 * Moves the item to new position in the array.
 */
export function arrayMoveMutable(array: any[], fromIndex: number, toIndex: number) {
  const startIndex = fromIndex < 0 ? array.length + fromIndex : fromIndex;

  if (startIndex >= 0 && startIndex < array.length) {
    const endIndex = toIndex < 0 ? array.length + toIndex : toIndex;

    const [item] = array.splice(fromIndex, 1);
    array.splice(endIndex, 0, item);
  }
}

/**
 * Clones the given array, moves the item to a new position in the new array,
 * and then returns the new array.
 * The given array is not mutated.
 */
export function arrayMoveImmutable(array: any[], fromIndex: number, toIndex: number) {
  const newArray = [...array];
  arrayMoveMutable(newArray, fromIndex, toIndex);
  return newArray;
}
