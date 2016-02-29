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
        translate(-1.875, tY: -1.825) //make anchor point at origin
        center = CGPointZero
        scale(CGFloat(1.0/M_PI)) //make circumference 1
    }
    
    override func shade(angle: CGFloat, density: String) -> [Shape] {
        let lines = super.shade(0, density: density)
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
    var shadeAngle: Double = 0
    static let squish: CGFloat = CGFloat(2)/3
    
    override func generateShape(shape: String) {
        super.generateShape(shape)
        scale(1, yFactor: Ellipse.squish)//ellpises are squashed circles
        scale(CGFloat(4))
    }
    
    override func shade(angle: CGFloat, density: String) -> [Shape] {
        shadeAngle = Double(angle) * M_PI / 180
        let lines = super.shade(angle, density: density)
        return lines
    }
    
    override func intersect(verticalLine: Polygon) -> [CGPoint] {
        var iPoints: [CGPoint] = []
        let x = Double(verticalLine.points[0].x - center.x)
        let rx = sq(Double(size)), ry = rx * sqf(Ellipse.squish)
        let sinA = sin(shadeAngle), cosA = cos(shadeAngle)
        let a = ry * sq(sinA) + rx * sq(cosA)
        let b = 2 * x * cosA * sinA * (rx - ry)
        let c = sq(x) * (ry * sq(cosA) + rx * sq(sinA)) - rx * ry
        
        if let iYs = qsolve(a, b: b, c: c){
            iPoints = [
                center + CGPoint(x: x, y: iYs.0),
                center + CGPoint(x: x, y: iYs.1)
            ]
        }
        
        return iPoints
    }
    
    func sqf(x: CGFloat) -> Double{
        return sq(Double(x))
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

class Curve: Shape {
    init(){
        super.init(baseShape: "path")
    }
    
    override func generateShape(shape: String) {
        translate(-10, tY: -7)
        center = CGPointZero //adjust anchor to origin
        scale(1.0/10)
    }
}





























