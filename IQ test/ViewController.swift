//
//  ViewController.swift
//  IQ test
//
//  Created by Calvin Li on 11/10/15.
//  Copyright © 2015 UCD SE Lab. All rights reserved.
//

import UIKit

class ViewController: UIViewController, UICollectionViewDelegateFlowLayout, UICollectionViewDataSource {

    private var questionView: UICollectionView!, choicesView: UICollectionView!
    private var questionReuseIdentifier = "Question", choiceReuseIdentifier = "Choice"
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
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
        var cell: UICollectionViewCell
        var label = UILabel()
        if(collectionView == questionView){
            label = UILabel(frame: CGRect(origin: CGPoint(x: 0,y: 0), size: getChoiceCellSize()) )
            cell = collectionView.dequeueReusableCellWithReuseIdentifier(questionReuseIdentifier, forIndexPath: indexPath)
            cell.backgroundColor = UIColor.orangeColor()
            label.textColor = UIColor.blackColor()
            
        } else if(collectionView == choicesView) {
            label = UILabel(frame: CGRect(origin: CGPoint(x: 0,y: 0), size: getChoiceCellSize()) )
            cell = collectionView.dequeueReusableCellWithReuseIdentifier(choiceReuseIdentifier, forIndexPath: indexPath)
            cell.backgroundColor = UIColor.blueColor()
            label.textColor = UIColor.whiteColor()
        } else {
            return UICollectionViewCell()
        }
        
        label.text = String(indexPath.item)
        cell.contentView.addSubview(label)
        
        return cell
    }
}
