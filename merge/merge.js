export function merge(left, right, counter) {
    let result = [];
    let i = 0, j = 0;

    while (i < left.length && j < right.length) {
        counter.count++;

        if (left[i] < right[j]) {
            result.push(left[i]);
            i++;
        } else {
            result.push(right[j]);
            j++;
        }
    }


    while (i < left.length) {
        counter.count++;
        result.push(left[i]);
        i++;
    }

    while (j < right.length) {
        counter.count++;
        result.push(right[j]);
        j++;
    }

    return result;
}
