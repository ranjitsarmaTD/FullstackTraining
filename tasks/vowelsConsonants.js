function vowelsAndConsonants(s) {
    for(let i=0;i<s.length;i++)
    {
        if(s[i]=='a'||s[i]=='i'|| s[i]=='e'||s[i]=='o'||s[i]=='u')
        {console.log(s[i])}
    }
    for(let l of s)
    { 
        if(l!='a' && l!='i' && l!='e' && l!='o'&& l!='u')
        {console.log(l)}
    }
}