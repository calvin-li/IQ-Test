//
//  Cell.swift
//  IQ test
//
//  Created by Calvin Li on 1/3/16.
//  Copyright © 2016 UCD SE Lab. All rights reserved.
//

import SVGKit

class Cell: NSObject {
    var shapes: [Shape] = []
    var svg: SVGElement = SVGElement()
    
    init(parameters: String) {
        let properties = parameters.characters.split("@")
        
    }
}
