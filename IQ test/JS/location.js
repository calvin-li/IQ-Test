function setupLocation(shape, arrayOfObjects, scale, location, index, elements, isAns)
{
    if(shape != "lsquare" && shape != "lcircle" && shape != "ltriangle" && shape != "lpentagon" && shape != "lhaxgon")
        return;
    
    var minX = Number.POSITIVE_INFINITY;
    var maxX = Number.NEGATIVE_INFINITY;
    var minY = Number.POSITIVE_INFINITY;
    var maxY = Number.NEGATIVE_INFINITY;
    
    for(var i = 0;i < arrayOfObjects.length;i++)
    {
        var arrayOfPoints = arrayOfObjects[i];
        
        for(var j = 0;j < arrayOfPoints.length;j++)
        {
            if(j % 2 == 0)
            {
                if(arrayOfPoints[j] > maxX)
                    maxX = arrayOfPoints[j];
                if(arrayOfPoints[j] < minX)
                    minX = arrayOfPoints[j];
            }
            else
            {
                if(arrayOfPoints[j] > maxY)
                    maxY = arrayOfPoints[j];
                if(arrayOfPoints[j] < minY)
                    minY = arrayOfPoints[j];
            }
        }
    }
    
    if(location == "inside")
    {
        // find the midpoint of given objects
        // find the side according to the scale
        // add on the outside shape
        var centerX = (minX + maxX) / 2;
        var centerY = (minY + maxY) / 2;
        var side;
        
        if(shape == "lsquare")
        {
            // scale is the side so moving the center point to the middle of a square since it was on the left top corner of a square
            centerX += scale / 2;
            centerY += scale / 2;
            
            side = Math.max(centerX-minX, centerY-minY) + 10;
            
            generateInsideRegularQuadrilateral(centerX - side, centerY - side, 2 * side, 2 * side, elements);
        }
        else if(shape == "lcircle")
        {
            // scale is the diameter
            side = Math.max(centerX-minX, centerY-minY) + scale / 2 + 10;
            generateInsideRegularQuadrilateral(centerX - side, centerY - side, 2 * side, 2 * side, elements);
        }
        else
        {
            side = Math.max(centerX-minX, centerY-minY) + 10;
            
            generateInsideRegularQuadrilateral(centerX - side, centerY - side, 2 * side, 2 * side, elements);
        }
    }
    else if (location == "outside")
    {
        // if it's outside
        // 1. find the margin between top of the object and top point of the cell
        //    find the margin between bottom of the object and bottom point of the cell
        //    find the margin between left of the object and left point of the cell
        //    find the margin between right of the object and right point of the cell
        
        // 2. find which margin is the largest
        
        // 3. according to whether it's top, bottom, up and down find the outside shape to squeeze in 
        

        // update the info according to global info
        if(isAns)
        {
            var row = Math.floor(index / 2);
            var col = index % 2;
        }
        else
        {
            var row = Math.floor(index / 3);
            var col = index % 3;
        }
//        var row = Math.floor(index / 3);
//        var col = index % 3;
        startGridY = startGridY + row * 225;
        endGridY = endGridY + row * 225;
        centerPointY = centerPointY + row * 225;
        
        startGridX = startGridX + col * 250;
        endGridX = endGridX + col * 250;
        centerPointX = centerPointX + col * 250;
        
        if(shape == "lsquare")
        {
            var upBoundMargin = minY - startGridY;
            var bottomBoundMargin = endGridY - (maxY + scale);
            var leftBoundMargin = minX - startGridX;
            var rightBoundMargin = endGridX - (maxX + scale);
            
            var maxMargin = Math.max(upBoundMargin, bottomBoundMargin, leftBoundMargin, rightBoundMargin);
            if(maxMargin == upBoundMargin)
            {
                var marginDistance = maxMargin;
                var side = marginDistance - 20;
                var leftAboveCornerPointY = startGridY + 15;
                var leftAboveCornerPointX = centerPointX - side / 2;
                
                //                if(leftBoundMargin > rightBoundMargin)
                //                    leftAboveCornerPointX = minX - side;
                //                else
                //                    leftAboveCornerPointX = maxX + scale;
            }
            else if(maxMargin == bottomBoundMargin)
            {
                var marginDistance = maxMargin;
                var side = marginDistance - 20;
                var leftAboveCornerPointY = maxY + scale + 5;
                var leftAboveCornerPointX = centerPointX - side / 2;
                
                //                if(leftBoundMargin > rightBoundMargin)
                //                    leftAboveCornerPointX = minX - side;
                //                else
                //                    leftAboveCornerPointX = maxX + scale;
            }
            else if(maxMargin == leftBoundMargin)
            {
                var marginDistance = maxMargin;
                var side = marginDistance - 20;
                var leftAboveCornerPointX = startGridX + 15;
                var leftAboveCornerPointY = centerPointY - side / 2;
                
                //                if(upBoundMargin > bottomBoundMargin)
                //                    leftAboveCornerPointY = minY - side;
                //                else
                //                    leftAboveCornerPointY = maxY + scale;
            }
            else
            {
                var marginDistance = maxMargin;
                var side = marginDistance - 20;
                var leftAboveCornerPointX = maxX + scale + 5;
                var leftAboveCornerPointY = centerPointY - side / 2;
                
                //                if(upBoundMargin > bottomBoundMargin)
                //                    leftAboveCornerPointY = minY - side;
                //                else
                //                    leftAboveCornerPointY = maxY + scale;
            }
            generateInsideRegularQuadrilateral(leftAboveCornerPointX, leftAboveCornerPointY, side, side, elements);
        }
        else if(shape == "lcircle")
        {
            var upBoundMargin = minY - scale / 2 - startGridY;
            var bottomBoundMargin = endGridY - (maxY + scale / 2);
            var leftBoundMargin = minX - scale / 2 - startGridX;
            var rightBoundMargin = endGridX - (maxX + scale / 2);
            
            var maxMargin = Math.max(upBoundMargin, bottomBoundMargin, leftBoundMargin, rightBoundMargin);
            if(maxMargin == upBoundMargin)
            {
                var marginDistance = maxMargin;
                var side = marginDistance - 20;
                var leftAboveCornerPointY = startGridY + 15;
                var leftAboveCornerPointX = centerPointX - side / 2;
                
                //                if(leftBoundMargin > rightBoundMargin)
                //                    leftAboveCornerPointX = minX - scale / 2 - side;
                //                else
                //                    leftAboveCornerPointX = maxX + scale / 2;
            }
            else if(maxMargin == bottomBoundMargin)
            {
                var marginDistance = maxMargin;
                var side = marginDistance - 20;
                var leftAboveCornerPointY = maxY + scale / 2 + 5;
                var leftAboveCornerPointX = centerPointX - side / 2;
                
                //                if(leftBoundMargin > rightBoundMargin)
                //                    leftAboveCornerPointX = minX - scale / 2 - side;
                //                else
                //                    leftAboveCornerPointX = maxX + scale / 2;
            }
            else if(maxMargin == leftBoundMargin)
            {
                var marginDistance = maxMargin;
                var side = marginDistance - 20;
                var leftAboveCornerPointX = startGridX + 15;
                var leftAboveCornerPointY = centerPointY - side / 2;
                
                //                if(upBoundMargin > bottomBoundMargin)
                //                    leftAboveCornerPointY = minY - scale / 2 - side;
                //                else
                //                    leftAboveCornerPointY = maxY + scale / 2;
            }
            else
            {
                var marginDistance = maxMargin;
                var side = marginDistance - 20;
                var leftAboveCornerPointX = maxX + scale / 2 + 5;
                var leftAboveCornerPointY = centerPointY - side / 2;
                
                //                if(upBoundMargin > bottomBoundMargin)
                //                    leftAboveCornerPointY = minY - scale / 2 - side;
                //                else
                //                    leftAboveCornerPointY = maxY + scale / 2;
            }
            generateInsideRegularQuadrilateral(leftAboveCornerPointX, leftAboveCornerPointY, side, side, elements);
        }
        else
        {
            var upBoundMargin = minY - startGridY;
            var bottomBoundMargin = endGridY - maxY;
            var leftBoundMargin = minX - startGridX;
            var rightBoundMargin = endGridX - maxX;
            
            var maxMargin = Math.max(upBoundMargin, bottomBoundMargin, leftBoundMargin, rightBoundMargin);
            if(maxMargin == upBoundMargin)
            {
                var marginDistance = maxMargin;
                var side = marginDistance - 20;
                var leftAboveCornerPointY = startGridY + 15;
                var leftAboveCornerPointX = centerPointX - side / 2;
                
                //                if(leftBoundMargin > rightBoundMargin)
                //                    leftAboveCornerPointX = minX - side;
                //                else
                //                    leftAboveCornerPointX = maxX;
            }
            else if(maxMargin == bottomBoundMargin)
            {
                var marginDistance = maxMargin;
                var side = marginDistance - 20;
                var leftAboveCornerPointY = maxY + 5;
                var leftAboveCornerPointX = centerPointX - side / 2;
                
                //                if(leftBoundMargin > rightBoundMargin)
                //                    leftAboveCornerPointX = minX - side;
                //                else
                //                    leftAboveCornerPointX = maxX;
            }
            else if(maxMargin == leftBoundMargin)
            {
                var marginDistance = maxMargin;
                var side = marginDistance - 20;
                var leftAboveCornerPointX = startGridX + 15;
                var leftAboveCornerPointY = centerPointY - side / 2;
                
                //                if(upBoundMargin > bottomBoundMargin)
                //                    leftAboveCornerPointY = minY - side;
                //                else
                //                    leftAboveCornerPointY = maxY;
            }
            else
            {
                var marginDistance = maxMargin;
                var side = marginDistance - 20;
                var leftAboveCornerPointX = maxX + 5;
                var leftAboveCornerPointY = centerPointY - side / 2;
                
                //                if(upBoundMargin > bottomBoundMargin)
                //                    leftAboveCornerPointY = minY - side;
                //                else
                //                    leftAboveCornerPointY = maxY;
            }
            generateOutsideRegularQuadrilateral(leftAboveCornerPointX, leftAboveCornerPointY, side, side, elements);
        }
        
        // recover the position info
        startGridY = startGridY - row * 225;
        endGridY = endGridY - row * 225;
        centerPointY = centerPointY - row * 225;
        
        startGridX = startGridX - col * 250;
        endGridX = endGridX - col * 250;
        centerPointX = centerPointX - col * 250;
    }
}

function generateInsideRegularQuadrilateral(topLeftX, topLeftY, width, height, elements)
{
    return generateRegularQuadrilateral(topLeftX, topLeftY, width, height, elements);
}

function generateOutsideRegularQuadrilateral(topLeftX, topLeftY, width, height, elements)
{
    return generateRegularQuadrilateral(topLeftX, topLeftY, width, height, elements);
}

function generateRegularQuadrilateral(topLeftX, topLeftY, width, height, elements)
{
    var xmlns="http://www.w3.org/2000/svg";
    
    var element = document.createElementNS(xmlns,"rect");
    element.setAttributeNS(null,"x",topLeftX);
    element.setAttributeNS(null,"y",topLeftY);
    element.setAttributeNS(null,"width",width);
    element.setAttributeNS(null,"height",height);
    element.setAttributeNS(null,"stroke","black");
    element.setAttributeNS(null,"stroke-width","3");
    element.setAttributeNS(null,"fill","none");
    
    
    elements.push(element);
    
    return elements;
}
