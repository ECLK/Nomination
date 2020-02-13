# System for Nominating Candidates for Elections
> This system is responsible for creating an election, managing parties / independent groups and nominating elections.

## Table of contents
* [General info](#general-info)
* [Nomination process](#nomination-process)
* [Technologies](#technologies)
* [Setup](#setup)
* [Project Structure](#initial-project-structure)
* [Database schema](#database-schema)
* [High level architecture](#high-level-architecture)

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

### EC-Nomination user roles  

| Module | Module Description | User roles |
| ---                 | ---                 | ---                  |
| Create election template   | Create election template which is defined a particular election Eg : Presidential | OFC  Create election template   |
| Approve election template  | Approve election template |  OFC Election template approve  |
| Call election              | Call election Eg : Presidential 2019 | OFC Call election    |
| Approve Call election      | Approve Call election  |  OFC Election approve           |
| Create nomination         | Create nomination by party users and IG users  |  OFC Create nomination   |
| Create nomination payment   | Create nomination by ec officers        |  OFC Nomination payment      |
| Approve nomination          | Approve nominations submitted by party users and IG users     | OFC Nomination approve                |
| Create Objection          | Create objection by party users and IG users  | OFC Add objection          |
| Approve Objection          | Approve objections submitted by party users and IG users  | OFC Objection approve                     |

### User management

>User management involves defining and managing users, roles, and their access levels in a system. 

Identity Manager - The Identity Manager is responsible for authenticating all users and for providing high level authorization information for particular applicaitions.

API GW - The API Gateway is the entrypoint for all external accesses to the services that comprise the functionality of all elections systems. The API Gateway uses the Identity Manager for authentication and authorization prior to forwarding requests to the services.

## Nomination process

>You can checkout following links to get a clear understanding 

* Nomination Module: https://docs.google.com/document/d/1oTdU1fwYz48ZjTTnHdjFsDZuLtXvf_G5h3ezi53qk80/edit?usp=sharing
* Process Document - Provincial Council : https://docs.google.com/document/d/1TvPzII1pG-wvmuWYDAvJL_PXi62AoJyyASea-XQSv0Q/edit
* Eligibility Criteria: https://docs.google.com/document/d/1C6GorLj7UdRYOJOc8ERexpSWXRWTsrq-tLg6Uzrx4Mw/edit?usp=sharing

## Technologies
Project is created with:
* Node.js version: 12.10.0
* Mysql version: 5.7
* WSO2 Identity Server
* WSO2 API Manager 2.0.0

## initial project structure
```
Nomination
├── client
├── server
├── README.md
├── CONTRIBUTING.MD
├── generalInfo.md
└── .gitignore
```
## client structure
```
client
├── development.json
├── Dockerfile
├── Staging.Dockerfile
├── package.json
├── package-lock.json
├── yarn.lock
├── .gitignore
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── manifest.json
│   └── app
│       └── images
└── src
    ├── ProtectedApp.jsx
    ├── App.js
    ├── config.js
    ├── serviceWorker.js
    ├── index.js
    ├── setupProxy.js
    ├── withRoot.js
    ├── assets
    ├── components
    ├── lib
    ├── modules
    ├── pages
    ├── state
    └── stories
```
## server structure
```
server
├── .babelrc
├── Dockerfile
├── .eslintignore
├── .env
├── .eslintrc
├── .gitignore
├── build.sh
├── supervisord.conf
├── package.json
├── api-docs
├── images
├── log
└── src
    ├── index.js
    ├── config
    │   ├── ConfigService.js
    │   ├── development.json
    │   ├── log4js-config.json
    │   └── db
    │       ├── ELECTION_TEAM.sql
    │       └── NOMINATION_DB_DUMP.sql
    ├── errors
    ├── manager
    ├── middleware
    ├── model
    ├── repository
    ├── routes
    ├── service
    ├── test
    └── utils
```
## Setup

### How to use ?

##### Clone the project
```
git clone https://github.com/ECLK/Nomination.git
```
### Setup Client

##### install dependencies
```
cd Nomination/client/
npm install
```
##### run the project
```
npm start
```
#### Server now runs at http://localhost:3000/.

### Loging credentials 
EC Admin
```
User Name: EC-admin
Passowrd : admin
```
Party User
```
User Name: RPP-user
Passowrd : rppuser
```

### Setup Server

##### install dependencies
```
cd Nomination/server/
npm install
```
##### run the project
```
npm start
```
#### Server now runs at http://localhost:9001/.

### Setup DB
```
Find the DB dumps for Nomination DB and for the Team DB inside Nomination/server/src/config/db folder
```

Use de `development.json` file inside DB folder to store your important information such as your server port, your password,etc 

### Setup WSO2 API Manager

##### install prerequisites
```
Download and install JDK (AdoptOpenJDK 8, CorrettoJDK 8, OpenJDK 8, or Oracle JDK 1.8.*). and set the JAVA_HOME environment variable.

```
##### Clone the project
```
git clone https://github.com/ECLK/APIM.git
```
##### start wso2 apim
```
Start WSO2 API Manager by going to the <APIM>/bin directory using the command-line and then executing wso2server.bat (for Windows) or wso2server.sh (for Linux.)

```
All the configuarations has been made to connect with the app, If you want to find more information please click <a href="https://docs.wso2.com/display/AM260/Introduction">here</a>

### Setup Auth app

##### Clone the project
```
git clone https://github.com/ECLK/auth-app.git

```
##### install dependencies
```
cd auth-app
npm install
```
##### run the project
```
npm start
```
#### Server now runs at http://localhost:3001/.

### Setup PDF Service

##### Clone the project
```
git clone https://github.com/ECLK/pdf-service.git
```

##### install dependencies
```
cd pdf-service
npm install
```
##### run the project
```
node index.js
```
#### Server now runs at http://localhost:5000/.

## Database schema

![Image of Database schema](https://github.com/ECLK/Nomination/blob/master/server/images/ec-nomination-erd_V2.7.0.png)

## High level architecture

![Image of High level architecture](https://github.com/ECLK/Nomination/blob/master/server/images/high-level-architecture-nomination.jpg)

## Credits ✨

This project exists thanks to all the people who [contribute](CONTRIBUTING.md).<br>
* Our valued <a href="https://github.com/ECLK/Nomination/graphs/contributors">contributors</a>
