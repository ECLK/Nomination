# System for Nominating Candidates for Elections
> This system is responsible for creating an election, managing parties / independent groups and nominating elections.

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)

## General info
> The nomination system is used to nominate candidates for an election. This system helps a party or independent group to prepare the nomination form and validate that the data is correct.
There are 9 mager modules for this system. Which are listed down below


    1. Create Election Template
    2. Approve Election Template
    3. Call Election
    4. Approve Call Election
    5. Create Nomination
    6. Create Nomination Payment
    7. Approve Nomination
    8. Create Objection
    9. Approve Objection

>You can check out the further information [here](https://github.com/ECLK/Nomination/blob/master/generalInfo.md)

## Technologies
Project is created with:
* Node.js version: 12.10.0
* Mysql version: 5.7
* WSO2 API Manager 2.0.0

## Setup
To run this project, install it locally using npm:

### How to use ?

##### Clone the project

##### install dependencies

```
npm install
```

##### Setup DB
```
Find the DB dumps for Nomination DB and for the Team DB inside config/db folder
```

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

Use de `development.json` file inside DB folder to store your important information such as your server port, your password, 


