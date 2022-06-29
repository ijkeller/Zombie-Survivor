'use strict';

let img = new Image();
img.src = './assets/generated1.png';
img.onload = function() {
    window.requestAnimationFrame(gameLoop)
}

let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

let walkScale = 1;
let walkWidth = 64;
let walkHeight = 64;

let swingScale = 3;
let swingWidth = 192;
let swingHeight = 192;

let scale = walkScale;
let width = walkWidth;
let height = walkHeight;

let scaledWidth = scale * width;
let scaledHeight = scale * height;

let moveSpeed = 1;
let xPosition = 0;
let yPosition = 0;

let currentLoopIndex = 0;
let frameCount = 0;
let frameLimit = 20;

let walkUp = 8;
let walkLeft = 9;
let walkDown = 10;
let walkRight = 11;
let walkCycle = [0, 1, 2, 3, 4, 5, 6, 7, 8];

let swingUp = 7;
let swingLeft = 8;
let swingDown = 9;
let swingRight = 10;
let swingCycle = [0, 1, 2, 3, 4, 5];

let currentDirection = walkRight;

function drawFrame( frameX, frameY, canvasX, canvasY) {
    ctx.drawImage(img,
        frameX * width, frameY * height, width, height,
        canvasX, canvasY, scaledWidth, scaledHeight);
}


let keyPresses = {};

window.addEventListener('keydown', keyDownListener, false);
function keyDownListener(event) {
    // event.preventDefault;
    keyPresses[event.key] = true;
}

window.addEventListener('keyup', keyUpListener, false);
function keyUpListener(event) {
    // event.preventDefault;
    keyPresses[event.key] = false;
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let hasMoved = false;
    let swing = false;
    let currentCycle = walkCycle;

    if (keyPresses.f) {
        if (currentDirection == walkUp) {
            currentDirection = swingUp;
            scale = swingScale;
            width = swingWidth;
            height = swingHeight;
            currentCycle = swingCycle;
            swing = true;
        } else if (currentDirection == walkLeft) {
            currentDirection = swingLeft;
            scale = swingScale;
            width = swingWidth;
            height = swingHeight;
            currentCycle = swingCycle;
            swing = true;
        } else if (currentDirection == walkDown) {
            currentDirection = swingDown;
            scale = swingScale;
            width = swingWidth;
            height = swingHeight;
            currentCycle = swingCycle;
            swing = true;
        } else {
            currentDirection = swingRight;
            scale = swingScale;
            width = swingWidth;
            height = swingHeight;
            currentCycle = swingCycle;
            swing = true;
        }
    }

    if (keyPresses.w) {
        yPosition -= moveSpeed;
        currentDirection = walkUp;
        scale = walkScale;
        width = walkWidth;
        height = walkHeight;
        currentCycle = walkCycle;
        hasMoved = true;
    } else if (keyPresses.s) {
        yPosition += moveSpeed;
        currentDirection = walkDown;
        hasMoved = true;
    }
    if (keyPresses.d) {
        xPosition += moveSpeed;
        currentDirection = walkRight;
        hasMoved = true;
    } else if (keyPresses.a) {
        xPosition  -= moveSpeed;
        currentDirection = walkLeft;
        hasMoved = true;
    }

    if (swing) {
        frameCount++;
        if (frameCount >= frameLimit) {
            frameCount = 0;
            currentLoopIndex++;
            if (currentLoopIndex >= swingCycle.length) {
                currentLoopIndex = 0;
            }
    }}

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

    drawFrame(currentCycle[currentLoopIndex], currentDirection, xPosition, yPosition);

    window.requestAnimationFrame(gameLoop);
}
