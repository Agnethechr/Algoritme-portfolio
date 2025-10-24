function binarySearch(searchFor, values) {
  let min = 0;
  let max = values.length - 1;
  let middle;
  let found = false;
  middle = Math.floor((max - min) / 2);

  console.log(
    `min værdien: ${min}`,
    `max værdien: ${max}`,
    `middle værdien: ${middle}`
  );

  while (found == false) {
    let middleValue = values[middle];

    console.log("middle value: " + middleValue);

    if (middleValue == searchFor) {
      found = true;
    }

    if (middleValue > searchFor) {
      max = max;
      min = middle;
    }
    return middle;
  }
}

const values = [21, 22, 23, 25, 27, 28, 29, 31, 32, 34, 35];

const foundIndex = "found index: " + binarySearch(32, values);
