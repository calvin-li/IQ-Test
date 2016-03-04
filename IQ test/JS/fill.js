function setUpFill(shape, elements, color, opacity)
{
    if(shape != "lsquare" && shape != "lcircle" && shape != "ltriangle" && shape != "lpentagon" && shape != "lhaxgon")
        return;
        
    for(var i = 0;i < elements.length;i++)
    {
//        elements[i].setAttributeNS(null,"stroke",color);
//        elements[i].setAttributeNS(null,"stroke-width","3");
        elements[i].setAttributeNS(null,"fill",color);
        elements[i].setAttributeNS(null,"fill-opacity", opacity);
        elements[i].setAttributeNS(null,"stroke-width","1.5");
        
    }
}
