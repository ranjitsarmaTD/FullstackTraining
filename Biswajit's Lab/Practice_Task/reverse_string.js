//Reverse a string - using for loop, with inbuild functions split, reverse, join.

//using for loop
function reverse_string(str){
    let reversed ="";

    for (let i = str.length-1; i>=0; i--){
        reversed += str[i];
    }

    return reversed;
}

const str = 'Jeeta Singh'
console.log(reverse_string(str));

//with inbuild functions split, reverse, join
function reverse_string_inbuilt(str){
    return str.split("").reverse().join("");
} 

console.log(reverse_string_inbuilt(str));