// clockwise rotation 
function pointProcessForOrientation(angle, arrayOfPoints, xOffset, yOffset)
{
    var rotationPointX = centerPointX + xOffset;
    var rotationPointY = centerPointY + yOffset;
    
    angle = angle / 180 * Math.PI;
    
    for(var i = 0;i < arrayOfPoints.length/2;i++)
    {
        var currentPointX = arrayOfPoints[i*2] - rotationPointX;
        var currentPointY = arrayOfPoints[i*2+1] - rotationPointY;
        
        var rotatedPointX = rotationPointX + currentPointX * Math.cos(angle) - currentPointY * Math.sin(angle);
        var rotatedPointY = rotationPointY + currentPointY * Math.cos(angle) + currentPointX * Math.sin(angle);
        
        arrayOfPoints[i*2] = rotatedPointX;
        arrayOfPoints[i*2+1] = rotatedPointY;
    }
    
    return arrayOfPoints;
}


function pointProcessForShapeOrientation(shape, angle, arrayOfPoints, xOffset, yOffset)
{
    if(shape != "line" && shape != "curve" && shape != "sql" && shape != "wave" && shape != "arrow")
        return;
    
    pointProcessForOrientation(angle, arrayOfPoints, xOffset, yOffset);
}