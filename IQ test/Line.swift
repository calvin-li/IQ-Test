//
//  Line.swift
//  IQ test
//
//  Created by Calvin Li on 1/27/16.
//  Copyright © 2016 UCD SE Lab. All rights reserved.
//

import Foundation
import SVGKit

class Line: NSObject {
    var startPoint: CGPoint
    var endPoint: CGPoint
    
    init(startPoint: CGPoint, endPoint: CGPoint){
        self.startPoint = startPoint
        self.endPoint = endPoint
    }
    
    func intersect(otherLine: Polygon) -> CGPoint? /*may return nil*/ {
        if otherLine.points.count != 2 {return nil}
        
        let p: CGPoint = startPoint
        let q = otherLine.points[0]
        let r = endPoint - startPoint
        let s = otherLine.points[1] - q
        let t = roundDecimal((q - p) * s / (r * s))
        let u = roundDecimal((p - q) * r / (s * r))
        
        if(r * s != 0 &&
            0 <= t && t <= 1 &&
            0 <= u && u <= 1)
        {
            return p + t*r
        } else {
            return nil
        }
    }
    
}

func *(left: CGPoint, right: CGPoint) -> CGFloat{
    return left.x*right.y - left.y*right.x
}

func *(left: CGFloat, right: CGPoint) -> CGPoint{
    return CGPointMake(left*right.x, left*right.y)
}

func +(left: CGPoint, right: CGPoint) -> CGPoint{
    return CGPointMake(left.x+right.x, left.y+right.y)
}

func -(left: CGPoint, right: CGPoint) -> CGPoint{
    return left + -right
}

func *(left: CGPoint, right: CGFloat) -> CGPoint{
    return CGPointMake(left.x * right, left.y * right)
}

func ==(left: CGPoint, right: CGPoint) -> Bool{
    return roundDecimal(left.x) == roundDecimal(right.x) &&
        roundDecimal(left.y) == roundDecimal(right.y)
}

func roundDecimal(x: CGFloat) -> CGFloat{
    let p = CGFloat(pow(10.0, 3.0))
    return round(x*p)/p
}

prefix func -(right: CGPoint) -> CGPoint{
    return CGPointMake(-right.x, -right.y)
}






























