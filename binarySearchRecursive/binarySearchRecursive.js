export function binarySearchRecursive(search, values, start, end, iterations = 0) {

    if (start > end) {
        return {
            found: false,
            index: -1,
            iterations: iterations + 1
        };
    }

    const mid = Math.floor((start + end) / 2);
    const current = values[mid];

   
    if (current === search) {
        return {
            found: true,
            index: mid,
            iterations: iterations + 1
        };
    }

    if (search < current) {
        return binarySearchRecursive(search, values, start, mid - 1, iterations + 1);
    }

    return binarySearchRecursive(search, values, mid + 1, end, iterations + 1);
}
