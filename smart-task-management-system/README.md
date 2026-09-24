# Smart Task Management System

Simple full-stack task management project using:

- Angular + TypeScript
- Node.js + Express.js
- MySQL
- JWT authentication
- Role-based access control
- Git-ready project structure

## Project structure

smart-task-management-system/
├── backend/
│   ├── src/
│   │   ├── middleware/auth.js
│   │   ├── routes/auth.js
│   │   ├── routes/tasks.js
│   │   ├── db.js
│   │   └── server.js
│   ├── .env.example
│   ├── package.json
│   └── schema.sql
└── frontend/
    ├── src/app/
    │   ├── auth.service.ts
    │   ├── task.service.ts
    │   ├── login.component.ts
    │   ├── login.component.html
    │   ├── login.component.css
    │   ├── task.component.ts
    │   ├── task.component.html
    │   ├── task.component.css
    │   ├── app.component.ts
    │   ├── app.component.html
    │   ├── app.component.css
    │   └── app.config.ts
    ├── src/main.ts
    ├── src/index.html
    ├── angular.json
    ├── package.json
    ├── tsconfig.json
    └── tsconfig.app.json

## 1. Create the MySQL database

Open MySQL Workbench or MySQL command line and run:

```sql
SOURCE backend/schema.sql;
```

The script creates the database, users, and tasks tables.

It also creates:
- admin@example.com / admin123
- user@example.com / user123

Passwords are stored as bcrypt hashes.

## 2. Configure backend

Go to backend:

```bash
cd backend
npm install
```

Copy `.env.example` to `.env` and update your MySQL password:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=task_management
JWT_SECRET=my_simple_secret_key
```

Start backend:

```bash
npm start
```

Backend runs on:

http://localhost:3000

## 3. Start Angular frontend

Open another terminal:

```bash
cd frontend
npm install
npm start
```

Open:

http://localhost:4200

## Login

Admin:
- Email: admin@example.com
- Password: admin123

User:
- Email: user@example.com
- Password: user123

## Features

- Login/logout
- JWT authentication
- Admin/user roles
- Create tasks
- Assign tasks
- Update task status
- Delete tasks
- Task priority
- Deadline
- Search
- Status filter
- Reactive form validation
- MySQL relational database
- REST APIs
