const input = require("fs")
    .readFileSync("./aoc7_input", "utf-8")
    .split("\n")

let command = "";
let curDir = "";
let preDir = "";
let curDepth = 0;

let all = [];
let files = [];
const cmdReg = /\$ (ls|cd)[ ]{0,1}(.*)/;

class Node {
    constructor(name, size, type, parent) {
        this.name = name;
        this.size = size;
        this.type = type;
        this.parent = parent;
        this.children = [];        
    }
}




let curNode = null;
let preNode = null;
let root = new Node("/", 0, 'dir', null);

const addToAll = (dir, parent, size, name) => {
    let curInfo = all.reduce( (pre, cur) => 
        cur.name == curDir ? cur : pre
    , {name: curDir, parent: preDir, size: 0, depth: curDepth})

    all = all.filter(e => e.name != curInfo.name)
    all.push({...curInfo});

    if(size > 0 ) {
        files.push({dir, name, size, parent})
    }
}

const findDir = (name) => all.find(f => f.name === name);
    
input.forEach(line => {
    const cmd = line.match(cmdReg);
    if(cmd !== null) {
        if(cmd[1] === 'cd') {
            command = "";

            if(cmd[2] == '..') {
                curDepth--;

                if(preDir == '/') {
                    curDir = "/";
                    preDIr = '';

                    // console.log("Change to root", root);                    
                    curNode = root;
                } else {
                    const parent = findDir(preDir);
                    // console.log(parent);
                    // console.log("set", parent.name, parent.parent);
                    curDir = parent.name;
                    preDir = parent.parent;

                    // console.log(`Change dir to ${curDir} from ${preDir}`); 

                    if(curNode.parent === null) {
                        console.log("should be root", curNode);
                        console.log("----");
                    }
                    if(curNode.name !== '/') {
                        curNode = curNode.parent;
                    }
                }
            } else {
                preDir = curDir;
                //curDir = `${curDepth}-${cmd[2]}`;
                curDir = `${cmd[2]}`;
                curDepth++;
                
                // console.log(`Change dir to ${curDir} from ${preDir}`); 
                addToAll(curDir, preDir, 0, curDepth);



                if(cmd[2] == '/') {
                    curNode = root;
                    preNode = root.parent;
                } else {
                    try {
                        
                        const newNode = curNode.children.find(c => c.name === cmd[2]);
                        
                        if(newNode !== undefined && newNode !== null && newNode.type === 'dir') {
                            preNode = curNode;
                            curNode = newNode
                        }

                        if(!curNode instanceof Node) {
                            console.log("WTF ?!?")
                            console.log(cmd)
                            console.log(preNode)
                            console.log(preNode.children)
                        }

                    } catch(e) {

                        console.log(cmd[1], cmd[2])

                        // console.log(root);
                        console.log("pre", preNode);
                        console.log("cur", curNode);
                        console.log("cur", preNode.children.find(c => c.name === cmd[2]));

                        throw e;
                    }
                }
            }

        } else {
            // console.log("List them files at ", curDir );
            command = "list";
        }
    } else if(command == "list") {

        // console.log(line);
        const [size, name] = line.split(" ");

        
        if(size !== "dir") {        
            addToAll(curDir, preDir, parseInt(size), name.trim());
        }

        // console.log("(add) curNode", curNode);
        curNode.children.push(new Node(
            name.trim(),
            size === 'dir' ? 0 : size,
            size === 'dir' ? 'dir' : 'file',
            curNode
        ))
    }
}) 



// console.log("- /");
// Calculate dir totals
// all
//     .filter(e => e.parent == '/')
//     .forEach(e => {
//         console.log(" ".repeat(e.depth) + " - " + e.name +" ("+e.size+")")
//     })


// all
//     .sort((a,b) => a.size - b.size)
//     .forEach(e => {
//         const parentIdx = all.map(e => e.name).indexOf(e.parent)
//         if(parentIdx !== -1) {
//             all[parentIdx].size += e.size;
//         }        
//     });

const parseNode = (node, depth) => {
    let size = 0;
    // console.log("  ".repeat(depth) + ` - ${node.name} (${node.type}${node.type === 'file' ? `,  size=${node.size}`: ""})`);
    
    size += parseInt(node.size);

    node.children.forEach(n => {
        size += parseNode(n, depth + 1);
    });

    node.size = size;

    return size;
}

let dirs = [];

const parseNodeDirs = (node, depth) => {
   
    if(node.type == 'dir') {
        dirs.push({name: node.name, size: node.size});
    }

    node.children.forEach(n => {
        parseNodeDirs(n, depth + 1);
    });
}


const parseDir = (dir, depth) => {
    let size = 0;

    // console.log("  ".repeat(depth) + " - " + dir.name + " (dir)");

    all
        .filter(d => d.parent == dir.name)
        .forEach(d => {
            size += parseDir(d, depth + 1)
        })

    files
        .filter(f => f.dir == dir.name)
        .forEach(file => {
            // console.log("  ".repeat(depth + 1) + " - " + file.name + " (file, size="+file.size+")");
            size += file.size;
        }) 

    const dIndx = all
        .map(d => d.name)
        .indexOf(dir.name == '/' ? '0-/': dir.name);
    
    try {
        all[dIndx].size = size;
    } catch(e) {
        console.log("not found", dir.name)
    }

    return size;
}




console.log("Total", parseNode(root, 0));

parseNodeDirs(root, 0);


// console.log("-> ", dirs.filter(e => e.size <= 100000).sort((a,b) => b.size - a.size));
console.log("-> ", dirs.filter(e => e.size <= 100000).sort((a,b) => b.size - a.size).reduce((p, c) => p + c.size, 0));

// console.log("Total", dirs);





// console.log(root);

// console.log("Total", parseDir({name: '0-/'}, 0));


// console.log(all.filter(d => d.parent == "0-/"))
// console.log("=====");
// console.log(files)
// console.log("-> ", all.filter(e => e.size <= 100000).sort((a,b) => b.size - a.size));
// console.log("-> ", all.filter(e => e.size <= 100000).sort((a,b) => b.size - a.size).reduce((p, c) => p + c.size, 0));
// const fTotal = files.filter(e => e.size <= 100000).reduce((p, c) => p + c.size, 0);
// const dTotal = all.filter(e => e.size <= 100000).reduce((p, c) => p + c.size, 0);
// console.log("->> ", dTotal, fTotal, dTotal +fTotal);



// 1164534
// 1072849

// 1072849

// 1336535
// 11543140