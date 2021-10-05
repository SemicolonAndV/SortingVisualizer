import * as utils from '../utils/utils.js';

export const quickSortAlgo = (array) => {
    const animations = [];
    if (array.length <= 1) return array;

    quickSortHelper(array, 0, array.length-1, animations);
    return animations;
}

const quickSortHelper = (array, leftIdx, rightIdx, animations) => {
    if (array.length <= 1) {
        return;
    }
    let currIdx = partition(array, leftIdx, rightIdx, animations);
    if (leftIdx < currIdx - 1) {
        quickSortHelper(array, leftIdx, currIdx-1, animations);
    }
    if (currIdx < rightIdx) {
        quickSortHelper(array, currIdx, rightIdx, animations);
    }
}

const partition = (array, startIdx, endIdx, animations) => {
    let pivot = array[Math.floor((startIdx + endIdx)/2)];
    let i = startIdx;
    let j = endIdx;
    while (i <= j) {
        while (array[i] < pivot) {
            animations.push([i, j, false]);
            i++;
        }
        while (array[j] > pivot) {
            animations.push([i, j, false]);
            j--;
        }
        if (i <= j) {
            utils.swap(array, i, j, animations);
            i++;
            j--;
        }
    }
    return i;
}