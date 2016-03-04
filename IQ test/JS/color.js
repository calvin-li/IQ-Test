function setUpColor(elements, color)
{
    for(var i = 0;i < elements.length;i++)
    {
        elements[i].setAttributeNS(null,"stroke",color);
        elements[i].setAttributeNS(null,"stroke-width","3");
        elements[i].setAttributeNS(null,"fill","none");
    }
}
