// format of layer should be the number of layer, followed by other two shapes starting from least to greatest
// such as 1&circle&square (current shape is the first and then circle second and square last(use NA to represent none only for last layer))
// if it's "NA" do no need to set layer attribute
function setUpLayer(shape, arrayOfObjects, scale, elements, layer)
{
    if(shape != "triangle" && shape != "rectangle" && shape != "square" && shape != "trapzoid" && shape != "pentagon" && shape != "haxgon" && shape != "star" && shape != "circle" && shape != "ellipse")
        return;
    
    if(layer == "NA")
        return;
    
    var arrayOfPoints = arrayOfObjects[0];
    
    var paras = layer.split("&");
    
    if(parseInt(paras[0]) == 1)
    {
        // current element is currently at layer 1
        if(shape == "triangle" || shape == "rectangle" || shape == "square" || shape == "trapzoid" || shape == "pentagon" || shape == "haxgon" || shape == "star")
        {
            // if the current shape is one of those we could only add the circle at layer 2 so do not need to check what it is
            var circleParameters = new Array();
            addOutterCircleToShape(shape, arrayOfPoints, scale, elements, circleParameters);
            
            // if layer 3 is not NA add the shape
            if(paras[2] != "NA")
                addOutterShapeToCircle(paras[2], circleParameters[0], circleParameters[1], circleParameters[2], elements);
        }
        else if(shape == "circle")
        {
            // if the current shape is circle we can only add to a second layer because we can not have duplicate circle placed at layer 1 and 3
            addOutterShapeToCircle(paras[1], arrayOfPoints[0], arrayOfPoints[1], scale / 2, elements);
        }
        else if(shape == "ellipse")
        {
            // if the current shape is ellipse we can only add a rectangle
            var recParameters = new Array();
            addOutterRectangleToEllipse(arrayOfPoints[0], arrayOfPoints[1], scale, elements, recParameters);
            
            // if the layer 3 is not nothing we can only add a circle
            if(paras[2] != "NA")
                addOutterCircleToShape("rectangle", recParameters, recParameters[2], elements, new Array());
        }
    }
    else if(parseInt(paras[0]) == 2)
    {
        // current element is currently at layer 2
        if(shape == "triangle" || shape == "square" || shape == "pentagon" || shape == "haxgon")
        {
            // if the current shape is one of those elements we can only add circle inside of those elements because we can not add circle at layer 3 (duplicate with circle at layer 1)
            addInnerCircleToShape(shape, arrayOfPoints, scale, elements, new Array());
        }
        else if(shape == "rectangle")
        {
            // can only add ellipse inside of a rectangle
            addInnerEllipseToRectangle(arrayOfPoints, scale, elements);
            
            // if layer 3 is not nothing it has to be a circle
            if(paras[2] != "NA")
                addOutterCircleToShape("rectangle", arrayOfPoints, scale, elements, new Array());
        }
        else if(shape == "circle")
        {
            // if current element is circle add other shapes inside and outside of it for layer 1 and 3
            addInnerShapesToCircle(paras[1], arrayOfPoints[0], arrayOfPoints[1], scale/2, elements, new Array());
            if(paras[2] != "NA")
                addOutterShapeToCircle(paras[2], arrayOfPoints[0], arrayOfPoints[1], scale/2, elements);
        }
    }
    else if(parseInt(paras[0]) == 3)
    {
        // current element is currently at layer 3
        if(shape == "circle")
        {
            // if current element is circle then add rectangle for layer 2 then ellipse for layer 1
            var recParameters = new Array();
            addInnerShapesToCircle("rectangle", arrayOfPoints[0], arrayOfPoints[1], scale/2, elements, recParameters);
            
            addInnerEllipseToRectangle(recParameters, recParameters[2], elements);
        }
        else
        {
            // else add circle at layer 2 and add other shapes at layer 1
            var circleParameters = new Array();
            addInnerCircleToShape(shape, arrayOfPoints, scale, elements, circleParameters);
            
            addInnerShapesToCircle(paras[1], circleParameters[0], circleParameters[1], circleParameters[2], elements, new Array());
        }
    }
}

// circle is the only outter shape that can be added into the other existing shapes
function addOutterCircleToShape(shape, arrayOfPoints, scale, elements, circleParameters)
{
    if(shape == "square")
    {
        var side = scale;
        var centerX = arrayOfPoints[0] + scale/2;
        var centerY = arrayOfPoints[1] + scale/2;
        
        var radius = scale / 2 * Math.sqrt(2);
        generateOutterCircle(centerX,centerY,radius,elements);
        
        circleParameters.push(centerX);
        circleParameters.push(centerY);
        circleParameters.push(radius);
    }
    else if(shape == "rectangle")
    {
        var centerX = arrayOfPoints[0] + scale * 0.9;
        var centerY = arrayOfPoints[1] + scale * 0.5;
        
        var radius = Math.sqrt(Math.pow((centerX - arrayOfPoints[0]),2) + Math.pow((centerY - arrayOfPoints[1]),2));
        generateOutterCircle(centerX,centerY,radius,elements);
        
        circleParameters.push(centerX);
        circleParameters.push(centerY);
        circleParameters.push(radius);
    }
    else if(shape == "trapzoid")
    {
        var leg = generateLineFromPoints(arrayOfPoints[0],arrayOfPoints[1],arrayOfPoints[6],arrayOfPoints[7]);
        var midOrthognolLeg = generateLineFromPointAndSlope(-1/leg[0], (arrayOfPoints[0] + arrayOfPoints[6])/2, (arrayOfPoints[1] + arrayOfPoints[7])/2);
        var center = intersectionBetweenOneLineAndOneSlopeInterception(midOrthognolLeg[0], midOrthognolLeg[1],
                                                                       (arrayOfPoints[0] + arrayOfPoints[2])/2, (arrayOfPoints[0] + arrayOfPoints[2])/2, arrayOfPoints[1], arrayOfPoints[7]);
        
        var radius = Math.sqrt(Math.pow((center[0] - arrayOfPoints[0]),2) + Math.pow((center[1] - arrayOfPoints[1]),2));
        
        generateOutterCircle(center[0],center[1],radius,elements);
        
        circleParameters.push(center[0]);
        circleParameters.push(center[1]);
        circleParameters.push(radius);
        
    }
    else if(shape == "triangle")
    {
        var increment = (arrayOfPoints[1] - arrayOfPoints[5]) / 3;
        var centerY = arrayOfPoints[1] - increment;
        var centerX = arrayOfPoints[4];
        
        var radius = Math.sqrt(Math.pow((centerX - arrayOfPoints[0]),2) + Math.pow((centerY - arrayOfPoints[1]),2));
        
        generateOutterCircle(centerX,centerY,radius,elements);
        
        circleParameters.push(centerX);
        circleParameters.push(centerY);
        circleParameters.push(radius);
    }
    else if(shape == "pentagon")
    {
        var leg = generateLineFromPoints(arrayOfPoints[0],arrayOfPoints[1],arrayOfPoints[2],arrayOfPoints[3]);
        var midOrthognolLeg = generateLineFromPointAndSlope(-1/leg[0], (arrayOfPoints[0] + arrayOfPoints[2])/2, (arrayOfPoints[1] + arrayOfPoints[3])/2);
        var center = intersectionBetweenOneLineAndOneSlopeInterception(midOrthognolLeg[0], midOrthognolLeg[1], arrayOfPoints[0], arrayOfPoints[0], arrayOfPoints[1], arrayOfPoints[7]);
        
        var radius = Math.sqrt(Math.pow((center[0] - arrayOfPoints[0]),2) + Math.pow((center[1] - arrayOfPoints[1]),2));
        
        generateOutterCircle(center[0],center[1],radius,elements);
        
        circleParameters.push(center[0]);
        circleParameters.push(center[1]);
        circleParameters.push(radius);
    }
    else if(shape == "haxgon")
    {
        var centerX = (arrayOfPoints[0] + arrayOfPoints[2]) / 2;
        var centerY = arrayOfPoints[5];
        
        var radius = Math.sqrt(Math.pow((centerX - arrayOfPoints[0]),2) + Math.pow((centerY - arrayOfPoints[1]),2));
        
        generateOutterCircle(centerX,centerY,radius,elements);
        
        circleParameters.push(centerX);
        circleParameters.push(centerY);
        circleParameters.push(radius);
    }
    else if(shape == "star")
    {
        var leg = generateLineFromPoints(arrayOfPoints[0],arrayOfPoints[1],arrayOfPoints[4],arrayOfPoints[5]);
        var midOrthognolLeg = generateLineFromPointAndSlope(-1/leg[0], (arrayOfPoints[0] + arrayOfPoints[4])/2, (arrayOfPoints[1] + arrayOfPoints[5])/2);
        var center = intersectionBetweenOneLineAndOneSlopeInterception(midOrthognolLeg[0], midOrthognolLeg[1], arrayOfPoints[0], arrayOfPoints[0], arrayOfPoints[1], arrayOfPoints[11]);
        var radius = Math.sqrt(Math.pow((center[0] - arrayOfPoints[0]),2) + Math.pow((center[1] - arrayOfPoints[1]),2));
        
        generateOutterCircle(center[0],center[1],radius,elements);
        
        circleParameters.push(center[0]);
        circleParameters.push(center[1]);
        circleParameters.push(radius);
    }
}

function addOutterShapeToCircle(shape, centerX, centerY, radius, elements)
{
    if(shape == "square")
    {
        var topLeftPointX = centerX - radius;
        var topLeftPointY = centerY - radius;
        
        var width = 2 * radius;
        var height = width;
        
        generateOutterRegularQuadrilateral(topLeftPointX, topLeftPointY, width, height, elements);
    }
    else if(shape == "triangle")
    {
        var topX = centerX;
        var topY = centerY - 2*radius;
        
        var rightX = centerX + radius * Math.sqrt(3);
        var rightY = centerY + radius;
        
        var leftX = centerX - radius * Math.sqrt(3);
        var leftY = centerY + radius;
        
        var arrayOfPoints = new Array();
        arrayOfPoints.push(topX);arrayOfPoints.push(topY);arrayOfPoints.push(rightX);arrayOfPoints.push(rightY);arrayOfPoints.push(leftX);arrayOfPoints.push(leftY);
        
        generateOutterPolygon(arrayOfPoints, elements);
    }
    else if(shape == "pentagon")
    {
        var side = radius * 2 * Math.tan(36 / 180 * Math.PI);
        
        var bottomLeftPointX = centerX - side / 2;
        var bottomLeftPointY = centerY + radius;
        
        var arrayOfPoints = new Array();
        arrayOfPoints[0] = bottomLeftPointX;
        arrayOfPoints[1] = bottomLeftPointY;
        
        var tempArrayOfPoints = new Array();
        tempArrayOfPoints[0] = bottomLeftPointX;
        tempArrayOfPoints[1] = bottomLeftPointY;
        
        
        for(var i = 0;i < 4;i++)
        {
            pointProcessForOrientation(72,tempArrayOfPoints,centerX-centerPointX,centerY-centerPointY);
            arrayOfPoints[2*(i+1)] = tempArrayOfPoints[0];
            arrayOfPoints[2*(i+1)+1] = tempArrayOfPoints[1];
        }
        
        generateOutterPolygon(arrayOfPoints, elements);
    }
    else if(shape == "haxgon")
    {
        var topLeftPointX = centerX - radius / Math.sqrt(3);
        var topLeftPointY = centerY - radius;
        var topRightPointX = centerX + radius / Math.sqrt(3);
        var topRightPointY = centerY - radius;
        var rightX = radius / Math.sqrt(3) * 2 + centerX;
        var rightY = centerY;
        var bottomRightPointX = topRightPointX;
        var bottomRightPointY = centerY + radius;
        var bottomLeftPointX = topLeftPointX;
        var bottomLeftPointY = centerY + radius;
        var leftX = centerX - radius / Math.sqrt(3) * 2;
        var leftY = centerY;
        
        var arrayOfPoints = new Array();
        arrayOfPoints.push(topLeftPointX);arrayOfPoints.push(topLeftPointY);arrayOfPoints.push(topRightPointX);arrayOfPoints.push(topRightPointY);
        arrayOfPoints.push(rightX);arrayOfPoints.push(rightY);arrayOfPoints.push(bottomRightPointX);arrayOfPoints.push(bottomRightPointY);
        arrayOfPoints.push(bottomLeftPointX);arrayOfPoints.push(bottomLeftPointY);arrayOfPoints.push(leftX);arrayOfPoints.push(leftY);
        
        generateOutterPolygon(arrayOfPoints, elements);
    }
}

function addOutterRectangleToEllipse(centerX, centerY, verticalRadius, elements, recParameters)
{
    var leftAboveCornerPointX = centerX - verticalRadius * 1.8;
    var leftAboveCornerPointY = centerY - verticalRadius;
    
    generateOutterRegularQuadrilateral(leftAboveCornerPointX, leftAboveCornerPointY, verticalRadius * 3.6, verticalRadius * 2, elements);
    
    recParameters.push(leftAboveCornerPointX);
    recParameters.push(leftAboveCornerPointY);
    recParameters.push(verticalRadius * 2);
}

// circle is the only inner shape that can be added into the other existing shapes except rectangle
function addInnerCircleToShape(shape, arrayOfPoints, scale, elements, circleParameters)
{
    if(shape == "square")
    {
        var side = scale;
        var centerX = arrayOfPoints[0] + scale/2;
        var centerY = arrayOfPoints[1] + scale/2;
        
        var radius = scale / 2;
        generateInnerCircle(centerX,centerY,radius,elements);
        
        circleParameters.push(centerX);
        circleParameters.push(centerY);
        circleParameters.push(radius);
    }
    else if(shape == "triangle")
    {
        var increment = (arrayOfPoints[1] - arrayOfPoints[5]) / 3;
        var centerY = arrayOfPoints[1] - increment;
        var centerX = arrayOfPoints[4];
        
        var radius = increment;
        
        generateInnerCircle(centerX,centerY,radius,elements);
        
        circleParameters.push(centerX);
        circleParameters.push(centerY);
        circleParameters.push(radius);
    }
    else if(shape == "pentagon")
    {
        var leg = generateLineFromPoints(arrayOfPoints[0],arrayOfPoints[1],arrayOfPoints[2],arrayOfPoints[3]);
        var midOrthognolLeg = generateLineFromPointAndSlope(-1/leg[0], (arrayOfPoints[0] + arrayOfPoints[2])/2, (arrayOfPoints[1] + arrayOfPoints[3])/2);
        var center = intersectionBetweenOneLineAndOneSlopeInterception(midOrthognolLeg[0], midOrthognolLeg[1], arrayOfPoints[0], arrayOfPoints[0], arrayOfPoints[1], arrayOfPoints[7]);
        
        var radius = Math.sqrt(Math.pow((center[0] - arrayOfPoints[0]),2) + Math.pow((center[1] - arrayOfPoints[1]),2)) * Math.sin(54 / 180 * Math.PI);
        
        generateInnerCircle(center[0],center[1],radius,elements);
        
        circleParameters.push(center[0]);
        circleParameters.push(center[1]);
        circleParameters.push(radius);
    }
    else if(shape == "haxgon")
    {
        var centerX = (arrayOfPoints[0] + arrayOfPoints[2]) / 2;
        var centerY = arrayOfPoints[5];
        
        var radius = Math.sqrt(Math.pow((centerX - arrayOfPoints[0]),2) + Math.pow((centerY - arrayOfPoints[1]),2)) * Math.sin(60 / 180 * Math.PI);
        
        generateInnerCircle(centerX,centerY,radius,elements);
        
        circleParameters.push(centerX);
        circleParameters.push(centerY);
        circleParameters.push(radius);
    }
}

function addInnerEllipseToRectangle(arrayOfPoints, height, elements)
{
    var leftAboveCornerPointX = arrayOfPoints[0];
    var leftAboveCornerPointY = arrayOfPoints[1];
    
    var width = height * 1.8;
    
    generateInnerEllipse(leftAboveCornerPointX + width / 2, leftAboveCornerPointY + height / 2, height, elements);
}

function addInnerShapesToCircle(shape, centerX, centerY, radius, elements, recParameters)
{
    if(shape == "triangle")
    {
        var topX = centerX;
        var topY = centerY - radius;
        var leftX = centerX - Math.sqrt(3) * radius / 2;
        var leftY = centerY + radius / 2;
        var rightX = centerX + Math.sqrt(3) * radius / 2;
        var rightY = centerY + radius / 2;
        
        var arrayOfPoints = new Array();
        arrayOfPoints.push(topX);
        arrayOfPoints.push(topY);
        arrayOfPoints.push(leftX);
        arrayOfPoints.push(leftY);
        arrayOfPoints.push(rightX);
        arrayOfPoints.push(rightY);
        
        generateInnerPolygon(arrayOfPoints,elements);
    }
    else if(shape == "pentagon" || shape == "star")
    {
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
            pointProcessForOrientation(72,tempArrayOfPoints,0,0);
            arrayOfPoints[2*(i+1)] = tempArrayOfPoints[0];
            arrayOfPoints[2*(i+1)+1] = tempArrayOfPoints[1];
        }
        
        var displacementX = centerX - centerPointX;
        var displacementY = centerY - centerPointY;
        for(var i = 0;i < arrayOfPoints.length;i++)
        {
            if(i % 2 == 0)
                arrayOfPoints[i] += displacementX;
            else
                arrayOfPoints[i] += displacementY;
        }
        
        
        if(shape == "star")
        {
            var arrayOfFramePoints = arrayOfPoints;
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
            
            arrayOfPoints = totalPoints;
        }
        
        generateInnerPolygon(arrayOfPoints,elements);
    }
    else if(shape == "haxgon")
    {
        var topLeftPointX = centerPointX - radius / 2;
        var topLeftPointY = centerPointY + radius / 2 * Math.sqrt(3);
        
        var arrayOfPoints = new Array();
        arrayOfPoints[0] = topLeftPointX;
        arrayOfPoints[1] = topLeftPointY;
        
        var tempArrayOfPoints = new Array();
        tempArrayOfPoints[0] = topLeftPointX;
        tempArrayOfPoints[1] = topLeftPointY;
        
        for(var i = 0;i < 5;i++)
        {
            pointProcessForOrientation(60,tempArrayOfPoints,0,0);
            arrayOfPoints[2*(i+1)] = tempArrayOfPoints[0];
            arrayOfPoints[2*(i+1)+1] = tempArrayOfPoints[1];
        }
        
        var displacementX = centerX - centerPointX;
        var displacementY = centerY - centerPointY;
        for(var i = 0;i < arrayOfPoints.length;i++)
        {
            if(i % 2 == 0)
                arrayOfPoints[i] += displacementX;
            else
                arrayOfPoints[i] += displacementY;
        }
        
        generateInnerPolygon(arrayOfPoints,elements);
    }
    else if(shape == "square")
    {
        var topLeftPointX = centerX - radius / Math.sqrt(2);
        var topLeftPointY = centerY - radius / Math.sqrt(2);
        
        generateInnerRegularQuadrilateral(topLeftPointX, topLeftPointY, radius * Math.sqrt(2), radius * Math.sqrt(2), elements);
    }
    else if(shape == "rectangle")
    {
        var topLeftPointY = -1 * Math.sqrt(Math.pow(radius,2) / 4.24) + centerY;
        var topLeftPointX = centerX - (centerY - topLeftPointY) * 1.8;
        
        generateInnerRegularQuadrilateral(topLeftPointX, topLeftPointY, 2 * (centerX - topLeftPointX), 2 * (centerY - topLeftPointY), elements);
        
        recParameters.push(topLeftPointX);
        recParameters.push(topLeftPointY);
        recParameters.push(2 * (centerY - topLeftPointY));
    }
}


function generateInnerEllipse(centerX, centerY, verticalDiameter, elements)
{
    var xmlns="http://www.w3.org/2000/svg";
    
    var rx = verticalDiameter * 0.9;
    var ry = verticalDiameter * 0.5;
    
    var element = document.createElementNS(xmlns,"ellipse");
    element.setAttributeNS(null,"cx",centerX);
    element.setAttributeNS(null,"cy",centerY);
    element.setAttributeNS(null,"rx",rx);
    element.setAttributeNS(null,"ry",ry);
    element.setAttributeNS(null,"stroke","black");
    element.setAttributeNS(null,"stroke-width","3");
    element.setAttributeNS(null,"fill","none");
    
    elements.push(element);
    
    return elements;
}

function generateInnerCircle(centerX, centerY, radius, elements)
{
    return generateCircleForLayer(centerX, centerY, radius, elements);
}

function generateOutterCircle(centerX, centerY, radius, elements)
{
    return generateCircleForLayer(centerX, centerY, radius, elements);
}

function generateCircleForLayer(centerX, centerY, radius, elements)
{
    var xmlns="http://www.w3.org/2000/svg";
    
    var element = document.createElementNS(xmlns,"circle");
    element.setAttributeNS(null,"cx",centerX);
    element.setAttributeNS(null,"cy",centerY);
    element.setAttributeNS(null,"r",radius);
    element.setAttributeNS(null,"stroke","black");
    element.setAttributeNS(null,"stroke-width","3");
    element.setAttributeNS(null,"fill","none");
    
    elements.push(element);

    return elements;
}

function generateOutterRegularQuadrilateral(topLeftX, topLeftY, width, height, elements)
{
    return generateRegularQuadrilateralForLayer(topLeftX, topLeftY, width, height, elements)
}

function generateInnerRegularQuadrilateral(topLeftX, topLeftY, width, height, elements)
{
    return generateRegularQuadrilateralForLayer(topLeftX, topLeftY, width, height, elements)
}

function generateRegularQuadrilateralForLayer(topLeftX, topLeftY, width, height, elements)
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

function generateOutterPolygon(arrayOfPoints, elements)
{
    generatePolygonForLayer(arrayOfPoints, elements);
}

function generateInnerPolygon(arrayOfPoints, elements)
{
    generatePolygonForLayer(arrayOfPoints, elements);
}

function generatePolygonForLayer(arrayOfPoints, elements)
{
    var pointStringVal="";
    for(var i = 0;i < arrayOfPoints.length;i++)
    {
        pointStringVal += arrayOfPoints[i];
        
        if(i % 2 == 0)
            pointStringVal += ",";
        else
            pointStringVal += " ";
    }
    
    var xmlns = "http://www.w3.org/2000/svg";
    var polygon = document.createElementNS(xmlns,"polygon");
    polygon.setAttributeNS(null,"points",pointStringVal);
    polygon.setAttributeNS(null,"stroke","black");
    polygon.setAttributeNS(null,"stroke-width","3");
    polygon.setAttributeNS(null,"fill","none");
    
    
    elements.push(polygon);
    
    return elements;
}



