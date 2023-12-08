var args = require("./read-args");

function parseInput() {
  let [timeStr, distanceStr] = args.getInput();

  let times = timeStr
    .split(":")[1]
    .trim()
    .split(" ")
    .filter((l) => l);

  let distances = distanceStr
    .split(":")[1]
    .trim()
    .split(" ")
    .filter((l) => l);
  return { times, distances };
}

function racesMOE() {
  let { times, distances } = parseInput();

  let totalTimes;

  for (let i = 0; i < times.length; i++) {
    let currentTime = times[i];
    let c = 0;
    let wTimes = 0;

    while (c < currentTime) {
      let distance = c * (times[i] - c);

      if (distance > distances[i]) {
        wTimes++;
      }
      c++;
    }

    if (totalTimes) {
      totalTimes *= wTimes;
    } else {
      totalTimes = wTimes;
    }
  }

  return totalTimes;
}

function racesMOE2() {
  let { times, distances } = parseInput();

  let time = times.join("");
  let dist = distances.join("");

  let c = 0;

  while (c < time) {
    let currDistance = c * (time - c);

    if (currDistance > dist) {
      return time - (c * 2 - 1);
    }

    c++;
  }

  return -1;
}

console.log(racesMOE());
console.log(racesMOE2());
