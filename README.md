# Task Manager API Documentation

This Task Manager API is designed to provide CRUD (Create, Read, Update, Delete) operations for managing tasks. It also includes user authentication using JSON Web Tokens (JWT) to ensure secure access to the API endpoints. Below is a detailed documentation of the API functionalities, design decisions, and technologies used.

## API Endpoints

1. **Task Endpoints**

   - **GET /api/tasks**: Retrieve all tasks.
   - **GET /api/task/:taskId**: Retrieve a specific task by ID.
   - **POST /api/task**: Create a new task.
   - **PUT /api/task/:taskId**: Update an existing task.
   - **DELETE /api/task/:taskId**: Delete a task.

2. **User Authentication Endpoints**

   - **POST /api/user/register**: Register a new user.
   - **POST /api/user/login**: Login user and generate JWT token.
   - **POST /api/users**: Retrieve all users.

## User Schema

Each user object has the following properties:

- User Name
- Email
- Password

## Task Schema

Each task object has the following properties:

- Title
- Description
- Due Date
- Status (COMPLETED or NOT_COMPLETED)

## User Authentication

- User registration requires a unique email and a password. Passwords are securely hashed using bcrypt before storing in the database.
- User login generates a JWT token, which is required for accessing authenticated routes.

## Error Handling

- The API implements proper error handling for common scenarios such as invalid input, unauthorized access, and resource not found.
- Meaningful error messages are returned in the API responses to aid developers in debugging.

## Database Integration

- MongoDB is chosen as the database for storing task and user data.
- The database schema is designed to efficiently store and retrieve tasks.

## Technologies Used

- Node.js: A JavaScript runtime environment for building server-side applications.
- Express.js: A web application framework for Node.js used to build RESTful APIs.
- MongoDB: A NoSQL database used for storing task and user data.
- Mongoose: An Object Data Modeling (ODM) library for MongoDB and Node.js used for database integration.
- JSON Web Tokens (JWT): Used for user authentication and generating secure tokens.
- bcrypt: A library for securely hashing passwords before storing them in the database.

## Additional Features

- Function Comments: Each function in the codebase is extensively commented to provide clear documentation of its purpose, parameters, return values, and usage. This enhances code readability and makes it easier for developers to understand and maintain the code.
- Modularization: The codebase is structured into separate modules for better organization, scalability, and maintainability.
- Middleware: Middleware functions are used for authentication, input validation, and error handling to improve code readability and maintainability.

## Logout Handling

In this project, user authentication is implemented using JSON Web Tokens (JWT). While traditional session-based authentication systems often include a logout functionality to invalidate user sessions, JWT tokens are stateless and don't require server-side storage. As a result, there is no built-in logout mechanism in the API.

However, clients can handle logout by clearing the JWT token from the client-side storage (e.g., localStorage or sessionStorage).

## Deployment

The API is deployed on a free platform for testing purposes. You can access the endpoints using a tool like Postman to interact with the API.

**Repository URL**: [GitHub Repository](https://github.com/shivam-singh-au17/assessment-sassy)

**API URL**: [API Endpoint](https://task-manager-x0to.onrender.com/api)

## Postman Collection and Environment

To interact with the API using Postman, you can download & import the provided collection and environment file links.

- [Postman Collection File](https://github.com/shivam-singh-au17/assessment-sassy/blob/master/assessment-sassy.postman_collection.json)
- [Postman Environment File](https://github.com/shivam-singh-au17/assessment-sassy/blob/master/assessment-sassy.postman_environment.json)


## How to Run the Project Locally

1. Ensure you have Node.js installed on your machine. You can download it from [here](https://nodejs.org/).

2. Clone or download the repository containing the game files to your local machine.
```
git clone https://github.com/shivam-singh-au17/assessment-sassy.git
```

3. Open your terminal or command prompt and navigate to the directory where you have downloaded the game files.

4. Run the following command to install dependencies:
```
npm install
```

5. Once the dependencies are installed, run the following command to start the game:
```
npm start
```

Feel free to explore the API and provide feedback or suggestions for improvement. Thank you for your attention!