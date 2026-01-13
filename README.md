## Project Structure

- `/frontend`: React application (Vite)
- `/backend`: Node.js Express server

## Tech Stack

- **Frontend**: React, Vite, Axios, Tailwind CSS
- **Backend**: Node.js, Express, CORS
- **Data**: In-memory storage

## Setup & Run Instructions

### Backend
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
   The backend runs on `http://localhost:5000`.

### Frontend
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend runs on `http://localhost:5173`.

## Features
- View all tasks
- Add a new task
- Edit an existing task
- Delete a task
- Data persistence (in-memory, resets on backend restart)

## Notes
- The backend uses an in-memory array for storage. Restarting the server will reset the data.
