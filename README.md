# System for Nominating Candidates for Elections
> This system is responsible for creating an election, managing parties / independent groups and nominating elections.

## Table of contents
* [General info](#general-info)
* [Nomination process](#nomination-process)
* [Technologies](#technologies)
* [Setup](#setup)
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
## Setup

### How to use ?

##### Clone the project
```
git clone https://github.com/YujithIsura/Nomination.git
```

##### install dependencies

```
npm install
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

##### Setup DB
```
Find the DB dumps for Nomination DB and for the Team DB inside config/db folder
```

Use de `development.json` file inside DB folder to store your important information such as your server port, your password, 

## Database schema

![Image of Yaktocat](https://github.com/ECLK/Nomination/blob/master/images/ec-nomination-erd_V2.7.0.png)

## High level architecture

![Image of Yaktocat](https://github.com/ECLK/Nomination/blob/master/images/high-level-architecture-nomination.jpg)

## Credits

This project exists thanks to all the people who [contribute](CONTRIBUTING.md).<br>
* Our valued <a href="https://github.com/ECLK/Nomination/graphs/contributors">contributors</a>
