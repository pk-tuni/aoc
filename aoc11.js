const input = require("fs")
    .readFileSync("./aoc11_input", "utf-8")
    .split("\n")

String.prototype.hasText = function(n) {    
    return this.indexOf(n) !== -1
}

const monkeys = [];

let currentMonkey = { inspected: 0 };

input.forEach(line => {

    if(line.hasText("Monkey")) {
        if(currentMonkey.hasOwnProperty("id")) {
            monkeys.push(currentMonkey);
            currentMonkey = { inspected: 0 };
        }
        currentMonkey.id = parseInt(line.trim().split("Monkey ")[1].slice(0,1));
    } else if(line.hasText("Starting")) {
        currentMonkey.items = line.trim().split("Starting items: ")[1].split(",").map(e => parseInt(e));
    } else if(line.hasText("Operation")) {
        currentMonkey.oper = line.trim().split("Operation: new = old ")[1];
    } else if (line.hasText("Test")) {
        currentMonkey.test = parseInt(line.trim().split("Test: divisible by ")[1]);
    } else if (line.hasText("If true")) {
        currentMonkey.trueCond = parseInt(line.trim().split("If true: throw to monkey ")[1]);
    } else if (line.hasText("If false")) {
        currentMonkey.falseCond = parseInt(line.trim().split("If false: throw to monkey ")[1]);
    }
});
monkeys.push(currentMonkey);

const debug = false;

const getWorry = (op, item) => {
    const [oper, am] = op.split(" ");
    const amount = Number.isInteger(parseInt(am)) ? parseInt(am) : item;
    
    if(oper === "*") {        
        if(debug) console.log(`    Worry level is multiplied by ${amount} to ${item * amount}`)
        return item * amount;
    }

    if(debug) console.log(`    Worry level increases by ${amount} to ${item + amount}.`);
    return item + amount;
}

const showWorryLevels = () => {
    monkeys.forEach(m => {
        console.log(`Monkey ${m.id}: ${m.items.join(",")}`)
    })
}

const processMonkey = (id) => {
    const currentMonkey = monkeys.find(m => m.id === id);
    if(debug) console.log(`Monkey ${currentMonkey.id}:`)
    while(currentMonkey.items.length > 0) {
        let currentItem = currentMonkey.items.shift();

        if(debug) console.log(`  Monkey inspects an item with a worry level of ${currentItem}.`)
        monkeys[currentMonkey.id].inspected++;

        let newWorry = getWorry(currentMonkey.oper, currentItem);
        newWorry = Math.floor(newWorry / 3);

        const isDivisible = newWorry % currentMonkey.test === 0;

        if(debug) console.log(`    Monkey gets bored with item. Worry level is divided by 3 to ${newWorry}.`)

        if(debug) console.log(`    Current worry level ${isDivisible ? "is": "is not"} divisible by ${currentMonkey.test}.`)

        const toMonkey = isDivisible ? currentMonkey.trueCond : currentMonkey.falseCond;
        if(debug) console.log(`    Item with worry ${newWorry} is thrown to monkey ${toMonkey}` )
        monkeys[toMonkey].items.push(newWorry);        
    }
}

// console.log(monkeys);

Array.from(Array(20).keys()).forEach(i => {
    console.log("round " + i    );
    monkeys.forEach( (m, i) => {
        processMonkey(i);
    })  

    // showWorryLevels();
})

console.log("");
let total = 1;
let ins = [];
monkeys.forEach(m => {
    ins.push(m.inspected);
    console.log(`Monkey ${m.id} inspected ${m.inspected} times.`);
    total *= m.inspected;
})

const [a, b] = ins.sort( (a,b) => b - a).slice(0,2);
console.log(a*b);