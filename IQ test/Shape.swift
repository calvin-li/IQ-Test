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
    private var namespace = "http://www.w3.org/2000/svg"
    
    var image: SVGKImage
    var polygon: SVGElement
    var strokeColor = "black"
    var fillColor = "white"
    var opacity = 1.0
    var points: [Point] = []
    
    convenience override init(){
        self.init(shape: "BaseShape.svg")
    }
    
    init(shape: String){
        image = SVGKImage(named: shape)
        
        let tag = "polygon"
        let nodes:NodeList = image.DOMDocument.getElementsByTagName(tag)
        polygon  = nodes.item(0) as! SVGElement
        //10,10 10,60 60,60 60,10
    }
    
    func setStrokeColor(color color: String) {
        strokeColor = color
        polygon.setAttributeNS(namespace, qualifiedName: "stroke", value: strokeColor)
    }
    
    func setFillColor(color color: String){
        fillColor = color
        polygon.setAttributeNS(namespace, qualifiedName: "fill", value: fillColor)
    }
    
    func setOpacity(opacity alpha: Double){
        opacity = alpha
        polygon.setAttributeNS(namespace, qualifiedName: "fill-opacity", value: String(opacity))
    }
    
    func setPoints(vertices vertices: [Point]){
        points = vertices
        var pointString = ""
        for point in points{
            pointString += String(format: "%d,%d ", Int(point.x), Int(point.y))
        }
        polygon.setAttributeNS(namespace, qualifiedName: "points", value: pointString)
    }
}

class Point: NSObject{
    var x: Double, y: Double
    
    init(x: Double, y: Double){
        self.x = x
        self.y = y
    }
}

class Line: NSObject {
    var startPoint: Point
    var endPoint: Point
    
    init(startPoint: Point, endPoint: Point){
        self.startPoint = startPoint
        self.endPoint = endPoint
    }
    
}
