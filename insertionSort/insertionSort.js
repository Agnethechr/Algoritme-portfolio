export function insertionSort(arr) {
    let iterations = 0;
    let isSorted = true; 

    for (let i = 1; i < arr.length; i++) {
        iterations++; 

        let key = arr[i];
        let j = i - 1;

        if (arr[j] > key) isSorted = false;

    
        while (j >= 0 && arr[j] > key) {
            iterations++; 

            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }

    return { 
        arr, 
        iterations, 
        sorted: isSorted 
    };
}