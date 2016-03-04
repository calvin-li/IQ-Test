function pointProcessForPosition(xOffset, yOffset, arrayOfPoints)
{
    var newPoints = Array();
    
    for(var i = 0;i < arrayOfPoints.length/2;i++)
    {
        var currentPointX = arrayOfPoints[i*2] + xOffset;
        var currentPointY = arrayOfPoints[i*2+1] + yOffset;
        
        newPoints[i*2] = currentPointX;
        newPoints[i*2+1] = currentPointY;
    }
    
    return newPoints;
}