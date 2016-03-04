var startGridX;
var endGridX;

var startGridY;
var endGridY;

var gridWidth;
var gridHeight;

var centerPointX;
var centerPointY;

var oneQuarterPointX;
var oneQuarterPointY;

var threeQuarterPointX;
var threeQuarterPointY;

// stores how the second small polygo should be moved according to the position of first
// stores "left" or "right" or "none" from cell 0 ~ 8
var arrayOfPositionInfo = new Array();


// index is from 1 - 9
// index is used to address the cells
function globalRelocation(index, arrayOfPoints)
{
    var horizontolShift = index % 3;
    var verticalShift = Math.floor(index / 3);
    
    arrayOfPoints = pointProcessForPosition(horizontolShift * gridWidth, verticalShift * gridHeight,arrayOfPoints);
    
    return arrayOfPoints;
}



function globalRelocationAnswer(index, arrayOfPoints)
{
    var horizontolShift = index % 2;
    var verticalShift = Math.floor(index / 2);
    
    arrayOfPoints = pointProcessForPosition(horizontolShift * gridWidth, verticalShift * gridHeight,arrayOfPoints);
    
    return arrayOfPoints;
}


function questionModeFlush()
{
    startGridX = 100;
    endGridX = 350;
    
    startGridY = 55;
    endGridY = 280;
    
    gridWidth = endGridX - startGridX;
    gridHeight = endGridY - startGridY;
    
    centerPointX = (startGridX + endGridX) / 2;
    centerPointY = (startGridY + endGridY) / 2;
    
    oneQuarterPointX = (startGridX + centerPointX) / 2;
    oneQuarterPointY = (startGridY + centerPointY) / 2;
    
    threeQuarterPointX = (centerPointX + endGridX) / 2;
    threeQuarterPointY = (centerPointY + endGridY) / 2;
}

function answerModeFlush()
{
    startGridX = 1021;
    endGridX = 1269;
    
    startGridY = 15;
    endGridY = 240;
    
    gridWidth = endGridX - startGridX;
    gridHeight = endGridY - startGridY;
    
    centerPointX = (startGridX + endGridX) / 2;
    centerPointY = (startGridY + endGridY) / 2;
    
    oneQuarterPointX = (startGridX + centerPointX) / 2;
    oneQuarterPointY = (startGridY + centerPointY) / 2;
    
    threeQuarterPointX = (centerPointX + endGridX) / 2;
    threeQuarterPointY = (centerPointY + endGridY) / 2;
}
