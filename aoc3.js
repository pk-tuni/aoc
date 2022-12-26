const fs = require('fs');
const input = fs.readFileSync("aoc3_input").toString();

let total = 0;

input.split("\n").forEach(line => {

    const middle = line.length / 2;
    const p1 = line.trim().slice(0, middle);
    const p2 = line.trim().substring(middle);
    
    
    const inBoth = p1.split("").filter(e => p2.includes(e));
    const uniq = inBoth.filter((v, i, a) => a.indexOf(v) === i)[0];
    const code = uniq.charCodeAt();

    const priority = code > 96 ? code - 96 : code -38;

    //console.log(uniq, code, priority);
    total += priority;
})

console.log(total);

