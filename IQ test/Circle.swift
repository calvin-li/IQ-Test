//
//  Circle.swift
//  IQ test
//
//  Created by Calvin Li on 1/24/16.
//  Copyright © 2016 UCD SE Lab. All rights reserved.
//

import SVGKit
import Foundation

class Circle: Shape {
    init() {
        super.init(baseShape: "circle")
    }
    
    override func generateShape(shape: String) {
        translate(-2.9, tY: -2.8) //make anchor point at origin
        center = CGPointMake(0, 0)
    }
    
    override func shade(angle: CGFloat) -> [Shape] {
        let lines = super.shade(0)
        for line in lines{
            line.center = center
            line.rotate(degrees: angle)
        }
        return lines
    }
    
    override func intersect(verticalLine: Polygon) -> [CGPoint] {
        var iPoints: [CGPoint] = []
        let vX = verticalLine.points[0].x
        if(center.x - size < vX && center.x + size > vX){
            let delta = sqrt(pow(size, 2) - pow(center.x - vX, 2))
            
            iPoints.append(CGPointMake(vX, center.y+delta))
            iPoints.append(CGPointMake(vX, center.y-delta))
        }
        return iPoints
    }

}

class Ellipse: Circle {
    var angle:Double = 0
    
    override func generateShape(shape: String) {
        super.generateShape(shape)
        scale(1, yFactor: 0.5)//ellpises are squashed circles
    }
    
    override func shade(angle: CGFloat) -> [Shape] {
        
        self.angle = Double(angle)
        let lines = super.shade(0)
        for line in lines{
            line.translate(center)
        }
        
        return lines
    }
    
    override func intersect(verticalLine: Polygon) -> [CGPoint] {
        var iPoints: [CGPoint] = []
        let x = Double(verticalLine.points[0].x - center.x)
        let rx = sq(Double(size)), ry = rx/4
        let a = ry * sq(sin(angle)) + rx * sq(cos(angle))
        let b = 2 * x * cos(angle) * sin(angle) * (rx - ry)
        let c = sq(x) * (ry * sq(cos(angle)) + rx * sq(sin(angle))) - rx * ry
        
        if let iYs = qsolve(a, b: b, c: c){
            iPoints = [
                CGPoint(x: x, y: iYs.0),
                CGPoint(x: x, y: iYs.1)
            ]
        }
        
        return iPoints
    }
    
    func sq(x: Double) -> Double{
        return pow(x, 2)
    }
    
    func qsolve(a:Double, b:Double, c:Double) -> (Double,Double)?{
        let d = sq(b) - 4*a*c
        
        if(d <= 0){
            return nil
        }
        
        return ((-b + sqrt(d)) / (2*a), (-b - sqrt(d)) / (2*a))
    }
}






























