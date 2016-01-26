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
        //pentagon@77@0@0@0@1@red@white@1.0@long@none@3&square&circle&NA@none //TODO: remove
        let parameters = parameterString.componentsSeparatedByString("@")
        let shape = parameters[0]
        var scale = CGFloat(Double(parameters[1])!)
        let orientation = CGFloat(Double(parameters[2])!)
        let positionX = CGFloat(Double(parameters[3])!)
        let positionY = CGFloat(Double(parameters[4])!)
        let number = parameters[5]
        let strokeColor = parameters[6]
        let fillColor = parameters[7]
        let opacity = parameters[8]
        var layers = parameters[11].componentsSeparatedByString("&")
        
        layers[0] = shape
        scale = scale * CGFloat(size.height) / 100 / 2
        //change scale based on cell height/2
        let center = CGPointMake(size.width/2, size.height/2)
        
        for _ in 1...Int(number)!{
            for layer in layers{
                if (layer != "NA"){
                    var newShape: Shape
                    
                    if(layer == "circle"){
                        newShape = Circle()
                    } else{
                        newShape = Polygon()
                    }
                    
                    newShape.strokeColor = strokeColor
                    newShape.fillColor = fillColor
                    newShape.opacity = 1 - Double(opacity)!
                    newShape.generateShape(layer)
                    //make sure to set stroke, fillColor, etc BEFORE points
                    newShape.scale(scale)
                    newShape.translate(center)
                    newShape.translate(positionX, tY: positionY)
                    newShape.rotate(degrees: orientation)

                    let shapeImageView = SVGKLayeredImageView(SVGKImage: newShape.image)
                    cvCell.contentView.addSubview(shapeImageView)
                    shapes.append(newShape)
                }
            }
        }
    }
}
