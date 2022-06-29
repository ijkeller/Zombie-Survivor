'use strict';

let zombie1 = './assets/Zombies/zombie1.png'
let zombie2 = './assets/Zombies/zombie2.png'
let zombie3 = './assets/Zombies/zombie3.png'
let zombie4 = './assets/Zombies/zombie4.png'
let zombie5 = './assets/Zombies/zombie5.png'
let zombie6 = './assets/Zombies/zombie6.png'
let zombie7 = './assets/Zombies/zombie7.png'



let img = new Image();
img.src = zombie7;
img.onload = function() {
    init();
} 

let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

let scale = 1;
// let width = 46;
// let height = 36;
let height = 64;
let width = 64;
const scaledWidth = scale * width;
const scaledHeight = scale * height;
let xlocation = 15;
let ylocation = 35;

const cycleLoop = [0, 1, 0, 2]
let currentLoopIndex = 0;
let frameCount = 0;
let down = 0;
let right = 1;
let up = 2;
let left = 3;
let currentDirection = right;

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
    if (frameCount < 25) {
        window.requestAnimationFrame(step);
        return;
    }
    frameCount = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFrame(cycleLoop[currentLoopIndex], currentDirection, xlocation, ylocation);
    currentLoopIndex++;
    if (currentLoopIndex >= cycleLoop.length) {
        currentLoopIndex = 0;
    }

    window.requestAnimationFrame(step);
}



