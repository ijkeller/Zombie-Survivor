'use strict';

let img = new Image();
img.src = './assets/generated1.png';
img.onload = function () {
  window.requestAnimationFrame(gameLoop);
};

let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

let walkScale = 1;
let walkWidth = 64;
let walkHeight = 64;

let swingScale = 1;
let swingWidth = 192;
let swingHeight = 192;

let scale = walkScale;
let width = walkWidth;
let height = walkHeight;

let moveSpeed = 1;
let xPosition = 32;
let yPosition = 32;

let currentLoopIndex = 0;
let frameCount = 0;
let frameLimit = 10;

let walkCycle = [0, 1, 2, 3, 4, 5, 6, 7, 8];

let up = 7;
let left = 8;
let down = 9;
let right = 10;
let swingCycle = [0, 1, 2, 3, 4, 5];
let swing = false;

let walkAction = 1;
let swingAction = 0;

let currentCycle = walkCycle;
let currentDirection = right;
let currentAction = walkAction;

function drawFrame(frameX, frameY, canvasX, canvasY) {
  if (swing) {
    ctx.drawImage(img,
      frameX * width, frameY * height, width, height,
      canvasX - 96, canvasY - 96, scale * width, scale * height);
  } else {
    ctx.drawImage(img,
      frameX * width, frameY * height, width, height,
      canvasX - 32, canvasY - 32, scale * width, scale * height);
  }
}

let keyPresses = {};
let counter = 0;

window.addEventListener('keydown', keyDownListener, false);
function keyDownListener(event) {
  event.preventDefault;
  keyPresses[event.key] = true;
  counter = 0;
  counter++;
  if (counter > 4) {
    return;
  }
}

window.addEventListener('keyup', keyUpListener, true);
function keyUpListener(event) {
  event.preventDefault;
  keyPresses[event.key] = false;
}

function gameLoop() {

  if (swing) {
    ctx.clearRect(xPosition - 96, yPosition - 96, width, height);
  } else {
    ctx.clearRect(xPosition - 32, yPosition - 32, width, height);
  }

  let hasMoved = false;

  if (keyPresses.f) {
    counter = 0;
    counter++;
    if (counter > 4) {
      return;
    }
    hasMoved = false;
    keyPresses = {};
    scale = swingScale;
    width = swingWidth;
    height = swingHeight;
    currentCycle = swingCycle;
    currentAction = swingAction;
    currentLoopIndex = 0;
    swing = true;

  }

  if (swing) {
    frameCount++;
    hasMoved = false;
    if (frameCount >= frameLimit) {
      frameCount = 0;
      currentLoopIndex++;
      if (currentLoopIndex >= swingCycle.length) {
        currentLoopIndex = 0;
        swing = false;
        width = walkWidth;
        height = walkHeight;
        currentAction = walkAction;
      }
    }
  }

  if (keyPresses.w) {
    yPosition -= moveSpeed;
    currentDirection = up;
    scale = walkScale;
    width = walkWidth;
    height = walkHeight;
    currentCycle = walkCycle;
    hasMoved = true;
  } else if (keyPresses.s) {
    yPosition += moveSpeed;
    currentDirection = down;
    scale = walkScale;
    width = walkWidth;
    height = walkHeight;
    hasMoved = true;
  }
  if (keyPresses.d) {
    xPosition += moveSpeed;
    currentDirection = right;
    scale = walkScale;
    width = walkWidth;
    height = walkHeight;
    hasMoved = true;
  } else if (keyPresses.a) {
    xPosition -= moveSpeed;
    currentDirection = left;
    scale = walkScale;
    width = walkWidth;
    height = walkHeight;
    hasMoved = true;
  }

  if (hasMoved) {
    frameCount++;
    if (frameCount >= frameLimit) {
      frameCount = 0;
      currentLoopIndex++;
      if (currentLoopIndex >= walkCycle.length) {
        currentLoopIndex = 0;
      }
    }
  }

  drawFrame(currentCycle[currentLoopIndex], currentDirection + currentAction, xPosition, yPosition);

  window.requestAnimationFrame(gameLoop);
}
