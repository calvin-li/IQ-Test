//
//  Polygon.swift
//  IQ test
//
//  Created by Calvin Li on 1/24/16.
//  Copyright © 2016 UCD SE Lab. All rights reserved.
//

import SVGKit
import Foundation

class Polygon: Shape {
    var points: [CGPoint] = []
    init() {
        super.init(baseShape: "polygon")
    }
    
    func reDraw(){
        var pointString = ""
        center = CGPointMake(0, 0)
        for point in points{
            pointString += String(format: "%d,%d ", Int(point.x), Int(point.y))
            
            center.x += point.x
            center.y += point.y
            
        }
        center.x /= CGFloat(points.count)
        center.y /= CGFloat(points.count)
        
        
        svg.setAttributeNS(Shape.namespace, qualifiedName: "points", value: pointString)
        
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
    
    override func generateShape(shape: String) {
        var numberOfVertices = 0
        var newPoints: [CGPoint] = []
        var offset = -M_PI_2
        
        switch shape{
        case "line":
            numberOfVertices = 2
        case "triangle":
            numberOfVertices = 3
        case "square":
            numberOfVertices = 4
            offset = M_PI_4
        case "trapezoid":
            numberOfVertices = 4
        case "pentagon":
            numberOfVertices = 5
        case "haxgon": //typo of hexagon
            numberOfVertices = 6
            
        default:
            fatalError("Shape not recognized")
        }
        
        if(shape == "trapezoid"){
            newPoints = [
                CGPointMake(-0.5, -0.5),
                CGPointMake(-1, 0.5),
                CGPointMake(1, 0.5),
                CGPointMake(0.5, -0.5)
            ]
        } else {
            for i in 1...numberOfVertices{
                let angle = 2 * CGFloat(i) * CGFloat(M_PI) / CGFloat(numberOfVertices) + CGFloat(offset)
                let newX = cos(angle) * 1
                let newY = sin(angle) * 1
                let newPoint = CGPointMake(newX, newY)
                newPoints.append(newPoint)
            }
        }
        points = newPoints
        reDraw()
    }
    
    override func rotate(radians angle: CGFloat){
        //move centroid to origin, rotate, move back
        var matrix = CGAffineTransformMakeTranslation(-center.x, -center.y)
        matrix = CGAffineTransformConcat(matrix, CGAffineTransformMakeRotation(angle))
        matrix = CGAffineTransformConcat(matrix, CGAffineTransformMakeTranslation(center.x, center.y))
        
        applyTransform(matrix)
    }
    
    override func applyTransform(matrix: CGAffineTransform) {
        for i in 0..<points.count {
            points[i] = CGPointApplyAffineTransform(points[i], matrix)
        }
        super.applyTransform(matrix)
    }
    
    override func rotate(degrees angle: CGFloat){
        let pi = CGFloat(M_PI)
        rotate(radians: angle * pi / 180)
    }
    
    override func intersect(line: Polygon) -> [CGPoint]{
        var iPoints: [CGPoint] = []
        
        for i in 0..<points.count{
            let iLine = Line(startPoint: points[i], endPoint: points[(i+1) % points.count])
            if let iPoint = iLine.intersect(line){
                //the line segments intersect
                if !(iPoints.count == 1 && iPoint == iPoints[0]){
                    iPoints = iPoints + [iPoint]
                }
            }
        }
        return iPoints
    }
}





















