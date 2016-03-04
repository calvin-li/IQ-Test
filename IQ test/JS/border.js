function setUpBorder(elements, shape, style)
{
    if(shape == "ltriangle" || shape == "lcircle" || shape == "lsquare" || shape == "lpentagon" || shape == "lhaxgon")
        return;
    
    for(var i = 0;i < elements.length;i++)
    {
        if(style=="short")
            elements[i].setAttributeNS(null,"stroke-dasharray","5,5");
        else if(style == "mid")
            elements[i].setAttributeNS(null,"stroke-dasharray","7.5,7.5");
        else if(style == "long")
            elements[i].setAttributeNS(null,"stroke-dasharray","10,10");
    }
}
