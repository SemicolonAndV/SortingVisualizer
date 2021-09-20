import React from 'react';
import * as mergeSort from '../SortingAlgorithms/MergeSort';
import * as quickSort from '../SortingAlgorithms/QuickSort';
import * as heapSort from '../SortingAlgorithms/HeapSort';
import './SortingVisualizer.css';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 3;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 375;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

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
        for (let i=0; i<NUMBER_OF_ARRAY_BARS; i++) {
            array.push(randomIntFromInterval(5, 855));
        }
        this.setState({array});
    }

    mergeSort() {
        const animations = mergeSort.getMergeSortAnimations(this.state.array);

        for (let i=0; i<animations.length; i++) {
            const arrayBars = document.getElementsByClassName("array-bar");
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
            
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

    quickSort() {
        const animations = quickSort.quickSortAlgo(this.state.array);
        
        for (let i=0; i<animations.length; i++) {
            const arrayBars = document.getElementsByClassName("array-bar");
            let [barOneIdx, barTwoIdx, swap] = animations[i];
            if (i > 0 && animations[i-1][2]) {
                [barOneIdx, barTwoIdx, swap] = animations[i-1];
                swap = false;
            }
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;

            if (swap) {
                const barHeights = animations[i+1];
                setTimeout(() => {
                    barOneStyle.backgroundColor = SECONDARY_COLOR;
                    barTwoStyle.backgroundColor = SECONDARY_COLOR;
                    barOneStyle.height = `${barHeights[0]}px`;
                    barTwoStyle.height = `${barHeights[1]}px`;
                }, i * ANIMATION_SPEED_MS);
            } else {
                setTimeout(() => {
                    barOneStyle.backgroundColor = PRIMARY_COLOR;
                    barTwoStyle.backgroundColor = PRIMARY_COLOR;
                }, i * ANIMATION_SPEED_MS);
            }
        }
        // let normalSorted = this.state.array.sort();
    }

    heapSort() {}

    bubbleSort() {}

    testSortingAlgorithms() {
        for (let i=0; i<100; i++) {
            const array = [];
            const length = randomIntFromInterval(1, 10);
            for (let i=0; i<length; i++) {
                array.push(randomIntFromInterval(0, 1000));
            }
            const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
            const sortedArray = heapSort.heapSort(array.slice());

            console.log(arraysAreEqual(javaScriptSortedArray, sortedArray));
     
        }
    }


    render() {
        const{array} = this.state;

        return (
            <div>
                <div className="array-container">
                    {
                        array.map((value, idx) => (
                            <div 
                                className="array-bar"
                                key={idx}
                                style={{
                                    backgroundColor: PRIMARY_COLOR,
                                    height: `${value}px`
                                }}
                            >
                            </div>
                        ))
                    }
                </div>
                <button onClick={() => this.resetArray()}>Generate New Array</button>
                <button onClick={() => this.mergeSort()}>Merge Sort</button>
                <button onClick={() => this.quickSort()}>Quick Sort</button>
                <button onClick={() => this.heapSort()}>Heap Sort</button>
                <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
                <button onClick={() => this.testSortingAlgorithms()}>Test Sorting Algorithms</button>
            </div>
        )
    }
}

var randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
    if (arrayOne.length !== arrayTwo.length) return false;

    for (let i=0; i<arrayOne.length; i++) {
        if (arrayOne[i] !== arrayTwo[i]) return false;
    }
    return true;
}