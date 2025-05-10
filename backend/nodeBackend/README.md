# Node.js Backend

This is the backend for the Veersa Hackathon project.

## Folder Structure

```
backend/
├── src/                    # Source files
│   ├── config/             # Configuration files
│   ├── controllers/        # Request controllers
│   ├── middlewares/        # Custom middlewares
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── services/           # Business logic services
│   ├── utils/              # Utility functions
│   └── index.js            # App entry point
├── .env                    # Environment variables
├── package.json            # Project metadata and dependencies
└── README.md               # Project documentation
```

## Setup and Running

### Install dependencies
```
npm install
```

### Development mode
```
npm run dev
```

### Production mode
```
npm start
```

## API Endpoints

- GET /api - Welcome message
- GET /api/users - Get all users
- GET /api/users/:id - Get specific user

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/veersaHackathon
JWT_SECRET=your_jwt_secret_key_here
```
