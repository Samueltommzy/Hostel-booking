# Hostel Management and Booking API

This is a room management and booking Rest API

## Technologies

* Javascript - Programming Language
* NodeJs     - Server Side 
* Postgresql - Dtabase
* Express    - Web server framework used
* Mocha,chai - Unit and e2e Testing
* npm        - Dependency management

## Getting started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
```
Git
```

```
NodeJs
```
```
Postgres
```
### Installation

* Clone this repository using `git clone https:github.com/Samueltommzy/Hostel-booking.git`
* Navigate to the repository root directory and run the command `npm install`
* Ensure you have your postgres database running visit [Postgres Documentation](https://www.postgresql.org/docs/9.3/tutorial-install.html) for more on this
* Update the database variables(user and password) in *config/config.js* file with your postgres data

## Start the app
* Run the pre-start script using `npm run pre-start` command.This command helps set up the database and room table on your local machine
* Start the application by running `npm run start` or `npm run start-dev` command

## Testing
* Run the pre-test script using `npm run pre-test` command.This command helps set up a mock database and room table for test on your local machine
* Test the app using `npm run test` command

## Documentation

For ease of understanding the endpoints in this api,i created a documentation available at [Documentation](https://documenter.getpostman.com/view/1711361/SzYW2L7R)
 

## Todos

* Enable socket connection for admin to view live bookings
* Complete e2e testing for 400,401,404 cases
* Write unit test for all controllers
* Docker