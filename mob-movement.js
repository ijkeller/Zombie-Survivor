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
  let zombieYlocation = 35;

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
    let adjustedY = yPosition - 16;

    if (swing) {
      adjustedX = xPosition - 48;
      adjustedY = yPosition - 48;
    }
    let xDifference = adjustedX - zombieXlocation;
    let yDifference = adjustedY - zombieYlocation;
    if(xDifference < 0)
    {
      zombieXlocation -= zombieMoveSpeed;
    }
    else{
      zombieXlocation +=zombieMoveSpeed;
    }
    if(yDifference < 0)
    {
      zombieYlocation -= zombieMoveSpeed;
    }
    else{
      zombieYlocation +=zombieMoveSpeed;
    }

    if(Math.abs(xDifference) > Math.abs(yDifference))
    {
      if(xDifference < 0)
      {
        zombieCurrentDirection = zombieLeft;
      }
      else {
        zombieCurrentDirection = zombieRight;
      }
    }
    else
    {
      if(yDifference < 0)
      {
        zombieCurrentDirection = zombieUp;
      }
      else {
        zombieCurrentDirection = zombieDown;
      }
    }
    console.log('X difference = ' + xDifference);
    console.log('Y difference = ' + yDifference);
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
