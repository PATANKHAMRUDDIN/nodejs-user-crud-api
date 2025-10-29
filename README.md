# User Management CRUD API

This is a simple REST API for managing user records, built with Node.js and Express.js. User data is stored in a `users.json` file.

## Prerequisites

- Node.js (v14 or higher)

## Installation

1.  Clone the repository:
    ```bash
    git clone <your-repo-url>
    ```
2.  Navigate to the project directory:
    ```bash
    cd user-crud-api
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```

## Running the Application

To start the server, run:
```bash
node server.js
```
The server will be running on `http://localhost:3000`.

## API Endpoints

### 1. Get All Users

- **Endpoint:** `GET /users`
- **Response (200 OK):**
  ```json
  [
    {
      "id": "1",
      "name": "Jane Doe",
      "email": "jane.doe@example.com"
    }
  ]
  ```

### 2. Create New User

- **Endpoint:** `POST /users`
- **Request Body (JSON):**
  ```json
  {
    "name": "New User",
    "email": "new.user@example.com"
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "id": "a1b2c3d4-...",
    "name": "New User",
    "email": "new.user@example.com"
  }
  ```

### 3. Update User

- **Endpoint:** `PUT /users/:id`
- **Request Body (JSON):**
  ```json
  {
    "name": "Updated Name"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "id": "1",
    "name": "Updated Name",
    "email": "jane.doe@example.com"
  }
  ```

### 4. Delete User

- **Endpoint:** `DELETE /users/:id`
- **Response (200 OK):**
  ```json
  {
    "message": "User deleted successfully"
  }
  ```

## Error Responses

- **400 Bad Request:** Missing or invalid request body.
- **404 Not Found:** User with the specified ID was not found.
- **500 Internal Server Error:** A problem occurred on the server.
