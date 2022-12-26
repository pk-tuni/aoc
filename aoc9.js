const input = require("fs")
    .readFileSync("./aoc9_input", "utf-8")
    .split("\n")

let grid = [];

const ROW_MAX = 5;
const COL_MAX = 6;
let head = {x: 0, y: 0};
let tail = {x: 0, y: 0};

const initGrid = () => {
    for(let row = 0; row < ROW_MAX; row++) {
        if(grid[row] === undefined) {
            grid[row] = [];
        }    
        for(let col = 0; col < COL_MAX; col++) {
            grid[row][col] = ".";
        }
    }
}

const visualize = () => {
    for(let row = ROW_MAX - 1; row >= 0; row--) {
        for(let col = 0 ; col < COL_MAX; col++) {
            if(head.y === row && head.x === col) {            
                process.stdout.write("H");
            } else if(tail.y === row && tail.x === col) {
                process.stdout.write("T");
            } else  {
                process.stdout.write(grid[row][col]);
            }
        }
        process.stdout.write("\n");
    }
    process.stdout.write("\n");
}

const moveTail = () => {
    
    // Head ahead in X 
    // if(head.x > tail.x && head.y > tail.y ) {
    //     tail.x++;
    //     tail.y++;
    // }
    // else if(head.x > tail.x + 1 && tail.y === head.y) {
    //     tail.x++;
    // } 
    
    // // Head behind in X
    // else if(head.x < tail.x - 1 && tail.y === head.y) {
    //     tail.x--;
    // } 

    // else if(head.x == tail.x && head.y > tail.y + 1) {
    //     tail.y++;
    // }
    let deltaX = 0;

    if(head.x + 1 > tail.x) {
        deltaX = 1;    
    } else if(head.x - 1 < tail.x) {
        deltaX = -1;
    }

    if(head.y + 1 > tail.y) {
        deltaY = 1;    
    } else if(head.y - 1 < tail.y) {
        deltaY = -1;
    }

    tail.x += deltaX;
    tail.y += deltaY;
}

initGrid();
visualize();

input.forEach(line => {    
    
    const [dir, amount] = line.trim().split(" ");
    
    console.log(`== ${dir} ${amount} ==`);
    for(let step = 0; step < parseInt(amount); step++) {
        let deltaX = 0;
        let deltaY = 0;
    
        switch(dir) {
            case "R":
                deltaX = 1;
                break;
            case "U":
                deltaY = 1;
                break;
            case "L":
                deltaX = -1;
                break;        
            case "D":
                deltaY = -1;
                break;
            default:
        }

        head.x += deltaX;
        head.y += deltaY;
        moveTail();

        visualize();
    }
});
