// ------------------------------------------------------------
// game.js = door picking screen (2 picks total)
// ------------------------------------------------------------

function drawGame() {
  background(25);

  // Title
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(34);

  const step = pickedColors.length + 1; // 1 or 2
  text(`Pick Door ${step}`, width / 2, 90);

  textSize(18);
  text("Click a door or press 1 / 2.", width / 2, 135);

  // Doors
  drawColorDoor(leftDoorBtn, doorChoices[0]);
  drawColorDoor(rightDoorBtn, doorChoices[1]);

  // Pick summary
  fill(220);
  textSize(16);

  const pickedText =
    pickedColors.length === 0
      ? "Picked: (none yet)"
      : `Picked: ${pickedColors.map((c) => COLORS[c].label).join(" + ")}`;

  text(pickedText, width / 2, 720);

  // Cursor feedback
  const over = isHover(leftDoorBtn) || isHover(rightDoorBtn);
  cursor(over ? HAND : ARROW);
}

function drawColorDoor(btn, colorName) {
  rectMode(CENTER);
  noStroke();

  const rgb = COLORS[colorName].rgb;

  // Door body
  fill(rgb[0], rgb[1], rgb[2]);
  rect(btn.x, btn.y, btn.w, btn.h, 14);

  // Handle
  fill(255, 255, 255, 180);
  ellipse(btn.x + btn.w / 3.2, btn.y, 16, 16);

  // Label strip
  fill(0, 120);
  rect(btn.x, btn.y + btn.h / 2 - 30, btn.w, 60, 0, 0, 14, 14);

  fill(255);
  textAlign(CENTER, CENTER);
  textSize(22);
  text(COLORS[colorName].label, btn.x, btn.y + btn.h / 2 - 30);
}

// ------------------------------
// Input
// ------------------------------
function gameMousePressed() {
  if (isHover(leftDoorBtn)) pickDoorColor(doorChoices[0]);
  else if (isHover(rightDoorBtn)) pickDoorColor(doorChoices[1]);
}

function gameKeyPressed() {
  if (key === "1") pickDoorColor(doorChoices[0]);
  else if (key === "2") pickDoorColor(doorChoices[1]);
}

// ------------------------------
// Logic
// ------------------------------
function pickDoorColor(colorName) {
  pickedColors.push(colorName);

  // After 1st pick -> new options
  if (pickedColors.length === 1) {
    advanceDoorChoices();
  }

  // After 2nd pick -> end screen (we reuse "win" as the ending)
  if (pickedColors.length === 2) {
    currentScreen = "win";
  }
}
