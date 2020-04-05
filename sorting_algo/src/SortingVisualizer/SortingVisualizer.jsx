// This is from Clément Mihailescu: https://www.youtube.com/watch?v=pFXYym4Wbkc&t=317s

import React from 'react';
import './SortingVisualizer.css';
import * as sortingAlgoHelper from './Helpers/SortingAlgoHelper';
import * as sortingAnimationHelper from './Helpers/SortingAnimationHelper';
import * as testHelper from './Helpers/TestHelper';

// Time between each animation 
const ANIMATION_SPEED_MS = 3;
// CSS Color of the bars
const BAR_COLOR = "Orchid";
// CSS color to use when womparing two bars
const COMPARISON_COLOR = "Navy";

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
        this.setState({ array: array, });
    }

    mergeSort() {
        const animations = sortingAnimationHelper.getMergeSortAnimations(this.state.array);

        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? COMPARISON_COLOR : BAR_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }

    bubbleSort() {
        const animations = sortingAnimationHelper.getBubbleSortAnimations(this.state.array);

        for (let i = 0; i < animations.length; i++) {

            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {

                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? COMPARISON_COLOR : BAR_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            }
            else {
                const [barOneIdx, barTwoIdx] = animations[i - 1];
                const [barTwoNewHeight, barOneNewHeight] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                setTimeout(() => {
                    barOneStyle.height = `${barOneNewHeight}px`;
                    barTwoStyle.height = `${barTwoNewHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }

        }
    }

    heapSort() {
        const animations = sortingAnimationHelper.getHeapSortAnimations(this.state.array);

        var color = BAR_COLOR;
        for (let i = 0; i < animations.length; i++) {

            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = animations[i][0];
            if (isColorChange) {
                const [isColorChange, barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                color = (color === COMPARISON_COLOR) ? BAR_COLOR : COMPARISON_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            } else {
                const [isColorChange, barTwoNewHeight, barOneNewHeight, barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                setTimeout(() => {
                    barOneStyle.height = `${barOneNewHeight}px`;
                    barTwoStyle.height = `${barTwoNewHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }

        }
    }

    quickSort() {
        const temp = sortingAlgoHelper.quickSort(this.state.array);
        this.setState({ array: temp, });
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
            const bubbleSortedArray = sortingAlgoHelper.bubbleSort(array.slice());

            console.log(testHelper.arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
            console.log(testHelper.arraysAreEqual(javaScriptSortedArray, bubbleSortedArray));

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