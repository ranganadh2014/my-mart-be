## Brief Introduction
A Simple fully functional E-commerce website frontend is implemented. 
Feature List:
* Customer registration using E-mail ID & Password
* Login feature using Email & Password
* Product listing page & Open Project description page 
* Purchase any particular product using 'Buy Now' option
* Razorpay payment gateway has been integrated. User can purchase products using multiple payment options - UPI, Card, NetBanking etc.
* Customer can check the orders list with payment status. 

## Next Phase Features
* Pagination features in Product listing
* Filter, Search features
* Cart feature to purchase multiple products in single order. 

## Tech stack
* Typescript 
* NestJS (NodeJS/Express) Framework
* Postgres SQL for Data store
* Prisma ORM
* PassportJS for authentication
* Razorpay payment gateway JS module

## Dependencies
* Latest verson NodeJS
* Postgres database
* Prisma

## Build & Run Steps Locally 
* Install Postgres databse and set the user credentials.   
```bash
    docker run --name postgresql \ 

    -e POSTGRES_USER=<username> \ 

    -e POSTGRES_PASSWORD=<password> \ 

    -p 5432:5432 \ 

    -v /data:/var/lib/postgresql/data \ 

    -d postgres:alpine 
```
* Install the latest NodeJS
* Install required node packages inside project folder
`npm install`
* Set all the valid data to .env file. .env.example is provided for reference  
  + PORT set appropriate server listening port. 
  + DATABASE_URL="postgresql://<username>:<password>@localhost:5432/<database-name>?schema=public"
  + JWT_SECRET (Generate random JWT secret)
  + JWT_EXPIRATION (set expiration time - e.g. 10h)
  + RAZOR_PAY_KEY_ID & RAZOR_PAY_KEY_SECRET - Create Razorpay account and generate key id and secret
  + WEBHOOK_SECRET - random string. Same string needs to be used while configuring webhook in Razorpay account
  + THROTTLE_TTL & THROTTLE_LIMIT - used for rate limiter. You can use example data provided or configure as per your need  
* Database, table creation and data seeding can be done using Prisma tool  
  * `npx prisma migrate deploy`
  * Generate prima client code `npx prisma generate`
  * You edit the products related in data in 'data/products-dataset.ts' as per your need or default data can be used as is. 
  * Database seeding with products related data `npx prisma db seed`

* Build
`npm run build`
* Install PM2 Node process manager and launch backend server using following steps  
  * `sudo pm2 start dist/src/main.js --name <process-name>`
  * Check whether service is running by `sudo pm2 list` 
  * Save the service configuration `sudo pm2 save`  
  * Create system service so that service will be launched during system bootup `sudo pm2 startup`
  * Enable service `sudo systemctl enable pm2-root`
  * Start the service `sudo systemctl start pm2-root`
  * Check the status of the service `systemctl status pm2-root`

## Cloud Hosting - EC2
Same steps mentioned in the 'build & run' is applicable to EC2 instance. Assign Elastic IP to EC2 so that you can get the fixed Public IP always. 

NOTE: Configure your frontend environmental variable with the backend hosted URL. 