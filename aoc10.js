const input = require("fs")
    .readFileSync("./aoc10_input", "utf-8")
    .split("\n")


let cycle = 0;
let pc = 0;
let skipCycle = false;
let cmd = "";
let amount = 0;
let regX = 1;

let total = 0;
let row = [];

const drawRow = () => 
    console.log(row
        .map(e => e === 1 ? "#" : ".")
        .join("")
    );

const addToRow = () => {

    const window = [regX - 1, regX, regX + 1];

    // console.log(cycle % 40, regX, window)

    row.push(window.indexOf(cycle % 40) !== -1 ? 1 : 0);
}

while(true) {

    if(cycle % 40 === 0) {
        // draw it 
        drawRow();
        row = [];        
    } else {
        // Calc it
        addToRow();
    }   

    cycle++;
    
    const willExit = pc > input.length - 1;

    if(!skipCycle && !willExit) {
        [cmd, amount] = input[pc++].trim().split(" ");
    }

    if(cycle === 20 || cycle % 40 === 20) {

        // console.log(`Multi ${cycle} * ${regX}`, cycle * regX);
        total += regX * cycle;
    }

    if(cmd === 'addx') {
        if(!skipCycle) {
            skipCycle = true;
        } else {
            regX += parseInt(amount);
            skipCycle = false;
        }
    }


    // console.log(cycle, regX, cmd, amount);

    if(willExit || cycle > 10000) {        
        break;
    }
}

console.log(regX, cycle);
console.log("total", total);