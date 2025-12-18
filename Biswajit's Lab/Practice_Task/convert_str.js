//Convert each word in a array to uppercase - use loop

function to_uppercase(arr){
    const result = [];

    for(let i=0; i<arr.length; i++){
        result.push(arr[i].toUpperCase());
    }
    return result;
}

const arr = ["orange", "banana", "apple"];

console.log(to_uppercase(arr));
