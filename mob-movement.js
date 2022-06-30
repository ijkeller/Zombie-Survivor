'use strict';

let zombie1 = './assets/Zombies/zombie1.png'
let zombie2 = './assets/Zombies/zombie2.png'
let zombie3 = './assets/Zombies/zombie3.png'
let zombie4 = './assets/Zombies/zombie4.png'
let zombie5 = './assets/Zombies/zombie5.png'
let zombie6 = './assets/Zombies/zombie6.png'
// let zombie7 = './assets/Zombies/zombie7.png'

let zombieImg = new Image();
zombieImg.src = zombie1;
zombieImg.onload = function() {
    zombieInit();
} 

// let canvas = document.querySelector('canvas');
// let ctx = canvas.getContext('2d');

let zombieScale = 1;

// zombies 1-6 w/h
let zombieWidth = 46;
let zombieHeight = 36;

// zombie 7 w/h
// let height = 64;
// let width = 64;


const zombieScaledWidth = zombieScale * zombieWidth;
const zombieScaledHeight = zombieScale * zombieHeight;
let zombieXlocation = 15;
let zombieYlocation = 35;

const zombieCycleLoop = [0, 1, 0, 2]
let zombieCurrentLoopIndex = 0;

let zombieDown = 0;
let zombieRight = 1;
let zombieUp = 2;
let zombieLeft = 3;
let zombieCurrentDirection = zombieLeft;
let zombieMoveSpeed = 1;

function drawZombieFrame(frameX, frameY, canvasX, canvasY) {
    ctx.drawImage(zombieImg,
        frameX * zombieWidth, frameY * zombieHeight, zombieWidth, zombieHeight,
        canvasX, canvasY, zombieScaledWidth, zombieScaledHeight);
}

function zombieInit() {
    window.requestAnimationFrame(step);
}

function getPlayer() {

    let adjustedX = 0;
    let adjustedY = 0;

    if (swing) {
        adjustedX = xPosition - 96;
        adjustedY = yPosition - 96;
    } else {
        adjustedX = xPosition - 32;
        adjustedY = yPosition - 32;
    }

    if (zombieXlocation <= adjustedX) {
        zombieXlocation += zombieMoveSpeed;
        zombieCurrentDirection = zombieRight;
    } else {
        zombieXlocation -= zombieMoveSpeed;
        zombieCurrentDirection = zombieLeft;
    }

    if (zombieYlocation <= adjustedX) {
        zombieYlocation += zombieMoveSpeed;
        zombieCurrentDirection = zombieDown;
    } else {
        zombieYlocation -= zombieMoveSpeed;
        zombieCurrentDirection = zombieUp;
    }
}

function step() {
    let frameCount = 0;
    frameCount++;
    getPlayer();
    if (frameCount < 25) {
        window.requestAnimationFrame(step);
        return;
    }
    frameCount = 0;
    ctx.clearRect(zombieXlocation, zombieYlocation, zombieWidth, zombieHeight);

    if (zombieCurrentLoopIndex >= zombieCycleLoop.length) {
        zombieCurrentLoopIndex = 0;
    }

    drawZombieFrame(zombieCycleLoop[zombieCurrentLoopIndex], zombieCurrentDirection, zombieXlocation, zombieYlocation);
    zombieCurrentLoopIndex++;

    window.requestAnimationFrame(step);
}

