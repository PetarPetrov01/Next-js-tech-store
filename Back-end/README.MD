# Tech store REST API

This document serves as a reference guide for the REST API, which offers access to a comprehensive collection of tech product data. It enables developers to integrate product information and functionality seamlessly into their applications.

The API is dockerized and uses PostgreSQL as its database.

## Authentication

### Register

To create a new user, send a `POST` request to `/api/auth/register` with the required details: `firstName`, `lastName`, `username`, `email`, and `password`. Each field must meet specific validation criteria. 

#### Register validation

- `firstName`, `lastName` and `username`  - Must be a string with at least 3 characters.
- `email` - Must be in a valid email format.
- `password` - Must be a string with at least 6 characters.

#### Example regsiter request
Upon a successful login request, the service generates an encrypted `authToken` and a new unique `id` for the user. The browser is insturcted to store the `authToken` in an HTTP-only cookie and the server returns a user object in the response body that includes the newly generated id and other user details.

```
POST /api/auth/register
Content-Type: application/json
```

Request body:

```json
{
  "firstName": "string",
  "lastName": "string",
  "username": "string",
  "email": "string",
  "password": "string"
}
```

#### Example regsiter response

If the request is successful the server responds with status code `200` and the following object:

```ts
{
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  image: string | null;
}
```

> [!NOTE]  
> If the request fails the server responds with a corresponding status code and error response. The response body may either be a single object with a `message` property (containing a string) or an array of such objects, where each object has its own `message` property.

#### Example register error response

```json
{
  "message": "This email is already taken"
}
```

Or

```json
[
  {
    "message": "firstName - Must be atleast 3 characters long"
  },
  {
    "message": "lastName - Must be atleast 3 characters long"
  }
]
```

### Login

To log in as an already created user send `POST` request to `/api/auth/login`. The service authenticates the user and returns the same object as in the [register response](#example-regsiter-response)

#### Example login request

```
POST /api/auth/login
Content-Type: application/json
```

Request body:

```json
{
  "email": "string",
  "password": "string"
}
```

#### Example login response

The service responds with the object similar to what is found in the [registration](#example-regsiter-response) process. If the login request fails, the response follows the same error format as in the [registration process](#example-register-error-response). 

### Validate

If the current session needs to be validated, send a `GET` request to `/api/auth/validate`, including the stored authentication cookie with the request. The server will check the token contained in this cookie:
- If the token is valid, the server returns the user information in the same format as the registration and login responses, including the user's unique id and other details.
- If the token is invalid or expired, the server responds with an error, indicating that re-authentication is required and instructs the browser to remove the cookie.
