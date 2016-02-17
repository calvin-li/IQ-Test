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
    var size: CGFloat = 1
    var strokeWidth = 4 {
        didSet {
            svg.setAttributeNS(Shape.namespace, qualifiedName: "stroke-width", value: String(strokeWidth))
        }
    }
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
    
    internal func generateShape(shape: String){}
    
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
        size *= max(xFactor, yFactor)
    }
    
    internal func rotate(radians angle: CGFloat){}
    
    internal func rotate(degrees angle: CGFloat){}
    
    func applyTransform(var matrix: CGAffineTransform){
        center = CGPointApplyAffineTransform(center, matrix)
        let layer = getCurrentLayer()
        let newPath = CGPathCreateCopyByTransformingPath(layer.path, &matrix)
        layer.path = newPath
    }
    
    func shade(angle: CGFloat) -> [Shape] {
        let numLines = 10
        let startX = center.x - size
        var ans: [Shape] = []
        for i in 0..<numLines{
            let newLine = Polygon()
            let nextX = startX + CGFloat(i)/10 * size*2
            
            newLine.strokeColor = "grey"
            newLine.opacity = 0.5
            newLine.strokeWidth = strokeWidth/2
            newLine.generateShape("line")
            newLine.translate(nextX, tY: center.y)
            newLine.scale(size)
            newLine.center = center
            newLine.rotate(degrees: angle)
            
            let iPoints = intersect(newLine)

            if (iPoints.count == 2){
                newLine.points = iPoints
                newLine.reDraw()
                ans.append(newLine)
            }
        }
        return ans
    }
    
    func intersect(line: Polygon) -> [CGPoint]{ return [] }
}




















