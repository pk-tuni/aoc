const fs = require('fs');

const readline = require('readline');


let elfs = [];
let current = 0;


async function processLineByLine() {
  const fileStream = fs.createReadStream('aoc1_input');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    // console.log(`Line from file: ${line}`);

    if(line != "") {
        current += parseInt(line, 10);
    } else {
        elfs.push(current);
        current = 0;
    }
  }
}


(async ()=> {
 await processLineByLine();

 console.log(elfs.sort( (a,b) => b - a).slice(0, 3).reduce((a, p) => a + p, 0 ));

})()
