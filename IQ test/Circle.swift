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
    var radius: CGFloat = 1
    
    init() {
        super.init(baseShape: "circle")
    }
    
    override func generateShape(shape: String) {
        translate(-1, tY: -1) //make anchor point at origin
        center = CGPointMake(0, 0)
    }

}
