/*eslint no-console: 0*/
/**
 * This class is responsible for uploading and fetching data from the DB.
 */
'use strict';
var MongoClient = require('mongodb').MongoClient;
var db_conn;
class DataStoreManager {

    constructor() {
        this.connectDB();
    }

    /***
	 * This method will be called from the service layers for uploading data to the
	 * DB
	 * @args - upload data- Json data to be uploaded to the DB
	 *         callback - A callback method which is called after the upload operation
	 * 
	 * Message Format -  {
	 * key : key
	 * id : id
	 * conetnt:content
	 * }
	 */
    upload(uploadData, callback) {
        var collection = db_conn.collection('data');
        collection.insert(uploadData, {w: 1}, function(err, result) {
            if (err) {
                callback({
                    status: 'error',
                    data: err
                });
            } else if (result) {
                callback({
                    status: 'success',
                    data: result.insertedIds
                });
            }

        });
    }

    /***
	 * This method will be called from the service layers for fetching data from DB
	 * DB
	 * @args - data 
	 *         callback - A callback method which is called after the fetch operation.
	 * DB Query will be based on the json data
	 * {
	 * key : key
	 * id : key
	 * }
	 */
    get(data, callback) {
        var responseData = [];
        var cursor = db_conn.collection('data').find(data);
        cursor.each(function(err, doc) {

            if (doc != null) {
                responseData.push(doc);
            } else if (err) {
                callback({
                    status: 'error',
                    data: err
                });
            } else { // after full iteration
                callback({
                    status: 'success',
                    data: responseData
                });
            }
        });

        // return responseData;
    }

    /***
	 * This method will be called from the service layers for fetching data from DB
	 * DB
	 * @args - data 
	 * DB Query will be based on the json data
	 * {
	 * key : key
	 * id : key
	 * }
	 */
    connectDB() {
        MongoClient.connect('mongodb://127.0.0.1:27017/remotehealthcare', function(err, db) {
            if (err) {
                console.log('DB Connection failed')
            } else {
                console.log('successfully connected to the database');
                db_conn = db;

            }
        });
    }
}

module.exports = new DataStoreManager();
