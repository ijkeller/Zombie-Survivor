'use strict';

let scale = 1;

// player sprite
// let height = 64;
// let width = 64;
// let moveSet = 8;

// let up = 8;
// let left = 9;
// let down = 10;
// let right = 11;

// player swing sprite 192*192, positions 8 - 11, array 0-5, frameRate
let height = 192;
let width = 192;

let up = 7;
let left = 8;
let down = 9;
let right = 10;

let moveSet = down;


// zombie 1-6 size
// let width = 46;
// let height = 36;

// zombie 7 size
// let height = 64;
// let width = 64;

const scaledWidth = scale * width;
const scaledHeight = scale * height;

let xlocation = 0;
let ylocation = 0;

const cycleLoop = [0, 1, 2, 3, 4, 5]
let currentLoopIndex = 0;
let frameCount = 0;
// let down = 0;
// let right = 1;
// let up = 2;
// let left = 3;
let currentDirection = right;

let zombie1 = './assets/Zombies/zombie1.png'
let zombie2 = './assets/Zombies/zombie2.png'
let zombie3 = './assets/Zombies/zombie3.png'
let zombie4 = './assets/Zombies/zombie4.png'
let zombie5 = './assets/Zombies/zombie5.png'
let zombie6 = './assets/Zombies/zombie6.png'
let zombie7 = './assets/Zombies/zombie7.png'
let playerSprite = './assets/generated1.png'

let img = new Image();
img.src = playerSprite;
img.onload = function() {
    init();
} 

let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');


function drawFrame(frameX, frameY, canvasX, canvasY) {
    ctx.drawImage(img,
        frameX * width, frameY * height, width, height,
        canvasX, canvasY, scaledWidth, scaledHeight);
}

function init() {
    window.requestAnimationFrame(step);
}

function step() {
    frameCount++;
    if (frameCount < 20) {
        window.requestAnimationFrame(step);
        return;
    }
    frameCount = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFrame(cycleLoop[currentLoopIndex], moveSet, xlocation, ylocation);
    currentLoopIndex++;
    if (currentLoopIndex >= cycleLoop.length) {
        currentLoopIndex = 0;
    }

    window.requestAnimationFrame(step);
}



