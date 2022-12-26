const input = require("fs")
    .readFileSync("./aoc6_input", "utf-8")
    .split("\n")

let spot = 0;

input.forEach(line => {

    for(let ws = 14; ws <= line.length; ws++) {
        const window = line.substring(ws - 14, ws);        
        const uniq = window.split("").filter( (v,i,a) => a.indexOf(v) === i);

        if(uniq.length === 14) {
            spot = ws;
            break;
        }        
    }
});

console.log("Done", spot);