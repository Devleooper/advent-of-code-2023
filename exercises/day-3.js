var args = require("./read-args");

const specialChars = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]*$/;

const adjacents = [
  [1, 0] /* down */,
  [0, 1] /* right */,
  [-1, 0] /* up */,
  [0, -1] /* left */,
  [1, 1] /* down-right */,
  [-1, -1] /* up-left */,
  [1, -1] /* down-left */,
  [-1, 1] /* up-right */,
];

function isSpecialChar(character) {
  return specialChars.test(character);
}

function isNumber(character) {
  return character >= "0" && character <= "9";
}

function buildMatrix(lines, engine, engineFootPrints) {
  for (let i = 0; i < lines.length; i++) {
    let row = [],
      footPrintRow = [];

    for (let char of lines[i]) {
      row.push(char);
      footPrintRow.push(false);
    }

    engine.push(row);
    engineFootPrints.push(footPrintRow);
  }
}

function findAdjacents(i, j, engine, footPrints) {
  return adjacents
    .map((adj) => [i + adj[0], j + adj[1]])
    .filter(
      (coord) =>
        coord[0] >= 0 &&
        coord[0] < engine.length &&
        coord[1] >= 0 &&
        coord[1] < engine[j].length
    )
    .map(([cordi, cordj]) => {
      let posJ = cordj;
      let negJ = cordj;
      let nextPositive = engine[cordi][posJ];
      let nextNegative = engine[cordi][negJ];
      let numChar = "";

      while (isNumber(nextPositive)) {
        if (!footPrints[cordi][posJ]) {
          numChar = numChar + nextPositive;
          footPrints[cordi][posJ] = true;
        }

        posJ++;
        nextPositive = engine[cordi][posJ];
      }

      while (isNumber(nextNegative)) {
        if (!footPrints[cordi][negJ]) {
          numChar = nextNegative + numChar;
          footPrints[cordi][negJ] = true;
        }

        negJ--;
        nextNegative = engine[cordi][negJ];
      }

      if (numChar) {
        return parseInt(numChar);
      }

      return 0;
    })
    .reduce((a, b) => a + b, 0);
}

function findRatios(i, j, engine, footPrints) {
  let adjacencyCount = 0;
  let adjValues = [];

  adjacents
    .map((adj) => [i + adj[0], j + adj[1]])
    .filter(
      (coord) =>
        coord[0] >= 0 &&
        coord[0] < engine.length &&
        coord[1] >= 0 &&
        coord[1] < engine[j].length
    )
    .forEach(([cordi, cordj]) => {
      let posJ = cordj;
      let negJ = cordj;
      let nextPositive = engine[cordi][posJ];
      let nextNegative = engine[cordi][negJ];
      let numChar = "";

      while (isNumber(nextPositive)) {
        if (!footPrints[cordi][posJ]) {
          numChar = numChar + nextPositive;
          footPrints[cordi][posJ] = true;
        }

        posJ++;
        nextPositive = engine[cordi][posJ];
      }

      while (isNumber(nextNegative)) {
        if (!footPrints[cordi][negJ]) {
          numChar = nextNegative + numChar;
          footPrints[cordi][negJ] = true;
        }

        negJ--;
        nextNegative = engine[cordi][negJ];
      }

      if (numChar) {
        adjacencyCount++;
        adjValues.push(parseInt(numChar));
      }
    });

  if (adjacencyCount == 2) {
    return adjValues.reduce((a, b) => a * b, 1);
  }

  return 0;
}

function fixEngineSchema() {
  let lines = args.getInput();

  let engine = [],
    engineFootPrints = [];
  let schemaSum = 0;

  //define adjacency matrix
  buildMatrix(lines, engine, engineFootPrints);

  for (let i = 0; i < engine.length; i++) {
    for (let j = 0; j < engine[0].length; j++) {
      let current = engine[i][j];
      if (isSpecialChar(current)) {
        schemaSum += findAdjacents(i, j, engine, engineFootPrints);
      }
    }
  }

  return schemaSum;
}

function findGearRatio() {
  let lines = args.getInput();

  let engine = [],
    engineFootPrints = [];
  let ratioSum = 0;

  //define adjacency matrix
  buildMatrix(lines, engine, engineFootPrints);

  for (let i = 0; i < engine.length; i++) {
    for (let j = 0; j < engine[0].length; j++) {
      let current = engine[i][j];
      if (current === "*") {
        ratioSum += findRatios(i, j, engine, engineFootPrints);
      }
    }
  }

  return ratioSum;
}

console.log(fixEngineSchema());
console.log(findGearRatio());
