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
```
Clone this repository using `git clone https:github.com/Samueltommzy/Hostel-booking.git`
```
```
Navigate to the repository root directory and run the comman `npm install`
```
```
Ensure you have your postgres database running visit [Postgres Documentation](https://www.postgresql.org/docs/9.3/tutorial-install.html) for more on this
```
```
Update the database variables in *config/config.js* file
```
```
Run the command `node db createRoomTable` from the database folder directory.This command helps to create the room table in your postgres database
```
## Start the app

* Start the application by runnin `npm start` command

## Testing

* Test the app using `npm test` command

## Documentation

For ease of understanding the endpoints in this api,i created a documentation available at [Documentation](https://documenter.getpostman.com/view/1711361/SzYW2L7R)
 

## Todos

* Enable socket connection for admin to view live bookings
* Write unit test for all controllers
* Docker