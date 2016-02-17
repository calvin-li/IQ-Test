//
//  ViewController.swift
//  IQ test
//
//  Created by Calvin Li on 11/10/15.
//  Copyright © 2015 UCD SE Lab. All rights reserved.
//

import UIKit
import SVGKit

class ViewController: UIViewController, UICollectionViewDelegateFlowLayout, UICollectionViewDataSource {

    private var questionView: UICollectionView!, choicesView: UICollectionView!
    private var questionReuseIdentifier = "Question", choiceReuseIdentifier = "Choice"
    private var sample = "curve@   77@ 0@  0@  0@  1@  red@    white@  1.0@    long@   none@   none@   none" //TODO: remove
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        //clear temp directory
        let temp = NSTemporaryDirectory()
        let fM = NSFileManager.defaultManager()
        for file in try! fM.contentsOfDirectoryAtPath(temp){
            try! fM.removeItemAtPath(temp + "/" + file)
        }
        
        let questionLayout: UICollectionViewFlowLayout = UICollectionViewFlowLayout()
        questionLayout.itemSize = getQuestionCellSize()
        questionLayout.sectionInset = GlobalConstants.collectionViewMargins
        questionLayout.minimumLineSpacing = GlobalConstants.questionMargins.top + GlobalConstants.questionMargins.bottom
        questionLayout.minimumInteritemSpacing = GlobalConstants.questionMargins.left + GlobalConstants.questionMargins.right
        
        let choiceLayout: UICollectionViewFlowLayout = UICollectionViewFlowLayout()
        choiceLayout.itemSize = getChoiceCellSize()
        var choicesViewEdgeInsets = GlobalConstants.collectionViewMargins
        //push choices to bottom of screen
        choicesViewEdgeInsets.top += getScreenSize().height - getChoiceCellSize().height*GlobalConstants.numShortSide
        choiceLayout.sectionInset = choicesViewEdgeInsets
        choiceLayout.minimumLineSpacing = GlobalConstants.questionMargins.top + GlobalConstants.questionMargins.bottom
        choiceLayout.minimumInteritemSpacing = GlobalConstants.questionMargins.left + GlobalConstants.questionMargins.right
        
        questionView = UICollectionView(frame: self.view.frame, collectionViewLayout: questionLayout)
        questionView.dataSource = self
        questionView.delegate = self
        questionView.backgroundColor = UIColor.blackColor().colorWithAlphaComponent(0.0)
        questionView.registerClass(UICollectionViewCell.self, forCellWithReuseIdentifier: questionReuseIdentifier)
        self.view.addSubview(questionView)
        
        choicesView = UICollectionView(frame: self.view.frame, collectionViewLayout: choiceLayout)
        choicesView.dataSource = self
        choicesView.delegate = self
        choicesView.backgroundColor = UIColor.blackColor().colorWithAlphaComponent(0.0)
        choicesView.registerClass(UICollectionViewCell.self, forCellWithReuseIdentifier: choiceReuseIdentifier)
        self.view.addSubview(choicesView)
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()

    }

    func numberOfSectionsInCollectionView(collectionView: UICollectionView) -> Int {
        // #warning Incomplete implementation, return the number of sections
        return 1
    }
    
    func collectionView(collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        if(collectionView == questionView) {
            return GlobalConstants.patternSize
        } else if(collectionView == choicesView) {
            return GlobalConstants.numberOfChoices
        } else {
            return 0
        }
    }
    
    func collectionView(collectionView: UICollectionView, cellForItemAtIndexPath indexPath: NSIndexPath) -> UICollectionViewCell {
        var cell: Cell
        var cvCell: UICollectionViewCell
        
        if(collectionView == questionView){
            cell = Cell(cvCell: collectionView.dequeueReusableCellWithReuseIdentifier(questionReuseIdentifier, forIndexPath: indexPath))
            cell.size = getQuestionCellSize()
            cvCell = cell.cvCell
            cvCell.backgroundColor = UIColor.yellowColor()
            cell.addShape(sample)
            cell.renderShape()
            
        } else if(collectionView == choicesView) {
            cell = Cell(cvCell: collectionView.dequeueReusableCellWithReuseIdentifier(choiceReuseIdentifier, forIndexPath: indexPath))
            cell.size = getChoiceCellSize()
            cvCell = cell.cvCell
            cvCell.backgroundColor = UIColor.whiteColor()
            cell.addShape(sample)
            cell.renderShape()
            
            //add button
            let button = UIButton(type: .System)
            button.frame = CGRect(origin: CGPoint(x: 0,y: 0), size: getChoiceCellSize())
            button.addTarget(self, action: "pressed:", forControlEvents: .TouchUpInside)
            button.addTarget(self, action: "highlight:", forControlEvents: .TouchDown)
            button.accessibilityIdentifier = String(indexPath.item)
            
            cvCell.contentView.addSubview(button)
            
        } else {
            return UICollectionViewCell()
        }
    
        return cvCell
    }
    
    func pressed(sender: UIButton!){
        unhighlight(sender)
        if sender.accessibilityIdentifier == "0"{
            print(sender.accessibilityIdentifier)
        }
    }
    
    func highlight(sender: UIButton!){
        sender.backgroundColor = UIColor.yellowColor().colorWithAlphaComponent(0.5)
    }
    
    func unhighlight(sender: UIButton!){
        //keep old color, but make it transparent
        sender.backgroundColor = sender.backgroundColor?.colorWithAlphaComponent(0.0)
    }
}






























