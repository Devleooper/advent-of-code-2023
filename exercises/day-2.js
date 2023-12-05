var args = require("./read-args");

function validatePossibleGames() {
  let lines = args.getInput();

  const max = new Map([
    ["red", 12],
    ["green", 13],
    ["blue", 14],
  ]);

  return lines
    .map((line) => {
      let [gameId, gameData] = line.split(":");
      let id = gameId.split(" ")[1];

      if (gameData) {
        let sets = gameData.split(";");
        let shouldSum;

        sets.every((set) => {
          let colors = set.trim().split(",");
          colors.every((c) => {
            let [num, color] = c.trim().split(" ");

            if (num > max.get(color)) {
              shouldSum = false;
              return undefined;
            } else {
              shouldSum = true;
              return true;
            }
          });

          if (!shouldSum) {
            return undefined;
          } else {
            return true;
          }
        });

        if (shouldSum) {
          return parseInt(id);
        }

        return 0;
      }

      return 0;
    })
    .reduce((a, b) => a + b, 0);
}

function powerOfSets() {
  let lines = args.getInput();

  return lines
    .map((line) => {
      let sets = line.split(":").pop();

      if (sets) {
        let minimums = new Map([
          ["red", 1],
          ["blue", 1],
          ["green", 1],
        ]);

        sets = sets.split(";");

        sets.forEach((set) => {
          let colors = set.trim().split(",");

          colors.forEach((c) => {
            let [numStr, color] = c.trim().split(" ");
            let num = parseInt(numStr);

            if (num > minimums.get(color)) {
              minimums.set(color, num);
            }
          });
        });

        return [...minimums.values()].reduce((a, b) => a * b, 1);
      }

      return 0;
    })
    .reduce((a, b) => a + b, 0);
}

console.log(validatePossibleGames());
console.log(powerOfSets());
