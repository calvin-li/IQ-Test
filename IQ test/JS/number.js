// setting the number attribute only applicable to all kinds of lines and small polygons
function setUpNumber(arrayOfPoints, shape, orientation, scale, number, arrayOfPositionInfo)
{
    var  arrayOfObjects = new Array();
    if(shape == "line")
        arrayOfObjects = setUpNumberForLines(arrayOfPoints, orientation, 18, number, arrayOfPositionInfo);
    else if(shape == "curve")
        arrayOfObjects = setUpNumberForLines(arrayOfPoints, orientation, 18, number, arrayOfPositionInfo);
    else if(shape == "wave")
        arrayOfObjects = setUpNumberForLines(arrayOfPoints, orientation, 19, number, arrayOfPositionInfo);
    else if(shape == "sql")
        arrayOfObjects = setUpNumberForLines(arrayOfPoints, orientation, 21, number, arrayOfPositionInfo);
    else if(shape == "arrow")
        arrayOfObjects = setUpNumberForLines(arrayOfPoints, orientation, 20, number, arrayOfPositionInfo);
    else if(shape == "lsquare" || shape == "lcircle" || shape == "ltriangle" || shape == "lpentagon" || shape == "lhaxgon")
        arrayOfObjects = setUpNumberForPolygons(arrayOfPoints, shape, scale, number, arrayOfPositionInfo);
    else
    {
        arrayOfObjects.push(arrayOfPoints);
        arrayOfPositionInfo.push("none");
    }
    
    return arrayOfObjects;
}

// when setting up number for standard line and curve use a constant to represent scale instead of using real scale
// for wave and square make 2 * scale as the scale for setting up number
// scale here represents how much it needs to be shifted to replicate itself
function setUpNumberForLines(arrayOfPoints, orientation, scale, number, arrayOfPositionInfo)
{
    arrayOfPositionInfo.push("none");
    
    var arrayOfObjects = new Array();
    
    var positionX = arrayOfPoints[0];
    var positionY = arrayOfPoints[1];
    
    var direction = new Boolean();
    if((orientation >= 0 && orientation < 45) || (orientation > 135 && orientation <= 180))
        // vertical
        direction = true;
    else
        // horizontal
        direction = false;
    
    if(direction)
    {
        // if orientation is close to horizontal direction check which part the line is currently lying at:
        // from startGridY to oneQuarterPointY
        // or
        // from oneQuarterPointY to centerPointY
        // or
        // from from centerPointY to threeQuarterPointY
        // or
        // from threeQuarterPointY to endGridY
        
        if(positionY >= threeQuarterPointY)
        {
            // from threeQuarterPointY to endGridY
            // keep shiftting up for more items
            
            for(var i = 1;i < number;i++)
            {
                var newArrayOfPoints = pointProcessForPosition(0,-1 * i * scale,arrayOfPoints);
                arrayOfObjects.push(newArrayOfPoints);
            }
        }
        else if(positionY <= oneQuarterPointY)
        {
            // from startGridY to oneQuarterPointY
            // keep shiftting down for more items
            
            for(var i = 1;i < number;i++)
            {
                var newArrayOfPoints = pointProcessForPosition(0, i * scale,arrayOfPoints);
                arrayOfObjects.push(newArrayOfPoints);
            }
        }
        else if(positionY >= centerPointY && positionY < threeQuarterPointY)
        {
            // from from centerPointY to threeQuarterPointY
            // start from shitting down the first one and then switch to shiftting up and keep alternating

            for(var i = 1;i < number;i++)
            {
                var newArrayOfPoints;
                if(i % 2 == 1)
                    newArrayOfPoints = pointProcessForPosition(0,-1 * (i + 1) / 2 * scale,arrayOfPoints);
                else
                    newArrayOfPoints = pointProcessForPosition(0, i / 2 * scale,arrayOfPoints);
                
                arrayOfObjects.push(newArrayOfPoints);
            }
        }
        else
        {
            // from from oneQuarterPointY to centerPointY
            // start from shitting up the first one and then switch to shiftting down and keep alternating

            for(var i = 1;i < number;i++)
            {
                var newArrayOfPoints;
                if(i % 2 == 1)
                    newArrayOfPoints = pointProcessForPosition(0, (i + 1) / 2 * scale,arrayOfPoints);
                else
                    newArrayOfPoints = pointProcessForPosition(0, -1 * i / 2 * scale,arrayOfPoints);
                
                arrayOfObjects.push(newArrayOfPoints);
            }
        }
    }
    else
    {
        // if orientation is close to vertical direction check which part the line is currently lying at:
        // similar to horizontal cases divide the space along x-axis.
       
        if(positionX >= threeQuarterPointX)
        {
            for(var i = 1;i < number;i++)
            {
                var newArrayOfPoints = pointProcessForPosition(-1 * i * scale,0,arrayOfPoints);
                arrayOfObjects.push(newArrayOfPoints);
            }
        }
        else if(positionX <= oneQuarterPointX)
        {
            for(var i = 1;i < number;i++)
            {
                var newArrayOfPoints = pointProcessForPosition(i * scale,0,arrayOfPoints);
                arrayOfObjects.push(newArrayOfPoints);
            }
        }
        else if(positionX >= centerPointX && positionX < threeQuarterPointX)
        {
            for(var i = 1;i < number;i++)
            {
                var newArrayOfPoints;
                if(i % 2 == 1)
                    newArrayOfPoints = pointProcessForPosition(-1 * (i + 1) / 2 * scale,0,arrayOfPoints);
                else
                    newArrayOfPoints = pointProcessForPosition(i / 2 * scale,0,arrayOfPoints);
                
                arrayOfObjects.push(newArrayOfPoints);
            }
        }
        else
        {
            for(var i = 1;i < number;i++)
            {
                var newArrayOfPoints;
                if(i % 2 == 1)
                    newArrayOfPoints = pointProcessForPosition((i + 1) / 2 * scale,0,arrayOfPoints);
                else
                    newArrayOfPoints = pointProcessForPosition(-1 * i / 2 * scale,0,arrayOfPoints);
                
                arrayOfObjects.push(newArrayOfPoints);
            }
        }
    }
    
    arrayOfObjects.push(arrayOfPoints);
    return arrayOfObjects;
}

// setting up number for small polygons
function setUpNumberForPolygons(arrayOfPoints, shape, scale, number, arrayOfPositionInfo)
{
    var arrayOfObjects = new Array();
    
    var distance;           // distance is how much the current polygon need to shift vertically or horizontally in order to add the number
    var positionX;          // x coordinate of center point of the current polygon
    var positionY;          // y coordinate of center point of the current polygon
    
    if(shape == "lsquare")
    {
        // arrayOfPoints stores the leftAbove point coordinate of a square
        // positionX, Y stores the leftBottom point to in line with other polygons
        var positionX = arrayOfPoints[0];
        var positionY = arrayOfPoints[1] + scale;
        
        distance = scale + 10;
    }
    else if(shape == "lcircle")
    {
        // arrayOfPoints stores the center point coordinate of a circle
        var positionX = arrayOfPoints[0]- scale / 2;
        var positionY = arrayOfPoints[1];
        
        distance = scale + 10;
    }
    else if(shape == "ltriangle")
    {
        // arrayOfPoints[0], arrayOfPoints[2] stores left right bottom point x coordinate
        // arrayOfPoints[1], arrayOfPoints[5] stores left and top point y coordinate
        var positionX = arrayOfPoints[0];
        var positionY = (arrayOfPoints[1] + arrayOfPoints[5]) / 2;
        
        distance = arrayOfPoints[2] - arrayOfPoints[0] + 10;
    }
    else
    {
        // just find the leftmost, rightmost, bottommost and topmost value and do average to get the center point x and y
        var minX = Number.POSITIVE_INFINITY;
        var maxX = Number.NEGATIVE_INFINITY;
        var minY = Number.POSITIVE_INFINITY;
        var maxY = Number.NEGATIVE_INFINITY;
        
        for(var i = 0;i < arrayOfPoints.length;i++)
        {
            var current = arrayOfPoints[i];
            
            if(i % 2 == 0)
            {
                if(current > maxX)
                    maxX = current;
                if(current < minX)
                    minX = current;
            }
            else
            {
                if(current > maxY)
                    maxY = current;
                if(current < minY)
                    minY = current;
            }
        }
        
        var positionX = minX;
        var positionY = maxY;
        
        distance = maxX - minX + 10;
    }
    
    
    if(number == 1)
        arrayOfPositionInfo.push("left");
        
        
    if(number >= 2)
    {
        // if number is greater than 2, here is the branch of how the SECOND item is added
        // shift right or left according to the center point x
        if(positionX < centerPointX)
        {
            var newArrayOfPoints = pointProcessForPosition(distance, 0, arrayOfPoints);
            arrayOfObjects.push(newArrayOfPoints);
            arrayOfPositionInfo.push("right");
        }
        else
        {
            var newArrayOfPoints = pointProcessForPosition(-1*distance, 0, arrayOfPoints);
            arrayOfObjects.push(newArrayOfPoints);
            arrayOfPositionInfo.push("left");
        }
    }
    if(number >= 3)
    {
        // if number is greater than 3, here is the branch of how the third item is added
        // shift up or down according to the center point y
        if(positionY < centerPointY)
        {
            var newArrayOfPoints = pointProcessForPosition(0, distance, arrayOfPoints);
            arrayOfObjects.push(newArrayOfPoints);
        }
        else
        {
            var newArrayOfPoints = pointProcessForPosition(0, -1*distance, arrayOfPoints);
            arrayOfObjects.push(newArrayOfPoints);
        }
        
    }
    if(number == 4)
    {
        // if number is equal to 4, here is the branch of how the last item is added
        // 4 possible choices to shift according to the center point x and y
        if(positionX < centerPointX && positionY < centerPointY)
        {
            var newArrayOfPoints = pointProcessForPosition(distance, distance, arrayOfPoints);
            arrayOfObjects.push(newArrayOfPoints);
        }
        else if(positionX >= centerPointX && positionY < centerPointY)
        {
            var newArrayOfPoints = pointProcessForPosition(-1*distance, distance, arrayOfPoints);
            arrayOfObjects.push(newArrayOfPoints);
        }
        else if(positionX < centerPointX && positionY >= centerPointY)
        {
            var newArrayOfPoints = pointProcessForPosition(distance, -1*distance, arrayOfPoints);
            arrayOfObjects.push(newArrayOfPoints);
        }
        else
        {
            var newArrayOfPoints = pointProcessForPosition(-1*distance, -1*distance, arrayOfPoints);
            arrayOfObjects.push(newArrayOfPoints);
        }
    }
    
    arrayOfObjects.push(arrayOfPoints);
    return arrayOfObjects;
}

