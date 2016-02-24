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
    }
    
    func addShape(parameterString: String){
        let noWSParameters = parameterString.componentsSeparatedByCharactersInSet(NSCharacterSet.whitespaceAndNewlineCharacterSet())
        let parameters = noWSParameters.joinWithSeparator("").componentsSeparatedByString("@")
        
        let shape = parameters[0]
        var scale = CGFloat(Double(parameters[1])!)
        let orientation = CGFloat(Double(parameters[2])!)
        let positionX = CGFloat(Double(parameters[3])!)
        let positionY = CGFloat(Double(parameters[4])!)
        let number = parameters[5]
        let strokeColor = parameters[6]
        let fillColor = parameters[7]
        let opacity = parameters[8]
        let dashArray = parameters[9]
        let shadeDirection = parameters[10]
        var layers = parameters[11].componentsSeparatedByString("&")
        let shadeDensity = parameters[13]
        
        layers[0] = shape
        scale = scale * CGFloat(size.height) / 100 / 2
        //change scale based on cell height/2
        if(cvCell.reuseIdentifier == GlobalConstants.choiceReuseIdentifier){
            scale *= 1.25
        }
        let center = CGPointMake(size.width/2, size.height/2)
        
        for _ in 1...Int(number)!{
            for layer in layers{
                if (layer != "NA"){
                    var newShape: Shape
                    
                    if(layer == "circle"){
                        newShape = Circle()
                    }else if(layer == "ellipse"){
                        newShape = Ellipse()
                    } else if(layer == "curve"){
                        newShape = Curve()
                    } else{
                        newShape = Polygon()
                    }
                    
                    newShape.strokeColor = strokeColor
                    newShape.fillColor = fillColor
                    newShape.opacity = 1 - Double(opacity)!
                    newShape.dashArray = dashArray
                    newShape.generateShape(layer)
                    
                    //make sure to set stroke, fillColor, etc BEFORE points
                    newShape.scale(scale)
                    newShape.translate(center)
                    newShape.translate(positionX, tY: positionY)
                    newShape.rotate(degrees: orientation)
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
    
    func renderShape(){
        for shape in shapes{
            let shapeImageView = SVGKLayeredImageView(SVGKImage: shape.image)
            cvCell.contentView.addSubview(shapeImageView)
        }
    }
    
    func shadeShape(angle: Double) -> [Shape]{
        return []
    }
}
