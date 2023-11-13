# BrewApps_assignment

Deployment Link(By AWS Linux server)(disable right now) : http://43.204.237.46:8500/

Deployment Link(On render) : https://brewapps-hp0q.onrender.com/

```markdown
## Local Setup

### Prerequisites

Before you begin, ensure you have the following software and tools installed on your system:

- **Node.js**: Download it from [nodejs.org](https://nodejs.org/).

- **MongoDB**: Install MongoDB from [mongodb.com](https://www.mongodb.com/).

### Step 1: Clone the Repository

1. Open your terminal or command prompt.

2. Change the current working directory to the location where you want to store the project.

3. Run the following command to clone the repository:

```bash
git clone <repository-url>
```

Replace `<repository-url>` with the actual URL of your Git repository.

### Step 2: Install Required Node.js Packages

1. Navigate to the project directory:

```bash
cd <project-folder-name>
```

Replace `<project-folder-name>` with the name of the directory where you cloned the repository.

2. Install the required Node.js packages:

```bash
npm install
```

### Step 3: Set Up Environment Variables

1. Create a `.env` file in the project's root directory to store environment variables.

2. Define the following environment variables in the `.env` file:

```plaintext
PORT=3000
MONGO_URI=mongodb://localhost:27017/your-database-name
```

- **PORT**: Set your desired local server port.

- **MONGO_URI**: Replace it with your local MongoDB URL.

### Step 4: Start the Development Server

1. Ensure your local MongoDB server is running.

2. Start the development server:

```bash
npm start
```

### Step 5: Testing the API

To test the API endpoints locally, you can use a tool like Postman or issue HTTP requests using `curl` from the command line. Detailed information about the available endpoints is provided in the API documentation.

## API Documentation

## Root Route

- Route: `/`
- Method: GET
- Description: This is the root route and serves as a basic check to ensure that the server is running. It responds with the message "Brew_App_Assignment."

## User Routes

### Register User

- Route: `/user/register`
- Method: POST
- Description: This route is used to register a new user. It expects the following parameters in the request body: `email`, `name`, and `password`. If any of these parameters are missing, it will return a "Missing required fields" error. If the user with the provided email already exists, it returns a "User already exists" error. If registration is successful, the user's password is securely hashed, and the user's data is saved in the database.

### Login User

- Route: `/user/login`
- Method: POST
- Description: This route is used to authenticate a user and issue a JSON Web Token (JWT) for further access. It expects the `email` and `password` parameters in the request body. If any of these parameters are missing, it returns a "Missing required fields" error. If the provided email does not match any existing user, it returns an "You have to register first" error. If the password is invalid, it returns an "Invalid password" error. Upon successful authentication, it generates a JWT and sends it in the response.

## Books Routes

### Get All Books

- Route: `/books`
- Method: GET
- Description: This route fetches all the books available in the database and responds with an array of book objects, each containing `author`, `title`, and `summary` fields.

### Add a New Book

- Route: `/books`
- Method: POST
- Middleware: `authentication`
- Description: Authenticated users can use this route to post a new book. It expects the following parameters in the request body: `author`, `title`, `summary`. The `userId` is automatically assigned based on the authenticated user. If the user is not authenticated, it returns an "Unauthorized" error. If the user is authenticated, the new book is added to the database, and the book details are returned.

### Get a Book by ID

- Route: `/books/:bookId`
- Method: GET
- Description: This route allows users to retrieve the details of a specific book by providing its ID as a parameter in the URL. It responds with the book's `title`, `author`, and `summary`.

### Update Book Details

- Route: `/books/:bookId`
- Method: PATCH
- Middleware: `authentication`
- Description: This route is used to update the details of a book. Users need to be authenticated to access this route. It expects the book's ID in the URL parameter and the updated book details in the request body. If the user is the owner of the book, the book's details are updated and returned. Otherwise, it returns an "Unauthorized" error.

### Delete a Book

- Route: `/books/:bookId`
- Method: DELETE
- Middleware: `authentication`
- Description: Authenticated users can use this route to delete a book by providing its ID as a parameter in the URL. If the user is the owner of the book, the book is deleted from the database, and a "Book deleted" message is sent as a response. If the user is not the owner, it returns an "Unauthorized" error.

## Error Handling

- Any route not matched by the defined routes will result in a "This route does not exist" error using the `createHttpError.NotFound` function.

- General error handling middleware is in place to handle and respond to errors. It sets the HTTP status code based on the error, sends an error message in the response, and logs the error details.
