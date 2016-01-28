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
        translate(-2.9425, tY: -2.9425) //make anchor point at origin
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
