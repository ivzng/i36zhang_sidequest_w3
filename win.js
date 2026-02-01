// ------------------------------------------------------------
// win.js = END screen (mixed colour background)
// ------------------------------------------------------------

function drawWin() {
  if (pickedColors.length < 2) {
    background(0);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(22);
    text("Missing picks. Press R to restart.", width / 2, height / 2);
    return;
  }

  const mixed = mixTwoColors(pickedColors[0], pickedColors[1]);
  background(mixed[0], mixed[1], mixed[2]);

  // overlay header
  fill(0, 130);
  rectMode(CORNER);
  rect(0, 0, width, 150);

  fill(255);
  textAlign(CENTER, CENTER);

  textSize(26);
  text(
    `${COLORS[pickedColors[0]].label} + ${COLORS[pickedColors[1]].label}`,
    width / 2,
    55,
  );

  textSize(16);
  text("This is your mixed world colour.", width / 2, 95);
  text("Click to restart, or press R.", width / 2, 125);
}

function winMousePressed() {
  resetDoorRun();
  currentScreen = "game";
}

function winKeyPressed() {
  if (key === "r" || key === "R") {
    resetDoorRun();
    currentScreen = "game";
  }
  if (keyCode === ESCAPE) currentScreen = "start";
}
