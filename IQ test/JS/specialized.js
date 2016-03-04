function isSpecialzedShapes(shape)
{
	if(shape == "dot" || shape == "revellipse" || shape == "rerectangle" || shape == "fattriangle" || 
			shape == "hightriangle" || shape == "strcros" || shape == "rotcros" || shape == "nothing")
		return true;
	else
		return false;
}

function renderingSpecializedShapes(shape,index,isAns)
{
	if(shape == "strcros" || shape == "rotcros")
		return crossWholeRoutine(shape,index,isAns);
	
	var points = generatePoints(shape);
	if(isAns)
		points = globalRelocationAnswer(index, points);
	else
		points = globalRelocation(index, points);
	
	return renderShapes(shape, points);
}

function generatePoints(shape)
{
	var points;
	if(shape == "dot" || shape == "nothing")
		points = circlePointGenerationForScale();
	else if(shape == "revellipse")
		points = ellipsePointGenerationForScale();
	else if(shape == "rerectangle")
		points = rerectanglePointGenerationForScale(68);
	else if(shape == "fattriangle")
		points = fatTrianglePointGenerationForScale(120);
	else if(shape == "hightriangle")
		points = highTrianglePointGenerationForScale(120);
	
	return points;
}

function renderShapes(shape, points) 
{
	var elements;
	if(shape == "dot")
		elements = renderDot(points);
	else if(shape == "revellipse")
		elements = renderreEllipse(points, 38);
	else if(shape == "rerectangle")
		elements = renderreRectangle(points, 68);
	else if(shape == "fattriangle")
		elements = renderTriangle(points);
	else if(shape == "hightriangle")
		elements = renderTriangle(points);
	else if(shape == "nothing")
		elements = renderNothing(points);

	return elements;
}

function crossWholeRoutine(shape,index,isAns)
{
	var points1 = standardLinePointGenerationForScale(68);
	var points2 = standardLinePointGenerationForScale(68);
	
	if(shape == "strcros")
	{
		pointProcessForOrientationCross(0, points1);
		pointProcessForOrientationCross(90, points2);
	}
	else
	{
		pointProcessForOrientationCross(45, points1);
		pointProcessForOrientationCross(135, points2);			
	}
	
	if(isAns)
	{
		points1 = globalRelocationAnswer(index, points1);
		points2 = globalRelocationAnswer(index, points2);
	}
	else
	{
		points1 = globalRelocation(index, points1);
		points2 = globalRelocation(index, points2);
	}
	
	var arrayOfObjects = new Array();
	arrayOfObjects.push(points1);
	arrayOfObjects.push(points2);	
	
	var elements = standardLineRendering(arrayOfObjects);
	for(var i = 0;i < elements.length;i++)
	{
	    elements[i].setAttributeNS(null,"stroke","red");
	    elements[i].setAttributeNS(null,"stroke-width","3");		
	}
	return elements;
}

function renderDot(points)
{
    var xmlns="http://www.w3.org/2000/svg";
    
    var element = document.createElementNS(xmlns,"circle");
    element.setAttributeNS(null,"cx",points[0]);
    element.setAttributeNS(null,"cy",points[1]);
    element.setAttributeNS(null,"r",6);
    
    var elements = new Array();
    elements.push(element);
    
    return elements;
}

function renderreEllipse(points,scale)
{    
    var xmlns="http://www.w3.org/2000/svg";
    
    var rx = scale;
    var ry = scale * 1.8;
    
    var element = document.createElementNS(xmlns,"ellipse");
    element.setAttributeNS(null,"cx",points[0]);
    element.setAttributeNS(null,"cy",points[1]);
    element.setAttributeNS(null,"rx",rx);
    element.setAttributeNS(null,"ry",ry);
    element.setAttributeNS(null,"fill", "none");
    element.setAttributeNS(null,"stroke","red");
    element.setAttributeNS(null,"stroke-width","3");
    
    var elements = new Array();
    elements.push(element);
    
    return elements;
}

//scale is the height of rectangle
function renderreRectangle(points, scale)
{
    var xmlns="http://www.w3.org/2000/svg";
    
    var width = scale;
    var height = scale * 1.8;
    
    var element = document.createElementNS(xmlns,"rect");
    element.setAttributeNS(null,"x",points[0]);
    element.setAttributeNS(null,"y",points[1]);
    element.setAttributeNS(null,"width",width);
    element.setAttributeNS(null,"height",height);
    element.setAttributeNS(null,"fill", "none");
    element.setAttributeNS(null,"stroke","red");
    element.setAttributeNS(null,"stroke-width","3");
    
    elements = new Array();
    elements.push(element);
    
    return elements;
}

function renderTriangle(points)
{
    var pointStringVal="";
    for(var i = 0;i < points.length;i++)
    {
        pointStringVal += points[i];
        
        if(i % 2 == 0)
            pointStringVal += ",";
        else
            pointStringVal += " ";
    }
    
    var xmlns = "http://www.w3.org/2000/svg";
    var polygon = document.createElementNS(xmlns,"polygon");
    polygon.setAttributeNS(null,"points",pointStringVal);
    polygon.setAttributeNS(null,"fill", "none");
    polygon.setAttributeNS(null,"stroke","red");
    polygon.setAttributeNS(null,"stroke-width","3");
    
    var elements = new Array();
    elements.push(polygon);
    
    return elements;
}

function renderNothing(points)
{
    var xmlns="http://www.w3.org/2000/svg";
    
    var element = document.createElementNS(xmlns,"circle");
    element.setAttributeNS(null,"cx",points[0]);
    element.setAttributeNS(null,"cy",points[1]);
    element.setAttributeNS(null,"r",0.001);
    
    var elements = new Array();
    elements.push(element);
    
    return elements;
}

function pointProcessForOrientationCross(angle, arrayOfPoints)
{
    var rotationPointX = centerPointX;
    var rotationPointY = centerPointY;
    
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

