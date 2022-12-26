const fs = require('fs');
const input = fs.readFileSync("aoc4_input").toString();

let total = 0;
let part = 0;

const visualize = (p1, p2, p3, p4, match) => {

    for(let i = 0; i < 100; i++) {
        if(p1 <= i && p2 >= i) {
            process.stdout.write("#");
        } else {
            process.stdout.write(".");
        }
    }
    console.log(`  ${p1}-${p2} ${match > 0 ? ` Matched ${match}`: ""}`);

    for(let i = 0; i < 100; i++) {
        if(p3 <= i && p4 >= i) {
            process.stdout.write("#");
        } else {
            process.stdout.write(".");
        }
    }
    console.log(`  ${p3}-${p4}\n`);
}

let match = 0;

input.split("\n").forEach(line => {    
    const [p1, p2] = line.trim().split(",");
    const [p1s, p1e] = p1.split("-").map(e => parseInt(e, 10));
    const [p2s, p2e] = p2.split("-").map(e => parseInt(e, 10));


    match = 0;

    let first = [];
    let second = [];
    for(let i = p1s; i <= p1e; i++) {
        first.push(i);
    }
    for(let i = p2s; i <= p2e; i++) {
        second.push(i);
    }

    if(p1s <= p2s && p1e >= p2e) {
        // console.log("match 2");
        total++;
        match = 1;
    }

    else if(p1s >= p2s && p1e <= p2e) {
        total++;
        match = 2;
    } else if(first.some(n => second.includes(n))) {
        part++;
    }    

    // visualize(p1s, p1e, p2s, p2e, match);

});

console.log(total);
console.log(total  + part);
