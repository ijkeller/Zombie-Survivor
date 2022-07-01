'use strict';

(function () {

  let zombie1 = './assets/Zombies/zombie1.png';
  let zombie2 = './assets/Zombies/zombie2.png';
  let zombie3 = './assets/Zombies/zombie3.png';
  let zombie4 = './assets/Zombies/zombie4.png';
  let zombie5 = './assets/Zombies/zombie5.png';
  let zombie6 = './assets/Zombies/zombie6.png';
  // let zombie7 = './assets/Zombies/zombie7.png'

  let zombieImg = new Image();
  zombieImg.src = zombie1;
  zombieImg.onload = function () {
    zombieInit();
  };

  let canvas = document.getElementById('bottom');
  let ctx = canvas.getContext('2d');

  let zombieScale = 1;

  // zombies 1-6 w/h
  let zombieWidth = 46;
  let zombieHeight = 36;

  // zombie 7 w/h
  // let height = 64;
  // let width = 64;

  const zombieScaledWidth = zombieScale * zombieWidth;
  const zombieScaledHeight = zombieScale * zombieHeight;
  let zombieXlocation = 200;
  let zombieYlocation = 205;

  const zombieCycleLoop = [0, 1, 0, 2];
  let zombieCurrentLoopIndex = 0;

  let zombieDown = 0;
  let zombieRight = 1;
  let zombieUp = 2;
  let zombieLeft = 3;
  let zombieCurrentDirection = zombieLeft;
  let zombieMoveSpeed = 0.1;

  function drawZombieFrame(frameX, frameY, canvasX, canvasY) {
    ctx.drawImage(zombieImg,
      frameX * zombieWidth, frameY * zombieHeight, zombieWidth, zombieHeight,
      canvasX, canvasY, zombieScaledWidth, zombieScaledHeight);
  }

  function zombieInit() {
    window.requestAnimationFrame(step);
  }

  function getPlayer() {

    let adjustedX = xPosition - 16;
    let adjustedY = yPosition - 10;

    if (swing) {
      adjustedX = xPosition - 15;
      adjustedY = yPosition - 0;
    }
    let xDifference = adjustedX - zombieXlocation;
    let yDifference = adjustedY - zombieYlocation;
    if (xDifference < 0) {
      zombieXlocation -= zombieMoveSpeed;
    }
    else {
      zombieXlocation += zombieMoveSpeed;
    }
    if (yDifference < 0) {
      zombieYlocation -= zombieMoveSpeed;
    }
    else {
      zombieYlocation += zombieMoveSpeed;
    }

    if (Math.abs(xDifference) > Math.abs(yDifference)) {
      if (xDifference < 0) {
        zombieCurrentDirection = zombieLeft;
      }
      else {
        zombieCurrentDirection = zombieRight;
      }
    }
    else {
      if (yDifference < 0) {
        zombieCurrentDirection = zombieUp;
      }
      else {
        zombieCurrentDirection = zombieDown;
      }
    }
    if(detectCollisionRectangles(adjustedX,adjustedY,16,32,zombieXlocation,zombieYlocation,36, 26))
    {
      console.log('ahhh youve been eaten');
    }
    if (currentDirection === right && swing) {
      if (detectCollisionRectangles(xPosition+16, yPosition,32,32, zombieXlocation, zombieYlocation, 46, 36)) {
        console.log('You Hit the zombie!');
      }
    }
    if (currentDirection === left && swing) {
      if (detectCollisionRectangles(xPosition-64, yPosition,32,32, zombieXlocation, zombieYlocation, 46, 36)) {
        console.log('You Hit the zombie!');
      }
    }
    if (currentDirection === down && swing) {
      if (detectCollisionRectangles(xPosition, yPosition+16, 32,32, zombieXlocation, zombieYlocation, 46, 36)) {
        console.log('You Hit the zombie!');
      }
    }
    if (currentDirection === up && swing) {
      if (detectCollisionRectangles(xPosition, yPosition-32,32,32, zombieXlocation, zombieYlocation, 46, 36)) {
        console.log('You Hit the zombie!');
      }
    }
  }
  let frameCount = 0;

  function step() {
    frameCount++;
    getPlayer();
    if (frameCount < 25) {
      window.requestAnimationFrame(step);
      return;
    }

    frameCount = 0;

    function step() {
      frameCount++;
      getPlayer();
      if (frameCount < 24) {
        window.requestAnimationFrame(step);
        return;
      }
      zombieXlocation -= moveSpeed;
      frameCount = 0;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (zombieCurrentLoopIndex >= zombieCycleLoop.length) {
        zombieCurrentLoopIndex = 0;
      }

      drawZombieFrame(zombieCycleLoop[zombieCurrentLoopIndex], zombieCurrentDirection, zombieXlocation, zombieYlocation);
      zombieCurrentLoopIndex++;

      window.requestAnimationFrame(step);

    }

    drawZombieFrame(zombieCycleLoop[zombieCurrentLoopIndex], zombieCurrentDirection, zombieXlocation, zombieYlocation);
    zombieCurrentLoopIndex++;

    window.requestAnimationFrame(step);
  }

})();
function detectCollisionRectangles(x1Position, y1Position, width1, height1, x2Position, y2Position, width2, height2) {

  if (x1Position + width1 / 2 >= x2Position - width2 / 2 && x1Position - width1 / 2 <= x2Position + width2 / 2) {
    if (y1Position + height1 / 2 >= y2Position - height2 / 2 && y1Position - width1 / 2 <= y2Position + height2 / 2) {
      return true;
    }
  }

  return false;
}
function detectCollisionCircleAndRectangle(circleX, circleY, circleR, rectangleX, rectangleY, rectangleWidth, rectangleHeight) {
  let nearestX1 = Math.max((rectangleX - rectangleWidth / 2), Math.min(circleX, rectangleX + rectangleWidth / 2));
  let nearestY1 = Math.max((rectangleY - rectangleHeight / 2), Math.min(circleY, rectangleY + rectangleHeight / 2));
  let closestDistance1 = Math.sqrt(Math.pow((nearestX1 - circleX), 2) + Math.pow((nearestY1 - circleY), 2), 2);
  if (closestDistance1 <= circleR) {
    return true;
  }
  return false;
}
