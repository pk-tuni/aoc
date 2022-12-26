const input = require("fs")
    .readFileSync("./aoc5_input", "utf-8")
    .split("\n");


let stacks = [];

const rex = /move (\d*) from (\d*) to (\d*)/;

input.forEach(line => {
    // Gather up stacks
    if(line.indexOf("[") !== -1) {
        const cols_raw = line.match(/.{1,4}/g)
        const cols = cols_raw.map(e => e
            .replace("[","")
            .replace("]", "")
            .trim()
        );

        cols.forEach( (v, idx) => {
            if(v === '') return;

            if(!Array.isArray(stacks[idx])) {
                stacks[idx] = [];
            }
            stacks[idx].push(v);
        })
    }

    // Reverse them so math matches below
    // if(line.split("").length === 1) {        
    //     stacks.forEach((s,idx) => {
    //         stacks[idx].reverse();
    //     })        
    // }

    // Do the moves
    if(line.indexOf("move") !== -1) {

        const [l, count, from, to] = line.match(rex);

        const eles = stacks[from - 1].splice(0, count);

        eles.reverse().forEach(e => stacks[to - 1].splice(0, 0, e));

        // console.log(matches[1], matches[2], matches[3]);
    }

});

let result = "";
stacks.forEach(s => result += s[0]);

console.log(result);