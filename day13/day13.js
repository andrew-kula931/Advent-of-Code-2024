var fs = require("fs");
var total = 0;
function part1(buttonA, buttonB, prize) {
    var returnAmount = 10000;
    for (var i = 0; i < Math.floor(prize.x / buttonA.x) + 1; i++) {
        for (var m = 0; m < Math.floor(prize.x / buttonB.x) + 1; m++) {
            if (i * buttonA.x + m * buttonB.x == prize.x &&
                i * buttonA.y + m * buttonB.y == prize.y) {
                if (i * 3 + m < returnAmount) {
                    returnAmount = i * 3 + m;
                }
            }
        }
    }
    if (returnAmount == 10000) {
        return 0;
    }
    else {
        return returnAmount;
    }
}
/*
function euclideanAlgorithm(a: number, b: number) {
  if (a === 0) {
    return [b, 0, 1];
  }
  const [gcd, x1, y1] = euclideanAlgorithm(b % a, a);
  const x = y1 - Math.floor(b / a) * x1;
  const y = x1;
  return [gcd, x, y];
}
*/
function part2(buttonA, buttonB, prize) {
    var b = (-buttonA.y * prize.x + buttonA.x * prize.y) /
        (buttonA.x * buttonB.y - buttonA.y * buttonB.x);
    var a = (prize.x - b * buttonB.x) / buttonA.x;
    if (b == Math.floor(b) && a == Math.floor(a)) {
        return a * 3 + b;
    }
    else {
        return 0;
    }
}
var filename = process.argv[2];
if (!filename) {
    console.error("Please provide a filename");
    process.exit(1);
}
var input = fs.readFileSync(filename, "utf-8");
var lines = input.split("\r\n").filter(Boolean);
function newButton(Xamount, Yamount) {
    var button = {
        x: Xamount,
        y: Yamount,
    };
    return button;
}
var a = false;
var b = false;
var buttonA;
var buttonB;
var prizeSpot;
lines.forEach(function (line) {
    if (!a) {
        buttonA = newButton(Number(line.substring(12, 14)), Number(line.substring(18, 20)));
        a = true;
        return;
    }
    else if (!b) {
        buttonB = newButton(Number(line.substring(12, 14)), Number(line.substring(18, 20)));
        b = true;
        return;
    }
    else {
        var splitLine = line.split(", ");
        prizeSpot = newButton(10000000000000 + Number(splitLine[0].substring(9)), 10000000000000 + Number(splitLine[1].substring(2)));
    }
    //total += part1(buttonA, buttonB, prizeSpot);
    total += part2(buttonA, buttonB, prizeSpot);
    a = false;
    b = false;
});
console.log(total);