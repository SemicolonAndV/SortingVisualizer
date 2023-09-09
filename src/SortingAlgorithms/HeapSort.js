import * as utils from '../utils/utils.js';

export const heapSort = (array) => {
    const animations = [];
    if (array.length <= 1) return array;
    heapSortHelper(array, animations);
    return animations;
}

const heapSortHelper = (array, animations) => {
    const n = array.length;
    for (let i=Math.floor(n/2)-1; i>=0; i--) {
        heapify(array, n, i, animations);
    }
    for (let i=n-1; i>=0; i--) {
        utils.swap(array, i, 0, animations);
        heapify(array, i, 0, animations);
    }
}

const heapify = (array, n, idx, animations) => {
    // find largest element among root and children
    let largest = idx;
    const leftNode = 2 * idx + 1;
    const rightNode = 2 * idx + 2;
    
    if (leftNode < n && array[largest] < array[leftNode]) {
        largest = leftNode;
    }
    if (rightNode < n && array[largest] < array[rightNode]) {
        largest = rightNode;
    }
    // if root is not largest, swap it with the largest and continue heapifying
    if (largest !== idx) {
        utils.swap(array, idx, largest, animations);
        heapify(array, n, largest, animations);
    }
}
