//
//  FeedViewController.swift
//  Tweetie
//
//  Created by Eddie Kaiger on 11/8/15.
//  Copyright © 2015 Eddie Kaiger. All rights reserved.
//

import UIKit
import CoreData

private let cellReuseIdentifier = "TweetTableViewCell"

class FeedViewController: UITableViewController {

    lazy var fetchedResultsController: NSFetchedResultsController = {

        // Create fetch request to retrieve all Tweet objects from Core Data, sorted by date
        let fetchRequest = NSFetchRequest()
        let entity = NSEntityDescription.entityForName("Tweet", inManagedObjectContext: globalContext())
        fetchRequest.entity = entity
        let sortDescriptor = NSSortDescriptor(key: "date", ascending: true)
        fetchRequest.sortDescriptors = [sortDescriptor]
        fetchRequest.fetchBatchSize = 40

        let controller = NSFetchedResultsController(fetchRequest: fetchRequest, managedObjectContext: globalContext(), sectionNameKeyPath: nil, cacheName: nil)
        controller.delegate = self
        return controller
    }()

    override func viewDidLoad() {
        super.viewDidLoad()

        title = "Tweets"

        // Register our custom cell to be used with our tableview
        tableView.registerClass(TweetTableViewCell.self, forCellReuseIdentifier: cellReuseIdentifier)

        // Set height of each cell
        tableView.rowHeight = 70

        // Try to retrieve the results from Core Data
        do {
            try fetchedResultsController.performFetch()
        } catch {
            print("Failed to perform fetch.")
        }

        // Retrieve tweets
        APIClient.sharedInstance.retrieveTweets()
    }

    // MARK: UITableView Delegate & DataSource

    override func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {

        let cell = tableView.dequeueReusableCellWithIdentifier(cellReuseIdentifier, forIndexPath: indexPath)

        // Configure cell based on the tweet at this indexpath
        if let tweet = fetchedResultsController.objectAtIndexPath(indexPath) as? Tweet {
            cell.textLabel?.text = "@\(tweet.username ?? "")"
            cell.detailTextLabel?.text = tweet.content
        }

        return cell
    }

    override func numberOfSectionsInTableView(tableView: UITableView) -> Int {
        return fetchedResultsController.sections?.count ?? 0
    }

    override func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return fetchedResultsController.sections?[section].numberOfObjects ?? 0
    }
}

extension FeedViewController: NSFetchedResultsControllerDelegate {

    func controller(controller: NSFetchedResultsController, didChangeObject anObject: AnyObject, atIndexPath indexPath: NSIndexPath?, forChangeType type: NSFetchedResultsChangeType, newIndexPath: NSIndexPath?) {

        let animation = UITableViewRowAnimation.Automatic

        switch type {
        case .Insert where newIndexPath != nil: tableView.insertRowsAtIndexPaths([newIndexPath!], withRowAnimation: animation)
        case .Delete where indexPath != nil: tableView.deleteRowsAtIndexPaths([indexPath!], withRowAnimation: animation)
        case .Move where newIndexPath != nil && indexPath != nil: tableView.moveRowAtIndexPath(indexPath!, toIndexPath: newIndexPath!)
        default: tableView.reloadData()
        }
    }

    func controller(controller: NSFetchedResultsController, didChangeSection sectionInfo: NSFetchedResultsSectionInfo, atIndex sectionIndex: Int, forChangeType type: NSFetchedResultsChangeType) {

        let animation = UITableViewRowAnimation.Automatic

        switch type {
        case .Insert: tableView.insertSections(NSIndexSet(index: sectionIndex), withRowAnimation: animation)
        case .Delete: tableView.deleteSections(NSIndexSet(index: sectionIndex), withRowAnimation: animation)
        default: break
        }
    }

    func controllerWillChangeContent(controller: NSFetchedResultsController) {
        tableView.beginUpdates()
    }

    func controllerDidChangeContent(controller: NSFetchedResultsController) {
        tableView.endUpdates()
    }
}
