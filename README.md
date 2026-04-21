Warehouse Management System – Backend (NestJS + TypeORM)
A backend API built using NestJS, TypeORM, and PostgreSQL for managing users, roles, authentication, and warehouse operations.
This project follows clean architecture principles with DTO validation, password hashing, and modular structure.

Features

User Module
Create User
Update User
Get All Users
Get User by ID
Delete User
Password hashing using bcrypt
DTO validation using class-validator
Role support (Manager / Employee)
Global Validation Pipe
Clean folder structure
TypeORM integration
Error handling (duplicate email, not found, etc.)

Tech Stack
NestJS
TypeORM
PostgreSQL
bcrypt
class-validator / class-transformer
Node.js / TypeScript


src/
 ├── users/
 │    ├── dto/
 │    │    ├── create-user.dto.ts
 │    │    └── update-user.dto.ts
 │    ├── entities/
 │    │    └── user.entity.ts
 │    ├── users.controller.ts
 │    ├── users.service.ts
 │    └── users.module.ts
 ├── app.module.ts
 └── main.ts

 Installation

 npm install

 create .env

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres123
DB_NAME=warehouse_db

PORT=3000

Running the project 
npm run start:dev