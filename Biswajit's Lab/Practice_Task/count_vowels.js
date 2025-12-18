//Count no of vowels in a string

function count_vowels(str) {
    let count = 0;
    const vowels = "AEIOUaeiou";

    for(let i = 0; i<str.length; i++){
        if(vowels.includes(str[i])){
            count++;
        }
    }
    return count;
}

console.log(count_vowels('YouTube'));