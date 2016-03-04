function intersectionBetweenTwoLines(firStartx, firEndx, firStarty, firEndy, secStartx, secEndx, secStarty, secEndy)
{
    var firstLine = generateLineFromPoints(firStartx, firStarty, firEndx, firEndy);
    var secLine = generateLineFromPoints(secStartx, secStarty, secEndx, secEndy);
    
    return computeIntersectionPoint(firstLine[0],firstLine[1], secLine[0], secLine[1]);
}


function intersectionBetweenOneLineAndOneSlopeInterception(k, b, startx, endx, starty, endy)
{
    var firLine = generateLineFromPoints(startx, starty, endx, endy);
    
    return computeIntersectionPoint(firLine[0],firLine[1], k, b);
}


function generateLineFromPoints(startx, starty, endx, endy)
{
    var k = (endy - starty) / (endx - startx);
    var b;
    if(k == Number.POSITIVE_INFINITY || k == Number.NEGATIVE_INFINITY)
        b = endx;
    else
        b = starty - k * startx;
    
    var arrays = new Array();
    
    arrays.push(k);
    arrays.push(b);
    
    return arrays;
}


function generateLineFromPointAndSlope(k, x, y)
{
    if(k == Number.POSITIVE_INFINITY || k == Number.NEGATIVE_INFINITY)
        b = x;
    else if (k == 0)
        b = y;
    else
        b = y - k * x;
    
    var arrays = new Array();
    
    arrays.push(k);
    arrays.push(b);
    
    return arrays;
}


function computeIntersectionPoint(firK, firB, secK, secB)
{
	var arr = new Array();
	if(firK == Number.POSITIVE_INFINITY || firK == Number.NEGATIVE_INFINITY)
	{
		arr[0] = firB;
		arr[1] = arr[0] * secK + secB;
	}
	else if(firK == 0)
	{
		if(secK == Number.POSITIVE_INFINITY || secK == Number.NEGATIVE_INFINITY)
		{
			arr[0] = secB;
			arr[1] = firB;
		}
		else
		{
			arr[1] = firB;
			arr[0] = (arr[1] - secB) / secK;
		}
	}
	else
	{
		if(secK == Number.POSITIVE_INFINITY || secK == Number.NEGATIVE_INFINITY)
		{
			arr[0] = secB;
			arr[1] = secB * firK + firB;
		}
		else if(secK == 0)
		{
			arr[1] = secB;
			arr[0] = (arr[1] - firB) / firK;
		}
		else
		{
			arr[0] = (secB - firB) / (firK - secK);
			arr[1] = firK * arr[0] + firB;
		}
	}
	
	return arr;
}