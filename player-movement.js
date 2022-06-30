'use strict';

let img = new Image();
img.src = './assets/generated1.png';
img.onload = function () {
    window.requestAnimationFrame(gameLoop)
}

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

// let scaledWidth = scale * width;
// let scaledHeight = scale * height;

let moveSpeed = 1;
let xPosition = 32;
let yPosition = 32;

let currentLoopIndex = 0;
let frameCount = 0;
let frameLimit = 10;

let walkUp = 8;
let walkLeft = 9;
let walkDown = 10;
let walkRight = 11;
let walkCycle = [0, 1, 2, 3, 4, 5, 6, 7, 8];

let swingUp = 8;
let swingLeft = 8;
let swingDown = 9;
let swingRight = 10;
let swingCycle = [0, 1, 2, 3, 4, 5];
let swing = false;

let currentCycle = walkCycle;
let currentDirection = walkRight;

function drawFrame(frameX, frameY, canvasX, canvasY) {
    // console.log(`x = ${xPosition}, y = ${yPosition}`)
    if (swing) {
        ctx.drawImage(img,
            frameX * width, frameY * height, width, height,
            canvasX - 96, canvasY - 96, scale * width, scale * height);
        // console.log('drawImage');
    } else {
        ctx.drawImage(img,
            frameX * width, frameY * height, width, height,
            canvasX - 32, canvasY - 32, scale * width, scale * height);
    }
}

let keyPresses = {};

window.addEventListener('keydown', keyDownListener, false);
function keyDownListener(event) {
    // event.preventDefault;
    keyPresses[event.key] = true;
}

window.addEventListener('keyup', keyUpListener, true);
function keyUpListener(event) {
    // event.preventDefault;
    keyPresses[event.key] = false;
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let hasMoved = false;

    if (keyPresses.f) {
        hasMoved = false;
        scale = swingScale;
        width = swingWidth;
        height = swingHeight;
        currentCycle = swingCycle;
        currentLoopIndex = 0;
        swing = true;
        if (currentDirection == walkUp) {
            currentDirection = swingUp;
            console.log(currentDirection)
        } else if (currentDirection == walkLeft) {
            currentDirection = swingLeft;
        } else if (currentDirection == walkDown) {
            currentDirection = swingDown;
        } else {
            currentDirection = swingRight;
        }
    }

    if (swing) {
        frameCount++;
        hasMoved = false;
        // console.log(currentDirection)
        // console.log(frameCount)
        // console.log(frameLimit)
        if (frameCount >= frameLimit) {
            frameCount = 0;
            currentLoopIndex++;
            if (currentLoopIndex >= swingCycle.length) {
                currentLoopIndex = 0;
                swing = false;
                width = walkWidth;
                height = walkHeight;
            }
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
        scale = walkScale;
        width = walkWidth;
        height = walkHeight;
        hasMoved = true;
    }
    if (keyPresses.d) {
        xPosition += moveSpeed;
        currentDirection = walkRight;
        scale = walkScale;
        width = walkWidth;
        height = walkHeight;
        hasMoved = true;
    } else if (keyPresses.a) {
        xPosition -= moveSpeed;
        currentDirection = walkLeft;
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

    drawFrame(currentCycle[currentLoopIndex], currentDirection, xPosition, yPosition);

    window.requestAnimationFrame(gameLoop);
}
