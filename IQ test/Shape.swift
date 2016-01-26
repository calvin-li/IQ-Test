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
    internal static var namespace = "http://www.w3.org/2000/svg"
    private static var count = 0
    
    var image: SVGKImage
    var svg: SVGElement
    var center: CGPoint = CGPointMake(0, 0)
    var strokeColor = "black" {
        didSet {
            svg.setAttributeNS(Shape.namespace, qualifiedName: "stroke", value: strokeColor)
        }
    }
    var fillColor = "white" {
        didSet{
            svg.setAttributeNS(Shape.namespace, qualifiedName: "fill", value: fillColor)
        }
    }
    var opacity = 1.0 {
        didSet {
            svg.setAttributeNS(Shape.namespace, qualifiedName: "fill-opacity", value: String(opacity))
        }
    }


    init(baseShape: String){
        Shape.count += 1
        
        let fM = NSFileManager.defaultManager()
        let bundlePath = NSBundle.mainBundle().resourcePath!
        let oldFile = bundlePath + "/" + baseShape + ".svg"
        let newFile = NSTemporaryDirectory() + "/temp" + String(Shape.count) + ".svg"
        
        try! fM.copyItemAtPath(oldFile, toPath: newFile)
        image = SVGKImage(contentsOfURL: NSURL.fileURLWithPath(newFile))

        let tag = baseShape
        let nodes:NodeList = image.DOMDocument.getElementsByTagName(tag)
        svg  = nodes.item(0) as! SVGElement
    }
    
    internal func generateShape(shape: String){
    }
    
    func getCurrentLayer() -> CAShapeLayer {
        return image.layerWithIdentifier("baseShape") as! CAShapeLayer
    }
    
    func translate(tX: CGFloat, tY: CGFloat){
        let matrix = CGAffineTransformMakeTranslation(tX, tY)
        applyTransform(matrix)
    }
    
    func translate(vector: CGPoint){
        translate(vector.x, tY: vector.y)
    }
    
    func scale(factor: CGFloat){
        scale(factor, yFactor: factor)
    }
    
    func scale(xFactor: CGFloat, yFactor: CGFloat){
        var matrix = CGAffineTransformMakeTranslation(-center.x, -center.y)
        matrix = CGAffineTransformConcat(matrix, CGAffineTransformMakeScale(xFactor, yFactor))
        matrix = CGAffineTransformConcat(matrix, CGAffineTransformMakeTranslation(center.x, center.y))
        applyTransform(matrix)
    }
    
    internal func rotate(radians angle: CGFloat){}
    
    internal func rotate(degrees angle: CGFloat){}
    
    func applyTransform(var matrix: CGAffineTransform){
        center = CGPointApplyAffineTransform(center, matrix)
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
