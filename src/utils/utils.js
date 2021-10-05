export const swap = (array, leftIdx, rightIdx, animations) => {
    let temp = array[leftIdx];
    array[leftIdx] = array[rightIdx];
    array[rightIdx] = temp;
    animations.push([leftIdx, rightIdx, true]);
    animations.push([array[leftIdx], array[rightIdx], false]);

}