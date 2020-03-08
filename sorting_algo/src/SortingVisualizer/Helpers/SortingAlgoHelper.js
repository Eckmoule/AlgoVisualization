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