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
        CGPathAddLines(mPath, nil, points, points.count)
        if(closed){
            CGPathCloseSubpath(mPath)
        }
        
        layer.path = mPath
    }
    
    override func generateShape(shape: String) {
        var newPoints: [CGPoint] = []
        var waveScale = CGFloat(0.5)
        
        switch shape{
        case "trapzoid": //typo of trapezoid
            newPoints = [
                CGPointMake(-0.5, -0.5),
                CGPointMake(-1, 0.5),
                CGPointMake(1, 0.5),
                CGPointMake(0.5, -0.5)
            ]
            waveScale = 0.8
            closed = true
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
        case "darrow":
            newPoints = [
                CGPointMake(-3, 0),
                CGPointMake(-3, 1),
                CGPointMake(-8, 0),
                CGPointMake(-3, -1),
                CGPointMake(-3, 0),
                CGPointMake(3, 0),
                CGPointMake(3, -1),
                CGPointMake(8, 0),
                CGPointMake(3, 1),
                CGPointMake(3, 0),
            ]
        case "strcros":
            fallthrough
        case "rotcros":
         newPoints = [
            CGPointMake(-1, 0),
            CGPointMake(1, 0),
            CGPointMake(0, 0),
            CGPointMake(0, -1),
            CGPointMake(0, 1),
            ]
        default:
            newPoints = generateRegularNgon(shape)
            waveScale = 1.0
        }
        
        if(!closed){ opacity = 0 }
        points = newPoints
        scale(waveScale)
        switch(shape){
        case "hightriangle":
            scale(1, yFactor: 1.5)
        case "fattriangle":
            scale(1.5, yFactor: 1)
        case "rectangle":
            scale(1, yFactor: 0.667)
        case "rerectangle":
            scale(0.667, yFactor: 1)
        case "rotcros":
            rotate(degrees: 45)
        case "star":
            for i in 0..<points.count{
                if (i%2 == 0){
                    points[i] = points[i] * 0.5
                } else{
                    points[i] = points[i] * 0.25
                }
            }
        default:
            break
        }
        reDraw()
    }
    
    func generateRegularNgon(shape: String) -> [CGPoint]{
        var numberOfVertices = 0
        var offset = -CGFloat(M_PI_2)
        closed = true
        
        switch shape{
        case "nothing":
            numberOfVertices = 0
        case "line":
            numberOfVertices = 2
            closed = false
        case "hightriangle":
            fallthrough
        case "fattriangle":
            fallthrough
        case "triangle":
            numberOfVertices = 3
        case "rectangle":
            fallthrough
        case "rerectangle":
            fallthrough
        case "square":
            numberOfVertices = 4
            offset -= CGFloat(M_PI_4)
        case "star":
            numberOfVertices = 10
        case "pentagon":
            numberOfVertices = 5
        case "haxgon": //typo of hexagon
            numberOfVertices = 6
            offset -= CGFloat(M_PI/6)
        default:
            fatalError("Shape not recognized")
        }
        //TODO: Check answers
        // count tries
        // time user
        // reveal answer button
        
        var newPoints: [CGPoint] = []
        var sideScale:CGFloat = 1
        //sideScale should make sidelength 1
        if(numberOfVertices >= 3){
            let iAngle = M_PI*(Double(numberOfVertices-2))/Double(numberOfVertices)
            sideScale = 0.5/cos(CGFloat(iAngle)/2)
        }
        size = sideScale
        
        for i in 0..<numberOfVertices{
            let angle = 2 * CGFloat(i) * CGFloat(M_PI) / CGFloat(numberOfVertices) + offset
            let newX = cos(angle) * sideScale
            let newY = sin(angle) * sideScale
            let newPoint = CGPointMake(newX, newY)
            newPoints.append(newPoint)
        }
        
        return newPoints
    }

    override func applyTransform(matrix: CGAffineTransform) {
        for i in 0..<points.count {
            points[i] = CGPointApplyAffineTransform(points[i], matrix)
        }
        super.applyTransform(matrix)
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





















