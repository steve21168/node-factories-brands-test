Maker's Row Internship Take Home Assignment
-------------------------------------------
Welcome to the Maker's Row internship take home assignment! 

Before getting started, make sure you have node.js installed on your machine. If you don't have node.js installed you can find an installer [here](https://nodejs.org/en/download/). You should Download the latest version, v4.4.7.

About the app:
--------------
This app is a simple api that allows users to create and retrieve factories. It uses the [express.js framework](https://expressjs.com/) and implements the [json-fs-store](https://github.com/alexkwolfe/json-fs-store) library to store data. The tests for the app, found in the /spec folder, use the [jasmine testing framework](https://github.com/jasmine/jasmine). 

How to run the app
------------------
Clone this repo 
Run:

    $ npm install
    $ npm start
And then navigate to http://localhost:3000

How to run the tests
--------------------
    $ npm test


Resources
---------
**/factories**

    GET: Retrieves an array of all of the factory objects
    
    POST: Creates a new factory object
        Expects:
            {
                name: 'Factory Name'
            }

**/factories/{id}**

    GET: Retrieves factory object with the id {id}



What you need to do:
--------------------
 - Extend the factories resource to include the following fields **email, phone_number, city, state** 
 - Create a new resource for brands. This resource should have the endpoint /brands. The brands resource should have the same fields as the factories resource. 
 - We want to store both brands and factories in a companies table. For this exercise the companies table is represented by the json files in the /store/companies directories. A company_type property should be used to specify if the company is a brand or factory. Change the factory and brand resources to account for these changes.
 - Edit the tests to account for these changes.
 - Push the altered application to a public repository in your GitHub account, and send a link to that repository to dev@makersrow.com 

Bonus
-----
 - Implement a delete method on the brand and factory resources. 
 - Improve the app any way you see fit

