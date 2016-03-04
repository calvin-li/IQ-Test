function setUpShade(shape, arrayOfObjects, scale, shadeStyle, elements)
{
    var arrayOfPoints = arrayOfObjects[0];
    
    if(shape == "triangle")
        equilateralTriangleShadeIncorporation(arrayOfPoints, shadeStyle, elements);
    else if(shape == "rectangle")
        rectangleShadeIncorporation(arrayOfPoints, scale, shadeStyle, elements);
    else if(shape == "square")
        squareShadeIncorporation(arrayOfPoints, scale, shadeStyle, elements);
    else if(shape == "trapzoid")
        trapzoidShadeIncorporation(arrayOfPoints, shadeStyle, elements);
    else if(shape == "pentagon")
        pentagonShadeIncorporation(arrayOfPoints, shadeStyle, elements);
    else if(shape == "haxgon")
        haxgonShadeIncorporation(arrayOfPoints, shadeStyle, elements);
    else if(shape == "circle")
        circleShadeIncorporation(arrayOfPoints, scale, shadeStyle, elements);
    else if(shape == "ellipse")
        ellipseShadeIncorporation(arrayOfPoints, scale, shadeStyle, elements);
}

function equilateralTriangleShadeIncorporation(arrayOfPoints, shadeStyle, elements)
{
    if(shadeStyle == "ver")
    {
        var startX = arrayOfPoints[0];
        var middleX = arrayOfPoints[4];
        var endX = arrayOfPoints[2];
        var increment = (middleX - startX) / 4;
        
        for(x = startX + increment;x < middleX;x += increment)
        {
            var firstPoint = intersectionBetweenTwoLines(x,x,0,100,arrayOfPoints[4],arrayOfPoints[0],arrayOfPoints[5],arrayOfPoints[1]);
            var secondPoint = intersectionBetweenTwoLines(x,x,0,100,arrayOfPoints[0],arrayOfPoints[2],arrayOfPoints[1],arrayOfPoints[3]);
            
            elements.push(shadeLineIncorporation(firstPoint[0], secondPoint[0], firstPoint[1] , secondPoint[1]));
        }
        
        elements.push(shadeLineIncorporation(arrayOfPoints[4], arrayOfPoints[4], arrayOfPoints[5] , arrayOfPoints[3]));
        
        for(x = middleX + increment;x < endX;x += increment)
        {
            var firstPoint = intersectionBetweenTwoLines(x,x,0,100,arrayOfPoints[4],arrayOfPoints[2],arrayOfPoints[5],arrayOfPoints[3]);
            var secondPoint = intersectionBetweenTwoLines(x,x,0,100,arrayOfPoints[0],arrayOfPoints[2],arrayOfPoints[1],arrayOfPoints[3]);
            
            elements.push(shadeLineIncorporation(firstPoint[0], secondPoint[0], firstPoint[1] , secondPoint[1]));
        }
    }
    else if(shadeStyle == "hor")
    {
        var startY = arrayOfPoints[5];
        var endY = arrayOfPoints[3];
        var increment = (endY - startY) / 8;
        
        for(y = startY + increment;y < endY;y += increment)
        {
            var firstPoint = intersectionBetweenTwoLines(0,100,y,y,arrayOfPoints[4],arrayOfPoints[0],arrayOfPoints[5],arrayOfPoints[1]);
            var secondPoint = intersectionBetweenTwoLines(0,100,y,y,arrayOfPoints[4],arrayOfPoints[2],arrayOfPoints[5],arrayOfPoints[3]);
            
            elements.push(shadeLineIncorporation(firstPoint[0], secondPoint[0], firstPoint[1] , secondPoint[1]));
        }
        
    }
    else if(shadeStyle == "pos")
    {
        var endLine = generateLineFromPoints(arrayOfPoints[0], arrayOfPoints[1], arrayOfPoints[4], arrayOfPoints[5]);
        var startLine = generateLineFromPointAndSlope(endLine[0], arrayOfPoints[2], arrayOfPoints[3]);
        
        
        var startInterception = startLine[1];
        var endInterception = endLine[1];
        var increment = (startInterception - endInterception) / 8
        
        for(inter = endInterception + increment;inter < startInterception;inter += increment)
        {
            var firstPoint = intersectionBetweenOneLineAndOneSlopeInterception(startLine[0],inter,arrayOfPoints[2],arrayOfPoints[0],arrayOfPoints[3],arrayOfPoints[1]);
            var secondPoint = intersectionBetweenOneLineAndOneSlopeInterception(startLine[0],inter,arrayOfPoints[4],arrayOfPoints[2],arrayOfPoints[5],arrayOfPoints[3]);
            
            elements.push(shadeLineIncorporation(firstPoint[0], secondPoint[0], firstPoint[1], secondPoint[1]));
        }
    }
    else if(shadeStyle == "neg")
    {
        var endLine = generateLineFromPoints(arrayOfPoints[2], arrayOfPoints[3], arrayOfPoints[4], arrayOfPoints[5]);
        var startLine = generateLineFromPointAndSlope(endLine[0], arrayOfPoints[0], arrayOfPoints[1]);
        var startInterception = startLine[1];
        var endInterception = endLine[1];
        var increment = (startInterception - endInterception) / 8
        
        for(inter = endInterception + increment;inter < startInterception;inter += increment)
        {
            var firstPoint = intersectionBetweenOneLineAndOneSlopeInterception(startLine[0],inter,arrayOfPoints[2],arrayOfPoints[0],arrayOfPoints[3],arrayOfPoints[1]);
            var secondPoint = intersectionBetweenOneLineAndOneSlopeInterception(startLine[0],inter,arrayOfPoints[4],arrayOfPoints[0],arrayOfPoints[5],arrayOfPoints[1]);
            
            elements.push(shadeLineIncorporation(firstPoint[0], secondPoint[0], firstPoint[1] , secondPoint[1]));
        }
    }
}

function rectangleShadeIncorporation(arrayOfPoints, scale, shadeStyle, elements)
{
    var width = scale * 1.8;
    var height = scale;
    
    regularQuadrilateralShadeIncorporation(arrayOfPoints, width, height, shadeStyle, elements)
    
}

function squareShadeIncorporation(arrayOfPoints, scale, shadeStyle, elements)
{
    var width = scale;
    var height = scale;
    
    regularQuadrilateralShadeIncorporation(arrayOfPoints, width, height, shadeStyle, elements)
    
}

function regularQuadrilateralShadeIncorporation(arrayOfPoints, width, height, shadeStyle, elements)
{
    var leftBound = arrayOfPoints[0];
    var rightBound = leftBound + width;
    var topBound = arrayOfPoints[1];
    var bottomBound = topBound + height;
    
    if(shadeStyle == "ver")
    {
        var startX = leftBound;
        var endX = rightBound;
        var increment = (endX - startX) / 10;
        
        for(var x = startX + increment;x < endX;x += increment)
            elements.push(shadeLineIncorporation(x, x, topBound, bottomBound));
    }
    else if(shadeStyle == "hor")
    {
        var startY = topBound;
        var endY = bottomBound;
        var increment = (endY - startY) / 8;
        
        for(var y = startY + increment;y < endY;y += increment)
            elements.push(shadeLineIncorporation(leftBound, rightBound, y, y));
    }
    else if(shadeStyle == "pos")
    {
        var diagnol = generateLineFromPoints(leftBound, bottomBound, rightBound, topBound);
        var startLine = generateLineFromPointAndSlope(diagnol[0], leftBound, topBound);
        var endLine = generateLineFromPointAndSlope(diagnol[0], rightBound, bottomBound);
        
        var slope = startLine[0];
        var startInterception = startLine[1];
        var endInterception = diagnol[1];
        var increment = (endInterception - startInterception) / 4;
        
        for(var inter = startInterception;inter < endInterception;inter = inter + increment)
        {
            var firstPoint = intersectionBetweenOneLineAndOneSlopeInterception(slope,inter,leftBound,rightBound,topBound,topBound);
            var secondPoint = intersectionBetweenOneLineAndOneSlopeInterception(slope,inter,leftBound,leftBound,topBound,bottomBound);
            
            elements.push(shadeLineIncorporation(firstPoint[0], secondPoint[0], firstPoint[1] , secondPoint[1]));
        }
        
        elements.push(shadeLineIncorporation(leftBound, rightBound, bottomBound, topBound));
        
        startInterception = diagnol[1];
        endInterception = endLine[1];
        increment = (endInterception - startInterception) / 4;
        
        for(var inter = startInterception;inter < endInterception;inter = inter + increment)
        {
            var firstPoint = intersectionBetweenOneLineAndOneSlopeInterception(slope,inter,leftBound,rightBound,bottomBound,bottomBound);
            var secondPoint = intersectionBetweenOneLineAndOneSlopeInterception(slope,inter,rightBound,rightBound,topBound,bottomBound);
            
            elements.push(shadeLineIncorporation(firstPoint[0], secondPoint[0], firstPoint[1] , secondPoint[1]));
        }
    }
    else if(shadeStyle == "neg")
    {
        var diagnol = generateLineFromPoints(leftBound, topBound, rightBound, bottomBound);
        var startLine = generateLineFromPointAndSlope(diagnol[0], rightBound, topBound);
        var endLine = generateLineFromPointAndSlope(diagnol[0], leftBound, bottomBound);
        
        var slope = startLine[0];
        var startInterception = startLine[1];
        var endInterception = diagnol[1];
        var increment = (endInterception - startInterception) / 4;
        
        for(var inter = startInterception;inter < endInterception;inter = inter + increment)
        {
            var firstPoint = intersectionBetweenOneLineAndOneSlopeInterception(slope,inter,leftBound,rightBound,topBound,topBound);
            var secondPoint = intersectionBetweenOneLineAndOneSlopeInterception(slope,inter,rightBound,rightBound,topBound,bottomBound);
            
            elements.push(shadeLineIncorporation(firstPoint[0], secondPoint[0], firstPoint[1] , secondPoint[1]));
        }
        
        elements.push(shadeLineIncorporation(leftBound, rightBound, topBound, bottomBound));
        
        startInterception = diagnol[1];
        endInterception = endLine[1];
        increment = (endInterception - startInterception) / 4;
        
        for(var inter = startInterception;inter < endInterception;inter = inter + increment)
        {
            var firstPoint = intersectionBetweenOneLineAndOneSlopeInterception(slope,inter,leftBound,rightBound,bottomBound,bottomBound);
            var secondPoint = intersectionBetweenOneLineAndOneSlopeInterception(slope,inter,leftBound,leftBound,topBound,bottomBound);
            
            elements.push(shadeLineIncorporation(firstPoint[0], secondPoint[0], firstPoint[1] , secondPoint[1]));
        }
    }
}

function trapzoidShadeIncorporation(arrayOfPoints, shadeStyle, elements)
{
    if(shadeStyle == "ver")
    {
        var firstPartStartX = arrayOfPoints[6];
        var firstPartEndX = arrayOfPoints[0];
        
        var increment = (firstPartEndX - firstPartStartX) / 6;
        for(var x = firstPartStartX + increment;x < firstPartEndX;x = x + increment)
        {
            var firstPoint = intersectionBetweenTwoLines(x,x,0,100,arrayOfPoints[0],arrayOfPoints[6],arrayOfPoints[1],arrayOfPoints[7]);
            var secondPoint = intersectionBetweenTwoLines(x,x,0,100,arrayOfPoints[4],arrayOfPoints[6],arrayOfPoints[5],arrayOfPoints[7]);
            
            elements.push(shadeLineIncorporation(firstPoint[0], secondPoint[0], firstPoint[1] , secondPoint[1]));
        }
        
        elements.push(shadeLineIncorporation(arrayOfPoints[0], arrayOfPoints[0], arrayOfPoints[1] , arrayOfPoints[7]));
        
        for(var x = arrayOfPoints[0] + increment;x < arrayOfPoints[2];x = x + increment)
            elements.push(shadeLineIncorporation(x, x, arrayOfPoints[1], arrayOfPoints[5]));
        
        elements.push(shadeLineIncorporation(arrayOfPoints[2], arrayOfPoints[2], arrayOfPoints[1] , arrayOfPoints[7]));
        
        for(var x = arrayOfPoints[2] + increment;x < arrayOfPoints[4];x = x + increment)
        {
            var firstPoint = intersectionBetweenTwoLines(x,x,0,100,arrayOfPoints[2],arrayOfPoints[4],arrayOfPoints[3],arrayOfPoints[5]);
            var secondPoint = intersectionBetweenTwoLines(x,x,0,100,arrayOfPoints[4],arrayOfPoints[6],arrayOfPoints[5],arrayOfPoints[7]);
            
            elements.push(shadeLineIncorporation(firstPoint[0], secondPoint[0], firstPoint[1] , secondPoint[1]));
        }
    }
    else if(shadeStyle == "hor")
    {
        var startY = arrayOfPoints[1];
        var endY = arrayOfPoints[7];
        
        var increment = (endY - startY) / 20;
        for(var y = startY + increment;y < endY;y = y + increment)
        {
            var firstPoint = intersectionBetweenTwoLines(0,100,y,y,arrayOfPoints[0],arrayOfPoints[6],arrayOfPoints[1],arrayOfPoints[7]);
            var secondPoint = intersectionBetweenTwoLines(0,100,y,y,arrayOfPoints[2],arrayOfPoints[4],arrayOfPoints[1],arrayOfPoints[5]);
            
            elements.push(shadeLineIncorporation(firstPoint[0], secondPoint[0], firstPoint[1] , secondPoint[1]));
        }
    }
    else if(shadeStyle == "pos")
    {
        var diagonal = generateLineFromPoints(arrayOfPoints[0], arrayOfPoints[1], arrayOfPoints[4], arrayOfPoints[5]);
        var startingLine = generateLineFromPointAndSlope(diagonal[0],arrayOfPoints[6],arrayOfPoints[7]);
        var endLine = generateLineFromPointAndSlope(diagonal[0],arrayOfPoints[2],arrayOfPoints[3]);
        
        var interceptionStart = endLine[1];
        var interceptionEnd = startingLine[1];
        var increment = (interceptionEnd - interceptionStart) / 20;
        
        for(var inter = interceptionStart + increment;inter < interceptionEnd;inter = inter + increment)
        {
            var firstPoint;
            var secPoint;
            
            if(inter < diagonal[1])
            {
                firstPoint = intersectionBetweenOneLineAndOneSlopeInterception(diagonal[0],inter,arrayOfPoints[0],arrayOfPoints[2],arrayOfPoints[1],arrayOfPoints[3]);
                secPoint = intersectionBetweenOneLineAndOneSlopeInterception(diagonal[0],inter,arrayOfPoints[2],arrayOfPoints[4],arrayOfPoints[3],arrayOfPoints[5]);
            }
            else
            {
                firstPoint = intersectionBetweenOneLineAndOneSlopeInterception(diagonal[0],inter,arrayOfPoints[0],arrayOfPoints[6],arrayOfPoints[1],arrayOfPoints[7]);
                secPoint = intersectionBetweenOneLineAndOneSlopeInterception(diagonal[0],inter,arrayOfPoints[4],arrayOfPoints[6],arrayOfPoints[5],arrayOfPoints[7]);
            }
            
            elements.push(shadeLineIncorporation(firstPoint[0], secPoint[0], firstPoint[1] , secPoint[1]));
        }
    }
    else if(shadeStyle == "neg")
    {
        var diagonal = generateLineFromPoints(arrayOfPoints[2], arrayOfPoints[3], arrayOfPoints[6], arrayOfPoints[7]);
        var startingLine = generateLineFromPointAndSlope(diagonal[0],arrayOfPoints[0],arrayOfPoints[1]);
        var endLine = generateLineFromPointAndSlope(diagonal[0],arrayOfPoints[4],arrayOfPoints[5]);
        
        var interceptionStart = startingLine[1];
        var interceptionEnd = endLine[1];
        var increment = (interceptionEnd - interceptionStart) / 20;
        
        for(var inter = interceptionStart + increment;inter < interceptionEnd;inter = inter + increment)
        {
            var firstPoint;
            var secPoint;
            
            
            if(inter < diagonal[1])
            {
                firstPoint = intersectionBetweenOneLineAndOneSlopeInterception(diagonal[0],inter,arrayOfPoints[0],arrayOfPoints[6],arrayOfPoints[1],arrayOfPoints[7]);
                secPoint = intersectionBetweenOneLineAndOneSlopeInterception(diagonal[0],inter,arrayOfPoints[0],arrayOfPoints[2],arrayOfPoints[1],arrayOfPoints[3]);
            }
            else
            {
                firstPoint = intersectionBetweenOneLineAndOneSlopeInterception(diagonal[0],inter,arrayOfPoints[2],arrayOfPoints[4],arrayOfPoints[3],arrayOfPoints[5]);
                secPoint = intersectionBetweenOneLineAndOneSlopeInterception(diagonal[0],inter,arrayOfPoints[4],arrayOfPoints[6],arrayOfPoints[5],arrayOfPoints[7]);
            }
            
            elements.push(shadeLineIncorporation(firstPoint[0], secPoint[0], firstPoint[1] , secPoint[1]));
        }
    }
    
    return elements;
}

function pentagonShadeIncorporation(arrayOfPoints, shadeStyle, elements)
{
    if(shadeStyle == "hor")
    {
        var startY = arrayOfPoints[1];
        var middleY = arrayOfPoints[3];
        var endY = arrayOfPoints[5];
        var increment = (middleY - startY) / 7;
        
        for(var y = startY;y < middleY;y = y + increment)
        {
            var firstPoint = intersectionBetweenTwoLines(0,100,y,y,arrayOfPoints[0],arrayOfPoints[2],arrayOfPoints[1],arrayOfPoints[3]);
            var secondPoint = intersectionBetweenTwoLines(0,100,y,y,arrayOfPoints[0],arrayOfPoints[8],arrayOfPoints[1],arrayOfPoints[9]);
            
            elements.push(shadeLineIncorporation(firstPoint[0],secondPoint[0],firstPoint[1],secondPoint[1]));
        }
        
        for(var y = middleY;y < endY;y = y + increment)
        {
            var firstPoint = intersectionBetweenTwoLines(0,100,y,y,arrayOfPoints[4],arrayOfPoints[2],arrayOfPoints[5],arrayOfPoints[3]);
            var secondPoint = intersectionBetweenTwoLines(0,100,y,y,arrayOfPoints[6],arrayOfPoints[8],arrayOfPoints[7],arrayOfPoints[9]);
            
            elements.push(shadeLineIncorporation(firstPoint[0],secondPoint[0],firstPoint[1],secondPoint[1]));
        }
    }
    else if(shadeStyle == "ver")
    {
        var firstStartX = arrayOfPoints[8];
        var firstEndX = arrayOfPoints[6];
        
        var secondStartX = firstEndX;
        var secondEndX = arrayOfPoints[0];
        
        var thirdStartX = secondEndX;
        var thirdEndX = arrayOfPoints[4];
        
        var forthStartX = thirdEndX;
        var forthEndX = arrayOfPoints[2];
        
        var increment = (firstEndX - firstStartX) / 3;
        for(var x = firstStartX;x < firstEndX;x = x + increment)
        {
            var firstPoint = intersectionBetweenTwoLines(x,x,0,100,arrayOfPoints[8],arrayOfPoints[6],arrayOfPoints[9],arrayOfPoints[7]);
            var secondPoint = intersectionBetweenTwoLines(x,x,0,100,arrayOfPoints[8],arrayOfPoints[0],arrayOfPoints[9],arrayOfPoints[1]);
            
            elements.push(shadeLineIncorporation(firstPoint[0],secondPoint[0],firstPoint[1],secondPoint[1]));
        }
        
        for(var x = secondStartX;x < secondEndX;x = x + increment)
        {
            var firstPoint = intersectionBetweenTwoLines(x,x,0,100,arrayOfPoints[0],arrayOfPoints[8],arrayOfPoints[1],arrayOfPoints[9]);
            
            elements.push(shadeLineIncorporation(firstPoint[0],x,firstPoint[1],arrayOfPoints[5]));
        }
        for(var x = thirdStartX;x < thirdEndX;x = x + increment)
        {
            var firstPoint = intersectionBetweenTwoLines(x,x,0,100,arrayOfPoints[0],arrayOfPoints[2],arrayOfPoints[1],arrayOfPoints[3]);
            
            elements.push(shadeLineIncorporation(firstPoint[0],x,firstPoint[1],arrayOfPoints[5]));
        }
        
        for(var x = forthStartX;x < forthEndX;x = x + increment)
        {
            var firstPoint = intersectionBetweenTwoLines(x,x,0,100,arrayOfPoints[2],arrayOfPoints[4],arrayOfPoints[3],arrayOfPoints[5]);
            var secondPoint = intersectionBetweenTwoLines(x,x,0,100,arrayOfPoints[2],arrayOfPoints[0],arrayOfPoints[3],arrayOfPoints[1]);
            
            elements.push(shadeLineIncorporation(firstPoint[0],secondPoint[0],firstPoint[1],secondPoint[1]));
        }
    }
    else if(shadeStyle == "pos")
    {
        var middleLine = generateLineFromPoints(arrayOfPoints[2],arrayOfPoints[3],arrayOfPoints[6],arrayOfPoints[7]);
        var endLine = generateLineFromPointAndSlope(middleLine[0],arrayOfPoints[4],arrayOfPoints[5]);
        var startLine = generateLineFromPoints(arrayOfPoints[8],arrayOfPoints[9],arrayOfPoints[0],arrayOfPoints[1]);
        
        
        var increment = (endLine[1] - middleLine[1]) / 5;
        
        for(var inter = startLine[1] + increment;inter < middleLine[1]- increment;inter = inter + increment)
        {
            var firstPoint = intersectionBetweenOneLineAndOneSlopeInterception(startLine[0],inter,arrayOfPoints[0],arrayOfPoints[2],arrayOfPoints[1],arrayOfPoints[3]);
            var secondPoint = intersectionBetweenOneLineAndOneSlopeInterception(startLine[0],inter,arrayOfPoints[6],arrayOfPoints[8],arrayOfPoints[7],arrayOfPoints[9]);
            
            elements.push(shadeLineIncorporation(firstPoint[0],secondPoint[0],firstPoint[1],secondPoint[1]));
        }
        
        for(inter = middleLine[1];inter < endLine[1];inter = inter + increment)
        {
            var firstPoint = intersectionBetweenOneLineAndOneSlopeInterception(startLine[0],inter,arrayOfPoints[4],arrayOfPoints[2],arrayOfPoints[5],arrayOfPoints[3]);
            var secondPoint = intersectionBetweenOneLineAndOneSlopeInterception(startLine[0],inter,arrayOfPoints[6],arrayOfPoints[4],arrayOfPoints[7],arrayOfPoints[5]);
            
            elements.push(shadeLineIncorporation(firstPoint[0],secondPoint[0],firstPoint[1],secondPoint[1]));
        }
    }
    else if(shadeStyle == "pos")
    {
        var startLine = generateLineFromPoints(arrayOfPoints[8],arrayOfPoints[9],arrayOfPoints[0],arrayOfPoints[1]);
        var middleLine = generateLineFromPoints(arrayOfPoints[2],arrayOfPoints[3],arrayOfPoints[6],arrayOfPoints[7]);
        var endLine = generateLineFromPointAndSlope(middleLine[0],arrayOfPoints[4],arrayOfPoints[5]);
        
        var increment = (endLine[1] - middleLine[1]) / 5;
        
        for(var inter = startLine[1] + increment;inter < middleLine[1]- increment;inter = inter + increment)
        {
            var firstPoint = intersectionBetweenOneLineAndOneSlopeInterception(startLine[0],inter,arrayOfPoints[0],arrayOfPoints[2],arrayOfPoints[1],arrayOfPoints[3]);
            var secondPoint = intersectionBetweenOneLineAndOneSlopeInterception(startLine[0],inter,arrayOfPoints[6],arrayOfPoints[8],arrayOfPoints[7],arrayOfPoints[9]);
            
            elements.push(shadeLineIncorporation(firstPoint[0],secondPoint[0],firstPoint[1],secondPoint[1]));
        }
        
        for(inter = middleLine[1];inter < endLine[1];inter = inter + increment)
        {
            var firstPoint = intersectionBetweenOneLineAndOneSlopeInterception(startLine[0],inter,arrayOfPoints[4],arrayOfPoints[2],arrayOfPoints[5],arrayOfPoints[3]);
            var secondPoint = intersectionBetweenOneLineAndOneSlopeInterception(startLine[0],inter,arrayOfPoints[6],arrayOfPoints[4],arrayOfPoints[7],arrayOfPoints[5]);
            
            elements.push(shadeLineIncorporation(firstPoint[0],secondPoint[0],firstPoint[1],secondPoint[1]));
        }
    }
    else if(shadeStyle == "neg")
    {
        var startLine = generateLineFromPoints(arrayOfPoints[2],arrayOfPoints[3],arrayOfPoints[0],arrayOfPoints[1]);
        var middleLine = generateLineFromPoints(arrayOfPoints[8],arrayOfPoints[9],arrayOfPoints[4],arrayOfPoints[5]);
        var endLine = generateLineFromPointAndSlope(middleLine[0],arrayOfPoints[6],arrayOfPoints[7]);
        
        var increment = (endLine[1] - middleLine[1]) / 5;
        
        for(var inter = startLine[1] + increment;inter < middleLine[1]- increment;inter = inter + increment)
        {
            var firstPoint = intersectionBetweenOneLineAndOneSlopeInterception(startLine[0],inter,arrayOfPoints[0],arrayOfPoints[8],arrayOfPoints[1],arrayOfPoints[9]);
            var secondPoint = intersectionBetweenOneLineAndOneSlopeInterception(startLine[0],inter,arrayOfPoints[2],arrayOfPoints[4],arrayOfPoints[3],arrayOfPoints[5]);
            
            elements.push(shadeLineIncorporation(firstPoint[0],secondPoint[0],firstPoint[1],secondPoint[1]));
        }
        
        for(inter = middleLine[1];inter < endLine[1];inter = inter + increment)
        {
            var firstPoint = intersectionBetweenOneLineAndOneSlopeInterception(startLine[0],inter,arrayOfPoints[4],arrayOfPoints[6],arrayOfPoints[5],arrayOfPoints[7]);
            var secondPoint = intersectionBetweenOneLineAndOneSlopeInterception(startLine[0],inter,arrayOfPoints[8],arrayOfPoints[6],arrayOfPoints[9],arrayOfPoints[7]);
            
            elements.push(shadeLineIncorporation(firstPoint[0],secondPoint[0],firstPoint[1],secondPoint[1]));
        }
    }
    
    return elements;
}

function haxgonShadeIncorporation(arrayOfPoints, shadeStyle, elements)
{
    if(shadeStyle == "ver")
    {
        var startX = arrayOfPoints[10];
        var endX = arrayOfPoints[0];
        var increment = (endX - startX) / 5;
        
        for(var x = startX;x < endX;x = x + increment)
        {
            var firstPoint = intersectionBetweenTwoLines(x,x,0,100,arrayOfPoints[10],arrayOfPoints[0],arrayOfPoints[11],arrayOfPoints[1]);
            var secondPoint = intersectionBetweenTwoLines(x,x,0,100,arrayOfPoints[10],arrayOfPoints[8],arrayOfPoints[11],arrayOfPoints[9]);
            
            elements.push(shadeLineIncorporation(firstPoint[0], secondPoint[0], firstPoint[1] , secondPoint[1]));
        }
        
        
        startX = arrayOfPoints[0];
        endX = arrayOfPoints[2];
        increment = (endX - startX) / 10;
        for(x = startX;x < endX;x = x + increment)
            elements.push(shadeLineIncorporation(x, x, arrayOfPoints[1] , arrayOfPoints[9]));
        
        
        startX = arrayOfPoints[2];
        endX = arrayOfPoints[4];
        increment = (endX - startX) / 5;
        
        for(var x = startX;x < endX;x = x + increment)
        {
            var firstPoint = intersectionBetweenTwoLines(x,x,0,100,arrayOfPoints[4],arrayOfPoints[2],arrayOfPoints[5],arrayOfPoints[3]);
            var secondPoint = intersectionBetweenTwoLines(x,x,0,100,arrayOfPoints[4],arrayOfPoints[6],arrayOfPoints[5],arrayOfPoints[7]);
            
            elements.push(shadeLineIncorporation(firstPoint[0], secondPoint[0], firstPoint[1] , secondPoint[1]));
        }
    }
    else if(shadeStyle == "hor")
    {
        var startY = arrayOfPoints[1];
        var endY = arrayOfPoints[5];
        var increment = (endY - startY) / 10;
        
        for(var y = startY;y < endY;y = y + increment)
        {
            var firstPoint = intersectionBetweenTwoLines(0,100,y,y,arrayOfPoints[10],arrayOfPoints[0],arrayOfPoints[11],arrayOfPoints[1]);
            var secondPoint = intersectionBetweenTwoLines(0,100,y,y,arrayOfPoints[2],arrayOfPoints[4],arrayOfPoints[3],arrayOfPoints[5]);
            
            elements.push(shadeLineIncorporation(firstPoint[0], secondPoint[0], firstPoint[1] , secondPoint[1]));
        }
        
        var startY = arrayOfPoints[5];
        var endY = arrayOfPoints[9];
        var increment = (endY - startY) / 10;
        
        for(var y = startY;y < endY;y = y + increment)
        {
            var firstPoint = intersectionBetweenTwoLines(0,100,y,y,arrayOfPoints[10],arrayOfPoints[8],arrayOfPoints[11],arrayOfPoints[9]);
            var secondPoint = intersectionBetweenTwoLines(0,100,y,y,arrayOfPoints[6],arrayOfPoints[4],arrayOfPoints[7],arrayOfPoints[5]);
            
            elements.push(shadeLineIncorporation(firstPoint[0], secondPoint[0], firstPoint[1] , secondPoint[1]));
        }
    }
    else if(shadeStyle == "pos")
    {
        var diagnol = generateLineFromPoints(arrayOfPoints[0],arrayOfPoints[1],arrayOfPoints[6],arrayOfPoints[7]);
        var startLine = generateLineFromPoints(arrayOfPoints[2],arrayOfPoints[3],arrayOfPoints[4],arrayOfPoints[5]);
        var increment = (diagnol[1] - startLine[1]) / 10;
        
        for(var inter = startLine[1] + increment;inter < diagnol[1];inter = inter + increment)
        {
            var firstPoint = intersectionBetweenOneLineAndOneSlopeInterception(diagnol[0],inter,arrayOfPoints[2],arrayOfPoints[0],arrayOfPoints[3],arrayOfPoints[1]);
            var secondPoint = intersectionBetweenOneLineAndOneSlopeInterception(diagnol[0],inter,arrayOfPoints[6],arrayOfPoints[4],arrayOfPoints[7],arrayOfPoints[5]);
            
            elements.push(shadeLineIncorporation(firstPoint[0], secondPoint[0], firstPoint[1] , secondPoint[1]));
        }
        
        var endLine = generateLineFromPoints(arrayOfPoints[10],arrayOfPoints[11],arrayOfPoints[8],arrayOfPoints[9]);
        
        for(var inter = diagnol[1];inter < endLine[1];inter = inter + increment)
        {
            var firstPoint = intersectionBetweenOneLineAndOneSlopeInterception(diagnol[0],inter,arrayOfPoints[10],arrayOfPoints[0],arrayOfPoints[11],arrayOfPoints[1]);
            var secondPoint = intersectionBetweenOneLineAndOneSlopeInterception(diagnol[0],inter,arrayOfPoints[6],arrayOfPoints[8],arrayOfPoints[7],arrayOfPoints[9]);
            
            elements.push(shadeLineIncorporation(firstPoint[0], secondPoint[0], firstPoint[1] , secondPoint[1]));
        }
    }
    else if(shadeStyle == "neg")
    {
        var diagnol = generateLineFromPoints(arrayOfPoints[2],arrayOfPoints[3],arrayOfPoints[8],arrayOfPoints[9]);
        var startLine = generateLineFromPoints(arrayOfPoints[0],arrayOfPoints[1],arrayOfPoints[10],arrayOfPoints[11]);
        var increment = (diagnol[1] - startLine[1]) / 10;
        
        for(var inter = startLine[1] + increment;inter < diagnol[1];inter = inter + increment)
        {
            var firstPoint = intersectionBetweenOneLineAndOneSlopeInterception(diagnol[0],inter,arrayOfPoints[2],arrayOfPoints[0],arrayOfPoints[3],arrayOfPoints[1]);
            var secondPoint = intersectionBetweenOneLineAndOneSlopeInterception(diagnol[0],inter,arrayOfPoints[8],arrayOfPoints[10],arrayOfPoints[9],arrayOfPoints[11]);
            
            elements.push(shadeLineIncorporation(firstPoint[0], secondPoint[0], firstPoint[1] , secondPoint[1]));
        }
        
        var endLine = generateLineFromPoints(arrayOfPoints[4],arrayOfPoints[5],arrayOfPoints[6],arrayOfPoints[7]);
        
        for(var inter = diagnol[1];inter < endLine[1];inter = inter + increment)
        {
            var firstPoint = intersectionBetweenOneLineAndOneSlopeInterception(diagnol[0],inter,arrayOfPoints[2],arrayOfPoints[4],arrayOfPoints[3],arrayOfPoints[5]);
            var secondPoint = intersectionBetweenOneLineAndOneSlopeInterception(diagnol[0],inter,arrayOfPoints[6],arrayOfPoints[8],arrayOfPoints[7],arrayOfPoints[9]);
            
            elements.push(shadeLineIncorporation(firstPoint[0], secondPoint[0], firstPoint[1] , secondPoint[1]));
        }
    }
    
    return elements;
}

function circleShadeIncorporation(arrayOfPoints, scale, shadeStyle, elements)
{
    var centerX = arrayOfPoints[0];
    var centerY = arrayOfPoints[1];
    
    if(shadeStyle == "hor")
    {
        var yRangeStart = centerY - scale / 2;
        var yRangeEnd = centerY + scale / 2;
        
        var increment = (yRangeEnd - yRangeStart) / 15;
        
        for(var y = yRangeStart + increment;y < yRangeEnd;y = y + increment)
        {
            var firInterceptedX = centerX + Math.sqrt(Math.pow(scale/2,2) - Math.pow(y - centerY,2));
            var secInterceptedX = centerX - Math.sqrt(Math.pow(scale/2,2) - Math.pow(y - centerY,2));
            
            elements.push(shadeLineIncorporation(firInterceptedX, secInterceptedX, y , y));
        }
    }
    else if(shadeStyle == "ver")
    {
        var xRangeStart = centerX - scale/2;
        var xRangeEnd = centerX + scale/2;
        
        var increment = (xRangeEnd - xRangeStart) / 15;
        
        for(var x = xRangeStart + increment;x < xRangeEnd;x = x + increment)
        {
            var firInterceptedY = centerY + Math.sqrt(Math.pow(scale/2,2) - Math.pow(x - centerX,2));
            var secInterceptedY = centerY - Math.sqrt(Math.pow(scale/2,2) - Math.pow(x - centerX,2));
            
            elements.push(shadeLineIncorporation(x, x, firInterceptedY , secInterceptedY));
        }
    }
    else if(shadeStyle == "pos")
    {
        var interception = centerY - centerX;
        var interceptionStart = interception - scale / 2 * Math.sqrt(2);
        var interceptionEnd = interception + scale / 2 * Math.sqrt(2);
        
        var increment = (interceptionEnd - interceptionStart) / 20;
        
        for(var inter = interceptionStart + increment;inter < (interceptionEnd - increment);inter = inter + increment)
        {
            
            var tempVar = inter - centerY;
            var tempVarTwo = 2 * tempVar - 2 * centerX;
            
            var delta = Math.sqrt(Math.pow(tempVarTwo,2) - 4 * 2 * (Math.pow(centerX,2) + Math.pow(tempVar,2) - Math.pow(scale/2,2)));
            var firX = (-1 * tempVarTwo + delta) / 4;
            var secX = (-1 * tempVarTwo - delta) / 4;
            
            elements.push(shadeLineIncorporation(firX, secX, firX+inter , secX+inter));
        }
    }
    else if(shadeStyle == "neg")
    {
        var interception = centerY + centerX;
        var interceptionStart = interception - scale / 2 * Math.sqrt(2);
        var interceptionEnd = interception + scale / 2 * Math.sqrt(2);
        
        var increment = (interceptionEnd - interceptionStart) / 10;
        
        for(var inter = interceptionStart + increment;inter < interceptionEnd;inter = inter + increment)
        {
            
            var tempVar = inter - centerY;
            var tempVarTwo = -2 * tempVar - 2 * centerX;
            
            var delta = Math.sqrt(Math.pow(tempVarTwo,2) - 4 * 2 * (Math.pow(centerX,2) + Math.pow(tempVar,2) - Math.pow(scale/2,2)));
            var firX = (-1 * tempVarTwo + delta) / 4;
            var secX = (-1 * tempVarTwo - delta) / 4;
            
            elements.push(shadeLineIncorporation(firX, secX, -1*firX+inter , -1*secX+inter));
        }
    }
    
    return elements;
}

function ellipseShadeIncorporation(arrayOfPoints, scale, shadeStyle, elements)
{
    var h = arrayOfPoints[0];
    var k = arrayOfPoints[1];
    var a = scale * 1.8;
    var b = scale;
    
    if(shadeStyle == "ver")
    {
        var startX = h - a;
        var endX = h + a;
        var increment = (endX - startX) / 20
        
        
        for(var x = startX + increment;x < endX;x = x + increment)
        {
            var yMinusKSq = (1 - Math.pow(x - h,2) / Math.pow(a,2)) * Math.pow(b,2);
            var startY = Math.sqrt(yMinusKSq) + k;
            var endY = k - Math.sqrt(yMinusKSq);
            
            elements.push(shadeLineIncorporation(x,x,startY,endY));
        }
    }
    else if(shadeStyle == "hor")
    {
        var startY = k - b;
        var endY = k + b;
        var increment = (endY - startY) / 11
        
        
        for(var y = startY + increment;y < endY;y = y + increment)
        {
            var xMinusHSq = (1 - Math.pow(y - k,2) / Math.pow(b,2)) * Math.pow(a,2);
            var startX = Math.sqrt(xMinusHSq) + h;
            var endX = h - Math.sqrt(xMinusHSq);
            
            elements.push(shadeLineIncorporation(startX,endX,y,y));
        }
    }
    else if(shadeStyle == "pos")
    {
        var startInter = -1 * Math.sqrt(Math.pow(a,2) + Math.pow(b,2)) - h + k;
        var endInter = Math.sqrt(Math.pow(a,2) + Math.pow(b,2)) - h + k;
        var increment = (endInter - startInter) / 20;
        
        var squareA = Math.pow(a,2);
        var squareB = Math.pow(b,2);
        var squareH = Math.pow(h,2);
        
        
        for(var inter = startInter + increment;inter < endInter;inter = inter + increment)
        {
            var temp = inter - k;
            var squareTemp = Math.pow(temp,2);
            
            var delta = -8*temp*h/(squareB*squareA) - 4*squareTemp/(squareB*squareA) + 4/squareA - 4*squareH/(squareB*squareA) + 4/squareB;
            if(delta < 0)
                delta = -1 * delta;
            
            var firstX = (2*h/squareA - 2*temp/squareB + Math.sqrt(delta))/(2/squareA + 2/squareB);
            var secondX = (2*h/squareA - 2*temp/squareB - Math.sqrt(delta))/(2/squareA + 2/squareB);
            
            elements.push(shadeLineIncorporation(firstX,secondX,firstX+inter,secondX+inter));
        }
    }
    else if(shadeStyle == "neg")
    {
        var startInter = -1 * Math.sqrt(Math.pow(a,2) + Math.pow(b,2)) + h + k;
        var endInter = Math.sqrt(Math.pow(a,2) + Math.pow(b,2)) + h + k;
        var increment = (endInter - startInter) / 20;
        
        var squareA = Math.pow(a,2);
        var squareB = Math.pow(b,2);
        var squareH = Math.pow(h,2);
        
        
        for(var inter = startInter + increment;inter < endInter;inter = inter + increment)
        {
            var temp = inter - k;
            var squareTemp = Math.pow(temp,2);
            
            var delta = 8*temp*h/(squareB*squareA) - 4*squareTemp/(squareB*squareA) + 4/squareA - 4*squareH/(squareB*squareA) + 4/squareB;
            if(delta < 0)
                delta = -1 * delta;
            
            var firstX = (2*h/squareA + 2*temp/squareB + Math.sqrt(delta))/(2/squareA + 2/squareB);
            var secondX = (2*h/squareA + 2*temp/squareB - Math.sqrt(delta))/(2/squareA + 2/squareB);
            
            elements.push(shadeLineIncorporation(firstX,secondX,inter-firstX,inter-secondX));
        }
    }
    
    
    return elements;
}

function shadeLineIncorporation(startx, endx, starty, endy)
{
    var xmlns="http://www.w3.org/2000/svg";
    
    var line = document.createElementNS(xmlns,"line");
    line.setAttributeNS(null,"x1",startx);
    line.setAttributeNS(null,"y1",starty);
    line.setAttributeNS(null,"x2",endx);
    line.setAttributeNS(null,"y2",endy);
    line.setAttributeNS(null,"stroke","rgb(136,136,136)");
    line.setAttributeNS(null,"stroke-width","3");
    
    return line;
}