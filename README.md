# Task Manager App

A full-stack task management application that allows users to create an account, log in securely, and manage their tasks through a simple, responsive interface.

## Live Demo

- **Frontend:** [Open Task Manager](https://task-manager-mominjemals-projects.vercel.app)
- **Backend API:** https://task-manager-0kbs.onrender.com
- **GitHub Repository:** https://github.com/mominjemal/task-manager

## Features

- **User Authentication:** Register and log in with an email and password.
- **Secure Password Handling:** Passwords are hashed using bcrypt.
- **JWT Authentication:** Protected API endpoints use JSON Web Tokens.
- **Task Management:** Create, view, update, and delete tasks.
- **Database Persistence:** Store application data in PostgreSQL.
- **Responsive Interface:** Use the application on desktop and mobile screens.
- **REST API:** Communicate between the React frontend and Express backend.

## Tech Stack

### Frontend
- React
- Vite
- JavaScript
- CSS
- Fetch API

### Backend
- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- JWT authentication
- bcryptjs

### Database and Deployment
- Neon — hosted PostgreSQL database
- Render — backend deployment
- Vercel — frontend deployment
- Git and GitHub — version control

## Architecture

```text
User
 |
 v
React Frontend (Vercel)
 |
 | HTTP requests / JSON
 v
Express REST API (Render)
 |
 | Prisma ORM
 v
PostgreSQL Database (Neon)
```

## Getting Started

### Prerequisites

Install the following tools before running the project locally:

- Node.js and npm
- Git
- A PostgreSQL database, such as Neon
- A code editor such as VS Code

### 1. Clone the repository

```bash
git clone https://github.com/mominjemal/task-manager.git
cd task-manager
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` directory:

```env
DATABASE_URL="your_postgresql_connection_string"
JWT_SECRET="your_secure_secret"
NODE_ENV="development"
```

Replace the example values with your own database connection string and a strong secret. Never commit your `.env` file or expose your credentials publicly.

### 3. Prepare the database

Run the appropriate Prisma migration command for your project's existing migration setup. If your migrations are already committed, the deployment-oriented command is generally:

```bash
npx prisma migrate deploy
```

Generate Prisma Client if it has not already been generated:

```bash
npx prisma generate
```

### 4. Start the backend

```bash
npm run dev
```

The API should start at:

```text
http://localhost:5000
```

### 5. Set up the frontend

Open a second terminal from the repository root:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite in your terminal.

## Environment Variables

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | Secret used to sign authentication tokens |
| `NODE_ENV` | Application environment |

Keep secret values private. Do not place credentials in frontend code because frontend code is publicly accessible.

## API

The backend API is hosted at:

https://task-manager-0kbs.onrender.com

The root endpoint can be used to check whether the API is responding.

```http
GET /
```

Expected response:

```json
{
  "message": "Task Manager API is running"
}
```

Authentication routes include registration and login under `/api/auth`. Protected task routes require a valid authentication token. Refer to the backend source code for the exact task endpoints and request formats.

## Deployment

- **Frontend:** Deployed on Vercel.
- **Backend:** Deployed on Render.
- **Database:** Hosted on Neon PostgreSQL.

The frontend communicates with the deployed backend through the shared API helper in `frontend/src/api.js`.

## What I Learned

Building this project helped me practice:

- Developing a full-stack application with React and Express.
- Designing and using REST API endpoints.
- Implementing authentication and password hashing.
- Connecting an application to PostgreSQL using Prisma.
- Managing environment variables and database migrations.
- Using Git and GitHub for version control.
- Deploying a frontend and backend to separate hosting platforms.
- Debugging deployment and API connection issues.

## Future Improvements

- Add task priorities and due dates.
- Add task search, filtering, and sorting.
- Improve form validation and error messages.
- Add automated tests.
- Improve accessibility and mobile responsiveness.
- Add task status filters and dashboard statistics.

## Author

**Momin Jemal**

Full-Stack Developer | Ethiopia

- GitHub: https://github.com/mominjemal

---

If you find this project useful, feel free to explore the repository and share feedback.
