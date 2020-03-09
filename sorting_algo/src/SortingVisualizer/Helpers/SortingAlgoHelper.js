// Simple mergeSort algo. Not optimize in term of space complexity. 
export const mergeSort = (array) => {

    if (array.length == 1) return array;

    const middleIdx = Math.floor(array.length / 2);
    const firstHalf = mergeSort(array.slice(0, middleIdx));
    const secondHalf = mergeSort(array.slice(middleIdx));

    const sortedArray = [];
    let i = 0, j = 0;

    while (i < firstHalf.length && j < secondHalf.length) {
        if (firstHalf[i] < secondHalf[j]) {
            sortedArray.push(firstHalf[i++]);
        } else {
            sortedArray.push(secondHalf[j++]);
        }
    }

    while (i < firstHalf.length) sortedArray.push(firstHalf[i++]);
    while (j < secondHalf.length) sortedArray.push(secondHalf[j++]);

    return sortedArray;
}

export const bubbleSort = (array) => {

    var tempValue = 0;
    var swapped = false;
    const arrayLength = array.length;

    for (let i = 0; i < arrayLength; i++) {
        swapped = false;
        for (let j = 0; j < arrayLength - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                tempValue = array[j];
                array[j] = array[j + 1];
                array[j + 1] = tempValue;
                swapped = true;
            }
        }

        if (!swapped) break; // TO optimize if no elements were swapped everithing is already ordered
    }

    return array;
}

export function heapSort(array) {

    const length = array.length;

    for (let i = length / 2 - 1; i >= 0; i--) {
        heapify(array, i, length);
    }

    for (let i = length - 1; i >= 0; i--) {
        let temp = array[0];
        array[0] = array[i];
        array[i] = temp;

        heapify(array, 0, i);
    }

    return array;
}

function heapify(array, i, length) {
    var largestIdx = i;
    const leftIdx = 2 * i + 1;
    const rightIdx = 2 * i + 2;

    if (leftIdx < length && array[leftIdx] > array[largestIdx])
        largestIdx = leftIdx;
    if (rightIdx < length && array[rightIdx] > array[largestIdx])
        largestIdx = rightIdx;

    if (largestIdx != i) {
        let temp = array[i];
        array[i] = array[largestIdx];
        array[largestIdx] = temp;

        heapify(array, largestIdx, length);
    }
}