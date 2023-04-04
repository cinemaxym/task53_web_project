# Web Project API

This API allows users to view, add, update, and delete web projects. The API can be tested using Postman, a popular tool for API development.

## Usage

To use the API, you can send HTTP requests to the following endpoints:

- `GET /api`: Returns an array of all web projects.
- `POST /api/:title/:description/:URL`: Adds a new web project with the specified title, description, and URL. Returns the new web project object.
- `DELETE /api/:id`: Deletes the web project with the specified ID. Returns a success message if the project was deleted, or an error message if the project does not exist.
- `PUT /api/:id/:title/:description`: Updates the title and description of the web project with the specified ID. Returns the updated web project object.

## Testing with Postman

To test the API using Postman, follow these steps:

1. Install Postman if you haven't already.
2. Open Postman and create a new request.
3. Select the HTTP method you want to use (e.g., GET, POST, DELETE, PUT).
4. Enter the API endpoint you want to test (e.g., `http://localhost:8080/api`).
5. Add any required parameters or headers to the request.
6. Click "Send" to send the request to the API.
7. View the response from the API in the "Response" tab.

Here are some sample requests you can use to test the API:

**GET /api**

Endpoint: `http://localhost:8080/api`
Method: GET
Headers: None
Body: None

**POST /api/:title/:description/:URL**

- Endpoint: `http://localhost:8080/api/My%20Project/This%20is%20my%20project/https://example.com`
- Method: POST
- Headers: None
- Body: None

**DELETE /api/:id**

- Endpoint: `http://localhost:8080/api/1`
- Method: DELETE
- Headers: None
- Body: None

**PUT /api/:id/:title/:description**

- Endpoint: `http://localhost:8080/api/1/My%20Updated%20Project/This%20is%20my%20updated%20project`
- Method: PUT
- Headers: None
- Body: None