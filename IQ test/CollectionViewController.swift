//
//  CollectionViewController.swift
//  IQ test
//
//  Created by Calvin Li on 11/23/15.
//  Copyright © 2015 UCD SE Lab. All rights reserved.
//

import UIKit

private let reuseIdentifier = "Cell"

class CollectionViewController: UICollectionViewController, UICollectionViewDelegateFlowLayout {
    
    private var questionView: UICollectionView!, choicesView: UICollectionView!
    private var questionReuseIdentifier = "Question", choiceReuseIdentifier = "Choice"

    override func viewDidLoad() {
        super.viewDidLoad()

        let questionLayout: UICollectionViewFlowLayout = UICollectionViewFlowLayout()
        questionLayout.sectionInset = UIEdgeInsets(top: 20, left: 10, bottom: 10, right: 10)
        questionLayout.itemSize = CGSize(width: 90, height: 120)
        
        let choiceLayout = questionLayout
        
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
        
        // Uncomment the following line to preserve selection between presentations
        // self.clearsSelectionOnViewWillAppear = false

        // Register cell classes
        //self.collectionView!.registerClass(UICollectionViewCell.self, forCellWithReuseIdentifier: reuseIdentifier)

        // Do any additional setup after loading the view.
        
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        // Get the new view controller using [segue destinationViewController].
        // Pass the selected object to the new view controller.
    }
    */

    // MARK: UICollectionViewDataSource

    override func numberOfSectionsInCollectionView(collectionView: UICollectionView) -> Int {
        // #warning Incomplete implementation, return the number of sections
        return 1
    }


    override func collectionView(collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        if(collectionView == questionView) {
            return GlobalConstants.patternSize
        } else if(collectionView == choicesView) {
            return GlobalConstants.numberOfChoices
        } else {
            return 0
        }
    }

    override func collectionView(collectionView: UICollectionView, cellForItemAtIndexPath indexPath: NSIndexPath) -> UICollectionViewCell {
        var cell: UICollectionViewCell
        if(collectionView == choicesView){
            cell = collectionView.dequeueReusableCellWithReuseIdentifier(choiceReuseIdentifier, forIndexPath: indexPath)
            cell.backgroundColor = UIColor.orangeColor()
            
        } else{
            cell = collectionView.dequeueReusableCellWithReuseIdentifier(reuseIdentifier, forIndexPath: indexPath)
            let label = cell.contentView.viewWithTag(100) as! UILabel
            label.text = String(indexPath.item)
            label.backgroundColor = UIColor.whiteColor()
        }

        return cell
    }

    // MARK: UICollectionViewDelegate

    /*
    // Uncomment this method to specify if the specified item should be highlighted during tracking
    override func collectionView(collectionView: UICollectionView, shouldHighlightItemAtIndexPath indexPath: NSIndexPath) -> Bool {
        return true
    }
    */

    /*
    // Uncomment this method to specify if the specified item should be selected
    override func collectionView(collectionView: UICollectionView, shouldSelectItemAtIndexPath indexPath: NSIndexPath) -> Bool {
        return true
    }
    */

    /*
    // Uncomment these methods to specify if an action menu should be displayed for the specified item, and react to actions performed on the item
    override func collectionView(collectionView: UICollectionView, shouldShowMenuForItemAtIndexPath indexPath: NSIndexPath) -> Bool {
        return false
    }

    override func collectionView(collectionView: UICollectionView, canPerformAction action: Selector, forItemAtIndexPath indexPath: NSIndexPath, withSender sender: AnyObject?) -> Bool {
        return false
    }

    override func collectionView(collectionView: UICollectionView, performAction action: Selector, forItemAtIndexPath indexPath: NSIndexPath, withSender sender: AnyObject?) {
    
    }
    */

}
