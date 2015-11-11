//
//  APIClient.swift
//  Tweetie
//
//  Created by Eddie Kaiger on 11/8/15.
//  Copyright © 2015 Eddie Kaiger. All rights reserved.
//

import UIKit
import Alamofire
import CoreData

class APIClient: NSObject {

    private let url = "http://goo.gl/ueCTdi"

    static let sharedInstance: APIClient = {
        return APIClient()
    }()

    // We create a custom networking manager so we can give it a specific cache policy
    private let manager: Manager = {
        let configuration = NSURLSessionConfiguration.defaultSessionConfiguration()
        configuration.requestCachePolicy = .ReloadIgnoringLocalCacheData
        return Manager(configuration: configuration)
    }()

    func retrieveTweets() {

        manager.request(.GET, url).responseJSON { response in

            // Return if we receive an error
            guard response.result.error == nil else {
                print("Error occurred: \(response.result.error)")
                return
            }

            // Make sure we have valid JSON
            guard let json = response.result.value as? Array<Dictionary<String, AnyObject>> else {
                print("Could not parse JSON.")
                return
            }

            // Iterate through each item
            for dict in json {

                // Make sure all parameters are there
                guard let postID = dict["postID"] as? NSNumber, username = dict["username"] as? String, content = dict["content"] as? String else {
                    continue
                }

                // Check if this tweet already exists in Core Data
                let fetchRequest = NSFetchRequest(entityName: "Tweet")
                fetchRequest.predicate = NSPredicate(format: "postID == %@", postID)
                let duplicates = try? globalContext().executeFetchRequest(fetchRequest)
                guard duplicates == nil || duplicates?.count == 0 else { continue }

                // Create our actual tweet object
                let tweet = NSEntityDescription.insertNewObjectForEntityForName("Tweet", inManagedObjectContext: globalContext()) as! Tweet
                tweet.postID = postID
                tweet.username = username
                tweet.content = content
            }

            print(json.count)

            // Try saving our objects to Core Data
            do {
                try globalContext().save()
                print("All done")
            } catch {
                print("Error saving context")
            }
        }
    }

}
