### Storing ExcelData to MongoDB
making a simple web application which takes a excel file from user and store that file into MongoDB database.

### Handling Some conditions
1. Use of async.eachSeries
2. Email id should be unique
3. Duplicate checking using MongoDB query
4. Skip row if duplicate exists in database

## Demo

https://github.com/jayrambagal/StoreExcelData-to-Mongo/assets/94613732/db07c557-e515-40f7-8a9c-d40956ac291a


## Technologies used

* Node js -A runtime environment to help build fast server applications using JS
* Express js -The server for handling and routing HTTP requests
* async - for managing asynchronous control flow, handling callbacks, and performing various asynchronous operations.
* xlsx -  parsing and manipulating Excel files (XLSX and XLSB formats) 
* multer - handling multipart/form-data
* ejs - generate dynamic HTML content by embedding JavaScript code within HTML templates.
* Mongoose - For modeling and mapping MongoDB data to JavaScript
* dotenv - Zero Dependency module that loads environment variables
* cors - Provides a Connect/Express middleware
* body-parser - handling HTTP request bodies 
