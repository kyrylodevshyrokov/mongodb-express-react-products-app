# Online Shop Application

## About

This project is a small online store where registered users can view, purchase, add, and modify products. 

## Features

- Users can register, log in and log out in the online store.
- Registered users can perform full CRUD operations on store products.

## Technologies

- **Express:** a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- **MongoDB:** a source-available, cross-platform, document-oriented database program.
- **MongoDB Atlas:** the Cloud-Native Document Database as a Service.
- **React:** a free and open-source front-end JavaScript library for building user interfaces based on components.

## Getting Started

1. Clone the repository locally to your machine.
2. Run the command `npm install` to download all project dependencies.
3. Fill `.env` file. Here is an example:
```javascript
PORT=3000
MONGO_DB_URL=your_mongo_db_atlas_url
```
4. Start the server side of the application with the command `npm run start:server`.
5. In a new terminal, start the client side of the application with the command `npm start`. The frontend part of the application will be available on port 3100.

## API Endpoints

### _Auth And Users_

### Register

- Method: **POST**
- URL: {{URL}}/signup
- Data:
```javascript
{
    "email": "john@gmail.com",
    "password": "password"
}
```
- Requires Auth: **NO**
- Description: This endpoint enables users to register by sending a POST request containing their chosen email and password.

### Authenticate

- Method: **POST**
- URL: {{URL}}/login
- Data:
```javascript
{
    "email": "john@gmail.com",
    "password": "password"
}
```
- Requires Auth: **NO**
- Description: This endpoint enables users authenticate by sending a POST request with their email and password; upon successful authentication, the server returns a JSON object containing an access token.

### _Products_

### Get All Products

- Method: **GET**
- URL: {{URL}}/products
- Requires Auth: On the backend - **NO**, on the frontend - **YES**
- Description: This endpoint allows authenticated users to get list of all products in the shop.

### Get Product By ID

- Method: **GET**
- URL: {{URL}}/products/:id
- Requires Auth: On the backend - **NO**, on the frontend - **YES**
- Description: This endpoint allows authenticated users to get details about one product by ID.

### Add New Product

- Method: **POST**
- URL: {{URL}}/products
- Data:
```javascript
{
    "name": "A book",
    "price": "20.50",
    "image": "book.jpg",
    "description": "That is a must-read book!"
}
```
- Requires Auth: On the backend - **NO**, on the frontend - **YES**
- Description: This endpoint allows authenticated users to add a new product to online shop with filled following fields: name, price, image, and description.

### Edit Product By ID

- Method: **PATCH**
- URL: {{URL}}/products/:id
- Data:
```javascript
{
    "name": "A book",
    "price": "20.50",
    "image": "book.jpg",
    "description": "That is a must-read book!"
}
```
- Requires Auth: On the backend - **NO**, on the frontend - **YES**
- Description: This endpoint allows authenticated users to edit the product by changing name, price, image, or/and description.

### Delete Product By ID

- Method: **DELETE**
- URL: {{URL}}/products/:id
- Requires Auth: On the backend - **NO**, on the frontend - **YES**
- Description: This endpoint allows authenticated users to delete the product by ID.
