import React from 'react';
import './SortingVisualizer.css';
import * as sortingAlgoHelper from './Helpers/SortingAlgoHelper';
import * as testHelper from './Helpers/TestHelper';

// This is from Clément Mihailescu: https://www.youtube.com/watch?v=pFXYym4Wbkc&t=317s

export default class SortingVisualizer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            array: [],
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];

        const maxBarHeight = window.innerHeight - 80;
        const numberOfBars = (window.innerWidth - 160) / 4;

        for (let i = 0; i < numberOfBars; i++) {
            array.push(randomIntFromInterval(5, maxBarHeight));
        }
        this.setState({ array });
    }

    mergeSort() {
        const animations = sortingAlgoHelper.getMergeSortAnimations(this.state.array);
        for (let i = 0; i < animations.lenght; i++) {
            const arrayBars = document.getElementsByClassName('array-bar'); // Can we move that out of the loop ? 
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? 'turquoise' : 'darkcyan';
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * 5); // 5 is the animation speed that need to be adjust dynamically based on the number of bars (size of the screen)
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * 5);
            }
        }
    }

    bubbleSort() {

    }

    heapSort() {

    }

    quickSort() {

    }

    testSortingAlgorithms() {
        for (let i = 0; i < 100; i++) {
            const array = [];
            const arrayLength = randomIntFromInterval(1, 1000);


            for (let i = 0; i < arrayLength; i++) {
                array.push(randomIntFromInterval(-1000, 1000))
            }

            const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
            const mergeSortedArray = sortingAlgoHelper.mergeSort(array.slice());

            console.log(testHelper.arraysAreEqual(javaScriptSortedArray, mergeSortedArray));

        }
    }

    render() {
        const { array } = this.state;

        return (
            <div className="array-container">
                {array.map((value, idx) => (
                    <div className="array-bar" key={idx} style={{ height: `${value}px` }}>

                    </div>
                ))}
                <button onClick={() => this.resetArray()}> Reset Array </button>
                <button onClick={() => this.mergeSort()}> Merge Sort </button>
                <button onClick={() => this.bubbleSort()}> Bubble Sort </button>
                <button onClick={() => this.heapSort()}> Heap Sort </button>
                <button onClick={() => this.quickSort()}> Quick Sort </button>
                <button onClick={() => this.testSortingAlgorithms()}> Test sorting algo </button>
            </div>
        );
    }

}

// From stackoverflow.com
function randomIntFromInterval(min, max) {
    //min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}