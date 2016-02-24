//
//  GlobalConstants.swift
//  IQ test
//
//  Created by Calvin Li on 11/23/15.
//  Copyright © 2015 UCD SE Lab. All rights reserved.
//

import Foundation
import CoreGraphics
import UIKit

struct GlobalConstants {
    static let patternSize = 9
    static let numberOfChoices = 8
    static let numShortSide = ceil(sqrt( CGFloat(GlobalConstants.numberOfChoices)/2 ))
    static let collectionViewMargins = UIEdgeInsets(top: 40, left: 10, bottom: 10, right: 10)
    static let questionMargins = UIEdgeInsets(top: 2, left: 2, bottom: 2, right: 2)
    static let questionReuseIdentifier = "Question", choiceReuseIdentifier = "Choice"
}

func getScreenSize() -> CGSize {
    var screenSize = UIScreen.mainScreen().bounds.size
    screenSize.width -= GlobalConstants.collectionViewMargins.left + GlobalConstants.collectionViewMargins.right
    screenSize.height -= GlobalConstants.collectionViewMargins.top + GlobalConstants.collectionViewMargins.bottom
    return screenSize
}

func getQuestionCellSize() -> CGSize {
    let numPerSide = ceil(sqrt(CGFloat(GlobalConstants.patternSize)))
    
    let screenSize = getScreenSize()
    var width = floor(screenSize.width / numPerSide)
    width -= GlobalConstants.questionMargins.left + GlobalConstants.questionMargins.right
    let height = width
    
    return CGSize(width: width, height: height)
}

func getChoiceCellSize() -> CGSize {
    let screenSize = getScreenSize()
    var width = floor(screenSize.width / (CGFloat(GlobalConstants.numberOfChoices) / GlobalConstants.numShortSide) )
    width -= GlobalConstants.questionMargins.left + GlobalConstants.questionMargins.right
    let height = width
    
    return CGSize(width: width, height: height)
}