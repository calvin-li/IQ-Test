//
//  Shape.swift
//  IQ test
//
//  Created by Calvin Li on 12/7/15.
//  Copyright © 2015 UCD SE Lab. All rights reserved.
//

import SVGKit
import Foundation



class Shape: NSObject {
    private var namespace = "http://www.w3.org/2000/svg"
    
    var image: SVGKImage
    var polygon: SVGElement
    var strokeColor = "black"
    var fillColor = "white"
    var opacity = 1.0
    var points: [CGPoint] = []

    convenience override init(){
        self.init(shape: "BaseShape.svg")
    }
    
    init(shape: String){
        image = SVGKImage(named: shape)

        let tag = "polygon"
        let nodes:NodeList = image.DOMDocument.getElementsByTagName(tag)
        polygon  = nodes.item(0) as! SVGElement
    }
    
    func setStrokeColor(color color: String) {
        strokeColor = color
        polygon.setAttributeNS(namespace, qualifiedName: "stroke", value: strokeColor)
    }
    
    func setFillColor(color color: String){
        fillColor = color
        polygon.setAttributeNS(namespace, qualifiedName: "fill", value: fillColor)
    }
    
    func setOpacity(opacity alpha: Double){
        opacity = alpha
        polygon.setAttributeNS(namespace, qualifiedName: "fill-opacity", value: String(opacity))
    }
    
    func setPoints(vertices vertices: [CGPoint]){
        points = vertices
        var pointString = ""
        for point in points{
            pointString += String(format: "%d,%d ", Int(point.x), Int(point.y))
        }
        polygon.setAttributeNS(namespace, qualifiedName: "points", value: pointString)
        
        let layer = image.layerWithIdentifier("baseShape") as! CAShapeLayer
        
        let mPath = CGPathCreateMutable()
        if(points.count >= 2){
            CGPathAddLines(mPath, nil, points + [points[0], points[1]], points.count+2)
            //add the last two points to close out the shape and make it look smooth
        } else {
            CGPathAddLines(mPath, nil, points, points.count)
        }
        
        layer.path = mPath
    }
    
    
}

class Line: NSObject {
    var startPoint: CGPoint
    var endPoint: CGPoint
    
    init(startPoint: CGPoint, endPoint: CGPoint){
        self.startPoint = startPoint
        self.endPoint = endPoint
    }
    
}
