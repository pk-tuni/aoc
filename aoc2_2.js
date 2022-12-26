const fs = require('fs');
const input = fs.readFileSync("aoc2_input").toString();


const p = [{
    id: "A",// Rock
    wins: "C", // Sissors
    loses: "B", // Paper
    val: 1
},
{
    id: "B", // Paper
    wins: "A", // Rock
    loses: "C", // Sissors
    val: 2
},
{   id: "C", // Sissors
    wins: "B", // Paper
    loses: "A",  // Rock
    val: 3
}
];

/*
 A = Rock
 B = Paper
 C = Sissors

 X = Rock
 Y = Paper
 Z = Sissors
*/

let total = 0;

input.split("\n").forEach(l => {
    const [p1, p2] = l.trim().split(" ");
    const pSet = p.find(e => e.id === p2);

    switch(p2) {
        // Win
        case 'Z':            
            console.log(p1, p.find(e => e.wins === p1))
            total += p.find(e => e.wins === p1).val;
            total += 6;
            break;

        // Lose
        case 'X':
            console.log(p1, p.find(e => e.loses === p1))
            total += p.find(e => e.loses === p1).val;
            break;

        // Draw
        case 'Y':
            console.log(p1, p.find(e => e.id === p1))
            total += p.find(e => e.id === p1).val;
            total += 3;
            break;

        default:
    }
})

console.log(total);