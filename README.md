# Library Project
This is a web application for managing books and users in a library. The application is built using Node.js, Express.js, and MongoDB. Authentication and authorization are implemented using cookies and JWT.

Installation
Clone the repository: git clone https://github.com/Khaja-Baig/Library-with-Express.js---MongoDB.git
Install dependencies: npm install
Set up environment variables:
MONGODB_URI: the connection string for your MongoDB database
JWT_SECRET: a secret key for signing and verifying JWT tokens
Start the server: npm start

Usage
Authentication
To access the CRUD operations for books and users, you need to be authenticated as the owner. You can authenticate by sending a POST request to the /api/auth/login endpoint with a JSON body containing your email and password:

json
Copy code
{
  "email": "owner@example.com",
  "password": "your-password"
}
If the email and password match an existing owner account, the server will respond with a JWT token that you can use to make authenticated requests. You should store the token in a cookie or client-side storage.

To log out, send a GET request to the /api/auth/logout endpoint.

Books
The following endpoints are available for managing books:

GET /api/books: retrieve a list of all books
POST /api/books: create a new book
GET /api/books/:id: retrieve a specific book by ID
PUT /api/books/:id: update a specific book by ID
DELETE /api/books/:id: delete a specific book by ID
To make an authenticated request, include the JWT token in an Authorization header:

makefile
Copy code
Authorization: Bearer your-jwt-token
The request body for creating and updating a book should be a JSON object with the following properties:

json
Copy code
{
  "name": "The Catcher in the Rye",
  "author": "J.D. Salinger",
  "publishedYear": 1951,
  "description": "A classic novel about teenage angst and alienation."
}
Users
The following endpoints are available for managing users:

GET /api/users: retrieve a list of all users
POST /api/users: create a new user
GET /api/users/:id: retrieve a specific user by ID
PUT /api/users/:id: update a specific user by ID
DELETE /api/users/:id: delete a specific user by ID
The request body for creating and updating a user should be a JSON object with the following properties:

json
Copy code
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "password",
}
License
This project is licensed under the MIT License. See the LICENSE file for details.

Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
