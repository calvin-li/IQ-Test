//
//  Cell.swift
//  IQ test
//
//  Created by Calvin Li on 1/3/16.
//  Copyright © 2016 UCD SE Lab. All rights reserved.
//

import SVGKit

class Cell: NSObject {
    var shapes: [Shape] = []
    var cvCell: UICollectionViewCell
    var size = CGSize(width: 100, height: 100)
    
    init(cvCell: UICollectionViewCell){
        self.cvCell = cvCell
        super.init()
        removeShapes()
    }
    
    func addShape(parameterString: String){
        let noWSParameters = parameterString.componentsSeparatedByCharactersInSet(NSCharacterSet.whitespaceAndNewlineCharacterSet())
        let parameters = noWSParameters.joinWithSeparator("").componentsSeparatedByString("@")
        
        var shape = parameters[0]
        var scale: CGFloat = 1
        if let i = Double(parameters[1]){
            scale = CGFloat(i)
        } else {
            switch(shape){
            case "dot":
                scale = 2
            case "revellipse":
                scale = 18
            default:
                scale = 100
            }
        }
        var orientation = CGFloat(Double(parameters[2])!)
        var positionX = CGFloat(Double(parameters[3])!)
        var positionY = CGFloat(Double(parameters[4])!)
        var number = Int(parameters[5])!
        let strokeColor = parameters[6]
        let fillColor = parameters[7]
        var opacity = parameters[8]
        let dashArray = parameters[9]
        var shadeDirection = parameters[10]
        var layers = parameters[11].componentsSeparatedByString("&")
        let shadeDensity = parameters[13]
        
        switch(shape){
        case "line":
            orientation += 90
            scale *= 0.5
        case "ltriangle":
            orientation += 180
        case "lhaxgon":
            orientation += 30
        case "circle":
            fallthrough
        case "lcircle":
            fallthrough
        case "ellipse":
            scale /= CGFloat(M_PI)
        default:
            break
        }
        
        //small shapes can't be rotated, large ones can't be multiplied
        if(shape.hasPrefix("l") && shape != "line"){
            shape.removeAtIndex(shape.startIndex)
            orientation = 0
            shadeDirection = "none"
        } else if(!["curve", "wave", "line", "sql", "arrow", "darrow"].contains(shape)){
            number = 1
        }
        
        if(fillColor == "white"){
            opacity = "0"
        }
        
        let cellScale = CGFloat(size.height) / 200
        scale *= cellScale
        positionX *= cellScale
        positionY *= cellScale
        
        //change scale based on cell height/2
        if(cvCell.reuseIdentifier == GlobalConstants.choiceReuseIdentifier){
            //scale *= 1.25
        }
        
        layers[0] = shape
        let center = CGPointMake(size.width/2, size.height/2)
        
        for i in 1...number{
            for layer in layers{
                if (layer != "NA"){
                    var newShape: Shape
                    
                    switch(layer){
                    case "circle":
                        newShape = Circle()
                    case "ellipse":
                        fallthrough
                    case "revellipse":
                        newShape = Ellipse()
                    case "curve":
                        newShape = Curve()
                    case "dot":
                        newShape = Circle()
                    default:
                        newShape = Polygon()
                    }
                    
                    newShape.strokeColor = strokeColor
                    newShape.fillColor = fillColor
                    newShape.opacity = Double(opacity)!
                    newShape.dashArray = dashArray
                    newShape.generateShape(layer)
                    
                    //make sure to set stroke, fillColor, etc BEFORE points
                    newShape.translate(subcenter(i, total: number, shape: shape) * scale)
                    newShape.scale(scale)
                    newShape.rotate(anchor: CGPointZero, degrees: orientation)
                    newShape.translate(center)
                    newShape.translate(CGPointMake(positionX, positionY) * 0.8)
                    //newShape = adjust(newShape)
                    
                    switch shadeDirection{
                    case "ver":
                        shapes += newShape.shade(0, density: shadeDensity)
                    case "pos":
                        shapes += newShape.shade(45, density: shadeDensity)
                    case "hor":
                        shapes += newShape.shade(90, density: shadeDensity)
                    case "neg":
                        shapes += newShape.shade(135, density: shadeDensity)
                    default: break
                    }
                    
                    shapes.append(newShape)

                }
            }
        }
    }
    
    func subcenter(number: Int, total: Int, shape: String) -> CGPoint {
        if(["line", "wave", "curve", "sql", "arrow", "darrow"].contains(shape)){
            var adjustment: CGFloat = 0.15
            if(["wave", "sql", "arrow", "darrow"].contains(shape)){
                adjustment *= 8
            }
            let newY: CGFloat =  -CGFloat(total-1)/2 + CGFloat(number-1)
            return CGPointMake(0, newY) * adjustment
        } else {
            let adjustment: CGFloat = 2.5
            let newX = CGFloat((number-1))%2
            let newY = CGFloat(-CGFloat(total-1)/2/2 + CGFloat((number-1)/2))
            return CGPointMake(newX, newY) * adjustment
        }
    }
    
    func adjust(newShape: Shape) -> Shape{
        if let poly = newShape as? Polygon{
            var maxY:CGFloat = poly.center.y
            var minY:CGFloat = poly.center.y
            var delta:CGFloat
            for point in poly.points{
                maxY = max(maxY, point.y)
                minY = min(minY, point.y)
            }
            delta = (maxY+minY)/2 - poly.center.y
            newShape.translate(0, tY: -delta)
        }
        return newShape
    }
    
    func shadeShape(angle: Double) -> [Shape]{
        return []
    }
    
    func renderShape(){
        for shape in shapes{
            let shapeImageView = SVGKLayeredImageView(SVGKImage: shape.image)
            shapeImageView.userInteractionEnabled = false
            cvCell.contentView.addSubview(shapeImageView)
        }
    }
    
    func removeShapes(){
        shapes = []
        for subview in cvCell.contentView.subviews{
            subview.removeFromSuperview()
        }
    }
    
}

















