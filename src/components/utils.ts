export const range = (
  start: number,
  end: number,
  step: number = 1
): number[] => {
  const output = [];
  if (typeof end === "undefined") {
    end = start;
    start = 0;
  }
  for (let i = start; i < end; i += step) {
    output.push(i);
  }
  return output;
};

export function clamp(num: number, min: number, max: number): number {
  return Math.min(Math.max(num, min), max);
}

export function saturate(num: number): number {
  return clamp(num, 0, 1);
}

export function mapRange(
  value: number,
  low1: number,
  high1: number,
  low2: number,
  high2: number
): number {
  return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
}

function xorHash(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash ^= char;
    hash *= 0x100000001b3; // A prime number multiplier for better distribution
  }
  // Normalize the hash to be between 0 and 1
  return (hash % 1000000) / 1000000; // Adjust the modulo to desired precision
}

export function pseudoRandom(n: number): number {
  // Convert the number to a string for hashing
  const str = n.toString();
  // Get the hash value using xorHash
  return xorHash(str) * 2 - 1;
}
