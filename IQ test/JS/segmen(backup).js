function    (seg)
{
    var standardScale = 20;
    
    var arrayOfPoints = new Array();
    
    if(seg == 'up')
    {
        var tempArrayOfPoints = new Array();
        
        // (gridWidth - standardScale*2*4) / 2 + startGridX is the start
        // - standardScale / 4 get back to accommodate the the first point of i = 0
        var accumulatedX = (gridWidth - standardScale*2*4) / 2 + startGridX - 3 * standardScale / 4;
        
        for(var i = 0;i < 13;i++)
        {
            var currentPointX;
            var currentPointY;
            
            if((i + 1) % 3 == 0)
            {
                currentPointX = accumulatedX + standardScale / 2;
            }
            else
            {
                currentPointX = accumulatedX + 3 * standardScale / 4;
            }
            accumulatedX = currentPointX;
            
            
            if(i % 3 == 0)
            {
                currentPointY = centerPointY;
            }
            else
            {
                currentPointY = centerPointY  - 3 * standardScale / 4;
            }
            
            tempArrayOfPoints[2*i] = currentPointX;
            tempArrayOfPoints[2*i+1] = currentPointY;
        }
        
        var j = 0;
        for(var i = 0;i < tempArrayOfPoints.length/2;i++)
        {
            arrayOfPoints[2*j] = tempArrayOfPoints[2*i];
            arrayOfPoints[2*j+1] = tempArrayOfPoints[2*i+1];
            j++;
            
            if(i % 3 == 0 && i != 0 && i != 12)
            {
                arrayOfPoints[2*j] = tempArrayOfPoints[2*i];
                arrayOfPoints[2*j+1] = tempArrayOfPoints[2*i+1];
                j++;
            }
        }
    }
    else if(seg == 'left')
    {
        var startPointX = (gridWidth - standardScale*2*4) / 2 + startGridX;
        
        arrayOfPoints[0] = startPointX + standardScale / 2;
        arrayOfPoints[1] = centerPointY - standardScale / 2;
        
        for(var i = 1;i < 9;i++)
        {
            var currentPointX = startPointX + i * standardScale;
            
            // store x axis coordinate
            arrayOfPoints[2*i] = currentPointX;
            // store y axis coordinate
            if(i % 2 == 0)
                arrayOfPoints[2*i+1] = centerPointY;
            else
                arrayOfPoints[2*i+1] = centerPointY - standardScale;
            
        }
    }
    else if(seg == 'right')
    {
        var startPointX = (gridWidth - standardScale*2*4) / 2 + startGridX;
        
        for(var i = 0;i < 8;i++)
        {
            var currentPointX = startPointX + i * standardScale;
            
            // store x axis coordinate
            arrayOfPoints[2*i] = currentPointX;
            // store y axis coordinate
            if(i % 2 == 0)
                arrayOfPoints[2*i+1] = centerPointY;
            else
                arrayOfPoints[2*i+1] = centerPointY - standardScale;
            
        }
        
        arrayOfPoints[16] = arrayOfPoints[14] + standardScale / 2;
        arrayOfPoints[17] = arrayOfPoints[15] + standardScale / 2;
    }
    else if( seg == 'down')
    {
        var tempArrayOfPoints = new Array();
        
        var accumulatedX = (gridWidth - standardScale*2*4) / 2 + startGridX - 2 * standardScale / 4;
        
        for(var i = 0;i < 12;i++)
        {
            var currentPointX;
            var currentPointY;
            
            if(i % 3 == 0)
            {
                currentPointX = accumulatedX + standardScale / 2;
            }
            else
            {
                currentPointX = accumulatedX + 3 * standardScale / 4;
            }
            accumulatedX = currentPointX;
            
            
            if((i - 1) % 3 == 0)
            {
                currentPointY = centerPointY - 3 * standardScale / 4;
            }
            else
            {
                currentPointY = centerPointY;
            }
            
            tempArrayOfPoints[2*i] = currentPointX;
            tempArrayOfPoints[2*i+1] = currentPointY;
        }
        
        var j = 0;
        for(var i = 0;i < tempArrayOfPoints.length/2;i++)
        {
            arrayOfPoints[2*j] = tempArrayOfPoints[2*i];
            arrayOfPoints[2*j+1] = tempArrayOfPoints[2*i+1];
            j++;
            
            if((i-1) % 3 == 0)
            {
                arrayOfPoints[2*j] = tempArrayOfPoints[2*i];
                arrayOfPoints[2*j+1] = tempArrayOfPoints[2*i+1];
                j++;
            }
        }
    }
    
    
    return arrayOfPoints;
}

function squareLinePointGenerationForSegmentation(seg)
{
    var standardScale = 20;
    var startPointX = (gridWidth - standardScale*2*4) / 2 + startGridX;
    
    var arrayOfPoints = new Array();
    
    if(seg == 'left')
    {
        arrayOfPoints[0] = startPointX + standardScale / 2;
        arrayOfPoints[1] = centerPointY - standardScale;
        
        for(var i = 1;i < 9;i++)
        {
            var currentPointX;
            var currentPointY;
            
            currentPointX = startPointX + (Math.ceil(i / 2)  * 2 * standardScale);
            
            if(i == 1 || i == 4 || i == 5 || i == 8)
                currentPointY = centerPointY - standardScale;
            else
                currentPointY = centerPointY;
            
            // store x axis coordinate
            arrayOfPoints[2*i] = currentPointX;
            // store y axis coordinate
            arrayOfPoints[2*i+1] = currentPointY;
            
        }
    }
    else if(seg == 'right')
    {
        
        for(var i = 0;i < 8;i++)
        {
            var currentPointX;
            var currentPointY;
            
            currentPointX = startPointX + (Math.floor(i / 2)  * 2 * standardScale);
            
            if(i == 1 || i == 2 || i == 5 || i == 6)
                currentPointY = centerPointY - standardScale;
            else
                currentPointY = centerPointY;
            
            // store x axis coordinate
            arrayOfPoints[2*i] = currentPointX;
            // store y axis coordinate
            arrayOfPoints[2*i+1] = currentPointY;
            
        }
        
        arrayOfPoints[16] = startPointX + 7 * standardScale + standardScale / 2;
        arrayOfPoints[17] = centerPointY;
    }
    else if(seg == 'up')
    {
        tempArrayOfPoints= new Array();
        
        for(var i = 0;i < 10;i++)
        {
            var currentPointX;
            var currentPointY;
            
            currentPointX = startPointX + (Math.floor(i / 2)  * 2 * standardScale);
            
            if(i == 1 || i == 2 || i == 5 || i == 6 || i == 9)
                currentPointY = centerPointY - 3 * standardScale / 4;
            else
                currentPointY = centerPointY;
            
            // store x axis coordinate
            tempArrayOfPoints[2*i] = currentPointX;
            // store y axis coordinate
            tempArrayOfPoints[2*i+1] = currentPointY;
        }
        
        var j = 0;
        for(var i = 0;i < tempArrayOfPoints.length/2;i++)
        {
            arrayOfPoints[2*j] = tempArrayOfPoints[2*i];
            arrayOfPoints[2*j+1] = tempArrayOfPoints[2*i+1];
            j++;
            
            if(i == 3 || i == 4 || i == 7 || i == 8)
            {
                arrayOfPoints[2*j] = tempArrayOfPoints[2*i];
                arrayOfPoints[2*j+1] = tempArrayOfPoints[2*i+1];
                j++;
            }
        }
    }
    else if(seg == 'down')
    {
        tempArrayOfPoints= new Array();
        
        for(var i = 0;i < 10;i++)
        {
            var currentPointX;
            var currentPointY;
            
            currentPointX = startPointX + (Math.floor(i / 2)  * 2 * standardScale);
            
            if(i == 0 || i == 3 || i == 4 || i == 7 || i == 8)
                currentPointY = centerPointY - standardScale / 4;
            else
                currentPointY = centerPointY - standardScale;
            
            // store x axis coordinate
            tempArrayOfPoints[2*i] = currentPointX;
            // store y axis coordinate
            tempArrayOfPoints[2*i+1] = currentPointY;
        }
        
        var j = 0;
        for(var i = 0;i < tempArrayOfPoints.length/2;i++)
        {
            arrayOfPoints[2*j] = tempArrayOfPoints[2*i];
            arrayOfPoints[2*j+1] = tempArrayOfPoints[2*i+1];
            j++;
            
            if(i == 1 || i == 2 || i == 5 || i == 6)
            {
                arrayOfPoints[2*j] = tempArrayOfPoints[2*i];
                arrayOfPoints[2*j+1] = tempArrayOfPoints[2*i+1];
                j++;
            }
        }
        
        
    }
    
    return arrayOfPoints;
}

function rectanglePointGenerationForSegmentation(seg,isBig)
{
    var height;
    
    if(isBig)
        height = 80;
    else
        height = 40;
    
    var standardStartX = startGridX + (gridWidth - height * 1.8) / 2;
    var standardEndX = standardStartX + height * 1.8;
    
    var standardStartY = startGridY + (gridHeight - height) / 2;
    var standardEndY = standardStartY + height;
    
    
    var arrayOfPoints = new Array();
    
    if(seg == "up")
    {
        arrayOfPoints[0] = standardStartX;
        arrayOfPoints[1] = standardStartY + height / 10;
        arrayOfPoints[2] = standardStartX;
        arrayOfPoints[3] = standardEndY;
        arrayOfPoints[4] = standardEndX;
        arrayOfPoints[5] = standardEndY;
        arrayOfPoints[6] = standardEndX;
        arrayOfPoints[7] = standardStartY + height / 10;
    }
    else if(seg == "down")
    {
        arrayOfPoints[0] = standardStartX;
        arrayOfPoints[1] = standardEndY - height / 10;
        arrayOfPoints[2] = standardStartX;
        arrayOfPoints[3] = standardStartY;
        arrayOfPoints[4] = standardEndX;
        arrayOfPoints[5] = standardStartY;
        arrayOfPoints[6] = standardEndX;
        arrayOfPoints[7] = standardEndY - height / 10;
    }
    else if(seg == "left")
    {
        arrayOfPoints[0] = standardStartX + height / 5;
        arrayOfPoints[1] = standardStartY;
        arrayOfPoints[2] = standardEndX;
        arrayOfPoints[3] = standardStartY;
        arrayOfPoints[4] = standardEndX;
        arrayOfPoints[5] = standardEndY;
        arrayOfPoints[6] = standardStartX + height / 5;
        arrayOfPoints[7] = standardEndY;
    }
    else if(seg == "right")
    {
        arrayOfPoints[0] = standardEndX - height / 5;
        arrayOfPoints[1] = standardStartY;
        arrayOfPoints[2] = standardStartX;
        arrayOfPoints[3] = standardStartY;
        arrayOfPoints[4] = standardStartX;
        arrayOfPoints[5] = standardEndY;
        arrayOfPoints[6] = standardEndX - height / 5;
        arrayOfPoints[7] = standardEndY;
    }
    
    return arrayOfPoints;
}

function squarePointGenerationForSegmentation(seg, isBig)
{
    var side;
    
    if(isBig)
        side = 125;
    else
        side = 30;
    
    var standardStartX = (gridWidth - side) / 2 + startGridX;
    var standardEndX = standardStartX + side;
    
    var standardStartY = (gridHeight - side) / 2 + startGridY;
    var standardEndY = standardStartY + side;
    
    
    var arrayOfPoints = new Array();
    
    if(seg == "up")
    {
        arrayOfPoints[0] = standardStartX;
        arrayOfPoints[1] = standardStartY + side / 10;
        arrayOfPoints[2] = standardStartX;
        arrayOfPoints[3] = standardEndY;
        arrayOfPoints[4] = standardEndX;
        arrayOfPoints[5] = standardEndY;
        arrayOfPoints[6] = standardEndX;
        arrayOfPoints[7] = standardStartY + side / 10;
    }
    else if(seg == "down")
    {
        arrayOfPoints[0] = standardStartX;
        arrayOfPoints[1] = standardEndY - side / 10;
        arrayOfPoints[2] = standardStartX;
        arrayOfPoints[3] = standardStartY;
        arrayOfPoints[4] = standardEndX;
        arrayOfPoints[5] = standardStartY;
        arrayOfPoints[6] = standardEndX;
        arrayOfPoints[7] = standardEndY - side / 10;
    }
    else if(seg == "left")
    {
        arrayOfPoints[0] = standardStartX + side / 10;
        arrayOfPoints[1] = standardStartY;
        arrayOfPoints[2] = standardEndX;
        arrayOfPoints[3] = standardStartY;
        arrayOfPoints[4] = standardEndX;
        arrayOfPoints[5] = standardEndY;
        arrayOfPoints[6] = standardStartX + side / 10;
        arrayOfPoints[7] = standardEndY;
    }
    else if(seg == "right")
    {
        arrayOfPoints[0] = standardEndX - side / 10;
        arrayOfPoints[1] = standardStartY;
        arrayOfPoints[2] = standardStartX;
        arrayOfPoints[3] = standardStartY;
        arrayOfPoints[4] = standardStartX;
        arrayOfPoints[5] = standardEndY;
        arrayOfPoints[6] = standardEndX - side / 10;
        arrayOfPoints[7] = standardEndY;
    }
    
    return arrayOfPoints;
}

function equilateralTrianglePointGenerationForSegmentation(seg,isBig)
{
    var side;
    
    if(isBig)
        side = 125;
    else
        side = 30;
    
    var standardLeftX = startGridX + (gridWidth - side) / 2;
    var standardTopY = startGridY + (gridHeight - side * Math.sqrt(3) / 2) / 2;
    var standardBottomY = standardTopY + side * Math.sqrt(3) / 2;
    var standardMiddleX = centerPointX;
    var standardRightX = standardLeftX + side;
    
    
    var arrayOfPoints = new Array();
    
    if(seg == "up")
    {
        arrayOfPoints[0] = standardMiddleX - side/8;
        arrayOfPoints[1] = standardTopY + side/8 * Math.sqrt(3);
        arrayOfPoints[2] = standardLeftX;
        arrayOfPoints[3] = standardBottomY;
        arrayOfPoints[4] = standardRightX;
        arrayOfPoints[5] = standardBottomY;
        arrayOfPoints[6] = standardMiddleX + side/8;
        arrayOfPoints[7] = standardTopY + side/8 * Math.sqrt(3);
    }
    else if(seg == "down")
    {
        arrayOfPoints[0] = standardLeftX + side/8 / Math.sqrt(3);
        arrayOfPoints[1] = standardBottomY - side/8;
        arrayOfPoints[2] = standardMiddleX;
        arrayOfPoints[3] = standardTopY;
        arrayOfPoints[4] = standardRightX - side/8 / Math.sqrt(3);
        arrayOfPoints[5] = standardBottomY - side/8;
    }
    else if(seg == "left")
    {
        arrayOfPoints[0] = standardLeftX + side/8;
        arrayOfPoints[1] = standardBottomY;
        arrayOfPoints[2] = standardRightX;
        arrayOfPoints[3] = standardBottomY;
        arrayOfPoints[4] = standardMiddleX;
        arrayOfPoints[5] = standardTopY;
        arrayOfPoints[6] = standardLeftX + side/8;
        arrayOfPoints[7] = standardBottomY - side/8 * Math.sqrt(3);
    }
    else if(seg == "right")
    {
        arrayOfPoints[0] = standardRightX - side/8;
        arrayOfPoints[1] = standardBottomY;
        arrayOfPoints[2] = standardLeftX;
        arrayOfPoints[3] = standardBottomY;
        arrayOfPoints[4] = standardMiddleX;
        arrayOfPoints[5] = standardTopY;
        arrayOfPoints[6] = standardRightX - side/8;
        arrayOfPoints[7] = standardBottomY - side/8 * Math.sqrt(3);
    }
    
    return arrayOfPoints;
}


function trapzoidPointGenerationForSegmentation(seg)
{
    var standardLeftTopX = startGridX + 82.5;
    var standardRightTopX = startGridX + 167.5;
    var standardLeftBottomX = startGridX + 40;
    var standardRightBottomX = startGridX + 210;
    
    var standardTopY = startGridY + 75.69392033916137;
    var standardBottomY = startGridY + 149.30607966083863;
    
    var arrayOfPoints = new Array();
    
    if(seg == "up")
    {
        arrayOfPoints[0] = standardLeftTopX - 15 / Math.sqrt(3);
        arrayOfPoints[1] = standardTopY + 15;
        arrayOfPoints[2] = standardLeftBottomX;
        arrayOfPoints[3] = standardBottomY;
        arrayOfPoints[4] = standardRightBottomX;
        arrayOfPoints[5] = standardBottomY;
        arrayOfPoints[6] = standardRightTopX + 15 / Math.sqrt(3);
        arrayOfPoints[7] = standardTopY + 15;
    }
    else if(seg == "down")
    {
        arrayOfPoints[0] = standardLeftBottomX + 15 / Math.sqrt(3);
        arrayOfPoints[1] = standardBottomY - 15;
        arrayOfPoints[2] = standardLeftTopX;
        arrayOfPoints[3] = standardTopY;
        arrayOfPoints[4] = standardRightTopX
        arrayOfPoints[5] = standardTopY;
        arrayOfPoints[6] = standardRightBottomX - 15 / Math.sqrt(3);
        arrayOfPoints[7] = standardBottomY - 15;
    }
    else if(seg == "left")
    {
        arrayOfPoints[0] = standardLeftBottomX + 15;
        arrayOfPoints[1] = standardBottomY - 15 * Math.sqrt(3);
        arrayOfPoints[2] = standardLeftTopX;
        arrayOfPoints[3] = standardTopY;
        arrayOfPoints[4] = standardRightTopX;
        arrayOfPoints[5] = standardTopY;
        arrayOfPoints[6] = standardRightBottomX;
        arrayOfPoints[7] = standardBottomY;
        arrayOfPoints[8] = standardLeftBottomX + 15;
        arrayOfPoints[9] = standardBottomY;
    }
    else if(seg == "right")
    {
        arrayOfPoints[0] = standardRightBottomX - 15;
        arrayOfPoints[1] = standardBottomY - 15 * Math.sqrt(3);
        arrayOfPoints[2] = standardRightTopX;
        arrayOfPoints[3] = standardTopY;
        arrayOfPoints[4] = standardLeftTopX;
        arrayOfPoints[5] = standardTopY;
        arrayOfPoints[6] = standardLeftBottomX;
        arrayOfPoints[7] = standardBottomY;
        arrayOfPoints[8] = standardRightBottomX - 15;
        arrayOfPoints[9] = standardBottomY;
    }
    
    return arrayOfPoints;
}


function haxgonPointGenerationForSegmentation(seg)
{
    //    240,106.8782217350893 310,106.8782217350893 345,167.5 310,228.1217782649107 240,228.1217782649107 205,167.5
    
    var standardInnerLeftX = startGridX + 90;
    var standardInnerRightX = startGridX + 160;
    var standardOutterLeftX = startGridX + 55;
    var standardOutterRightX = startGridX + 195;
    
    var standardTopY = startGridY + 51.8782217350893;
    var standardMiddleY = centerPointY;
    var standardBottomY =  startGridY + 173.1217782649107
    
    var arrayOfPoints = new Array();
    
    if(seg == "up")
    {
        arrayOfPoints[0] = standardInnerLeftX - (standardInnerLeftX - standardOutterLeftX) / 3;
        arrayOfPoints[1] = (standardMiddleY - standardTopY) / 3 + standardTopY;
        arrayOfPoints[2] = standardOutterLeftX;
        arrayOfPoints[3] = standardMiddleY;
        arrayOfPoints[4] = standardInnerLeftX;
        arrayOfPoints[5] = standardBottomY;
        arrayOfPoints[6] = standardInnerRightX;
        arrayOfPoints[7] = standardBottomY;
        arrayOfPoints[8] = standardOutterRightX;
        arrayOfPoints[9] = standardMiddleY;
        arrayOfPoints[10] = standardInnerRightX + (standardInnerLeftX - standardOutterLeftX) / 3;
        arrayOfPoints[11] = (standardMiddleY - standardTopY) / 3 + standardTopY;
    }
    else if(seg == "down")
    {
        arrayOfPoints[0] = standardInnerLeftX - (standardInnerLeftX - standardOutterLeftX) / 3;
        arrayOfPoints[1] = standardBottomY - (standardMiddleY - standardTopY) / 3;
        arrayOfPoints[2] = standardOutterLeftX;
        arrayOfPoints[3] = standardMiddleY;
        arrayOfPoints[4] = standardInnerLeftX;
        arrayOfPoints[5] = standardTopY;
        arrayOfPoints[6] = standardInnerRightX;
        arrayOfPoints[7] = standardTopY;
        arrayOfPoints[8] = standardOutterRightX;
        arrayOfPoints[9] = standardMiddleY;
        arrayOfPoints[10] = standardInnerRightX + (standardInnerLeftX - standardOutterLeftX) / 3;
        arrayOfPoints[11] = standardBottomY - (standardMiddleY - standardTopY) / 3;
    }
    else if(seg == "left")
    {
        arrayOfPoints[0] = standardOutterLeftX + (standardInnerLeftX - standardOutterLeftX) / 3;
        arrayOfPoints[1] = standardMiddleY - (standardBottomY - standardMiddleY) / 3 ;
        arrayOfPoints[2] = standardInnerLeftX;
        arrayOfPoints[3] = standardTopY;
        arrayOfPoints[4] = standardInnerRightX;
        arrayOfPoints[5] = standardTopY;
        arrayOfPoints[6] = standardOutterRightX;
        arrayOfPoints[7] = standardMiddleY;
        arrayOfPoints[8] = standardInnerRightX;
        arrayOfPoints[9] = standardBottomY;
        arrayOfPoints[10] = standardInnerLeftX;
        arrayOfPoints[11] = standardBottomY;
        arrayOfPoints[12] = standardOutterLeftX + (standardInnerLeftX - standardOutterLeftX) / 3;
        arrayOfPoints[13] = (standardBottomY - standardMiddleY) / 3 + standardMiddleY;
    }
    else if(seg == "right")
    {
        arrayOfPoints[0] = standardOutterRightX - (standardInnerLeftX - standardOutterLeftX) / 3;
        arrayOfPoints[1] = standardMiddleY - (standardBottomY - standardMiddleY) / 3;
        arrayOfPoints[2] = standardInnerRightX;
        arrayOfPoints[3] = standardTopY;
        arrayOfPoints[4] = standardInnerLeftX;
        arrayOfPoints[5] = standardTopY;
        arrayOfPoints[6] = standardOutterLeftX;
        arrayOfPoints[7] = standardMiddleY;
        arrayOfPoints[8] = standardInnerLeftX;
        arrayOfPoints[9] = standardBottomY;
        arrayOfPoints[10] = standardInnerRightX;
        arrayOfPoints[11] = standardBottomY;
        arrayOfPoints[12] = standardOutterRightX - (standardInnerLeftX - standardOutterLeftX) / 3;
        arrayOfPoints[13] = standardMiddleY + (standardBottomY - standardMiddleY) / 3;
    }
    
    return arrayOfPoints;
}


function pentagonPointGenerationForSegmentation(seg)
{
    var arrayOfPoints = new Array();
    
    if(seg == "up")
    {
        arrayOfPoints[0] = 288.86;
        arrayOfPoints[1] = 110;
        
        arrayOfPoints[2] = 336;
        arrayOfPoints[3] = 147;
        
        var tempArrayOfPoints = new Array();
        tempArrayOfPoints[0] = 336;
        tempArrayOfPoints[1] = 147;
        
        for(var i = 0;i < 3;i++)
        {
            pointProcessForOrientation(72,tempArrayOfPoints)
            arrayOfPoints[2*(i+2)] = tempArrayOfPoints[0];
            arrayOfPoints[2*(i+2)+1] = tempArrayOfPoints[1];
        }
        
        arrayOfPoints[10] = 262.46;
        arrayOfPoints[11] = 110;
    }
    else if(seg == "down")
    {
        arrayOfPoints[0] = 233.76;
        arrayOfPoints[1] = 212;
        
        arrayOfPoints[2] = 213;
        arrayOfPoints[3] = 147;
        
        var tempArrayOfPoints = new Array();
        tempArrayOfPoints[0] = 213;
        tempArrayOfPoints[1] = 147;
        
        for(var i = 0;i < 2;i++)
        {
            pointProcessForOrientation(72,tempArrayOfPoints)
            arrayOfPoints[2*(i+2)] = tempArrayOfPoints[0];
            arrayOfPoints[2*(i+2)+1] = tempArrayOfPoints[1];
        }
        
        arrayOfPoints[8] = 315.52;
        arrayOfPoints[9] = 212;
    }
    else if(seg == "left")
    {
        arrayOfPoints[0] = 218;
        arrayOfPoints[1] = 142.46;
        
        arrayOfPoints[2] = 275;
        arrayOfPoints[3] = 102;
        
        var tempArrayOfPoints = new Array();
        tempArrayOfPoints[0] = 275;
        tempArrayOfPoints[1] = 102;
        
        for(var i = 0;i < 3;i++)
        {
            pointProcessForOrientation(72,tempArrayOfPoints)
            arrayOfPoints[2*(i+2)] = tempArrayOfPoints[0];
            arrayOfPoints[2*(i+2)+1] = tempArrayOfPoints[1];
        }
        
        arrayOfPoints[10] = 218;
        arrayOfPoints[11] = 162.02;
    }
    else if(seg == "right")
    {
        arrayOfPoints[0] = 331;
        arrayOfPoints[1] = 162.02;
        
        arrayOfPoints[2] = 313;
        arrayOfPoints[3] = 220;
        
        var tempArrayOfPoints = new Array();
        tempArrayOfPoints[0] = 313;
        tempArrayOfPoints[1] = 220;
        
        for(var i = 0;i < 3;i++)
        {
            pointProcessForOrientation(72,tempArrayOfPoints)
            arrayOfPoints[2*(i+2)] = tempArrayOfPoints[0];
            arrayOfPoints[2*(i+2)+1] = tempArrayOfPoints[1];
        }
        
        arrayOfPoints[10] = 331;
        arrayOfPoints[11] = 142.46;
        
    }
    
    return arrayOfPoints;
}
