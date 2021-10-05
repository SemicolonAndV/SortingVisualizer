import * as utils from '../utils/utils.js';

export const heapSort = (array) => {
    const animations = [];
    if (array.length <= 1) return array;

    heapSortHelper(array, array.length, animations);
    return animations;
}

const heapSortHelper = (array, arrayLength, animations) => {
    const n = array.length;
    for (let i=Math.floor(n/2)-1; i>=0; i--) {
        heapify(array, n, i, animations, true);
    }
    for (let i=n-1; i>=0; i--) {
        utils.swap(array, i, 0, animations);
        heapify(array, i, 0, animations, true);
    }
}

const heapify = (array, n, idx, animations) => {
    let largest = idx;
    const leftNode = 2 * idx + 1;
    const rightNode = 2 * idx + 2;
    
    if (leftNode < n && array[largest] < array[leftNode]) {
        largest = leftNode;
    }
    if (rightNode < n && array[largest] < array[rightNode]) {
        largest = rightNode;
    }
    if (largest !== idx) {
        utils.swap(array, idx, largest, animations);
        heapify(array, n, largest, animations);
    }
}
