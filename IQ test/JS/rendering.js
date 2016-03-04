function pointsRenderingToElements(shape, scale, arrayOfObjects)
{
    var elements;
    
    //according to shape parameter, render the elements
    if(shape == "line")
        elements = standardLineRendering(arrayOfObjects);
    else if(shape == "curve")
        elements = curveRendering(arrayOfObjects);
    else if(shape == "wave")
        elements = polyLineRendering(arrayOfObjects);
    else if(shape == "sql")
        elements = polyLineRendering(arrayOfObjects);
    else if(shape == "arrow")
        elements = polyLineRendering(arrayOfObjects);
    else if(shape == "triangle" || shape == "pentagon" || shape == "trapzoid" || shape == "haxgon" || shape == "star")
        elements = polygonRendering(arrayOfObjects);
    else if(shape == "rectangle")
        elements = rectangleRendering(arrayOfObjects,scale);
    else if(shape == "square" )
        elements = squareRendering(arrayOfObjects,scale);
    else if(shape == "circle")
        elements = circleRendering(arrayOfObjects,scale)
    else if(shape == "ellipse")
        elements = ellipseRendering(arrayOfObjects, scale);
    else if(shape == "lsquare")
        elements = littleSquareRendering(arrayOfObjects,scale);
    else if(shape == "lcircle")
        elements = littleCircleRendering(arrayOfObjects,scale);
    else if(shape == "ltriangle")
        elements = littlePolygonRendering(arrayOfObjects);
    else if(shape == "lpentagon" || shape == "lhaxgon")
        elements = littlePolygonRendering(arrayOfObjects);

    return elements;
}

function standardLineRendering(arrayOfObjects)
{
    var elements = new Array();
    
    for(var i = 0;i < arrayOfObjects.length;i++)
    {
        var arrayOfPoints = arrayOfObjects[i];
        var xmlns="http://www.w3.org/2000/svg";
        
        var element = document.createElementNS(xmlns,"line");
        element.setAttributeNS(null,"x1",arrayOfPoints[0]);
        element.setAttributeNS(null,"y1",arrayOfPoints[1]);
        element.setAttributeNS(null,"x2",arrayOfPoints[2]);
        element.setAttributeNS(null,"y2",arrayOfPoints[3]);
        
        elements.push(element);
    }
    
    return elements;
}

function curveRendering(arrayOfObjects)
{
    var elements = new Array();
    
    for(var i = 0;i < arrayOfObjects.length;i++)
    {
        var xmlns="http://www.w3.org/2000/svg";
        
        var element = document.createElementNS(xmlns,"path");
        
        var arrayOfPoints = arrayOfObjects[i];
        
        var pointStringVal="";
        pointStringVal += "M";
        pointStringVal += arrayOfPoints[0];
        pointStringVal += ",";
        pointStringVal += arrayOfPoints[1];
        pointStringVal += " ";
        pointStringVal += "Q";
        pointStringVal += arrayOfPoints[2];
        pointStringVal += ",";
        pointStringVal += arrayOfPoints[3];
        pointStringVal += " ";
        pointStringVal += arrayOfPoints[4];
        pointStringVal += ",";
        pointStringVal += arrayOfPoints[5];
        
        element.setAttributeNS(null,"d",pointStringVal);
        
        elements.push(element);
    }
    
    return elements;
}

function polyLineRendering(arrayOfObjects)
{
    var elements = new Array();
    
    for(var i = 0;i < arrayOfObjects.length;i++)
    {
        var arrayOfPoints = arrayOfObjects[i];
        var pointStringVal="";
        for(var j = 0;j < arrayOfPoints.length;j++)
        {
            pointStringVal += arrayOfPoints[j];
            
            if(j % 2 == 0)
                pointStringVal += ",";
            else
                pointStringVal += " ";
        }
        
        var xmlns = "http://www.w3.org/2000/svg";
        var pathLine = document.createElementNS(xmlns,"polyline");
        pathLine.setAttributeNS(null,"points",pointStringVal);
        
        elements.push(pathLine);
    }
    return elements;
}

function polygonRendering(arrayOfObjects)
{
    arrayOfPoints = arrayOfObjects[0];
    
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
    
    var elements = new Array();
    elements.push(polygon);
    
    return elements;
}

// scale is the height of rectangle
function rectangleRendering(arrayOfObjects, scale)
{
    arrayOfPoints = arrayOfObjects[0];
    
    var xmlns="http://www.w3.org/2000/svg";
    
    var width = scale * 1.8;
    var height = scale;
    
    var element = document.createElementNS(xmlns,"rect");
    element.setAttributeNS(null,"x",arrayOfPoints[0]);
    element.setAttributeNS(null,"y",arrayOfPoints[1]);
    element.setAttributeNS(null,"width",width);
    element.setAttributeNS(null,"height",height);
    
    elements = new Array();
    elements.push(element);
    
    return elements;
}

// scale is length of each side
function squareRendering(arrayOfObjects, scale)
{
    arrayOfPoints = arrayOfObjects[0];
    
    var xmlns="http://www.w3.org/2000/svg";
    
    var width = scale;
    var height = scale;
    
    var element = document.createElementNS(xmlns,"rect");
    element.setAttributeNS(null,"x",arrayOfPoints[0]);
    element.setAttributeNS(null,"y",arrayOfPoints[1]);
    element.setAttributeNS(null,"width",width);
    element.setAttributeNS(null,"height",height);
    
    var elements = new Array();
    elements.push(element);
    
    return elements;
}

// scale is the diameter
function circleRendering(arrayOfObjects, scale)
{
    arrayOfPoints = arrayOfObjects[0];
    
    var xmlns="http://www.w3.org/2000/svg";
    
    var element = document.createElementNS(xmlns,"circle");
    element.setAttributeNS(null,"cx",arrayOfPoints[0]);
    element.setAttributeNS(null,"cy",arrayOfPoints[1]);
    element.setAttributeNS(null,"r",scale/2);
    
    var elements = new Array();
    elements.push(element);
    
    return elements;
}

// scale is radius along y direction
function ellipseRendering(arrayOfObjects, scale)
{
    arrayOfPoints = arrayOfObjects[0];
    
    var xmlns="http://www.w3.org/2000/svg";
    
    var rx = scale * 1.8;
    var ry = scale;
    
    var element = document.createElementNS(xmlns,"ellipse");
    element.setAttributeNS(null,"cx",arrayOfPoints[0]);
    element.setAttributeNS(null,"cy",arrayOfPoints[1]);
    element.setAttributeNS(null,"rx",rx);
    element.setAttributeNS(null,"ry",ry);
    
    var elements = new Array();
    elements.push(element);
    
    return elements;
}

function littleSquareRendering(arrayOfObjects, scale)
{
    var elements = new Array();
    
    for(var i = 0;i < arrayOfObjects.length;i++)
    {
        var arrayOfPoints = arrayOfObjects[i];
        var xmlns="http://www.w3.org/2000/svg";
        
        var width = scale;
        var height = scale;
        
        var element = document.createElementNS(xmlns,"rect");
        element.setAttributeNS(null,"x",arrayOfPoints[0]);
        element.setAttributeNS(null,"y",arrayOfPoints[1]);
        element.setAttributeNS(null,"width",width);
        element.setAttributeNS(null,"height",height);
        
        elements.push(element);
    }
    
    return elements;
}

function littleCircleRendering(arrayOfObjects, scale)
{
    var elements = new Array();
    
    for(var i = 0;i < arrayOfObjects.length;i++)
    {
        var arrayOfPoints = arrayOfObjects[i];
        
        var xmlns="http://www.w3.org/2000/svg";
        
        var element = document.createElementNS(xmlns,"circle");
        element.setAttributeNS(null,"cx",arrayOfPoints[0]);
        element.setAttributeNS(null,"cy",arrayOfPoints[1]);
        element.setAttributeNS(null,"r",scale/2);
        
        elements.push(element);
    }
    
    return elements;
}

function littlePolygonRendering(arrayOfObjects)
{
    var elements = new Array();
    
    for(var i = 0;i < arrayOfObjects.length;i++)
    {
        var arrayOfPoints = arrayOfObjects[i];
        
        var pointStringVal="";
        for(var j = 0;j < arrayOfPoints.length;j++)
        {
            pointStringVal += arrayOfPoints[j];
            
            if(j % 2 == 0)
                pointStringVal += ",";
            else
                pointStringVal += " ";
        }
        
        var xmlns = "http://www.w3.org/2000/svg";
        var polygon = document.createElementNS(xmlns,"polygon");
        polygon.setAttributeNS(null,"points",pointStringVal);
        
        elements.push(polygon);
    }
    
    return elements;
}