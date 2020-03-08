export const arraysAreEqual = (arrayOne, arrayTwo) => {

    if (arrayOne.length !== arrayTwo.length) return false;

    for (let i = 0; i < arrayOne.length; i++) {
        if (arrayOne[i] !== arrayTwo[i]) return false;
    }
    return true;
}