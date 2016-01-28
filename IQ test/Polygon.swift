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
    var points: [CGPoint] = [] {
        didSet{
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
    }
    
    init() {
        super.init(baseShape: "polygon")
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
        case "pentagon":
            numberOfVertices = 5
        case "haxgon": //typo of hexagon
            numberOfVertices = 6
            
        default:
            fatalError("Shape not recognized")
        }
        for i in 1...numberOfVertices{
            let angle = 2 * CGFloat(i) * CGFloat(M_PI) / CGFloat(numberOfVertices) + CGFloat(offset)
            let newX = cos(angle) * 1
            let newY = sin(angle) * 1
            let newPoint = CGPointMake(newX, newY)
            newPoints.append(newPoint)
        }
        points = newPoints
    }
    
    override func rotate(radians angle: CGFloat){
        //move centroid to origin, rotate, move back
        var matrix = CGAffineTransformMakeTranslation(-center.x, -center.y)
        matrix = CGAffineTransformConcat(matrix, CGAffineTransformMakeRotation(angle/2))
        matrix = CGAffineTransformConcat(matrix, CGAffineTransformMakeTranslation(center.x, center.y))
        
        applyTransform(matrix)
    }
    
    override func applyTransform(matrix: CGAffineTransform) {
        let oldCenter = center
        for i in 0..<points.count {
            points[i] = CGPointApplyAffineTransform(points[i], matrix)
        }
        center = oldCenter //setting points[i] sets center too
        super.applyTransform(matrix)
    }
    
    override func rotate(degrees angle: CGFloat){
        let pi = CGFloat(M_PI)
        rotate(radians: angle * pi / 180)
    }
    
    override func shade(angle: CGFloat) -> [Shape] {
        let numLines = 10
        let startX = center.x - size
        var ans: [Shape] = []
        for i in 0..<numLines{
            let newLine = Polygon()
            let nextX = startX + CGFloat(i)/10*size
            var iPoints: [CGPoint] = [] //intersection Points
            
            newLine.strokeColor = "grey"
            newLine.opacity = 0.75
            newLine.generateShape("line")
            newLine.translate(nextX, tY: center.y)
            newLine.scale(size)
            newLine.center = center
            newLine.rotate(degrees: angle)
            
            for j in 0..<points.count{
                let iLine = Line(startPoint: points[j], endPoint: points[(j+1) % points.count])
                if let iPoint = iLine.intersect(newLine){
                    //the line segments intersect
                    if !(iPoints.count == 1 && iPoint == iPoints[0]){
                        iPoints = iPoints + [iPoint]
                    }
                }
            }
            if (iPoints.count == 2){
                newLine.points = iPoints
                ans.append(newLine)
            }
        }
        return ans
    }
}





















