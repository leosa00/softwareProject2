# Project 2: Quiz App

## Introduction
This project allows users to interact with a quiz application. Users can create topics and questions for quizzes. The application requires users to create an account and log in for certain functionalities.

## Features
- **Account Creation and Login**: Users must register and log in to access full functionality.
- **Quiz Participation**: Users can use the quiz functionality and their asnwers will be stored.
- **Topic Management**: Creating and managing topics requires admin privileges.
- **Main Page Navigation**: The main page provides links to all functionalities of the website.

## Access
- The project is live at (https://websoft2app.fly.dev/).

## Local Setup
To run the project locally:
In order to run the project locally, navigate to the softwaredevproject2 folder and build the project with the command
docker-compose build. After running this you can run the project with docker-compose up. The projects end-to-end tests can be run locally with the command docker compose run --entrypoint=npx e2e-playwright playwright test && docker compose rm -sf.