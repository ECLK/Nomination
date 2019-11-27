# System for Nominating Candidates for Elections
> This system is responsible for creating an election, managing parties / independent groups and nominating elections.

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)

## General info
> The nomination system is used to nominate candidates for an election. This system helps a party or independent group to prepare the nomination form and validate that the data is correct.
There are 9 mager modules for this system. Which are listed down below


    1. Create Election
    2. Approve Election
    3. Call Election
    4. Approve Call Election
    5. Create Nomination
    6. Create Nomination Payment
    7. Approve Nomination
    8. Create Objection
    9. Approve Objection

>You can check out the further information [here](https://github.com/IgorAntun/node-chat/blob/master/LICENSE)

## Technologies
Project is created with:
* Node.js version: 12.10.0
* Mysql version: 5.7

## Setup
To run this project, install it locally using npm:

### How to use ?

##### Clone the project

##### install dependencies

```
npm install
```

##### Setup DB


##### Development mode


##### run the project
```
npm start
```

##### Production mode

```
npm run build
npm run start-prod
```

Use de `.env` file to store your important information such as your server port, your password, 

##### Swagger-ui test

Use http://localhost:9001/docs
