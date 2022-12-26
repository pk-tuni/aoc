const fs = require('fs');
const input = fs.readFileSync("aoc3_input").toString();

let total = 0;

let sacks = [];
let letters = { l0: [], l1: [], l1: [] };

input.split("\n").forEach(line => {
    
    sacks.push(line);

    if(sacks.length === 3) {

        sacks.forEach((sack, idx) => {
            const key = `l${idx}`;
            
            letters[key] = sack.trim().split("");
        });
        
        const letter = ([letters.l0, letters.l1, letters.l2].reduce((a,b) => a.filter(c => b.includes(c))));

        const uniq = letter.filter((v, i, a) => a.indexOf(v) === i)[0];
        const code = uniq.charCodeAt();
        
        total += code > 96 ? code - 96 : code -38;
    

        sacks = [];
        letters = { l0: [], l1: [], l1: [] };

    }
})

console.log(total);

