//1. Reverse an array - using reverse function, using for loop.

function reverse_array(arr){
    for (let i = arr.length -1; i >=0; i--){
        console.log(arr[i])
    }
}

const arr = [1,2,3,4,5]

reverse_array(arr);