function pointGenerationForShapeAndScale(shape,scale)
{
    var arrayOfPoints;
    
    // according to different shapes generate different arrayOfPoints which took care of the scale internally
    if(shape == "line")
        arrayOfPoints = standardLinePointGenerationForScale(scale);
    else if(shape == "curve")
        arrayOfPoints = curvePointGenerationForScale(scale);
    else if(shape == "wave")
        arrayOfPoints = waveLinePointGenerationForScale(scale);
    else if(shape == "sql")
        arrayOfPoints = squareLinePointGenerationForScale(scale);
    else if(shape == "arrow")
        arrayOfPoints = arrowPointGenerationForScale(scale);
    else if(shape == "triangle")
        arrayOfPoints = equilateralTrianglePointGenerationForScale(scale);
    else if(shape == "rectangle")
        arrayOfPoints = rectanglePointGenerationForScale(scale);
    else if(shape == "square")
        arrayOfPoints = squarePointGenerationForScale(scale);
    else if(shape == "trapzoid")
        arrayOfPoints = trapzoidPointGenerationForScale(scale);
    else if(shape == "pentagon")
        arrayOfPoints = pentagonPointGenerationForScale(scale);
    else if(shape == "haxgon")
        arrayOfPoints = haxgonPointGenerationForScale(scale);
    else if(shape == "star")
        arrayOfPoints = starPointGenerationForScale(scale);
    else if(shape == "circle")
        arrayOfPoints = circlePointGenerationForScale();
    else if(shape == "ellipse")
        arrayOfPoints = ellipsePointGenerationForScale();
    else if(shape == "lsquare")
        arrayOfPoints = squarePointGenerationForScale(scale);
    else if(shape == "lcircle")
        arrayOfPoints = circlePointGenerationForScale();
    else if(shape == "ltriangle")
        arrayOfPoints = equilateralTrianglePointGenerationForScale(scale);
    else if(shape == "lpentagon")
        arrayOfPoints = pentagonPointGenerationForScale(scale);
    else if(shape == "lhaxgon")
        arrayOfPoints = haxgonPointGenerationForScale(scale);
    
    
    // return array of points
    return arrayOfPoints;
}

function standardLinePointGenerationForScale(scale)
{
    var arrayOfPoints = new Array();
    
    var startPointX = centerPointX - scale / 2;
    var endPointX = centerPointX + scale / 2;
    
    arrayOfPoints[0] = startPointX;
    arrayOfPoints[1] = centerPointY;
    arrayOfPoints[2] = endPointX;
    arrayOfPoints[3] = centerPointY;
    
    return arrayOfPoints;
}

function curvePointGenerationForScale(scale)
{
    var xgap = scale / 2;
    
    var startPointX  = centerPointX - xgap;
    var endPointX  = centerPointX + xgap;
    var controlPointY = centerPointY - xgap / 4 - 10;
    
    var arrayOfPoints = new Array();
    arrayOfPoints[0] = startPointX;
    arrayOfPoints[1] = centerPointY + 10;
    arrayOfPoints[2] = centerPointX;
    arrayOfPoints[3] = controlPointY;
    arrayOfPoints[4] = endPointX;
    arrayOfPoints[5] = centerPointY + 10;
    
    return arrayOfPoints;
}

function waveLinePointGenerationForScale(scale)
{
    var startPointX = (gridWidth - scale*2*4) / 2 + startGridX;
    
    var arrayOfPoints = new Array();
    
    for(var i = 0;i < 9;i++)
    {
        var currentPointX = startPointX + i * scale;
        
        // store x axis coordinate
        arrayOfPoints[2*i] = currentPointX;
        // store y axis coordinate
        if(i % 2 == 0)
            arrayOfPoints[2*i+1] = centerPointY;
        else
            arrayOfPoints[2*i+1] = centerPointY - 2 * scale / 3;
        
    }
    
    return arrayOfPoints;
}

function squareLinePointGenerationForScale(scale)
{
    var startPointX = (gridWidth - scale*2*4) / 2 + startGridX;
    
    var arrayOfPoints = new Array();
    
    for(var i = 0;i < 10;i++)
    {
        var currentPointX;
        var currentPointY;
        
        currentPointX = startPointX + (Math.floor(i / 2)  * 2 * scale);
        
        if(i == 1 || i == 2 || i == 5 || i == 6 || i == 9)
            currentPointY = centerPointY - 2 * scale / 3;
        else
            currentPointY = centerPointY;
        
        // store x axis coordinate
        arrayOfPoints[2*i] = currentPointX;
        // store y axis coordinate
        arrayOfPoints[2*i+1] = currentPointY;
        
    }
    
    return arrayOfPoints;
}




// scale refers to the length of each side
function equilateralTrianglePointGenerationForScale(scale)
{
    var xgap = scale / 2;
    var ygap = scale * Math.sqrt(3) / 2 / 2;
    
    
    var bottomLeftPointX = centerPointX - xgap;
    var bottomLeftPointY = centerPointY + ygap;
    
    var bottomRightPointX = centerPointX + xgap;
    var bottomRightPointY = centerPointY + ygap;
    
    var topPointX = centerPointX;
    var topPointY = centerPointY - ygap;
    
    var arrayOfPoints = new Array();
    arrayOfPoints[0] = bottomLeftPointX;
    arrayOfPoints[1] = bottomLeftPointY;
    arrayOfPoints[2] = bottomRightPointX;
    arrayOfPoints[3] = bottomRightPointY;
    arrayOfPoints[4] = topPointX;
    arrayOfPoints[5] = topPointY;
    
    return arrayOfPoints;
}


function arrowPointGenerationForScale(scale)
{
    var tailPointX = centerPointX - 3*scale;
    var tailPointY = centerPointY;
    
    var jointPointX = centerPointX + 3*scale;
    var jointPointY = centerPointY;
    
    var upperTipPointX = jointPointX;
    var upperTipPointY = centerPointY - 5;

    var lowerTipPointX = jointPointX;
    var lowerTipPointY = centerPointY + 5;
    
    var endPointX = jointPointX + 25;
    var endPointY = centerPointY;
    
    var arrayOfPoints = new Array();
    arrayOfPoints[0] = tailPointX;
    arrayOfPoints[1] = tailPointY;
    arrayOfPoints[2] = jointPointX;
    arrayOfPoints[3] = jointPointY;
    arrayOfPoints[4] = upperTipPointX;
    arrayOfPoints[5] = upperTipPointY;
    arrayOfPoints[6] = endPointX;
    arrayOfPoints[7] = endPointY;
    arrayOfPoints[8] = lowerTipPointX;
    arrayOfPoints[9] = lowerTipPointY;
    arrayOfPoints[10] = jointPointX;
    arrayOfPoints[11] = jointPointY;
    
    return arrayOfPoints;
}

// scale refers to the height of a rectangle
function rectanglePointGenerationForScale(scale)
{
    var width = scale * 1.8;
    var height = scale;
    
    var leftAboveCornerPointX = centerPointX - width / 2;
    var leftAboveCornerPointY = centerPointY - height / 2;
    
    var arrayOfPoints = new Array();
    arrayOfPoints[0] = leftAboveCornerPointX;
    arrayOfPoints[1] = leftAboveCornerPointY;
    
    return arrayOfPoints;
}

// scale refers to the length of each side of a square
function squarePointGenerationForScale(scale)
{
    var leftAboveCornerPointX = centerPointX - scale / 2;
    var leftAboveCornerPointY = centerPointY - scale / 2;
    
    var arrayOfPoints = new Array();
    arrayOfPoints[0] = leftAboveCornerPointX;
    arrayOfPoints[1] = leftAboveCornerPointY;
    
    return arrayOfPoints;
}

// scale refers to the length of each side
function pentagonPointGenerationForScale(scale)
{
    var radius = scale / 2 / Math.cos(54 / 180 * Math.PI);
    
    var topPointX = centerPointX;
    var topPointY = centerPointY - radius;
    
    var arrayOfPoints = new Array();
    arrayOfPoints[0] = topPointX;
    arrayOfPoints[1] = topPointY;
    
    var tempArrayOfPoints = new Array();
    tempArrayOfPoints[0] = topPointX;
    tempArrayOfPoints[1] = topPointY;
    
    
    for(var i = 0;i < 4;i++)
    {
        pointProcessForOrientation(72,tempArrayOfPoints,0,0)
        arrayOfPoints[2*(i+1)] = tempArrayOfPoints[0];
        arrayOfPoints[2*(i+1)+1] = tempArrayOfPoints[1];
    }
    
    return arrayOfPoints;
}

// scale is the leg and leg is equal to upper segment and bottom angle is 60
function trapzoidPointGenerationForScale(scale)
{
    var ygap = scale * Math.sin(60 / 180 * Math.PI);
    
    var topLeftPointX = centerPointX - scale / 2;
    var topLeftPointY = centerPointY - ygap / 2;
    
    var topRightPointX = centerPointX + scale / 2;
    var topRightPointY = centerPointY - ygap / 2;
    
    var bottomLeftPointX = centerPointX - scale;
    var bottomLeftPointY = centerPointY + ygap / 2;
    
    var bottomRightPointX = centerPointX + scale;
    var bottomRightPointY = centerPointY + ygap / 2;
    
    var arrayOfPoints = new Array();
    arrayOfPoints[0] = topLeftPointX;
    arrayOfPoints[1] = topLeftPointY;
    arrayOfPoints[2] = topRightPointX;
    arrayOfPoints[3] = topRightPointY;
    arrayOfPoints[4] = bottomRightPointX;
    arrayOfPoints[5] = bottomRightPointY;
    arrayOfPoints[6] = bottomLeftPointX;
    arrayOfPoints[7] = bottomLeftPointY;
    
    return arrayOfPoints;
}

// scale refers to the length of each side
function haxgonPointGenerationForScale(scale)
{
    var ygap = scale * Math.sqrt(3) / 2;
    
    var topLeftPointX = centerPointX - scale / 2;
    var topLeftPointY = centerPointY - ygap;
    
    var topRightPointX = centerPointX + scale / 2;
    var topRightPointY = centerPointY - ygap;
    
    var leftPointX = centerPointX - scale;
    var leftPointY = centerPointY;
    
    var rightPointX = centerPointX + scale;
    var rightPointY = centerPointY;
    
    var bottomLeftPointX = centerPointX - scale / 2;
    var bottomLeftPointY = centerPointY + ygap;
    
    var bottomRightPointX = centerPointX + scale / 2;
    var bottomRightPointY = centerPointY + ygap;
    
    
    var arrayOfPoints = new Array();
    arrayOfPoints[0] = topLeftPointX;
    arrayOfPoints[1] = topLeftPointY;
    arrayOfPoints[2] = topRightPointX;
    arrayOfPoints[3] = topRightPointY;
    arrayOfPoints[4] = rightPointX;
    arrayOfPoints[5] = rightPointY;
    arrayOfPoints[6] = bottomRightPointX;
    arrayOfPoints[7] = bottomRightPointY;
    arrayOfPoints[8] = bottomLeftPointX;
    arrayOfPoints[9] = bottomLeftPointY;
    arrayOfPoints[10] = leftPointX;
    arrayOfPoints[11] = leftPointY;
    
    return arrayOfPoints;
}

function starPointGenerationForScale(scale)
{
    var arrayOfFramePoints = pentagonPointGenerationForScale(scale);
    
    var intersectionPoints = new Array();
    
    intersectionPoints = intersectionPoints.concat(intersectionBetweenTwoLines(arrayOfFramePoints[0], arrayOfFramePoints[4], arrayOfFramePoints[1], arrayOfFramePoints[5],
                                                                               arrayOfFramePoints[2], arrayOfFramePoints[8], arrayOfFramePoints[3], arrayOfFramePoints[9]));
    intersectionPoints = intersectionPoints.concat(intersectionBetweenTwoLines(arrayOfFramePoints[0], arrayOfFramePoints[4], arrayOfFramePoints[1], arrayOfFramePoints[5],
                                                                               arrayOfFramePoints[2], arrayOfFramePoints[6], arrayOfFramePoints[3], arrayOfFramePoints[7]));
    intersectionPoints = intersectionPoints.concat(intersectionBetweenTwoLines(arrayOfFramePoints[4], arrayOfFramePoints[8], arrayOfFramePoints[5], arrayOfFramePoints[9],
                                                                               arrayOfFramePoints[2], arrayOfFramePoints[6], arrayOfFramePoints[3], arrayOfFramePoints[7]));
    intersectionPoints = intersectionPoints.concat(intersectionBetweenTwoLines(arrayOfFramePoints[0], arrayOfFramePoints[6], arrayOfFramePoints[1], arrayOfFramePoints[7],
                                                                               arrayOfFramePoints[4], arrayOfFramePoints[8], arrayOfFramePoints[5], arrayOfFramePoints[9]));
    intersectionPoints = intersectionPoints.concat(intersectionBetweenTwoLines(arrayOfFramePoints[0], arrayOfFramePoints[6], arrayOfFramePoints[1], arrayOfFramePoints[7],
                                                                               arrayOfFramePoints[2], arrayOfFramePoints[8], arrayOfFramePoints[3], arrayOfFramePoints[9]));
    
    var totalPoints = new Array();
    for(i = 0;i < 10;i++)
    {
        if(i % 2 == 0)
        {
            totalPoints[i*2] = arrayOfFramePoints[(i/2)*2];
            totalPoints[i*2+1] = arrayOfFramePoints[(i/2)*2+1];
        }
        else
        {
            totalPoints[i*2] = intersectionPoints[Math.floor(i/2)*2];
            totalPoints[i*2+1] = intersectionPoints[Math.floor(i/2)*2+1];
        }
    }
    
    return totalPoints;
}

function circlePointGenerationForScale()
{
    var arrayOfPoints = new Array();
    arrayOfPoints[0] = centerPointX;
    arrayOfPoints[1] = centerPointY;
    
    return arrayOfPoints;
}

function ellipsePointGenerationForScale()
{
    var arrayOfPoints = new Array();
    arrayOfPoints[0] = centerPointX;
    arrayOfPoints[1] = centerPointY;
    
    return arrayOfPoints;
}

