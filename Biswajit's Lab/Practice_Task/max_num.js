//Find max number in array - use Math.max function

function findmax(arr){
    if(arr.length === 0) return null;
    return Math.max(...arr);
}

const arr = [25,35,12,14,47,91,92];

console.log(findmax(arr))