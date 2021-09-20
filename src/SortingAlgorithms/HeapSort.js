export const heapSort = (array) => {
    const n = array.length;

    for (let i=Math.floor(n/2)-1; i>=0; i--) {
        // console.log(i);
        heapify(array, n, i);
    }

    for (let i=n-1; i>=0; i--) {
        swap(array, i, 0);
        heapify(array, i, 0);
    }

    return array;
}

const heapify = (array, n, idx) => {
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
        swap(array, idx, largest);
        heapify(array, n, largest);
    }
}

const swap = (array, leftIdx, rightIdx) => {
    let temp = array[leftIdx];
    array[leftIdx] = array[rightIdx];
    array[rightIdx] = temp;
}