# Celebrity Recognition Web Application

A web application that utilizes a celebrity recognition API to identify celebrities in photos provided via URL links. The application allows users to paste a link to an image from the internet, and it returns the name of the recognized celebrity in the photo.

## Features

- Frontend development using HTML, CSS, and React to provide a seamless user experience.
- Backend development with Node.js to handle user requests and communicate with the celebrity recognition API.
- Integration with a celebrity recognition API to analyze images and provide accurate celebrity identification.
- User authentication and authorization functionalities for secure access to the web application.

In addition to the frontend and backend development, the backend utilizes PostgreSQL as the database to securely store user data and enable user login functionality.

## Getting Started

Follow these steps to run the project on your local machine:

1. Clone this repository.
2. Run `npm install`
3. Run `npm start`
4. You must add your own API key in the `App.js` file to connect to Clarifai API
5. Add your own database credentials in the `server.js` file

** Make sure you use PostgreSQL for this code base.

