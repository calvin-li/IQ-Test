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
    var closed = false
    
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
        if(closed){
            CGPathAddLines(mPath, nil, points + [points[0], points[1]], points.count+2)
            //add the last two points to close out the shape and make it look smooth
        } else {
            CGPathAddLines(mPath, nil, points, points.count)
        }
        
        layer.path = mPath
    }
    
    override func generateShape(shape: String) {
        var newPoints: [CGPoint] = []
        var waveScale = CGFloat(1.0/10)
        
        switch shape{
        case "trapezoid":
            newPoints = [
                CGPointMake(-0.5, -0.5),
                CGPointMake(-1, 0.5),
                CGPointMake(1, 0.5),
                CGPointMake(0.5, -0.5)
            ]
        case "sql":
            newPoints = [
                CGPointMake(-8, 1),
                CGPointMake(-8, -1),
                CGPointMake(-4, -1),
                CGPointMake(-4, 1),
                CGPointMake(0, 1),
                CGPointMake(0, -1),
                CGPointMake(4, -1),
                CGPointMake(4, 1),
                CGPointMake(8, 1),
                CGPointMake(8, -1),
            ]
        case "wave":
            newPoints = [
                CGPointMake(-8, 1),
                CGPointMake(-6, -1),
                CGPointMake(-4, 1),
                CGPointMake(-2, -1),
                CGPointMake(0, 1),
                CGPointMake(2, -1),
                CGPointMake(4, 1),
                CGPointMake(6, -1),
                CGPointMake(8, 1),
            ]
        case "arrow":
            newPoints = [
                CGPointMake(-8, 0),
                CGPointMake(3, 0),
                CGPointMake(3, -1),
                CGPointMake(8, 0),
                CGPointMake(3, 1),
                CGPointMake(3, 0),
            ]
        default:
            waveScale = 1
            newPoints = generateRegularNgon(shape)
        }
        
        points = newPoints
        reDraw()
        scale(waveScale)
    }
    
    func generateRegularNgon(shape: String) -> [CGPoint]{
        var numberOfVertices = 0
        var offset = CGFloat(M_PI_2)
        closed = true
        
        switch shape{
        case "line":
            numberOfVertices = 2
            closed = false
        case "triangle":
            numberOfVertices = 3
        case "square":
            numberOfVertices = 4
            offset -= CGFloat(M_PI_4)
        case "trapezoid":
            numberOfVertices = 4
        case "pentagon":
            numberOfVertices = 5
        case "haxgon": //typo of hexagon
            numberOfVertices = 6
        default:
            fatalError("Shape not recognized")
        }
        
        var newPoints: [CGPoint] = []
        for i in 1...numberOfVertices{
            let angle = 2 * CGFloat(i) * CGFloat(M_PI) / CGFloat(numberOfVertices) + offset
            let newX = cos(angle) * 1
            let newY = sin(angle) * 1
            let newPoint = CGPointMake(newX, newY)
            newPoints.append(newPoint)
        }
        return newPoints
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
        
        if(closed) {
            for i in 0..<points.count{
                let iLine = Line(
                    startPoint: points[i], endPoint: points[(i+1) % points.count]
                )
                if let iPoint = iLine.intersect(line){
                    //the line segments intersect
                    var added = false
                    for previousPoint in iPoints{
                        added = added || previousPoint == iPoint
                    }
                    if !(added){
                        iPoints = iPoints + [iPoint]
                    }
                }
            }
        }
        
        return iPoints
    }
}





















