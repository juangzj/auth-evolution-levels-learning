# Level 0 - Basic CRUD

## Goal

Welcome to the first levelb (Level 0) of **auth-evolution**.

This project is an educational journey where the application evolves step by step, just like software evolves inside real companies.

At this level we are **not** trying to build a perfect architecture.

The objective is much simpler:

> Build a working CRUD application using a simple Layered Architecture.

This level serves as the foundation for everything that will come later.

---

# Why does this level exist?

Many developers start learning Clean Architecture, DDD or Hexagonal Architecture before understanding why they exist.

That usually leads to:

- Too many folders
- Too many interfaces
- Classes that solve no real problem
- Unnecessary complexity

Real software rarely starts like that.

Most applications begin as a simple CRUD.

As the project grows, new problems appear.

Only then does the architecture evolve.

This repository follows that same philosophy.

Every future architectural decision will solve a real problem introduced by the previous level.

---

# What will you learn?

After finishing this level you should understand:

- How a NestJS project is organized
- What a Module is
- What a Controller does
- What a Service does
- What a DTO is
- What a TypeORM Entity is
- How TypeORM communicates with PostgreSQL
- How Migrations work
- The complete lifecycle of an HTTP request

---

# Architecture

This level uses a simple Layered Architecture.

```
HTTP Request
      │
      ▼
 Controller
      │
      ▼
  Service
      │
      ▼
TypeORM Repository
      │
      ▼
 PostgreSQL
```

Each layer has only one responsibility.

---

# Project Structure

```
src
│
├── app.module.ts
│
├── users
│   │
│   ├── users.controller.ts
│   │
│   │
│   ├── users.service.ts
│   │
│   │
│   ├── dto
│   │     ├── create-user.dto.ts
│   │     └── update-user.dto.ts
│   │
│   ├── entities
│   │     └── user.entity.ts
│   │
│   └── users.module.ts
│
└── main.ts
```

This structure is intentionally simple.

There are no unnecessary folders because the application is still very small.

---

# Main Concepts

## Module

A Module groups related files together.

Think of it as a folder that contains everything related to one feature.

For example:

```
Users Module

- Controller
- Service
- DTOs
- Entity
```

Instead of scattering files across the project, everything related to Users stays together.

This makes the project easier to navigate.

---

## Controller

The Controller is the application's front door.

It receives HTTP requests from clients.

Example:

```
POST /users

GET /users

GET /users/1

PATCH /users/1

DELETE /users/1
```

The controller should NOT contain business logic.

Its only responsibilities are:

- Receive requests
- Validate input
- Call the Service
- Return the response

Think of it as a receptionist.

A receptionist welcomes visitors but does not solve the company's problems.

---

## Service

The Service contains the application's business logic.

If the Controller is the receptionist,

the Service is the employee who actually performs the work.

Example:

```
Controller

↓

Create User

↓

Service

↓

Save user in database
```

The Service decides:

- Can the user be created?
- Is the email already used?
- Should the password be processed?
- What should happen before saving?

At this level, almost all application logic lives inside Services.

Later, this responsibility will be distributed into better architectural components.

---

## DTO (Data Transfer Object)

DTO stands for Data Transfer Object.

A DTO describes the data the application expects to receive.

Example:

```
CreateUserDto

email

password

firstName

lastName
```

DTOs help us:

- Validate input
- Keep requests consistent
- Prevent unexpected data

Think of a DTO as a form.

If a field is missing or invalid, the request is rejected before reaching the business logic.

---

## Entity

An Entity represents a table in the database.

Example:

```
User

id

email

password

createdAt

updatedAt
```

TypeORM uses Entities to know how data should be stored.

At this level, the Entity also represents our business object.

This is acceptable because the project is still small.

Later this will change.

---

## Repository (TypeORM)

The Repository is responsible for communicating with the database.

The Service should never write SQL directly.

Instead, it asks the Repository to perform operations.

Example:

```
Service

↓

Repository

↓

Database
```

The Repository knows:

- How to save data
- How to search data
- How to update data
- How to delete data

---

## Migration

A Migration describes changes made to the database.

Instead of manually creating tables,

we create migrations.

This keeps the database synchronized with the application.

Every developer can recreate the same database by executing the migrations.

---

# HTTP Request Lifecycle

Let's follow a request from beginning to end.

Imagine someone sends:

```
POST /users
```

The flow is:

```
Client

↓

Controller

↓

Service

↓

Repository

↓

Database

↓

Repository

↓

Service

↓

Controller

↓

Client
```

Every layer has one responsibility.

This separation makes the application easier to maintain.

---

# Database

At this level the application contains only one table.

```
users
```

Columns:

```
id

email

password

first_name

last_name

created_at

updated_at
```

Rules:

- Email must be unique.
- Every user has an ID.
- Timestamps are created automatically.

---

# Features

This level implements only the following features:

- Create User
- Get All Users
- Get User By ID
- Update User
- Delete User

Nothing else.

---

# Why only CRUD?

Because software grows gradually.

Before implementing authentication,

before JWT,

before DDD,

before Clean Architecture,

we first need a stable foundation.

This level is that foundation.

---

# What is intentionally NOT included?

The following concepts belong to future levels:

- Login
- JWT
- Refresh Tokens
- Roles
- Permissions
- Clean Architecture
- Hexagonal Architecture
- CQRS
- Domain-Driven Design (DDD)
- Value Objects
- Repository Interfaces
- Domain Events
- RabbitMQ
- Redis
- Microservices

Adding these concepts now would make the project more complicated without solving any real problem.

One of the main goals of this project is learning **when** a concept should be introduced, not just **how** to implement it.

---

# What problems does this architecture have?

Although this architecture is simple, it has some limitations.

As the project grows:

- Services become larger.
- Business logic starts mixing with database logic.
- Code becomes harder to maintain.
- Testing becomes more difficult.

These problems are expected.

We are not trying to solve them yet.

Instead, we will allow the application to grow naturally until these problems become obvious.

Only then will we evolve the architecture.

---

# What should you understand before moving to Level 1?

Before continuing, you should be able to answer these questions:

- What is a Module?
- What is a Controller?
- What is a Service?
- What is a DTO?
- What is an Entity?
- What is a Repository?
- Why do we use Migrations?
- How does an HTTP request travel through the application?
- Why is this architecture enough for a small project?
- What limitations will appear as the application grows?

If you can confidently answer these questions, you're ready for the next level.

---

# Summary

At this level we built a simple CRUD application using NestJS and TypeORM.

The architecture is intentionally simple because the application is still small.

Rather than introducing advanced patterns too early, we focus on understanding the purpose of each layer and how the application works from the HTTP request down to the database.

This level establishes the foundation on which every future architectural improvement will be built.
