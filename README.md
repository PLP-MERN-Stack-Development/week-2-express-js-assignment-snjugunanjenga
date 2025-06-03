[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=19698458&assignment_repo_type=AssignmentRepo)
# Express.js RESTful API Assignment

This assignment focuses on building a RESTful API using Express.js, implementing proper routing, middleware, and error handling.

---

## Instructions

### How to Run the Server

1. **Clone the repository**  
   ```
   git clone <your-repo-url>
   cd week-2-express-js-assignment-snjugunanjenga
   ```

2. **Install dependencies**  
   ```
   npm install
   ```

3. **Start the server**  
   ```
   npm start
   ```
   The server will run on `http://localhost:3000` by default.

---

## API Documentation

### Endpoints

| Method | Endpoint                       | Description                        |
|--------|-------------------------------|------------------------------------|
| GET    | `/api/products`               | Get all products                   |
| GET    | `/api/products/:id`           | Get a specific product             |
| POST   | `/api/products`               | Create a new product               |
| PUT    | `/api/products/:id`           | Update a product                   |
| DELETE | `/api/products/:id`           | Delete a product                   |
| GET    | `/api/products/stats`         | Get product statistics             |

#### Query Parameters

- `category` (string): Filter products by category
- `search` (string): Search products by name/description
- `page` (number): Pagination page number
- `limit` (number): Number of products per page

---

## Example Requests & Responses

> Replace screenshots below with your actual screenshots of Postman or your API client.

### 1. Get all products

**Request:**  
`GET /api/products`

**Response:**  
Status: 200 OK  
```json
[
  {
    "id": "1",
    "name": "Laptop",
    "category": "electronics",
    "price": 1200
  },
  ...
]
```
![GET all products screenshot](screenshots/get-all-products.png)

---

### 2. Filter by category

**Request:**  
`GET /api/products?category=electronics`

**Response:**  
Status: 200 OK  
```json
[
  {
    "id": "1",
    "name": "Laptop",
    "category": "electronics",
    "price": 1200
  }
]
```
![GET products by category screenshot](screenshots/get-products-category.png)

---

### 3. Search by keyword

**Request:**  
`GET /api/products?search=laptop`

**Response:**  
Status: 200 OK  
```json
[
  {
    "id": "1",
    "name": "Laptop",
    "category": "electronics",
    "price": 1200
  }
]
```
![GET products by search screenshot](screenshots/get-products-search.png)

---

### 4. Pagination

**Request:**  
`GET /api/products?page=1&limit=2`

**Response:**  
Status: 200 OK  
```json
[
  { "id": "1", "name": "Laptop", ... },
  { "id": "2", "name": "Phone", ... }
]
```
![GET products paginated screenshot](screenshots/get-products-paginated.png)

---

### 5. Get a specific product

**Request:**  
`GET /api/products/1`

**Response:**  
Status: 200 OK  
```json
{
  "id": "1",
  "name": "Laptop",
  "category": "electronics",
  "price": 1200
}
```
![GET product by ID screenshot](screenshots/get-product-by-id.png)

---

### 6. Get non-existent product

**Request:**  
`GET /api/products/nonexistent-id`

**Response:**  
Status: 404 Not Found  
```json
{
  "error": "Product not found"
}
```
![GET product not found screenshot](screenshots/get-product-notfound.png)

---

### 7. Create a new product

**Request:**  
`POST /api/products`  
Body:
```json
{
  "name": "Tablet",
  "category": "electronics",
  "price": 500
}
```

**Response:**  
Status: 201 Created  
```json
{
  "id": "3",
  "name": "Tablet",
  "category": "electronics",
  "price": 500
}
```
![POST create product screenshot](screenshots/post-create-product.png)

---

### 8. Create product (missing required field)

**Request:**  
`POST /api/products`  
Body:
```json
{
  "category": "electronics"
}
```

**Response:**  
Status: 400 Bad Request  
```json
{
  "error": "Name and price are required"
}
```
![POST create product validation error screenshot](screenshots/post-create-product-error.png)

---

### 9. Update a product

**Request:**  
`PUT /api/products/1`  
Body:
```json
{
  "name": "Laptop Pro",
  "category": "electronics",
  "price": 1500
}
```

**Response:**  
Status: 200 OK  
```json
{
  "id": "1",
  "name": "Laptop Pro",
  "category": "electronics",
  "price": 1500
}
```
![PUT update product screenshot](screenshots/put-update-product.png)

---

### 10. Update non-existent product

**Request:**  
`PUT /api/products/nonexistent-id`  
Body:
```json
{
  "name": "Nonexistent",
  "category": "electronics",
  "price": 100
}
```

**Response:**  
Status: 404 Not Found  
```json
{
  "error": "Product not found"
}
```
![PUT update product not found screenshot](screenshots/put-update-product-notfound.png)

---

### 11. Delete a product

**Request:**  
`DELETE /api/products/1`

**Response:**  
Status: 204 No Content  
_No body_
![DELETE product screenshot](screenshots/delete-product.png)

---

### 12. Delete non-existent product

**Request:**  
`DELETE /api/products/nonexistent-id`

**Response:**  
Status: 404 Not Found  
```json
{
  "error": "Product not found"
}
```
![DELETE product not found screenshot](screenshots/delete-product-notfound.png)

---

### 13. Get product statistics

**Request:**  
`GET /api/products/stats`

**Response:**  
Status: 200 OK  
```json
{
  "totalProducts": 5,
  "averagePrice": 800,
  "categories": {
    "electronics": 3,
    "clothing": 2
  }
}
```
![GET product stats screenshot](screenshots/get-product-stats.png)

---

## Testing

Inspect the **Test Results** tab for each request in your API client (e.g., Postman).  
All tests should pass.

---

## Resources

- [Express.js Documentation](https://expressjs.com/)
- [RESTful API Design Best Practices](https://restfulapi.net/)
- [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)