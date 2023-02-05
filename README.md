# System for Nominating Candidates for Elections
> This system is responsible for creating an election, managing parties / independent groups and nominating elections.compared to traditional solutions, This system will allow the election commission to save significant amounts of funds by reducing maintenance costs, using limited manpower and the time and resources required to complete a task, and reducing the need for travel and other expenses. etc. 

> By taking advantage of these factors, this system can help the election commission to keep costs down while increasing efficiency and productivity. Reducing hardware and support costs, improving collaboration and scalability, or reducing manual processes will provide a cost-effective alternative to traditional solutions.

> This system is developed in a way that is easy to maintain and upgrade. The software is structured in a modular fashion, with a clear separation of responsibilities between different components. this makes it easier to maintain,  as changes to one component will not impact other components. Also, this will manage proper version control using Git. the code is reviewed by multiple developers to ensure maintainability, scalability, and security.Also a dedicated team is always available to provide support, maintenance and troubleshoot issues.

> The development process was based on Scrum methodology that emphasizes collaboration, adaptive planning, and the delivery of working software through short sprints. the development process was divided into short sprints, typically lasting 1-4 weeks, during which the development team worked to deliver a functional subset of the product.
> The Model-View-Controller (MVC) design pattern is been used to structure the system to separate the data (Model), the user interface (View), and the control flow of the application (Controller). This provides a clear separation of concerns, making it easier to maintain and extend the application.

## Table of contents
* [General info](#general-info)
* [Nomination process](#nomination-process)
* [Technologies](#technologies)
* [Setup](#setup)
* [Project Structure](#initial-project-structure)
* [Database schema](#database-schema)
* [High level architecture](#high-level-architecture)
* [Security](#security)

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
A system built using both API-based and web-based architecture using Node.js and React.js would typically work as follows:

    The API-based part of the system would be built using Node.js, which is a server-side JavaScript runtime environment that is well-suited for building scalable and high-performance APIs. The API would expose a set of endpoints for accessing the data and functionality of the system.

    The web-based part of the system would be built using React.js, which is a JavaScript library for building user interfaces. React would be used to build the front-end of the system, which would interact with the API to retrieve data and perform actions.

    The React front-end would make HTTP requests to the Node.js API to fetch data and perform operations, such as retrieving information from a database or updating data in real-time. The API would respond to these requests by processing the data and returning the results to the React front-end.

    The React front-end would then render the data and present it to the user in a visually appealing and interactive way. Users would be able to perform actions, such as creating new data, updating existing data, or deleting data, which would be sent back to the API to be processed and stored.

In this way, the system would leverage the strengths of both Node.js and React.js to provide a fast and scalable API-based architecture for handling data and functionality, and a dynamic and user-friendly web-based interface for presenting and interacting with the data.

React.js and Node.js are both popular JavaScript-based technologies that are widely used for developing web applications.

Here are some of the unique features and capabilities that set React.js and Node.js apart from other solutions:

React.js:

    Virtual DOM: React.js uses a virtual DOM, which is a lightweight in-memory representation of the actual DOM, to update the UI efficiently. This allows React to update only the components that have changed, improving the performance of the application.

    Reusable components: React.js allows developers to create reusable UI components, making it easier to build complex user interfaces.

    Declarative programming: React.js uses declarative programming, meaning that the developer specifies what the user interface should look like, and React takes care of rendering it to the screen. This makes it easier to understand and maintain the code.

Node.js:

    Event-driven architecture: Node.js uses an event-driven architecture, allowing it to handle many connections simultaneously, making it a good choice for real-time applications.

    NPM: Node.js has a large and growing repository of packages, known as NPM (Node Package Manager), which makes it easier for developers to find and use third-party libraries and modules.

    Asynchronous programming: Node.js uses asynchronous programming, meaning that it can handle multiple requests at the same time without blocking the main thread. This makes it more efficient and scalable than other technologies that use synchronous programming.

Overall, React.js and Node.js provide a powerful combination of features and capabilities that make them popular choices for developing web applications. Whether building complex user interfaces, real-time applications, or scalable backends, React and Node offer a wide range of capabilities that set them apart from other solutions.

Project is created with:
* Node.js version: 12.10.0
* Mysql version: 5.7
* WSO2 Identity Server
* WSO2 API Manager 2.0.0

The system is also integrated with other services in the election commission. Such as voter registration system to get the necessary data.

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

## Security

To ensure that the system is protected with the best security messures we have used the WSO2 API Manager and WSO2 Identity Server. these both products developed by WSO2, designed to provide security and authentication for web-based applications and APIs.

WSO2 API Manager is a comprehensive solution for managing APIs, allowing organizations to create, publish, and manage APIs. It provides security features such as rate limiting, access control, and OAuth2-based authentication to ensure that APIs are only accessed by authorized users.

WSO2 Identity Server, on the other hand, is an identity and access management solution that provides centralized authentication and authorization for web-based applications and APIs. It supports various authentication methods, including OAuth2, SAML, and OpenID Connect, to ensure that users are able to authenticate to the application or API using their preferred method.

When used together, WSO2 API Manager and WSO2 Identity Server can provide a secure and scalable solution for protecting APIs and applications. The API Manager can be configured to use the Identity Server for authentication and authorization, allowing organizations to control access to APIs using a centralized identity management solution.

Overall, WSO2 API Manager and WSO2 Identity Server provide a comprehensive solution for securing APIs and applications, allowing organizations to ensure that sensitive data is protected and that only authorized users have access to it.

## Credits ✨

> A professional team of software engineers who are working in reputed software companies volunteered to put this system together except for the Lanka Software Foundation members.Hence we used a hybrid approach that combines elements of both the distributed and co-located collaboration models. Team members worked in different physical locations, but the team also worked together in person on occasions like weekly hackathons. This allows us to access a wider pool of talent and expertise and also Improved communication and collaboration due to regular in-person interaction.
>  The team worked collaboratively to develop and identify, analyze, and solve problems. This led to a more innovative solution.
> By fostering a culture of collaboration, diverse perspectives, open communication, and data-driven decision-making, The team was able to encourage innovation and creativity in the system.

This project exists thanks to all the people who [contribute](CONTRIBUTING.md).<br>
* Our valued <a href="https://github.com/ECLK/Nomination/graphs/contributors">contributors</a>


