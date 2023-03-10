const input = require("fs").readFileSync("./aoc4_input", "utf-8").split("\n");

let fullOverlaps = 0,
	partOverlaps = 0;

for (let i = 0; i < input.length; i++) {
	let ns = input[i].match(/(\d+)/g);
	ns = ns.map((n) => parseInt(n));
	let r1 = [ns[0], ns[1]],
		r2 = [ns[2], ns[3]],
		ma = (a) => Math.max(...a),
		mi = (a) => Math.min(...a);

	if ((ns[0] <= ns[2] && ns[1] >= ns[3]) || (ns[0] >= ns[2] && ns[1] <= ns[3]))
		fullOverlaps++;
	else if (r1.some((n) => r2.includes(n))) partOverlaps++;
	else if (
		(ma(r1) >= mi(r2) && ma(r1) <= ma(r2)) ||
		(ma(r2) >= mi(r1) && ma(r2) <= ma(r1))
	) {
		console.log(r1, r2)
		console.log(ma(r1), mi(r2), ma(r1), ma(r2));
		console.log("---");
		partOverlaps++;
	}

}

console.log(`Full overlaps: ${fullOverlaps}`); // Part 1
console.log(`All overlaps: ${partOverlaps + fullOverlaps}`); // Part 2