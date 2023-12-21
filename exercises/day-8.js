var args = require("./read-args");

const coordinateMatcher = /(\w+)\s*=\s*\(([^,]+),\s*([^)]+)\)/;

const gcd = (a, b) => (a ? gcd(b % a, a) : b);

const lcm = (a, b) => (a * b) / gcd(a, b);

function parseInput(simultaneousPaths) {
  const coordinates = new Map();
  const startingNodes = [];
  const [navigation, , ...maps] = args.getInput();

  maps.forEach((map) => {
    const [, key, left, right] = map.match(coordinateMatcher);

    coordinates.set(key, [left, right]);

    if (simultaneousPaths && key.endsWith("A")) {
      startingNodes.push(key);
    }
  });

  return [navigation, coordinates, startingNodes];
}

function findSteps(start, navigation, coordinates) {
  let zFound = false;
  let navigationPos = 0;
  let stepsCount = 0;
  let currentPos = start;

  while (!zFound) {
    if (currentPos.endsWith("Z")) {
      zFound = true;
    }

    if (navigationPos < navigation.length) {
      let action = navigation[navigationPos];
      let [l, r] = coordinates.get(currentPos);

      if (action === "L") {
        currentPos = l;
      } else if (action === "R") {
        currentPos = r;
      }

      stepsCount++;
      navigationPos++;
    } else {
      //we repeat the navigation
      navigationPos = 0;
    }
  }

  return stepsCount;
}

function desertSteps() {
  let [navigation, coordinates] = parseInput(false);

  return findSteps("AAA", navigation, coordinates);
}

function ghostDesertSteps() {
  let [navigation, coordinates, startingNodes] = parseInput(true);

  let steps = startingNodes.map((node) =>
    findSteps(node, navigation, coordinates)
  );

  return steps.reduce(lcm);
}

console.log(desertSteps());
console.log(ghostDesertSteps());
