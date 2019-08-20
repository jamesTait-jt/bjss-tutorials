# BJSS Tutorial

### Task 1 [x]

Go to http://dummy.restapiexample.com/


Take a look at the examples. You can execute a GET request in your browser by pasting http://dummy.restapiexample.com/api/v1/employees in to the address bar.  JSON is returned to the main screen.


For an overview of JSON, read [here](https://www.w3schools.com/js/js_json_intro.asp)


### Task 2 [x]

Postman is a GUI for interacting with APIs. Download Postman [here](https://www.getpostman.com/)

Using the dummy.restapiexample.com site, create a new collection in postman with the following requests:

1. Create a new user
2. Update their details
3. Check the updated details have been applied
4. Delete the user
5. Check the user is no longer in the returned list of users

### Task 3 []

Postman can be used to execute collections to be used in an automated fashion. It is possible to execute collections and parse the returned JSON to store variables in memory to pass between requests.

Postman uses javascript as its scripting language. Postman also has custom methods for storing session/environment variables.

GOAL: Ensure your collection can be executed without manual intervention using the Postman scripting.



## Tutorials :

[Node & Express introduction](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction)

[Building a Node & Express application](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Tutorial_local_library_website)

[Building an API with Spring](https://dzone.com/articles/creating-a-rest-api-with-java-and-spring)

### Task 4 []

In order to replace the legacy dummy.restapiexample.com API, we must first create an exact replica. For this we will be using Node.js and Express.

You will need to ensure that your replica returns identical results to the current implementation, even if the result is non-valid JSON or errors. The routes must also be identical.

[Here](https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4) is a tutorial about building an API that may be useful:

For this task, you may use and in-memory database or a simple array. All your existing tests in Postman must pass against your new API.

### Task 5 []

Now we are going to connect a database to our API. You can choose the DB you want to connect with (Mongo, Postgres, MySQL...whatever). You can decide whether you want to write native code, or use and ORM, like sequelize (http://docs.sequelizejs.com/ ) or mongoose for Mongo (https://mongoosejs.com/ ). There are pros and cons with each approach (I recommend a relational database here)

Read: What is an ORM and why should I use one? [here](https://blog.bitsrc.io/what-is-an-orm-and-why-you-should-use-it-b2b6f75f5e2a)

### Task 6 – STRETCH GOAL

Congratulations! You have successfully replaced the existing API with a carbon copy!

However, now we need to make changes to it. Now the dev team are all onboard, we need to create a VERSIONED API, so we will use /api/v2 for all these requests. This will enable our customers to continue using the OLD API whilst they transition to the NEW system. The v1 API must remain available at all times.

Repurpose the API so it is correct

- /employees GET : returns all employees
- /employees/{id} GET : returns employee with that id. If no employee with that id exists, return a 404 JSON response with message "Employee not found."
- /employees/{id} PUT : updates the employee details provided, return a 404 JSON response with message "Employee not found."
- /employees POST : creates an employee with the details provided
- /employees/{id}/delete DELETE : deletes the specified employee. If the employee does not exist, returns a 404 JSON response with message "Employee not found."

405 response
All routes must provide a 405 JSON response if the HTTP Method is not allowed

eg using POST to /employees/{id}

JSON Format

```JSON
{
    "status": string,
    "code": int,
    "messages": array,
    "result": {
        "employee": object,
        "employees": array
    }
}
```

JSON EXAMPLE - /employees GET

```JSON
{
    "status": "ok",
    "code": 200,
    "messages": [],
    "result": {
        "employee": null,
        "employees": [
            {
                "id":1, 
                "name":"ted",
                ....
            }, 
            {
                "id":2, 
                "name":"ted2",
                ....
            }
        ]
    }
}
```

JSON EXAMPLE - /employees/{id}


```JSON
{
    "status": "ok",
    "code": 200,
    "messages": [],
    "result": {
        "employee": 
            {
                "id":1, 
                "name":"ted",
                ....
            },
        "employees": null
    }
}
```

JSON EXAMPLE - /employees POST

```JSON
{
    "status": "ok",
    "code": 200,
    "messages": [{"text":"Employee created."}],
    "result": {
        "employee": {"id":6, "name":"fred" ....},
        "employees": null
    }
}
```

JSON EXAMPLE - /employees/{id} PUT

```JSON
{
    "status": "ok",
    "code": 200,
    "messages": [{"text":"Employee updated."}],
    "result": {
        "employee": {"id":6, "name":"fred77" ....},
        "employees": null
    }
}
```

JSON EXAMPLE - Method not allowed

```JSON
{
    "status": "error",
    "code": 405,
    "messages": [{"text":"Method no allowed."}],
    "result": null
}
```

JSON EXAMPLE - Required field missing


```JSON
{
    "status": "error",
    "code": 400,
    "messages": [{"text":"Name is required."},{"text":"Salary is required."}],
    "result": null
}
```


DB SCHEMA


EMPLOYEE

id: int - AUTO

name: string - REQUIRED

role: string - OPTIONAL

salary: decimal - REQUIRED

age: int - REQUIRED

profile_picture: string - OPTIONAL


/employees POST

name: REQUIRED

role: OPTIONAL

salary: REQUIRED

age: REQUIRED

profile_picture: OPTIONAL

/employees/{id} UPDATE

id: REQUIRED

name: OPTIONAL

role: OPTIONAL

salary: OPTIONAL

age: OPTIONAL

profile_picture: OPTIONAL

NOTE - AT LEAST ONE OF THE OPTIONAL ATTRIBUTES MUST BE SUPPLIED FOR UPDATE
