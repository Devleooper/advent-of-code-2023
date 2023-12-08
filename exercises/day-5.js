var args = require("./read-args");

const anyCharacterRegex = /.*[a-zA-Z].*/;

function parseConversionMap(position, lines) {
  let map = [];
  let hasItems = true;
  let currentPos = position;

  while (hasItems) {
    let current = lines[currentPos];

    if (!current || current.length == 0) {
      hasItems = false;
      break;
    }

    let entry = current
      .trim()
      .split(" ")
      .filter((n) => n)
      .map(Number);

    map.push(entry);

    currentPos++;
  }

  return [currentPos, map];
}

function parseInput(lines) {
  let parsed = [];
  let [seedsLine, ...mappings] = lines;

  let seeds = seedsLine
    .trim()
    .split(":")[1]
    .split(" ")
    .filter((l) => l)
    .map(Number);

  parsed.push(seeds);

  let pos = 0;

  while (pos < mappings.length) {
    if (anyCharacterRegex.test(mappings[pos])) {
      let [nextPos, mapped] = parseConversionMap(pos + 1, mappings);
      parsed.push(mapped);
      pos = nextPos;
    }
    pos++;
  }

  return parsed;
}

function mapValue(value, mapping) {
  let existing = mapping.find((m) => value >= m[1] && value < m[1] + m[2]);

  if (existing) {
    let [dest, source, ...b] = existing;

    return dest + value - source;
  } else {
    return value;
  }
}

function mapInverseValue(value, mapping) {
  let existing = mapping.find((m) => value >= m[0] && value < m[0] + m[2]);

  if (existing) {
    let [dest, source, ...b] = existing;

    return source + value - dest;
  } else {
    return value;
  }
}

function getSeedLocation(seed, mappings) {
  let currentValue = seed;
  let currentMapping;

  for (let i = 0; i < mappings.length; i++) {
    currentMapping = mappings[i];
    currentValue = mapValue(currentValue, currentMapping);
  }

  return currentValue;
}

function getSeedForLocation(location, mappings) {
  let currentValue = location;
  let currentMapping;

  for (let i = 0; i < mappings.length; i++) {
    currentMapping = mappings[i];
    currentValue = mapInverseValue(currentValue, currentMapping);
  }

  return currentValue;
}

function isSeedInRange(seed, seedRanges) {
  for (let i = 0; i < seedRanges.length; i += 2) {
    let current = seedRanges[i];
    let len = seedRanges[i + 1];

    if (seed >= current && seed < current + len) {
      return true;
    }
  }

  return false;
}

function closestSeedLocation() {
  let lines = args.getInput();

  let [seeds, ...mappings] = parseInput(lines);

  let nearLocation = Number.MAX_VALUE;

  for (let seed of seeds) {
    nearLocation = Math.min(nearLocation, getSeedLocation(seed, mappings));
  }

  return nearLocation;
}

function closestSeedOnRange() {
  let lines = args.getInput();

  let [seedRanges, ...mappings] = parseInput(lines);

  for (let i = 0; i < 1_000_000_000; i++) {
    let seed = getSeedForLocation(i, mappings.slice().reverse());

    if (isSeedInRange(seed, seedRanges)) {
      return i;
    }
  }

  return -1;
}

console.log(closestSeedLocation());
console.log(closestSeedOnRange());
