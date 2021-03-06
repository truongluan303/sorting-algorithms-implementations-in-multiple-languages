/**
 * Insertion Sort
 * 
 * Insertion sort works similar to the way you sort playing cards in your hands.
 * The array is virtually split into a sorted and an unsorted part.
 * Values from the unsorted part are picked and placed at the correct position in the sorted part.
 * 
 * @param arr the array to be sorted
 */
let insertionSort = arr => {

    for (let i = 1; i < arr.length; i++) {

        for (let j = 0; j < i; j++) {

            if (arr[j] > arr[i]) {
                swap(arr, j, i);
            }
        }
    }
}

/**
 * Selection Sort
 * 
 * Selection sort looks for the smallest value in every loop and
 * puts it at the beginning of the array
 * 
 * @param arr the array to be sorted
 */
let selectionSort = arr => {
    for (let i = 0; i < arr.length - 1; i++) {
        let min_idx = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[min_idx]) {
                min_idx = j;
            }
        }
        if (min_idx !== i) {
            swap(arr, min_idx, i);
        }
    }
};

/**
 * Bubble Sort
 * 
 * Bubble sort works by repeatedly swapping the adjacent elements
 * if they are not in the right order.
 * 
 * @param arr the array to be sorted
 */
let bubbleSort = arr => {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 1; j < arr.length - i; j++) {
            if (arr[j] < arr[j - 1]) {
                swap(arr, j - 1, j)
            }
        }
    }
}

/**
 * Pick an element in the array as a pivot (last element in this implementation).
 * Partitions the given array around the pivot so that all the elements on the
 * left of the pivot are less than the pivot, and all on the right are bigger
 * than or equal to the pivot. Then keep repeating this process on the partitions
 * created.
 * 
 * @param arr the array to be sorted
 */
let quickSort = arr => {

    // a helper inner function
    let quickSort = (arr, begin, end) => {
        if (begin < end) {
            let pivot_idx = end;
            let j = begin - 1;
            
            for (let i = begin; i < end; i++) {
                if (arr[pivot_idx] > arr[i]) {
                    j++;
                    swap(arr, j, i);
                }
            }
            swap(arr, pivot_idx, j + 1);
            pivot_idx = j + 1;

            quickSort(arr, begin, pivot_idx - 1);
            quickSort(arr, pivot_idx + 1, end);
        }
    }
    
    // call the inner function to start the sorting
    quickSort(arr, 0, arr.length - 1);
}

/**
 * Merge sort
 * 
 * Divide the array in 2 halves, and keep repeating that process
 * until all elements in the array are in its own array. Then put
 * these elements back together in order.
 * 
 * @param arr the array to be sorted
 */
let mergeSort = arr => {
    
    if (arr.length > 1) {

        let mid = Math.ceil(arr.length / 2);

        let left = arr.splice(0, mid);
        let right = arr.splice(-mid);

        mergeSort(left);
        mergeSort(right);

        let l = 0, r = 0, i = 0;
        
        while (l < left.length && r < right.length) {

            if (left[l] <= right[r]) {
                arr[i] = left[l];
                l++;
            }
            else {
                arr[i] = right[r];
                r++;
            }
            i++;
        }
        while (l < left.length) {
            arr[i] = left[l];
            l++;
            i++
        }
        while (r < right.length) {
            arr[i] = right[r];
            r++;
            i++;
        }
    }
}

/**
 * Counting Sort
 * 
 * Counting sort works by iterating through the input, counting the 
 * number of times each item occurs, and using those counts to compute 
 * an item's index in the final, sorted array.
 * Counting sort is the only sorting algorithm that is linear in time.
 * However, counting sort is only useful when the largest number in
 * the input is small. Otherwise, it will take up a large space
 * 
 * @param arr the array to be sorted 
 */
function countingSort(arr) {

    let result = new Array(arr.length);
    let max = 0;

    // find the largest element in the given array
    for (let i = 0; i < arr.length; i++) {
        max = (arr[i] > max) ? arr[i] : max;
    }

    // count the occurence for each element in the array
    let count = new Array(max + 1);
    for (let i = 0; i < max + 1; i++) {
        count[i] = 0;
    }
    for (let i = 0; i < arr.length; i++) {
        count[arr[i]]++;
    }

    // get the running sum for each cell in the count
    // also decrease each cell by 1 since array is 0-indexed
    count[0]--;
    for (let i = 1; i < count.length; i++) {
        count[i] += count[i - 1];
    }

    // insert the elements into the result array at correct index
    for (let i = arr.length - 1; i >= 0; i--) {
        let val = arr[i];
        let idx = count[val];
        result[idx] = val;
        count[val]--;
    }
    return result;
}

/**
 * Swap 2 indices in an array.
 * 
 * @param arr the array where indices will be swapped
 * @param idx1 the first index to be swapped
 * @param idx2 the second index to be swapped
 */
let swap = (arr, idx1, idx2) => {

    let temp = arr[idx1];

    arr[idx1] = arr[idx2];

    arr[idx2] = temp;
}


///////////////////////////////////////////////////////////////
//                          TEST CODE                        //
///////////////////////////////////////////////////////////////

// Generate 2 identical arrays of size 500 that contain random integers.
// Call the built in sort function to sort the first array.
// Then use a sorting method implemented above to sort the second array.
// If both arrays are the same after sorting, the sorting method implemented is working.
// Repeat this process 1000 times to make sure all edge cases are reached.

let passed = true;

for (let i = 0; i < 1000; i++) {

    let arr1 = []
    let arr2 = []

    for (let j = 0; j < 1000; j++) {
        let randNum = Math.floor(Math.random() * 100);
        arr1.push(randNum);
        arr2.push(randNum);
    }

    arr1 = arr1.sort(function(a, b) {
        return a - b;
    });

    // insertionSort(arr2);
    // selectionSort(arr2);
    // bubbleSort(arr2);
    // quickSort(arr2);
    // mergeSort(arr2);
    arr2 = countingSort(arr2);
    
    const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);

    if (equals(arr1, arr2)) {

        console.log("PASS");
    }

    else {
        console.log("\n\nFAIL\t\t <<<<<<<<<<<<<<<<<<<<<<<<<<<<<\n");
        console.log("expected:");
        console.log(arr1);
        console.log("result:");
        console.log(arr2);
        passed = false;
    }
}

if (!passed) {
    console.log("\n\n\t\t ***** F A I L *****");
}
else {
    console.log("\n\n\t\t ***** P A S S *****");
}
