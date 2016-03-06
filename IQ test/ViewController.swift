//
//  ViewController.swift
//  IQ test
//
//  Created by Calvin Li on 11/10/15.
//  Copyright © 2015 UCD SE Lab. All rights reserved.
//

import UIKit
import SVGKit

let answers = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

class ViewController: UIViewController, UICollectionViewDelegateFlowLayout, UICollectionViewDataSource {

    private var questionView: UICollectionView!, choicesView: UICollectionView!
    private var answerButton: UIButton!
    private var scoreText: UILabel!
    private var timerText: UILabel!
    
    private var sampleProblems: [(question: [String], choices: [String])] = []
    private var pIndex = 0
    //private let answers = [2,1,0,2,0,3,4,3,0,6,4,2,7,4,5,2,4,0,5,1] //real answers
    
    private var tries: UILabel!
    private let totalTries = 3
    private var numTries: Int!
    private var numRight = 0, numDone = 0
    
    private var timer: NSTimer!
    private let totalTime = 6 * answers.count
    private var time: Int!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        let pLocation = NSBundle.mainBundle().resourcePath! + "/problems.txt"
        let problemsText = try! NSString(contentsOfFile: pLocation, encoding: NSUTF8StringEncoding)
        let problems = problemsText.componentsSeparatedByString("$")
        for problem in problems{
            sampleProblems = sampleProblems + [(
                question: problem.componentsSeparatedByString("~")[0].componentsSeparatedByString("!"),
                choices: problem.componentsSeparatedByString("~")[1].componentsSeparatedByString("!"))]
        }
        
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
        choicesViewEdgeInsets.top += getScreenSize().height - getChoiceCellSize().height*GlobalConstants.choicesShortSide
        choiceLayout.sectionInset = choicesViewEdgeInsets
        choiceLayout.minimumLineSpacing = GlobalConstants.questionMargins.top + GlobalConstants.questionMargins.bottom
        choiceLayout.minimumInteritemSpacing = GlobalConstants.questionMargins.left + GlobalConstants.questionMargins.right
        
        questionView = UICollectionView(frame: self.view.frame, collectionViewLayout: questionLayout)
        questionView.dataSource = self
        questionView.delegate = self
        questionView.backgroundColor = UIColor.blackColor().colorWithAlphaComponent(0.0)
        questionView.registerClass(UICollectionViewCell.self, forCellWithReuseIdentifier: GlobalConstants.questionReuseIdentifier)
        self.view.addSubview(questionView)
        
        choicesView = UICollectionView(frame: self.view.frame, collectionViewLayout: choiceLayout)
        choicesView.dataSource = self
        choicesView.delegate = self
        choicesView.backgroundColor = UIColor.blackColor().colorWithAlphaComponent(0.0)
        choicesView.registerClass(UICollectionViewCell.self, forCellWithReuseIdentifier: GlobalConstants.choiceReuseIdentifier)
        self.view.addSubview(choicesView)
        
        //TODO:
        // count tries
        // time user
        // reveal answer button
        
        //add view for info
        let scoreView : UIView //top margin = bottom margin = 10
        let scoreX = GlobalConstants.collectionViewMargins.left
        let scoreY = getQuestionCellSize().height*GlobalConstants.questionsPerSide +
            questionLayout.sectionInset.top + questionLayout.sectionInset.bottom + 10
        let scoreW = getScreenSize().width
        let scoreH = choiceLayout.sectionInset.top - scoreY - 10
        
        scoreView = UIView(frame: CGRect(x: scoreX, y: scoreY, width: scoreW, height: scoreH))
        scoreView.backgroundColor = UIColor.whiteColor().colorWithAlphaComponent(0.1)
        self.view.addSubview(scoreView)
        
        let scoreItemSpacing: CGFloat = 10
        let scoreFont = UIFont.boldSystemFontOfSize(scoreH/3)
        
        let scoreTextW = scoreW/3
        
        var newX: CGFloat = 0.0
        
        scoreText = UILabel(frame: CGRect(x: newX, y: 0.0, width: scoreTextW, height: scoreH/2))
        scoreText.backgroundColor = UIColor.whiteColor()
        scoreText.textAlignment = NSTextAlignment.Center
        numRight = 0; numDone = 0
        updateScore()
        scoreText.font = scoreFont
        scoreView.addSubview(scoreText)
        
        
        let timerTextW = scoreTextW
        timerText = UILabel(frame: CGRect(x: newX, y: scoreH/2, width: timerTextW, height: scoreH/2))
        timerText.backgroundColor = UIColor.whiteColor()
        timerText.textAlignment = NSTextAlignment.Center
        timerText.font = scoreFont
        time = totalTime
        timerText.text = String(time)
        scoreView.addSubview(timerText)
        
        newX += scoreText.frame.width
        
        let triesW = scoreW/9
        tries = UILabel(frame: CGRect(x: newX, y: 0.0, width: triesW, height: scoreH))
        tries.backgroundColor = UIColor.yellowColor()
        tries.textAlignment = NSTextAlignment.Center
        tries.font = scoreFont
        updateTries(totalTries)
        scoreView.addSubview(tries)
        
        newX += tries.frame.width
        
        let restartButtonW = scoreW * 5/27
        let restartButton = UIButton(type: .System)
        restartButton.frame = CGRect(x: newX, y: 0.0, width: restartButtonW, height: scoreH)
        restartButton.backgroundColor = UIColor.darkGrayColor()
        scoreView.addSubview(restartButton)
        
        timer = NSTimer.scheduledTimerWithTimeInterval(1, target: self, selector: "tick", userInfo: nil, repeats: true)
    }

    func collectionView(collectionView: UICollectionView, cellForItemAtIndexPath indexPath: NSIndexPath) -> UICollectionViewCell {
        var cell: Cell
        let item = indexPath.item
        var shapes: [String] = []
        
        if(collectionView == questionView){
            cell = Cell(cvCell: collectionView.dequeueReusableCellWithReuseIdentifier(GlobalConstants.questionReuseIdentifier, forIndexPath: indexPath))
            cell.size = getQuestionCellSize()
            cell.cvCell.backgroundColor = UIColor(colorLiteralRed: 1, green: 1, blue: 0.75, alpha: 1)
            if(item < GlobalConstants.patternSize-1){
                shapes = sampleProblems[pIndex].question[item].componentsSeparatedByString("#")
            }
            else{
                return cell.cvCell
            }
            
        } else if(collectionView == choicesView) {
            cell = Cell(cvCell: collectionView.dequeueReusableCellWithReuseIdentifier(GlobalConstants.choiceReuseIdentifier, forIndexPath: indexPath))
            cell.size = getChoiceCellSize()
            cell.cvCell.backgroundColor = UIColor.whiteColor()
            shapes = sampleProblems[pIndex].choices[item].componentsSeparatedByString("#")
            
            //add button
            let button = UIButton(type: .System)
            button.frame = CGRect(origin: CGPoint(x: 0,y: 0), size: getChoiceCellSize())
            button.addTarget(self, action: "pressed:", forControlEvents: .TouchUpInside)
            button.addTarget(self, action: "highlight:", forControlEvents: .TouchDown)
            button.accessibilityIdentifier = String(item)
            if(item == answers[pIndex]){
                answerButton = button
            }
            
            cell.cvCell.contentView.addSubview(button)
            
        } else {
            return UICollectionViewCell()
        }
        
        for shape in shapes{
            cell.addShape(shape)
        }
        cell.renderShape()
        
        return cell.cvCell
    }
    
    func pressed(sender: UIButton!){
        unhighlight(sender)
        if (time == 0) { return }
        else if (Int(sender.accessibilityIdentifier!) == answers[pIndex]){
            pIndex++
            questionView.reloadData()
            choicesView.reloadData()
            numDone++
            if (numTries > 0) {numRight++}
            updateTries(totalTries)
        } else {
            updateTries(max(0, numTries-1))
            if (numTries == 0) {
                revealAnswer()
            }
        }
        updateScore()
    }
    
    func revealAnswer(){
            answerButton.layer.borderColor = UIColor.greenColor().colorWithAlphaComponent(0.5).CGColor
            answerButton.layer.borderWidth = 3
    }
    
    internal func tick(){
        time = max(0, time - 1)
        timerText.text = String(time)
    }
    
    func updateScore(){
        scoreText.text = String(numRight) + "/" + String(numDone)
    }
    
    func updateTries(n: Int){
        numTries = n
        if(numTries == 0){
            tries.textColor = UIColor.redColor()
        } else {
            tries.textColor = UIColor.blackColor()
        }
        tries.text = String(numTries)
    }
    
    func highlight(sender: UIButton!){
        sender.backgroundColor = UIColor.yellowColor().colorWithAlphaComponent(0.5)
    }
    
    func unhighlight(sender: UIButton!){
        sender.backgroundColor = UIColor.clearColor()
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
}






























