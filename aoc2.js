const fs = require('fs');
const input = fs.readFileSync("aoc2_input").toString();


const p = [{
    id: "X",// Rock
    wins: "C", // Sissors
    draws: "A", // Rock
    val: 1
},
{
    id: "Y", // Paper
    wins: "A", // Rock
    draws: "B", // Paper
    val: 2
},
{   id: "Z", // Sissors
    wins: "B", // Paper
    draws: "C", // Sissors 
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


    if(p1 === pSet.draws) {
        total += 3
    } else if(pSet.wins == p1) {
        total += 6
    }
    total += pSet.val;
})

console.log(total);