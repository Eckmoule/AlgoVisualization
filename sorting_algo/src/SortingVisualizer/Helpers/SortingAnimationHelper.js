// return the animations tab needed to render the sorting on the screen. 
export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array; //animations ? 

    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations)
    return animations;
}

function mergeSortHelper(mainArray, startIdx, endIdx, auxiliaryArray, animations) {

    if (startIdx === endIdx) return;

    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);

    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations) {

    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;

    while (i <= middleIdx && j <= endIdx) {
        // We are comparing those two values. We push them twice for changing there colors then revert it (two animations)
        animations.push([i, j]);
        animations.push([i, j]);
        if (auxiliaryArray[i] <= auxiliaryArray[j]) {
            // Overwrite the value at k in the origial array with the value at index i in the auxiliary array.
            animations.push([k, auxiliaryArray[i]]);
            mainArray[k++] = auxiliaryArray[i++];
        } else {
            // Overwrite the value at k in the origial array with the value at index j in the auxiliary array.
            animations.push([k, auxiliaryArray[j]]);
            mainArray[k++] = auxiliaryArray[j++];
        }
    }

    while (i <= middleIdx) {
        // Comparison change color
        animations.push([i, i]);
        // Comparison back to normal color 
        animations.push([i, i]);
        // Overwrite value at k 
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
        // Comparison change color
        animations.push([j, j]);
        // Comparison back to normal color 
        animations.push([j, j]);
        // Overwrite value at k 
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
    }
}

export function getBubbleSortAnimations(array) {
    const animations = [];
    var tempValue = 0;
    var swapped = false;
    const arrayLength = array.length;

    for (let i = 0; i < arrayLength; i++) {
        swapped = false;
        for (let j = 0; j < arrayLength - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                // Need to see how this animation and timeout work 
                animations.push([j, j + 1]);
                animations.push([j, j + 1]);
                animations.push([array[j], array[j + 1]]);
                tempValue = array[j];
                array[j] = array[j + 1];
                array[j + 1] = tempValue;
                swapped = true;
            }
        }

        if (!swapped) break; // TO optimize if no elements were swapped everithing is already ordered
    }

    return animations;
}

export function getHeapSortAnimations(array) {

    const animations = [];
    const length = array.length;


    for (let i = length / 2 - 1; i >= 0; i--) {
        heapify(array, i, length, animations);
    }

    for (let i = length - 1; i >= 0; i--) {
        animations.push([false, array[0], array[i], 0, i]);
        let temp = array[0];
        array[0] = array[i];
        array[i] = temp;

        heapify(array, 0, i, animations);
    }

    return animations;
}

function heapify(array, i, length, animations) {
    var largestIdx = i;
    const leftIdx = 2 * i + 1;
    const rightIdx = 2 * i + 2;


    if (leftIdx < length) {
        animations.push([true, leftIdx, largestIdx]);
        animations.push([true, leftIdx, largestIdx]);
        if (array[leftIdx] > array[largestIdx]) {
            largestIdx = leftIdx;
        }
    }

    if (rightIdx < length) {
        animations.push([true, rightIdx, largestIdx]);
        animations.push([true, rightIdx, largestIdx]);
        if (array[rightIdx] > array[largestIdx]) {
            largestIdx = rightIdx;
        }
    }

    if (largestIdx != i) {
        animations.push([false, array[i], array[largestIdx], i, largestIdx]);
        let temp = array[i];
        array[i] = array[largestIdx];
        array[largestIdx] = temp;

        heapify(array, largestIdx, length, animations);
    }
}