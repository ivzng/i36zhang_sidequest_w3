// ------------------------------------------------------------
// main.js = router + shared state + helpers
// ------------------------------------------------------------

// ------------------------------
// Screen state
// ------------------------------
let currentScreen = "start"; // "start" | "instr" | "game" | "win" | "lose"

// ------------------------------
// Coloured door game data
// ------------------------------
const COLORS = {
  red: { label: "RED", rgb: [255, 0, 0] },
  green: { label: "GREEN", rgb: [0, 255, 0] },
  blue: { label: "BLUE", rgb: [0, 0, 255] },
};

let pickedColors = []; // ex: ["blue", "red"]
let doorChoices = []; // ex: ["green", "blue"]

// Door “buttons” (rectMode(CENTER))
const leftDoorBtn = { x: 250, y: 430, w: 220, h: 340 };
const rightDoorBtn = { x: 550, y: 430, w: 220, h: 340 };

// ------------------------------
// p5 lifecycle
// ------------------------------
function setup() {
  createCanvas(800, 800);
  textFont("sans-serif");
  resetDoorRun();
}

function draw() {
  if (currentScreen === "start") drawStart();
  else if (currentScreen === "instr") drawInstr();
  else if (currentScreen === "game") drawGame();
  else if (currentScreen === "win") drawWin();
  else if (currentScreen === "lose") drawLose();
}

function mousePressed() {
  if (currentScreen === "start") startMousePressed();
  else if (currentScreen === "instr") instrMousePressed();
  else if (currentScreen === "game") gameMousePressed();
  else if (currentScreen === "win") winMousePressed?.();
  else if (currentScreen === "lose") loseMousePressed?.();
}

function keyPressed() {
  if (currentScreen === "start") startKeyPressed();
  else if (currentScreen === "instr") instrKeyPressed();
  else if (currentScreen === "game") gameKeyPressed?.();
  else if (currentScreen === "win") winKeyPressed?.();
  else if (currentScreen === "lose") loseKeyPressed?.();
}

// ------------------------------------------------------------
// Shared helper: hover (rectMode(CENTER))
// ------------------------------------------------------------
function isHover({ x, y, w, h }) {
  return (
    mouseX > x - w / 2 &&
    mouseX < x + w / 2 &&
    mouseY > y - h / 2 &&
    mouseY < y + h / 2
  );
}

// ------------------------------------------------------------
// Game helpers: random choices + colour mixing
// ------------------------------------------------------------
function pickTwoDoorColors() {
  const options = ["red", "green", "blue"];

  // shuffle
  for (let i = options.length - 1; i > 0; i--) {
    const j = floor(random(i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  return [options[0], options[1]];
}

function mixTwoColors(c1Name, c2Name) {
  const a = COLORS[c1Name].rgb;
  const b = COLORS[c2Name].rgb;

  return [min(255, a[0] + b[0]), min(255, a[1] + b[1]), min(255, a[2] + b[2])];
}

// Reset run (used when starting/restarting)
function resetDoorRun() {
  pickedColors = [];
  doorChoices = pickTwoDoorColors();
}

// After first pick, roll new random pair
function advanceDoorChoices() {
  doorChoices = pickTwoDoorColors();
}
