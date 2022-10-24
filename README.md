<p align="center"><img src="https://loginregistrationapp.s3.amazonaws.com/loginheader.PNG" alt="Alt text" title="Optional title"></p>

|Tools Used and Features|
|:-:|
|![First Image](https://loginregistrationapp.s3.amazonaws.com/loginghmk.PNG)|

- [1. Planning the Design](#1-planning-the-design)
  * [Database](#database---to-organize-and-retrieve-user-data)
  * [Data Storage](#data-storage---a-data-storage-for-logs-and-backup-files)
  * [Data Attributes](#data-attributes---documenting-attributes-of-the-data-to-be-handled)
  * [Reliability](#reliability---plan-for-how-to-designarcitect-the-app-to-be-highly-reliable)
    + [Recoverability](#reliability---plan-for-how-to-designarcitect-the-app-to-be-highly-reliable)
    + [Availability](#reliability---plan-for-how-to-designarcitect-the-app-to-be-highly-reliable)
    + [Extensibility](#reliability---plan-for-how-to-designarcitect-the-app-to-be-highly-reliable)
    + [Scalability](#reliability---plan-for-how-to-designarcitect-the-app-to-be-highly-reliable)
    + [Maintainability](#reliability---plan-for-how-to-designarcitect-the-app-to-be-highly-reliable)
    + [Testability](#reliability---plan-for-how-to-designarcitect-the-app-to-be-highly-reliable)
    + [Useability](#reliability---plan-for-how-to-designarcitect-the-app-to-be-highly-reliable)
    + [Portability](#reliability---plan-for-how-to-designarcitect-the-app-to-be-highly-reliable)
  * [Performance](#performance---plan-for-building-the-application-to-perform-optimally)
  * [Security](#security---plan-for-how-i-can-secure-the-application-at-all-3-levels)
  * [Risk Matrix](#riskmatrix---plan-for-how-to-mitigate-risk-for-mission-critical-components-of-the-application)

- [2. Designing The Arcitecture](#2-designing-the-arcitecture)
  * [Infrastructure Level](#infrastructure-level)
  * [Application Level](#application-level)
  * [Data Level](#data-level)
 
- [3. Formulating Stratagies And Selecting The Tools](#3-formulating-stratagies-and-selecting-the-tools)
  * [Infrastructure Level](#infrastructure-level-1)
  * [Application Level](#application-level-1)
  * [Data Level](#data-level-1)
   
- [4. Building The Application](#4-building-the-application)
  * [Testing (using TDD) ](#testing--ttd)
    + [Load Tests](#testing--ttd)
    + [Registration / Login Tests](#testing--ttd)
  * [Application & Business Logic Layers (using Clean Coding Principals) ](#application--business-logic-layers)
    + [API Routes](#application--business-logic-layers)
    + [User Data Flow](#application--business-logic-layers)
  * [Infastructure Layer (using Infastructure as Code (iaC)) ](#infastructure-layer)
    + [Private Cloud Network & Subnets (VPC)](#infastructure-layer)
    + [Virtual Machines (EC2)](#infastructure-layer)
  * [Data Layer using (Clean Coding Principals) ](#data-layer)
    + [MongoDB (with Dependency Injection)](#data-layer)
    + [DynamoDB (with SOLID principles)](#data-layer)
    + [Cache Engine (Redis)](#data-layer)
   
- [5. Alternative Architectures and Evaluating The Application](#5-alternative-architectures-and-evaluating-the-application)
  * [Alternative Architecture #1 - Serverless](#sub-heading-2)
  * [Alternative Architecture #2 - GCP](#sub-heading-2)
  * [Post Build Evaluation](#sub-heading-2)
    

#### <sub>The main intention of this application is to build a scalable user Register/Login and capture data for analytics.</sub> 
#### <sub>At a high-level view, the arcitecture/design consists of 2 parts. **_The User Interface and Handling User Data_** </sub>

# 1. Planning the Design

### **MoSCoW**
- #### <sub>For planning the design/implementation, I decided to use the MoSCoW prioritization method. With this method, I will prioritize resources, infastructure, components and functionality that the project **_Must Have, Should Have, Could Have & Wont Have_** </sub>

### <ins> _**A) Must Haves**_</ins>
##### ***FUNCTIONAL Requirements*** 
- ###### _***User Interface***_ - User must be able to enter credentials. Successful user data input must redirect users accordingly. Non-successful user data input must automatically respond with erreor messaging
##### ***NON-FUNCTIONAL Requirements*** 
- ###### _***Data Handling***_ - System must be able to store and rapidly retrieve user data
### Database - To organize and retrieve user data
                                
            A business case that might require rigid data consistency vs a business case that might 
            require data flexibility is the deciding factor that I ended up at. I think it would be 
            faster to adjust for higher consistency than to constantly adjust for the shape of incoming data.
            
            NoSQL vs SQL - Deciding to use a NOSQL db for 2 reasons
            
                        1: Modeling flexibility allows for faster and simpler extensibility. That way it 
                        can be built to sit in front of and intergate with any type of business case.
                        
                        2: The nature of the application doesnt really require the strict ACID compliance 
                        which is one of SQL dbs strengths
                        
    		            Considerations include 
                                    1. DynamoDB 
                                    2. MongoDB 
                                    3. CouchbaseDB
                                    
                    SIDE NOTE: A SQL database could probablly would be implemented when the applications 
                    data shape is more predictable. Unless the application is kept as a decoupled independent 
                    component of the backend.
                    
### Data Storage - A data storage for logs and backup files

                        Backup files should have a lower latency but log files can wait a bit
                        
                        Considerations include 
                                    1. S3 Glacier Instant Retrieval for the backup data 
                                    2. Glacier Deep Archive for the log data

### <ins> _**B) Should Haves**_</ins>
##### ***FUNCTIONAL Requirements*** 
- ###### _***User Interface***_ - Presentation should convey credibility & presentation should have a relativly modern look
 
            1. Implement Facebook or Google
            2. Use pre-built UI omponents
- ###### _***Data Handling***_ - System should capture data for analytics
 
            1. Log data from using a event driven approach
##### ***NON-FUNCTIONAL Requirements*** 
- ###### _***Data Handling***_ - System should be optimized for performance and resource allocation.

### Data Attributes - Documenting attributes of the data to be handled

            1. Data Types ---> Application will consist of User Data & Analytics Data
            2. Data Temperatures --->  Login = HOT, Registration = N/A, Analytics = WARM/HOT
                        A: Login - Hot because this data is accessed everytime the system is used by a user 
                        B: Registration - N/A
                        C: Analytics - Warm/Hot because its depending on what the analytics system 
                         needs (if using cookie tracking type ads data would be hot vs for more long term 
                         purpose like seasonal analytics)
                         
      	3. Data Access Patterns ---> Find a users profile[GET/READ], Create a user profile [POST/CREATE], 
      	            Update a user data[PUT/UPDATE]

### Reliability - Plan for how to design/arcitect the app to be highly reliable

    			1. Recoverability - For recoverability, I will backup data and files in AWS S3 and program scripts for potential mission critical application component failures
    				---> Application Level: write script for login failure, cache misses
    				---> Data Level: create and store backup files in s3
    				---> Infastructure Level: implement health checks

    			2. Availability - For availability, I will deploy the application on multiple virtual machines that failover/balance to multiple locations
    				---> Distribute traffic using a Load Balancer
    				---> Distribute traffic to other regions using DNS Active Passive Failover

    			3. Extensibility - For extensibility, I will build/design to make important components flexible and allow for services to be decoupled . This is why I initially came up with the idea for thi application.
    				---> Use clean coding, dependeency injection and design a using a loosly coupled arcitecture

    			4. Scalability - For scalability, I will build for a performant user experience that accomidateds a user/server usage bursts
    				---> Use automated horizontial scaling. This will allow me to have the capacity necessary when the application requires it while simultaniously optimizing for cost and resource allocation by automatically scaling down when the application doesnt need it.

    			5. Maintainability - For maintainability, I will initially build a small CICD pipeline to maintain application logic and infrastructure
    				---> Use Github for version control, Terraform for infastructure deployment. Maybe Jenkins for coordinating the jobs as the workloads increase and become more comprehnsive & Ansible for managing the servers as the virtial machine count scales out

                      6. Testability - For testability, I will test for load capacity, scalability, functionality.
                                ---> Use AutoCannon for testing load capacity, replicate Python bots to test for scalability, use Jest for functionality testing and Postman for route testing

    			7. Useability - For usability, I will build the app to accomadate different user contexts
    				---> Use HTTP Client Hints request headers to program scripts based of a users device compatibility and internet connectivity

    			8. Portability - For portability, I will build the app so that it can easily be ran on different platforms
    				---> Consider using Docker to containerization the application

### Performance - Plan for building the application to perform optimally
 
            Caching:---> For the login feature, use caching for faster data retrival
            CDN:---> Serve static files in the presentation layer from a CDN
            Load Balancing:---> For the both the login and registration, decided at what layer to balance the application load 

### Security - Plan for how I can secure the application at all 3 levels
             
             Application Level:---> Authentication and Authorization for users, API rate limiting
             Data Level:---> Use private subnets with gatweays, encrypt data at rest and in transit
             Infastructure Level:---> VPC with NAT and Internet gateways

### RiskMatrix - Plan for how to mitigate risk for mission critical components of the application
<p align="center"><img src="https://loginregistrationapp.s3.amazonaws.com/loginriskmatrix.PNG" alt="Alt text" title="Optional title"></p>

    	Login/Register:
    		Risk Value - 3A
    		Why - Will stop users from main purpose of application, will impact business
    		Plan - Solved with Avaliability at the infastructure/network level, failover methods at the database layer
    	
           Analytics Data Capture:
    	     	Risk Value - 3B
    		     Why - Will be hazardous to the business value but wont effect the top level/user purpose of the application
                        Plan - Decouple the analytics components into an application and have the login/registration application send data to a seperate analytics application

# 2. Designing The Arcitecture

##### Infrastructure Level 

            Build a private network. Use 2 subnets, 1 to house the application and 1 to house the cache engine cluster

##### ***Application level*** 

            Build a simple API that registers/logs in users and captures user data for analytics. House the app in the 
            private network

##### ***Data level***  
            
            Build a cache layer around the database layer

<p align="center"><img src="https://loginregistrationapp.s3.amazonaws.com/InfrastructreDiagram.jpg" alt="Alt text" title="Optional title"></p>

# 3. Formulating Stratagies And Selecting The Tools

### Infrastructure level

    	OBJECTIVE: Reliable infastructure, rapid building and deployment while being as cost efficent as possbbile
            
    	STRATEGY: an on-premisis network isnt feasible for the objective. Choosing a cloud deployment with a virtual 
            network and virtual machines solves this constraint for 3 reasons.
            
    		1. The building and deployment can be programatically automated solving for speed.
    		
    		2. Virtual resources can be rapidly scaled, replicated and backed up solving for reliability.
    		
    		3. Virtual resources/infrastructure can be built, destroyed, reduced or added to allowing for 
    		   efficient cost optimization

    	TOOLS: I will use Terraform because I can rapidly deploy cloud infastructre deployment and reliable 
            deployment modules provided by AWS.
            
    		Alternatives to building and deploying cloud infastructre would be
                        
    			1. Build from AWS console (slows down build and deployment, nothing automated)
    			
    			2. Build from Linux Bash shell script / AWS CLI (a good alternative but the 
    			required syntactical percision and having to build the script from scratch would 
                                    slow down the building and deployment process)
                                   
    			3. Build from AWS SDK (another good alternative because of its programmatic nature 
    			same and with CLI scripting, working with the AWS API having to build the program from 
                                    scratch would slow down the building and deployment process)
                                    
    			4. Build from alternative IaC tools (due to the simplistic nature of the application, 
    			most of the alternatives would work but the dont have AWS provided modules to eliminate 
                                    build and deployment corrections that may result from building from scratch)
    	Resources:
    		NETWROK: AWS VPC with subnets = a private network will allow for 2 things. Speed of data and 
                        communication. Security options for protecting the entire network and the resources nested inside them
                        
    		VIRTUAL MACHINES: EC2 instances = Virtual machines will be used to house the application
                        
    		MANAGED SERVICES: ElastiCache Redis cluster will be used for the caching layer
                        
    	Security:
    		Private Subnet = hold data resources in a private subnet with no outside internet access
    		Security Group Policies = establish security policies on virtual machines to govern 
                        transactions and limit chances for potentially threatning transations
                        
    		Nat Gateway = Allow only 1 way communication between data resources and public 
                        internet. Public internet will communicate with NAT Gateway only

### Application level

##### Programming Language:

    		1. I'll need a languange that has SDKs for cloud providers.
      
    		2. Due to time constraints, the application has to be built using a framework that either 
      fimilar or easy to learn.
      
    		3. The programming language should be oriented to simple application builds
      
    		4. The programming language should have a well established community behind 
      it to make problem solving research fast and efficient
      
    		I'll choose between Python and Nodejs and select NodeJS becaused I can write the frontend 
      and backend in the same language, less resource management and fimiliarity
                        
    		**Python may still be used later on for analytics and bot testing purposes

##### Presentation Layer: 
            
     OBJECTIVE: Quickly design a basic and flexible UI with modern look that serves content fast
                        
     STRATEGY: Choose a framework for designing UI components to give a modren look. A framework 
     will speed up code delivery becuse of prebuilt components and wont have to sacrafice not 
     having the quality of a modern looking app
                        
###### TOOLS:
     
     1.---> React with ChakraUI = React combines HTML, CSS & JS into one reducing time needed to 
     program while still solving for the modern look objective. React community is also big so 
     if theres trouble with UI, finding a solution shouldnt be difficult
     
     2.---> Cloudinary = Serves static content faster than reaching to a database solving for the 
     delivery speed objective

##### Application & Business Logic Layer
            
     OBJECTIVE: Program the code in a layered, flexible way to allow for easy rapid changes in code 
     because things will constantly change with the app for the first few months after deployment
                        
     STRATEGY: Use clean coding principals and dependency injection for application level resources 
      that can be swapped out based on use cases
                        
###### APPLICATION TOOLS:
      
      ---> Express: Express has good I/O handling which makes a really good for a user auth app which 
      will be a read/write heavy app. Express is used for quick deployment and has lots of compatibility 
      with Nodejs which reduces design complexity and time to code delivery
      
        **Alternatives**
      
         1. Serverless (a good alternative, especially for speed of deployment. The only constraint this 
         bring up is configuration fimiliary which would slow down production speed but otherwise a extremly 
       viable alternative)
       
         2. Other Nodejs frameworks (not as much of a community available for potential problems/troubleshooting 
         atp, time is too sensitive plus theres no easily identifiable solution they'd provide for this 
         particular business case)
    			
      ---> CORS & Body-Parser: Help with data moving between the presentation layer and the application layer
    		---> dotenv: Help with storing enviornment variables
    		
###### BUSINESS LOGIC TOOLS:
      
      ---> JSON Web Token, UUID & Cryptr = for Authenticating users and storing users data.
      ---> Cloudinary = Cloudinary is used for 3 reasons.
      
    				1. It allows for image manipulation that can be done on the front end during the profile pictyure upload.
        
    				2. In this application, its already used to serve static content so using it here will reduce the complexity 
        of resource utilization and managemnt, Ill use cloudinary to store user profile images.
        
    				3. It will also allow for user profile pictures to be rendered fast due to the nature of a global CDN
    				
    	 SECURITY: Rate limit at the API at tthe application layer

##### Data Level

###### Cache Layer & Databse Layer
    
     OBJECTIVE: I want to build scalable program that makes user data highly available and serves data 
     fast since the entire business case of this app depends on the storage and retrival of data
                                    
     STRATEGY: Build and design and caching layer over the database since the app heavily relies on reading 
     and writing. Build in fault tolerance at the database layer.
                                    
     CACHE LAYER TOOLS: Redis cluster thats highly available and can serve user data fast while protecting 
     the database. Remove some of the management of the cluster by using AWS Elasticache
                                    
     DATABASE LAYER TOOLS: MongoDB & DynamoDB
                                    
     SECURITY:
     
       Tokens: Tokenize data at the business logic layer rest making the data unavailable unless a user has 
       a specific token attached to that data
       
       SSL: Encrypt data to make data unavailable as it travels from source to destination
       
# 4. Building The Application

##### Testing / TTD
    * Started with TTD in the business logic layer
    * Wrote out users data flow and return values, step by step
    * Built test cases for each step in the user flow
    * Load testing with AutoCannon
|AutoCannon Load Test Script|AutoCannon Data Model for Analytics|
|:-:|:-:|
|![AutoCannon Load Test Script](https://loginregistrationapp.s3.amazonaws.com/autcannon1.PNG)|![AutoCannon Data Model for Analytics](https://loginregistrationapp.s3.amazonaws.com/loginloasttest.PNG)|

|Registration Test Snippet|Login Test Snippet|
|:-:|:-:|
|![Registration Test Snippet](https://loginregistrationapp.s3.amazonaws.com/registrationtests.PNG)|![Login Test Snippet](https://loginregistrationapp.s3.amazonaws.com/logintest.PNG)|
<p align="center"><img src="https://loginregistrationapp.s3.amazonaws.com/logininfrastructureterraform.PNG" alt="Alt text" title="Optional title"></p>
    
##### Application & Business Logic Layers
    * Transfer the test case logic into components of a function
    * Build out the the components into single-responsibility functions that return data that can be used in the next logical step of process
    * Combine those functions to work together produce a desired outcome
|API Path|API Routes|
|:-:|:-:|
|![API Path](https://loginregistrationapp.s3.amazonaws.com/api-path.PNG)|![API Routes](https://loginregistrationapp.s3.amazonaws.com/api-route.PNG)|
|Registration Controller|Login Controller|
|:-:|:-:|
|![Registration Controller](https://loginregistrationapp.s3.amazonaws.com/registrationtests.PNG)|![Login Controller](https://loginregistrationapp.s3.amazonaws.com/registration-controller.PNG)|
<p align="center"><img src="https://loginregistrationapp.s3.amazonaws.com/userflow1.PNG" alt="Alt text" title="Optional title"></p>
    
##### Infastructure Layer
    * Select VPC and subnet configurations (using Terraform)
    * Select an EC2 instance type and configurations to deploy application on (using Terraform)
<p align="center"><img src="https://loginregistrationapp.s3.amazonaws.com/logininfrastructureterraform.PNG" alt="Alt text" title="Optional title"></p>
    
##### Data Layer
    * MongoDB using dependency injection & DynamoDB using the "Builder Pattern" w/ SOLID principles
|Abstracting Away The Database...|By Using Dependency Injection|
|:-:|:-:|
|![Abstracting Away The Database...](https://loginregistrationapp.s3.amazonaws.com/cleancodelogin.PNG)|![By Using Dependency Injection](https://loginregistrationapp.s3.amazonaws.com/mongodbcode.PNG)|
|Builder Pattern|SOLID: Single Responsibility Functions|
|:-:|:-:|
|![Builder Pattern](https://loginregistrationapp.s3.amazonaws.com/frame.PNG)|![SOLID: Single Responsibility Functions](https://loginregistrationapp.s3.amazonaws.com/Functioncomponents.PNG)|
|Modularize Functionality|Intention Revealing Naming Conventions|
|:-:|:-:|
|![Modularize Functionality](https://loginregistrationapp.s3.amazonaws.com/tablebuilder.PNG)|![Intention Revealing Naming Conventions](https://loginregistrationapp.s3.amazonaws.com/sendtoawstable.PNG)|

    * Select capacity and configuration for the Redis cache node cluster 
<p align="center"><img src="https://loginregistrationapp.s3.amazonaws.com/logincachecluster.PNG" alt="Alt text" title="Optional title"></p>
<p align="center"><img src="https://loginregistrationapp.s3.amazonaws.com/redisclusterconnection.PNG" alt="Alt text" title="Optional title"></p>


# 5. Alternative Architectures and Evaluating The Application
    * AWS API Gateway, Lambdas, DynamoDB with DAX Accelerator for caching and SNS for triggering events for analytics
    * Google Cloud Functions, NextJS, Vercel


