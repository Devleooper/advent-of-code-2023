var args = require("./read-args");

function calibrationDocument1() {
  let lines = args.getInput();

  return lines
    .map((l, i) => {
      let first;
      let last;

      for (let c of l) {
        if (isNumber(c)) {
          if (!first) {
            first = c;
          }
          last = c;
        }
      }

      return parseInt(first + last);
    })
    .filter((digit) => digit)
    .reduce((a, b) => a + b, 0);
}

function calibrationDocument2() {
  let lines = args.getInput();

  return lines
    .map((l) => {
      let digits = new Map();

      for (let i in l) {
        if (isNumber(l[i])) {
          digits.set(parseInt(i), l[i]);
        }
      }

      evalStringNumber(digits, l);

      digits = [...new Map([...digits].sort((a, b) => a[0] - b[0])).values()];

      return parseInt(digits[0] + digits[digits.length - 1]);
    })
    .filter((digit) => digit)
    .reduce((a, b) => a + b, 0);
}

function isNumber(character) {
  return character >= "0" && character <= "9";
}

function evalStringNumber(digits, line) {
  let numberStrs = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];

  numberStrs.forEach((n, i) => {
    let lidx = line.indexOf(n);

    while (lidx != -1) {
      digits.set(lidx, i + 1 + "");

      lidx = line.indexOf(n, lidx + n.length);
    }
  });
}

console.log(calibrationDocument1());
console.log(calibrationDocument2());
