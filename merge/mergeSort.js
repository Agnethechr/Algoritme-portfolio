import { merge } from "./merge.js";

export function mergeSort(arr, counter = { count: 0 }) {
    counter.count++; 

    if (arr.length <= 1) {
        return { arr, iterations: counter.count, sorted: true };
    }

   
    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);

 
    const leftSorted = mergeSort(left, counter).arr;
    const rightSorted = mergeSort(right, counter).arr;

    const merged = merge(leftSorted, rightSorted, counter);

    return {
        arr: merged,
        iterations: counter.count,
        sorted: true
    };
}
