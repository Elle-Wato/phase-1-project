## Description
This repository contains the source code for an Assignment Tracker which is a simple web application designed to help users track their class assignments. Users can view a list of assignments, and mark them as complete, which will remove them from the list. The application uses a JSON file as the database and runs on a local server.


## Features
1. Add Assignment: One can add assignment with details for it to display on the page.
2. View Assignments: Displays a list of class assignments with details such as subject, title, and due date.
3. Delete: Allows users to delete completed assigments, which removes them from the list.

## Technologies Used.
- HTML
- CSS
- JavaScript
Frontend: HTML, CSS, JavaScript
Backend: Node.js, Express.js, json-server
Database: db.json (served by json-server)

## Project Setup
- Create a new project folder.
- Clone the repository
- Navigate to the right directory.
- Click code . and you will be directed to the VS Code.
- In the terminal install the JSON server;
   npm install json-server
- Start JSON Server;
   npx json-server --watch db.json


## Usage
- Viewing Assignments: The list of assignments will be displayed when you load the page
- Completing Assignments: Click the "Complete Assignment" button next to an assignment to mark it as complete. This will remove it from the list.

## Commit to the Github repository
In your terminal; 
- Git add . 
- Git commit -m "Add message" 
- Git push