#!/usr/bin/env node
let input = process.argv.slice(2);
const fs = require("fs");

let optionsArr = [];
let filesArr = [];

for(let i = 0; i < input.length; i++){
    if(input[i].charAt(0) == "-"){
        optionsArr.push(input[i]);
    }else{
        filesArr.push(input[i]);
    }
}

// Options edge case
let isBothPresent = optionsArr.includes("-n") && optionsArr.includes("-b");
if(isBothPresent){
    console.log("Either enter -n or -b");
    return;
}

// existence edge case
for(let i = 0; i < filesArr.length; i++){
    let isPresent = fs.existsSync(filesArr[i]);
    if(isPresent == false){
        console.log(`file ${filesArr[i]} is not present`);
        return;
    }
}

// read
let content = "";
for(let i = 0; i < filesArr.length; i++){
    content += fs.readFileSync(filesArr[i], "utf-8");
    content += "\r\n";    
}
// console.log(content);

let contentArr = content.split("\r\n");
// console.log(contentArr);

// -s
let isSPresent = optionsArr.includes("-s");
if(isSPresent){
    // We have to remove multiple space and make single so we put null
    for(let i = 1; i < contentArr.length; i++){
        if(contentArr[i] == "" && contentArr[i-1] == ""){
            contentArr[i] = null;
        }else if(contentArr[i] == "" && contentArr[i-1] == null){
            contentArr[i] = null;
        }
    }

    let tempArr = [];
    for(let i = 0; i < contentArr.length; i++){
        if(contentArr[i] != null){
            tempArr.push(contentArr[i]);
        }
    }

    contentArr = tempArr;
}

console.log("``````````````````````````````````");
// console.log(contentArr.join("\n"));

// -n -> give numbers to all lines
let isNPresent = optionsArr.includes("-n");
if(isNPresent){
    for(let i = 0; i < contentArr.length; i++){
        contentArr[i] = `${i+1} ${contentArr[i]}`;
    }
}

// console.log(contentArr.join("\n"));

// -b -> give numbers to non-empty lines
let isBPresent = optionsArr.includes("-b");
if(isBPresent){
    for(let i = 0; i < contentArr.length; i++){
        if(contentArr[i] != ""){
            contentArr[i] = `${i+1} ${contentArr[i]}`;
        }
    }
}

console.log(contentArr.join("\n"));

