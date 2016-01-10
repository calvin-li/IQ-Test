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
    var strokeColor = "black" {
        didSet {
            polygon.setAttributeNS(namespace, qualifiedName: "stroke", value: strokeColor)
        }
    }
    var fillColor = "white" {
        didSet{
            polygon.setAttributeNS(namespace, qualifiedName: "fill", value: fillColor)
        }
    }
    var opacity = 1.0 {
        didSet {
            polygon.setAttributeNS(namespace, qualifiedName: "fill-opacity", value: String(opacity))
        }
    }
    var points: [CGPoint] = [] {
        didSet{
            var pointString = ""
            for point in points{
                pointString += String(format: "%d,%d ", Int(point.x), Int(point.y))
            }
            polygon.setAttributeNS(namespace, qualifiedName: "points", value: pointString)
            
            let layer = getCurrentLayer()
            
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

    convenience override init(){
        self.init(shape: "BaseShape.svg")
    }
    
    init(shape: String){
        image = SVGKImage(named: shape)

        let tag = "polygon"
        let nodes:NodeList = image.DOMDocument.getElementsByTagName(tag)
        polygon  = nodes.item(0) as! SVGElement
    }
    
    func getCurrentLayer() -> CAShapeLayer {
        return image.layerWithIdentifier("baseShape") as! CAShapeLayer
    }
    
    func translate(tX: CGFloat, tY: CGFloat){
        let matrix = CGAffineTransformMakeTranslation(tX, tY)
        applyTransform(matrix)
    }
    
    func scale(factor: CGFloat){
        let matrix = CGAffineTransformMakeScale(factor, factor)
        applyTransform(matrix)
    }
    
    func scale(xFactor: CGFloat, yFactor: CGFloat){
        let matrix = CGAffineTransformMakeScale(xFactor, yFactor)
        applyTransform(matrix)
    }
    
    func rotate(radians angle: CGFloat){
        //find centroid to rotate around
        var centroid = CGPointMake(0, 0)
        for point in points{
            centroid.x += point.x
            centroid.y += point.y
        }
        centroid.x /= CGFloat(points.count)
        centroid.y /= CGFloat(points.count)
        
        //move centroid to origin, rotate, move back
        var matrix = CGAffineTransformMakeTranslation(-centroid.x, -centroid.y)
        matrix = CGAffineTransformConcat(matrix, CGAffineTransformMakeRotation(angle))
        matrix = CGAffineTransformConcat(matrix, CGAffineTransformMakeTranslation(centroid.x, centroid.y))
        
        applyTransform(matrix)
    }
    
    func rotate(degrees angle: CGFloat){
        let pi = CGFloat(M_PI)
        rotate(radians: angle * pi / 180)
    }
    
    func applyTransform(var matrix: CGAffineTransform){
        let layer = getCurrentLayer()
        let newPath = CGPathCreateCopyByTransformingPath(layer.path, &matrix)
        layer.path = newPath
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
