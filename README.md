# 🔗 Short-URL API

A free, open-source URL shortener API built with Node.js, Express, and MongoDB. Perfect for developers who need URL shortening functionality without building it from scratch.

## ✨ Features

- 🚀 **Simple API** - RESTful endpoints for URL management
- 🔐 **JWT Authentication** - Secure token-based access
- 📊 **Analytics** - Track URL visit history
- 🛡️ **Password Hashing** - Bcrypt for secure storage
- 🌐 **CORS Enabled** - Works across different domains
- 📦 **Environment Config** - Easy deployment configuration
- 🔄 **Bearer Token Support** - Standard Authorization header

---

## 🚀 Quick Start

### Prerequisites
- Node.js >= 14.0.0
- MongoDB Atlas account (free tier available)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/short-url-api.git
   cd short-url-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your values:
   ```env
   PORT=8001
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/Short_Url
   JWT_SECRET=your_super_secret_jwt_key_here
   ```

4. **Start the server**
   ```bash
   npm run dev
   ```

   Server runs at `http://localhost:8001`

---

## 📚 API Endpoints

### 1. **User Registration**
Create a new user account

**Endpoint:** `POST /user/signup`

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response (201):**
```json
{
  "message": "User created successfully",
  "user": {
    "id": "userId",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "NORMAL"
  }
}
```

---

### 2. **User Login**
Authenticate and get JWT token

**Endpoint:** `POST /user/login`

**Request:**
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "userId",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "NORMAL"
  }
}
```

---

### 3. **Create Short URL**
Generate a shortened URL (requires authentication)

**Endpoint:** `POST /url`

**Headers:**
```
Authorization: Bearer <your_jwt_token>
Content-Type: application/json
```

**Request:**
```json
{
  "url": "https://example.com/very/long/url/that/needs/shortening"
}
```

**Response (201):**
```json
{
  "message": "Short URL created successfully",
  "shortID": "abc123xyz",
  "shortURL": "http://localhost:8001/abc123xyz",
  "redirectURL": "https://example.com/very/long/url/that/needs/shortening"
}
```

---

### 4. **Get User's URLs**
List all shortened URLs created by authenticated user

**Endpoint:** `GET /`

**Headers:**
```
Authorization: Bearer <your_jwt_token>
```

**Response (200):**
```json
{
  "message": "User URLs retrieved successfully",
  "count": 5,
  "urls": [
    {
      "_id": "objectId",
      "shortID": "abc123",
      "redirectURL": "https://example.com/url1",
      "visitHistory": [
        { "timestamp": 1234567890 },
        { "timestamp": 1234567900 }
      ],
      "createdBy": "userId",
      "createdAt": "2024-04-24T10:00:00Z"
    }
  ]
}
```

---

### 5. **Get All URLs (Admin Only)**
List all shortened URLs in the system

**Endpoint:** `GET /admin/urls`

**Headers:**
```
Authorization: Bearer <admin_jwt_token>
```

**Response (200):**
```json
{
  "message": "All URLs retrieved successfully",
  "count": 15,
  "urls": [...]
}
```

---

### 6. **Redirect Short URL**
Redirect to original URL (no authentication needed)

**Endpoint:** `GET /:shortID`

**Example:**
```
GET http://localhost:8001/abc123xyz
```

**Response:** Redirects to the original URL and logs the visit

---

## 🌐 Deployment

### Deploy to Render

1. Push code to GitHub
2. Go to [Render](https://render.com)
3. Create new **Web Service**
4. Connect your GitHub repository
5. Set environment variables:
   - `PORT`: 10000
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: Your secret key
6. Deploy!

### Deploy to Railway

1. Push code to GitHub
2. Go to [Railway](https://railway.app)
3. Create new project
4. Connect GitHub repository
5. Add environment variables
6. Deploy!

### Deploy to Heroku

1. Install Heroku CLI
2. Login: `heroku login`
3. Create app: `heroku create your-app-name`
4. Set env vars:
   ```bash
   heroku config:set MONGODB_URI=your_connection_string
   heroku config:set JWT_SECRET=your_secret
   ```
5. Deploy: `git push heroku main`

---

## 📋 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `8001` |
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| `JWT_SECRET` | Secret key for JWT signing | `your_secret_key` |

**Never commit `.env` to Git!** It's in `.gitignore` for security.

---

## 🏗️ Project Structure

```
short-url-api/
├── controllers/       # Request handlers
│   ├── user.js       # User signup/login logic
│   └── url.js        # URL shortening logic
├── models/           # Database schemas
│   ├── user.js       # User model
│   └── url.js        # URL model
├── routes/           # API routes
│   ├── user.js       # User endpoints
│   ├── url.js        # URL endpoints
│   └── staticRouter.js # Static endpoints
├── middlewares/      # Express middlewares
│   └── auth.js       # Authentication & authorization
├── service/          # Business logic
│   └── auth.js       # JWT token management
├── connection.js     # MongoDB connection
├── index.js          # Server entry point
├── package.json      # Dependencies
├── .env              # Environment variables (not committed)
└── README.md         # This file
```

---

## 🔐 Security Features

- ✅ **Bcrypt Password Hashing** - Passwords never stored in plaintext
- ✅ **JWT Authentication** - Stateless token-based auth
- ✅ **Bearer Token Support** - Standard HTTP authorization
- ✅ **CORS Enabled** - Safe cross-origin requests
- ✅ **Environment Variables** - Secrets not in code
- ✅ **MongoDB Validation** - Schema validation for all data
- ✅ **Error Handling** - No sensitive info leaked in errors

---

## 🛠️ Development

### Install dependencies
```bash
npm install
```

### Run in development
```bash
npm run dev
```

### Run in production
```bash
npm run prod
```

### Check code syntax
```bash
node --check index.js
```

---

## 🤝 How to Use as an API Library

### For Other Developers

If you want to use this as a service in your application:

1. **Deploy this API** to a cloud platform (Render, Railway, Heroku, etc.)
2. **Use the endpoints** from your application

**Example - Using in a Next.js App:**

```javascript
const baseURL = 'https://short-url-api-4l7o.onrender.com';

async function shortenURL(longURL, userToken) {
  const response = await fetch(`${baseURL}/url`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${userToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ url: longURL })
  });
  
  const data = await response.json();
  return data.shortURL;
}
```

---

## 📊 Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String, // "NORMAL" or "ADMIN"
  createdAt: Date,
  updatedAt: Date
}
```

### URLs Collection
```javascript
{
  _id: ObjectId,
  shortID: String (unique),
  redirectURL: String,
  visitHistory: [
    { timestamp: Number }
  ],
  createdBy: ObjectId (User),
  createdAt: Date,
  updatedAt: Date
}
```
---

## 📝 License

ISC License - Feel free to use this project

---

## 🎯 Future Enhancements

- [ ] Rate limiting for free tier
- [ ] Custom domain support
- [ ] QR code generation
- [ ] Advanced analytics dashboard
- [ ] API key management
- [ ] Batch URL shortening
- [ ] URL expiration
- [ ] Link preview


