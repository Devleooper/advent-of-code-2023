var args = require("./read-args");

let cardStrengths = [
  "A",
  "K",
  "Q",
  "J",
  "T",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
];

let handStrengths = [
  [1, 1, 1, 1, 1],
  [2, 1, 1, 1],
  [2, 2, 1],
  [3, 1, 1],
  [3, 2],
  [4, 1],
  [5],
];

function getHandStrength(hand, useJoker) {
  let cards = hand.split("");

  let occurrences = new Map();
  let jokers = 0;

  for (let card of cards) {
    if (useJoker && card === "J") {
      jokers++;
      continue;
    }

    if (occurrences.has(card)) {
      occurrences.set(card, occurrences.get(card) + 1);
    } else {
      occurrences.set(card, 1);
    }
  }

  occurrences = [...occurrences.values()].sort((a, b) => b - a);

  if (useJoker) {
    if (occurrences.length > 0) {
      //sum jokers to the most occurrences char
      occurrences[0] += jokers;
    } else {
      //if no occurrences then push the jokers to get the biggest hand strength
      occurrences.push(jokers);
    }
  }

  let strength = -1;

  for (let i = 0; i < handStrengths.length; i++) {
    if (
      handStrengths[i].length == occurrences.length &&
      handStrengths[i].every((v, i) => v === occurrences[i])
    ) {
      strength = i;
      break;
    }
  }

  return strength;
}

function evaluateRank(a, b, useJoker) {
  if (a.handStrength > b.handStrength) {
    return 1;
  } else if (b.handStrength > a.handStrength) {
    return -1;
  } else {
    for (let i = 0; i < a.hand.length; i++) {
      let aCardStrength = cardStrengths.indexOf(a.hand[i]);
      let bCardStrength = cardStrengths.indexOf(b.hand[i]);

      if (useJoker) {
        // 3 is J position
        if (aCardStrength === 3 && bCardStrength !== 3) {
          return -1;
        } else if (bCardStrength === 3 && aCardStrength !== 3) {
          return 1;
        }
      }

      if (aCardStrength > bCardStrength) {
        return -1;
      } else if (bCardStrength > aCardStrength) {
        return 1;
      }
    }

    return 0;
  }
}

function camelCards() {
  let lines = args.getInput();

  let strengths = [];
  let bids = [];
  let result = 0;

  lines.forEach((line, pos) => {
    let [hand, bid] = line.trim().split(" ");
    bids.push(parseInt(bid));

    let handStrength = getHandStrength(hand, false);
    strengths.push({ pos, hand, handStrength });
  });

  strengths.sort((a, b) => evaluateRank(a, b, false));

  for (let i = 0; i < strengths.length; i++) {
    result += (i + 1) * bids[strengths[i].pos];
  }

  return result;
}

function camelCardsUsingJoker() {
  let lines = args.getInput();

  let strengths = [];
  let bids = [];
  let result = 0;

  lines.forEach((line, pos) => {
    let [hand, bid] = line.trim().split(" ");
    bids.push(parseInt(bid));

    let handStrength = getHandStrength(hand, true);
    strengths.push({ pos, hand, handStrength });
  });

  strengths.sort((a, b) => evaluateRank(a, b, true));

  for (let i = 0; i < strengths.length; i++) {
    result += (i + 1) * bids[strengths[i].pos];
  }

  return result;
}

console.log(camelCards());
console.log(camelCardsUsingJoker());
