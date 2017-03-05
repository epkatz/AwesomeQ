AwesomeQ
===

A simple queuing system based on Amazon's Simple Queuing System

AwesomeQ allows multiple producers to write and read from it.

### Running Server
npm install
npm run-script run

### Running cron
cd cron
npm install
npm run-script run

### Running Producer 
cd producer
npm install
npm run-script run

### Running Consumer
cd consumerg
npm install
npm run-script run


#### API
base url: https://localhost:3000/messages/

List Current Messages
GET: /list

Add Message
POST: /add
Parameters:
    message: string

Get Message
GET /get

Delete Message
POST /delete
Parameters:
    id: string

Cleanup Pending Messages
GET /cleanup