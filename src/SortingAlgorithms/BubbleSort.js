import * as utils from '../utils/utils.js';

export const bubbleSort = (array) => {
    const animations = [];
    if (array.length <= 1) return array;

    bubbleSortHelper(array, animations);
    return animations;
}

const bubbleSortHelper = (array, animations) => {
    for (let i=0; i<array.length; i++) {
        let swapped = false;
        for (let j=0; j<array.length-i-1; j++) {
            if (array[j] > array[j+1]) {
                utils.swap(array, j, j+1, animations);
                swapped = true;
            }
        }
        if (!swapped) {
            break;
        }
    }
}