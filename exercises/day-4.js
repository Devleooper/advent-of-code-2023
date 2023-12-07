var args = require("./read-args");

function scratchCardsPoints() {
  let lines = args.getInput();

  return lines
    .map((line) => line.split(":")[1])
    .filter((info) => info)
    .map((info) => {
      let [wline, cline] = info.split("|");

      let winning = wline
        .split(" ")
        .filter((e) => e.length > 0)
        .sort((a, b) => a - b);

      let current = cline
        .split(" ")
        .filter((e) => e.length > 0)
        .sort((a, b) => a - b);

      let points = 0;

      for (let val of current) {
        for (let wval of winning) {
          if (val === wval) {
            if (points === 0) {
              points = 1;
            } else {
              points *= 2;
            }
            break;
          }
        }
      }

      return points;
    })
    .reduce((a, b) => a + b, 0);
}

function scratchCardsProfit() {
  let lines = args.getInput();

  let cardsCount = new Map(
    Array.from(Array(lines.length)).map((u, i) => [i + 1, 1])
  );

  lines
    .map((line) => line.split(":"))
    .filter(([game, numbers]) => game && numbers)
    .forEach(([game, numbers]) => {
      let gameStr = game.split(" ");
      let gameId = parseInt(gameStr[gameStr.length - 1]);

      let [wline, cline] = numbers.split("|");

      let winning = wline
        .split(" ")
        .filter((e) => e.length > 0)
        .sort((a, b) => a - b);

      let current = cline
        .split(" ")
        .filter((e) => e.length > 0)
        .sort((a, b) => a - b);

      let points = 0;

      for (let val of current) {
        for (let wval of winning) {
          if (val === wval) {
            points++;
          }
        }
      }

      for (let i = 1; i <= points; i++) {
        cardsCount.set(
          gameId + i,
          cardsCount.get(gameId + i) + cardsCount.get(gameId)
        );
      }
    });

  return [...cardsCount.values()].reduce((a, b) => a + b, 0);
}

console.log(scratchCardsPoints());
console.log(scratchCardsProfit());
