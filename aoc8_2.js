const input = require("fs")
    .readFileSync("./aoc8_input", "utf-8")
    .split("\n")

let grid = [];
let visible = [];

input.forEach(line => {
   const row = line.trim().split("");
   grid.push(row);
});

const isVisible = (row, col) => {
    if(row === 0 || row === grid.length - 1) {
        visible[row][col] = 1;
        return;
    }

    if(col === 0 || col == grid[0].length -1) {
        visible[row][col] = 1;
        return;
    }

    let greater = true;
    const current = grid[row][col];

    // To top
    for(let r = row - 1; r >= 0; r--) {        
        if(grid[r][col] >= current) {
            greater = false;            
        }
    }

    if(greater) {
        visible[row][col] = 1;
        return;
    }

    greater = true;

    // To left
    for(let c = col - 1; c >= 0; c--) {
        if(grid[row][c] >= current) {
            greater = false;            
        }
    }

    if(greater) {
        visible[row][col] = 1;
        return;
    }

    greater = true;

    // To right
    for(let c = col + 1; c < grid[0].length; c++) {        
        if(grid[row][c] >= current) {
            greater = false;            
        }
    }

    if(greater) {
        visible[row][col] = 1;
        return;
    }
    greater = true;

    // To bottom
    for(let r = row + 1; r < grid.length; r++) {        
        if(grid[r][col] >= current) {
            greater = false;            
        }
    }


    if(greater) {
        visible[row][col] = 1;
        return;
    }


    visible[row][col] = 0;
}

for(let ri = 0; ri < grid.length; ri++) {
    for(let ci = 0; ci < grid[0].length; ci++) {
        if(ci === 0) {
            visible[ri] = [];
        }
    }
}


for(let ri = 0; ri < grid.length; ri++) {
    for(let ci = 0; ci < grid[0].length; ci++) {
        isVisible(ri, ci);
    }
}




total = 0;
 
visible.forEach(row => row.forEach(val => total += val));

console.log("Visible", total);
