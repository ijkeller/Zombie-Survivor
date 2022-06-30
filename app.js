function detectCollisionRectangles(x1Position, y1Position, width1, height1, x2Position, y2Position, width2, height2) {

    if (x1Position + width1 / 2 >= x2Position - width2 / 2 && x1Position - width1 / 2 <= x2Position + width2 / 2) {
        if (y1Position + height1 / 2 >= y2Position - height2 / 2 && y1Position - width1 / 2 <= y2Position + height2 / 2) {
            return true;
        }
    }

    return false;
}
function detectCollisionCircleAndRectangle(circleX, circleY, circleR, rectangleX, rectangleY, rectangleWidth, rectangleHeight) {
    let nearestX = Math.max((rectangleX - rectangleWidth/2), Math.min(circleX , rectangleX + rectangleWidth/2));
    let nearestY = Math.max((rectangleY - rectangleHeight/2), Math.min(circleY , rectangleY + rectangleHeight/2));
    let closestDistance = Math.sqrt(Math.pow((nearestX - circleX), 2) + Math.pow((nearestY - circleY), 2),2);
    if(closestDistance <= circleR){
        return true;
    }
    return false;
}